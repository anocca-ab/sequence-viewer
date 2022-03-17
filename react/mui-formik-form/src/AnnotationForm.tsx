import React from 'react';
import {
  Annotation,
  SeqAnnotationDirectionsEnum,
  tuple,
  AnnotationFormProps
} from '@anocca/sequence-viewer-utils';
import {
  FormControlLabel,
  Checkbox,
  DialogTitle,
  Theme,
  makeStyles,
  createStyles,
  DialogContent,
  DialogContentText,
  Button,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  IconButton
} from '@material-ui/core';
import { Formik, Form, Field, ErrorMessage, FieldArray, getIn } from 'formik';
import { MdClose } from 'react-icons/md';

const getUuid = (a: string = ''): string =>
  a
    ? ((Number(a) ^ (Math.random() * 16)) >> (Number(a) / 4)).toString(16)
    : `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, getUuid);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        marginBottom: theme.spacing(2)
      }
    }
  })
);

/**
 * Form component to create or edit an Annotation.
 * 
 * Built with material UI and formik.
 * 
 * **Usage:**
 * 
 * ```tsx
 * <AnnotationForm
 *   title="Create annotation"
 *   onSubmit={() => {}}
 *   initialValues={{}}
 * />
 * ```
 * 
 * See
 * {@link @anocca/sequence-viewer-utils#AnnotationFormProps | AnnotationFormProps},
 * {@link @anocca/sequence-viewer-utils#Annotation | Annotation}
 *
 * @public
 */
export const AnnotationForm = ({ onSubmit, initialValues, title }: AnnotationFormProps) => {
  const classes = useStyles();

  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            id: getUuid(),
            type: 'OTHER',
            label: '',
            color: '#000000',
            locations: [],
            hidden: false,
            displayAsSequence: false,
            rightTag: '',
            displayLabel: '',
            direction: SeqAnnotationDirectionsEnum.FORWARD,
            cleavageSites: [],
            fivePExtension: '',
            ...initialValues
          }}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values as Annotation);
          }}
          validate={(values) => {
            const errors: { [k in keyof typeof values]?: string } = {};
            if (!values.label) {
              errors.label = 'Required';
            }
            if (values.type === 'DNA_RE_NUC') {
              if (values.cleavageSites.length === 0) {
                errors.cleavageSites = 'Required';
              }
            }
            if (values.locations.length === 0) {
              errors.locations = 'Required';
            }
            return errors;
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className={classes.root}>
              <TextField
                fullWidth
                id="label"
                name="label"
                label="Label"
                value={formik.values.label}
                onChange={formik.handleChange}
                error={formik.touched.label && Boolean(formik.errors.label)}
                helperText={formik.touched.label && formik.errors.label}
              />
              <TextField
                id="color"
                name="color"
                label="Color"
                type="color"
                style={{ width: '100px' }}
                inputProps={{ style: { height: '24px', margin: '0', padding: '0' } }}
                value={formik.values.color}
                onChange={formik.handleChange}
                error={formik.touched.color && Boolean(formik.errors.color)}
                helperText={formik.touched.color && formik.errors.color}
              />

              <div>
                <ErrorMessage name={'displayAsSequence'} />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.displayAsSequence}
                      onChange={formik.handleChange}
                      name="displayAsSequence"
                      color="primary"
                    />
                  }
                  label="Display as sequence"
                />
              </div>

              <div>
                <ErrorMessage name={'hidden'} />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formik.values.hidden}
                      onChange={formik.handleChange}
                      name="hidden"
                      color="primary"
                    />
                  }
                  label="Hidden"
                />
              </div>

              <TextField
                fullWidth
                id="rightTag"
                name="rightTag"
                label="Right tag"
                value={formik.values.rightTag}
                onChange={formik.handleChange}
                error={formik.touched.rightTag && Boolean(formik.errors.rightTag)}
                helperText={formik.touched.rightTag && formik.errors.rightTag}
              />

              <TextField
                fullWidth
                id="displayLabel"
                name="displayLabel"
                label="Display label"
                value={formik.values.displayLabel}
                onChange={formik.handleChange}
                error={formik.touched.displayLabel && Boolean(formik.errors.displayLabel)}
                helperText={formik.touched.displayLabel && formik.errors.displayLabel}
              />

              <FormControl fullWidth>
                <InputLabel id="select-type">Type</InputLabel>
                <Select
                  labelId="select-type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  name="type"
                >
                  {[
                    tuple('DNA oligo', 'DNA_OLIGO'),
                    tuple('DNA restriction nuclease', 'DNA_RE_NUC'),
                    tuple('Other', 'OTHER')
                  ].map(([verbose, value]) => {
                    return (
                      <MenuItem value={value} key={value} id={value}>
                        {verbose}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="select-direction">Direction</InputLabel>
                <Select
                  labelId="select-direction"
                  value={formik.values.direction}
                  onChange={formik.handleChange}
                  error={formik.touched.direction && Boolean(formik.errors.direction)}
                  name="direction"
                >
                  {[
                    tuple('Forward', SeqAnnotationDirectionsEnum.FORWARD),
                    tuple('Reverse', SeqAnnotationDirectionsEnum.REVERSE)
                  ].map(([verbose, value]) => {
                    return (
                      <MenuItem value={value} key={value} id={value}>
                        {verbose}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>

              {formik.values.type === 'DNA_OLIGO' && (
                <TextField
                  fullWidth
                  id="fivePExtension"
                  name="fivePExtension"
                  label="5PExtension"
                  value={formik.values.fivePExtension}
                  onChange={formik.handleChange}
                  error={formik.touched.fivePExtension && Boolean(formik.errors.fivePExtension)}
                  helperText={formik.touched.fivePExtension && formik.errors.fivePExtension}
                />
              )}

              {formik.values.type === 'DNA_RE_NUC' && (
                <>
                  <InputLabel id="select-cleavageSites" shrink>
                    Cleavage sites
                  </InputLabel>
                  <FieldArray name="cleavageSites">
                    {({ insert, remove, push }) => (
                      <div>
                        {formik.values.cleavageSites.length > 0 &&
                          formik.values.cleavageSites.map((friend, index) => (
                            <div className="row" key={index}>
                              <div className="col">
                                <TextField
                                  id={`cleavageSites.${index}.0`}
                                  name={`cleavageSites.${index}.0`}
                                  type="number"
                                  label="Left"
                                  value={getIn(formik.values, `cleavageSites.${index}.0`)}
                                  onChange={formik.handleChange}
                                  error={
                                    getIn(formik.touched, `cleavageSites.${index}.0`) &&
                                    Boolean(getIn(formik.errors, `cleavageSites.${index}.0`))
                                  }
                                  helperText={
                                    getIn(formik.touched, `cleavageSites.${index}.0`) &&
                                    getIn(formik.errors, `cleavageSites.${index}.0`)
                                  }
                                />
                              </div>
                              <div className="col">
                                <TextField
                                  id={`cleavageSites.${index}.1`}
                                  name={`cleavageSites.${index}.1`}
                                  type="number"
                                  label="Right"
                                  value={getIn(formik.values, `cleavageSites.${index}.1`)}
                                  onChange={formik.handleChange}
                                  error={
                                    getIn(formik.touched, `cleavageSites.${index}.1`) &&
                                    Boolean(getIn(formik.errors, `cleavageSites.${index}.1`))
                                  }
                                  helperText={
                                    getIn(formik.touched, `cleavageSites.${index}.1`) &&
                                    getIn(formik.errors, `cleavageSites.${index}.1`)
                                  }
                                />
                              </div>
                              <div className="col">
                                <IconButton onClick={() => remove(index)}>
                                  <MdClose />
                                </IconButton>
                              </div>
                            </div>
                          ))}
                        <Button
                          onClick={() => push(tuple(0, 0))}
                          variant="outlined"
                          style={{ marginTop: '8px' }}
                        >
                          Add cleavage site
                        </Button>
                      </div>
                    )}
                  </FieldArray>
                  <ErrorMessage name={'cleavageSites'} />
                </>
              )}

              <InputLabel id="select-locations" shrink>
                Locations
              </InputLabel>
              <FieldArray name="locations">
                {({ insert, remove, push }) => (
                  <div>
                    {formik.values.locations.length > 0 &&
                      formik.values.locations.map((friend, index) => (
                        <div className="row" key={index}>
                          <div className="col">
                            <TextField
                              id={`locations.${index}.0`}
                              name={`locations.${index}.0`}
                              type="number"
                              label="Left"
                              value={getIn(formik.values, `locations.${index}.0`)}
                              onChange={formik.handleChange}
                              error={
                                getIn(formik.touched, `locations.${index}.0`) &&
                                Boolean(getIn(formik.errors, `locations.${index}.0`))
                              }
                              helperText={
                                getIn(formik.touched, `locations.${index}.0`) &&
                                getIn(formik.errors, `locations.${index}.0`)
                              }
                            />
                          </div>
                          <div className="col">
                            <TextField
                              id={`locations.${index}.1`}
                              name={`locations.${index}.1`}
                              type="number"
                              label="Right"
                              value={getIn(formik.values, `locations.${index}.1`)}
                              onChange={formik.handleChange}
                              error={
                                getIn(formik.touched, `locations.${index}.1`) &&
                                Boolean(getIn(formik.errors, `locations.${index}.1`))
                              }
                              helperText={
                                getIn(formik.touched, `locations.${index}.1`) &&
                                getIn(formik.errors, `locations.${index}.1`)
                              }
                            />
                          </div>
                          <div className="col">
                            <IconButton onClick={() => remove(index)}>
                              <MdClose />
                            </IconButton>
                          </div>
                        </div>
                      ))}
                    <Button onClick={() => push(tuple(0, 0))} variant="outlined" style={{ marginTop: '8px' }}>
                      Add location
                    </Button>
                  </div>
                )}
              </FieldArray>
              <div>
                <ErrorMessage name={'locations'} />
              </div>

              <Button color="primary" variant="contained" type="submit" disabled={formik.isSubmitting}>
                Submit
              </Button>
            </form>
          )}
        </Formik>
      </DialogContent>
    </>
  );
};
