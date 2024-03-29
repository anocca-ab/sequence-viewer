---
title: "SequenceViewerApp"
---
<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [@anocca/sequence-viewer-app](./sequence-viewer-app.md) &gt; [SequenceViewerApp](./sequence-viewer-app.sequenceviewerapp.md)



Ready to use sequence viewer component using react-icons, material UI and formik. Use this if you qulckly want to get started with the Anocca sequence viewer in react. See \[Get started\](/docs/tutorial/get-started)

See: [Annotation](./sequence-viewer-utils.annotation.md)

**Signature:**

```typescript
SequenceViewerApp: (props: {
    sequence: string;
    annotations: Annotation[];
    width: number;
    height: number;
    getAnnotationLabelById: (id: string) => string;
    getAnnotationById: (id: string) => Annotation;
    addAnnotation: (annotation: Annotation) => void;
    deleteAnnotations: (ids: string[]) => void;
    showAnnotations: (ids: string[]) => void;
    hideAnnotations: (ids: string[]) => void;
    updateAnnotation: (annotation: Annotation) => void;
    isProtein?: boolean | undefined;
    renderLinearByDefault?: boolean | undefined;
    chromatogramData?: ChromatogramData | undefined;
    AnnotationForm: (props: AnnotationFormProps) => JSX.Element;
}) => JSX.Element
```
