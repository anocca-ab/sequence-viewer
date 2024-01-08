---
title: "ControllerProps"
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@anocca/sequence-viewer-react-shared](./sequence-viewer-react-shared.md) &gt; [ControllerProps](./sequence-viewer-react-shared.controllerprops.md)



Props for the CircularController and the LinearController component

<b>Signature:</b>

```typescript
export declare type ControllerProps = {
    width: number;
    height: number;
    sequence: string;
    annotations: Annotations;
    codons: {
        [k: string]: string;
    };
    Search?: SearchComponent;
    openAnnotationDialog?: (annotationId: string) => void;
    isProtein: boolean;
    children?: (props: {
        canvas: React.ReactNode;
        search?: React.ReactNode;
        selectedAnnotations: string[];
        circularSelections: CircularSelection[];
        clickedAnnotation?: string;
        canvasRef: (buffer: HTMLCanvasElement | null) => void;
        zoomToSearchResult: (nextViewRange: SelectionRange, zoom: boolean) => void;
        setSearchResults: (value: React.SetStateAction<{
            start: number;
            end: number;
            active: boolean;
            complement: boolean;
        }[]>) => void;
    }) => React.ReactNode;
};
```
<b>References:</b>

 [Annotations](./sequence-viewer-utils.annotations.md), [SearchComponent](./sequence-viewer-react-shared.searchcomponent.md), [CircularSelection](./sequence-viewer-utils.circularselection.md), [SelectionRange](./sequence-viewer-utils.selectionrange.md)
