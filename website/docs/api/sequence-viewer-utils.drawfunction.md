---
title: "DrawFunction"
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@anocca/sequence-viewer-utils](./sequence-viewer-utils.md) &gt; [DrawFunction](./sequence-viewer-utils.drawfunction.md)



The draw function, e.g. drawLinear or drawCircular that paints the canvas element

**Signature:**

```typescript
export declare type DrawFunction = (props: {
    c: CanvasRenderingContext2D;
    w: number;
    h: number;
    ratio: number;
    data: RenderData;
    sequence: string;
    circularSelection: CircularSelection[];
    searchResults: {
        start: number;
        end: number;
        active: boolean;
        complement: boolean;
    }[];
    filterChromOptions: string[];
    annotationLevels: Annotations[];
    renderStateRef: {
        clickedFeatures: string[];
        hoveringFeature: undefined | string;
    };
    codons: {
        [k: string]: string;
    };
    isProtein: boolean;
    chromatogramData?: ChromatogramData;
}) => {
    clickedFeatures: string[];
    hoveringFeature: undefined | string;
};
```
**References:** [RenderData](./sequence-viewer-utils.renderdata.md), [CircularSelection](./sequence-viewer-utils.circularselection.md), [Annotations](./sequence-viewer-utils.annotations.md), [ChromatogramData](./sequence-viewer-utils.chromatogramdata.md)

