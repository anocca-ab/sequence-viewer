import React from 'react';
import { CircularController } from '@anocca/sequence-viewer-react-circular';
import { LinearController } from '@anocca/sequence-viewer-react-linear';
import {
  Annotation,
  humanCodons,
  SeqAnnotationDirectionsEnum,
  AnnotationFormProps,
  ChromatogramData
} from '@anocca/sequence-viewer-utils';
import { Search, Toolbar } from '@anocca/sequence-viewer-react-mui';
import { Flex } from '@anocca/sequence-viewer-react-shared';
import { Theme, Chip, Dialog, Snackbar, IconButton, Typography, Grid, Switch } from '@mui/material';
import { MdClose } from 'react-icons/md';

/**
 * Ready to use sequence viewer component using react-icons, material UI and formik. Use this if you qulckly want to get started with the Anocca sequence viewer in react. See [Get started](/docs/tutorial/get-started)
 *
 * See: {@link @anocca/sequence-viewer-utils#Annotation | Annotation}
 *
 * @public
 */
export const SequenceViewerApp = (props: {
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
  isProtein?: boolean;
  renderLinearByDefault?: boolean;
  chromatogramData?: ChromatogramData;
  AnnotationForm: (props: AnnotationFormProps) => JSX.Element;
}) => {
  const [addAnnotation, setAddAnnotation] = React.useState<
    { locations: [number, number][]; direction: SeqAnnotationDirectionsEnum } | undefined
  >(undefined);
  const [editAnnotation, setEditAnnotation] = React.useState<
    | {
      [k in keyof Annotation]?: Annotation[k];
    }
    | undefined
  >(undefined);

  const openAnnotationDialog = (id: string) => {
    const annotation = props.getAnnotationById(id);
    setEditAnnotation(annotation);
  };

  const [openSnackbar, setOpenSnackbar] = React.useState('');

  const handleCloseSnackbar = (event: Event | React.SyntheticEvent<any, Event>) => {
    setOpenSnackbar('');
  };

  const [isCircularViewer, setIsCircularViewer] = React.useState(
    props.renderLinearByDefault ? false : !props.isProtein
  );

  const Component = isCircularViewer ? CircularController : LinearController;

  const AnnotationForm = props.AnnotationForm;

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={!!openSnackbar}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
        message={openSnackbar}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
              <MdClose fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <Dialog
        onClose={() => {
          setAddAnnotation(undefined);
        }}
        open={!!addAnnotation}
      >
        {addAnnotation && (
          <AnnotationForm
            onSubmit={(annotation) => {
              setAddAnnotation(undefined);
              props.addAnnotation(annotation);
            }}
            initialValues={addAnnotation}
            title="Create annotation"
          />
        )}
      </Dialog>
      <Dialog
        onClose={() => {
          setEditAnnotation(undefined);
        }}
        open={!!editAnnotation}
      >
        {editAnnotation && (
          <AnnotationForm
            onSubmit={(annotation) => {
              setEditAnnotation(undefined);
              props.updateAnnotation(annotation);
            }}
            initialValues={editAnnotation}
            title="Edit annotation"
          />
        )}
      </Dialog>

      <Component
        width={props.width}
        height={props.height}
        isProtein={!!props.isProtein}
        chromatogramData={props.chromatogramData}
        annotations={props.annotations}
        codons={humanCodons}
        sequence={props.sequence}
        Search={Search}
        openAnnotationDialog={(id) => {
          const annotation = props.getAnnotationById(id);
          setEditAnnotation(annotation);
        }}
      >
        {({ canvas, search, selectedAnnotations, circularSelections, clickedAnnotation }) => (
          <div style={{ margin: 'auto', maxWidth: props.width + 'px' }}>
            <Flex justifyContent="space-between" style={{ maxWidth: props.width + 'px' }}>
              <Flex style={{ position: 'relative', zIndex: 1 }}>
                <Toolbar
                  selectedAnnotations={selectedAnnotations}
                  circularSelections={circularSelections}
                  sequence={props.sequence}
                  createAnnotation={(locations, direction) => {
                    setAddAnnotation({ locations, direction });
                  }}
                  onHide={props.hideAnnotations}
                  onShow={props.showAnnotations}
                  onDelete={props.deleteAnnotations}
                  onCopySuccess={() => {
                    setOpenSnackbar('Successfully copied selected region to clipboard');
                  }}
                  onCopyError={() => {
                    setOpenSnackbar('Something went wrong when trying to copy the region');
                  }}
                />
              </Flex>
              {search}
            </Flex>
            <div style={{ position: 'relative' }}>
              {canvas}
              {!props.isProtein && (
                <div style={{ position: 'absolute', right: '80px', bottom: '160px' }}>
                  <Typography component="div">
                    <Grid component="label" container alignItems="center" spacing={1}>
                      <Grid item>Linear</Grid>
                      <Grid item>
                        <Switch
                          checked={isCircularViewer}
                          onChange={(ev: any) => {
                            setIsCircularViewer(ev.target.checked);
                          }}
                          name="circularswitch"
                        />
                      </Grid>
                      <Grid item>Circular</Grid>
                    </Grid>
                  </Typography>
                </div>
              )}
            </div>
            <Flex style={{ height: '60px' }}>
              {selectedAnnotations.length > 0 && (
                <Flex
                  alignItems="center"
                  justifyContent="flex-start"
                  style={{ maxWidth: props.width + 'px', overflowX: 'scroll' }}
                >
                  {clickedAnnotation && (
                    <Chip
                      label={props.getAnnotationLabelById(clickedAnnotation)}
                      color="primary"
                      onClick={() => {
                        openAnnotationDialog(clickedAnnotation);
                      }}
                      style={{ marginRight: '8px' }}
                    />
                  )}
                  {selectedAnnotations
                    .filter((annot) => annot !== clickedAnnotation)
                    .map((annot) => {
                      return (
                        <Chip
                          label={props.getAnnotationLabelById(annot)}
                          color="default"
                          onClick={() => {
                            openAnnotationDialog(annot);
                          }}
                          style={{ marginRight: '8px' }}
                          key={annot}
                        />
                      );
                    })}
                </Flex>
              )}
            </Flex>
          </div>
        )}
      </Component>
    </>
  );
};
