/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import {SequenceViewerApp} from '@anocca/sequence-viewer-app';
import {useBackend} from '@anocca/sequence-viewer-backend-react-state';

// Add react-live imports you need here
const ReactLiveScope = {
  SequenceViewerApp,
  useBackend
};
export default ReactLiveScope;
