/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Fieldset, LabeledSelect, InputGroup, Radio, ToggleSwitch } from '@itwin/itwinui-react';

export default () => {
  const [value, setValue] = React.useState<number | undefined>(undefined);

  return (
    <Fieldset
      legend='General Settings'
      style={{ display: 'flex', flexDirection: 'column', gap: 11 }}
    >
      <InputGroup label='Color Theme'>
        <Radio name='choice' value='option1' label={'Light'} />
        <Radio name='choice' value='option2' label={'Dark'} />
        <Radio name='choice' value='option3' label={'Match device'} />
      </InputGroup>

      <InputGroup>
        <ToggleSwitch label='Share crash logs' />
        <ToggleSwitch disabled label='Advanced settings' />
      </InputGroup>
    </Fieldset>
  );
};
