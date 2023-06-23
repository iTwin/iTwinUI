/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { LabeledTextarea, Flex } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    Flex,
    null,
    React.createElement(LabeledTextarea, {
      label: 'Positive textarea',
      message: 'Happy message',
      status: 'positive',
      placeholder: 'Labeled textarea',
    }),
    React.createElement(LabeledTextarea, {
      label: 'Warning textarea',
      message: 'Cautious message',
      status: 'warning',
      placeholder: 'Labeled textarea',
    }),
    React.createElement(LabeledTextarea, {
      label: 'Negative textarea',
      message: 'Angry message',
      status: 'negative',
      placeholder: 'Labeled textarea',
    }),
  );
};
