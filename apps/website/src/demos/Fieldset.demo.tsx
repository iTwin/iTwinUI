/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Fieldset, InputGroup, Radio, ThemeProvider, ToggleSwitch } from '@itwin/itwinui-react';

export default () => {
  return (
    <ThemeProvider theme='dark' themeOptions={{ applyBackground: false }}>
      <Fieldset legend='General Settings'>
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
    </ThemeProvider>
  );
};
