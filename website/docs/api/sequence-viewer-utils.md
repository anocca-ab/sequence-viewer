---
title: "@anocca/sequence-viewer-utils"
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@anocca/sequence-viewer-utils](./sequence-viewer-utils.md)



Contains utilities, types and constants used by all @anocca/sequence-viewer- packages

## Enumerations

|  Enumeration | Description |
|  --- | --- |
|  [SeqAnnotationDirectionsEnum](./sequence-viewer-utils.seqannotationdirectionsenum.md) | The direction of an annotation |

## Functions

|  Function | Description |
|  --- | --- |
|  [getFont(size, weight)](./sequence-viewer-utils.getfont.md) | Creates a font string based on fontSize and fontWeight |
|  [getRatio(context)](./sequence-viewer-utils.getratio.md) | Get the device pixel ratio |
|  [scaleBuffer(canvas, width, height)](./sequence-viewer-utils.scalebuffer.md) | Scale the canvas according to the device pixel ratio |

## Type Aliases

|  Type Alias | Description |
|  --- | --- |
|  [Annotation](./sequence-viewer-utils.annotation.md) | Annotation |
|  [AnnotationFormProps](./sequence-viewer-utils.annotationformprops.md) | Props for an AnnotationForm component |
|  [Annotations](./sequence-viewer-utils.annotations.md) | List of annotations |
|  [ChromatogramData](./sequence-viewer-utils.chromatogramdata.md) | Chromatogram data to render the chromatogram |
|  [CircularCameraProgress](./sequence-viewer-utils.circularcameraprogress.md) | The progress on zoom, angle and radius between 0 and 1 inclusive |
|  [CircularSelection](./sequence-viewer-utils.circularselection.md) | <p>Sequence selection defines <code>[start, end]</code> where start is the tail and end is the head.</p><p>lets say we have sequence of length 3000 and annotation of 4 bp length locations:</p><p><code>reverse: [10 - 6], antiClockwise: true</code>,</p><p><code>reverse(over the origin): [2 - 2998], antiClockwise: true</code>,</p><p><code>forward: [6 - 10], antiClockwise: false</code>,</p><p><code>forward(over the origin): [2998 - 2], antiClockwise: false</code></p> |
|  [DrawFunction](./sequence-viewer-utils.drawfunction.md) | The draw function, e.g. drawLinear or drawCircular that paints the canvas element |
|  [Matrix](./sequence-viewer-utils.matrix.md) | A transform matrix |
|  [RenderData](./sequence-viewer-utils.renderdata.md) | Frequently updated data for drawCircular and drawLinear |
|  [SearchResult](./sequence-viewer-utils.searchresult.md) | Search result |
|  [SelectionRange](./sequence-viewer-utils.selectionrange.md) | Selection range |
|  [SequenceControllerRef](./sequence-viewer-utils.sequencecontrollerref.md) | To programatically call onClickAnnotation to select annotation in the sequence controller |

