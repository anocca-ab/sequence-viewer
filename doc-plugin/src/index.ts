import { IApiDocumenterPluginManifest } from '@microsoft/api-documenter';
import { RushStackFeature } from './RushStackFeature';

/**
 * Plugin manifest
 *
 * @internal
 */
export const apiDocumenterPluginManifest: IApiDocumenterPluginManifest = {
  manifestVersion: 1000,
  features: [
    {
      featureName: 'rush-stack-markdown-documenter',
      kind: 'MarkdownDocumenterFeature',
      subclass: RushStackFeature
    }
  ]
};
