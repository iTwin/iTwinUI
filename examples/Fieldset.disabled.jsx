/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Fieldset, LabeledInput } from '@itwin/itwinui-react';
import './Fieldset.disabled.css';

export default () => {
  return (
    <Fieldset legend='Disabled Fieldset' disabled className='disabled-fieldset'>
      <LabeledInput label='Full Name' placeholder='Enter full name' />
      <LabeledInput label='Address' placeholder='Enter address' />
    </Fieldset>
  );
};
