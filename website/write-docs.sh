#!/bin/bash

set -eo pipefail

mkdir -p ./temp/
cp ../utils/temp/sequence-viewer-utils.api.json ./temp/
cp ../app/temp/sequence-viewer-app.api.json ./temp/
cp ../backend/react-state/temp/sequence-viewer-backend-react-state.api.json ./temp/
cp ../react/circular/temp/sequence-viewer-react-circular.api.json ./temp/
cp ../react/linear/temp/sequence-viewer-react-linear.api.json ./temp/
cp ../react/mui/temp/sequence-viewer-react-mui.api.json ./temp/
cp ../react/mui-formik-form/temp/sequence-viewer-react-mui-formik-form.api.json ./temp/
cp ../react/shared/temp/sequence-viewer-react-shared.api.json ./temp/
cp ../render/circular/temp/sequence-viewer-render-circular.api.json ./temp/
cp ../render/linear/temp/sequence-viewer-render-linear.api.json ./temp/
api-documenter generate --input-folder ./temp --output-folder ./docs/api
