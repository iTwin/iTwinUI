/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { LabeledTextarea } from '@itwin/itwinui-react';

export default () => {
  return (
    <LabeledTextarea
      label='Inline text area'
      status='positive'
      placeholder='Labeled text area'
      displayStyle='inline'
    />
  );
};
