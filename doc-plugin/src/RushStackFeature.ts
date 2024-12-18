// forked from https://github.com/microsoft/rushstack/tree/master/repo-scripts/doc-plugin-rush-stack
// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in https://github.com/microsoft/rushstack/tree/master/repo-scripts/doc-plugin-rush-stack for license information.

import * as path from 'path';
import * as yaml from 'js-yaml';
import { FileSystem } from '@rushstack/node-core-library';
import { ApiItem } from '@microsoft/api-extractor-model';
import {
  MarkdownDocumenterFeature,
  IMarkdownDocumenterFeatureOnBeforeWritePageArgs,
  IMarkdownDocumenterFeatureOnFinishedArgs
} from '@microsoft/api-documenter';

interface INavigationNode {
  title: string;
  url?: string;
  subitems?: INavigationNode[];
}
interface INavigationFile {
  api_nav: INavigationNode[];
}

/**
 * Plugin
 *
 * @internal
 */
export class RushStackFeature extends MarkdownDocumenterFeature {
  private _apiItemsWithPages: Set<ApiItem> = new Set<ApiItem>();

  public onInitialized(): void {
    console.log('RushStackFeature: onInitialized()');
  }

  public onBeforeWritePage(eventArgs: IMarkdownDocumenterFeatureOnBeforeWritePageArgs): void {
    // Add the Jekyll header
    const header: string = [
      '---',
      `title: "${eventArgs.apiItem.displayName === '(model)' ? 'Home' : eventArgs.apiItem.displayName}"`,
      '---',
      ''
    ].join('\n');
    eventArgs.pageContent = header + eventArgs.pageContent;
    eventArgs.pageContent = eventArgs.pageContent.replace(/##\s[^\n]+/, '');
    eventArgs.pageContent = eventArgs.pageContent.replace(/<!-- -->/gm, '');
    eventArgs.pageContent = eventArgs.pageContent.replace('<b>References:</b>', '<b>References:</b>\n\n');
    eventArgs.pageContent = eventArgs.pageContent.replace(/\\\*/gim, '*');
    eventArgs.pageContent = eventArgs.pageContent.replace('**Returns:**', '**Returns:**\n```ts');
    if (eventArgs.pageContent.includes('**Returns:**')) {
      eventArgs.pageContent = eventArgs.pageContent + '```\n';
    }
    const lines = eventArgs.pageContent.split('\n');
    const returnsStart = lines.findIndex((line) => line.includes('**Returns:**'));
    lines.splice(returnsStart + 2, 1);
    for (let i = returnsStart + 2; i < lines.length; i++) {
      if (lines[i].includes('```')) {
        lines.splice(i - 1, 1);
        break;
      }
    }

    eventArgs.pageContent = lines.join('\n');

    this._apiItemsWithPages.add(eventArgs.apiItem);
  }

  public onFinished(eventArgs: IMarkdownDocumenterFeatureOnFinishedArgs): void {
    const navigationFile: INavigationFile = {
      api_nav: [
        {
          title: 'API Reference',
          url: '/pages/api/'
        }
      ]
    };
    this._buildNavigation(navigationFile.api_nav, this.context.apiModel);

    const navFilePath: string = path.join(this.context.outputFolder, '..', 'api_nav.yaml');
    const navFileContent: string = yaml.safeDump(navigationFile, { lineWidth: 120 });

    // FileSystem.writeFile(navFilePath, navFileContent, { ensureFolderExists: true });
  }

  private _buildNavigation(parentNodes: INavigationNode[], parentApiItem: ApiItem): void {
    for (const apiItem of parentApiItem.members) {
      if (this._apiItemsWithPages.has(apiItem)) {
        const newNode: INavigationNode = {
          title: apiItem.displayName,
          url: path.posix
            .join('/pages/api/', this.context.documenter.getLinkForApiItem(apiItem)!)
            .replace(/\.md$/, '')
        };
        parentNodes.push(newNode);

        const newNodeSubitems: INavigationNode[] = [];
        this._buildNavigation(newNodeSubitems, apiItem);
        if (newNodeSubitems.length > 0) {
          newNode.subitems = newNodeSubitems;
        }
      } else {
        this._buildNavigation(parentNodes, apiItem);
      }
    }
  }
}
