/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Fieldset, LabeledInput } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    Fieldset,
    {
      legend: 'Disabled Fieldset',
      disabled: true,
      style: { display: 'flex', flexDirection: 'column', gap: 11 },
    },
    React.createElement(LabeledInput, {
      label: 'Full Name',
      placeholder: 'Enter full name',
    }),
    React.createElement(LabeledInput, {
      label: 'Address',
      placeholder: 'Enter address',
    }),
  );
};
