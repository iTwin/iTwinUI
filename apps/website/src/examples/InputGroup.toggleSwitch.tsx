/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { InputGroup, Surface, ToggleSwitch } from '@itwin/itwinui-react';
import { SvgCheckmark } from '@itwin/itwinui-icons-react';

export default () => {
  const [option1, setOption1] = React.useState(true);
  const [option2, setOption2] = React.useState(false);

  return (
    <Surface>
      <InputGroup label='Toggle group' style={{ padding: '12px' }}>
        <ToggleSwitch
          onChange={(event) => setOption1(event.target.checked)}
          checked={option1}
          label='Toggle feature No.1'
          icon={<SvgCheckmark />}
        />
        <ToggleSwitch checked={true} disabled label='This you cannot change' />
        <ToggleSwitch
          onChange={(event) => setOption2(event.target.checked)}
          label='Toggle feature No.2'
          checked={option2}
        />
      </InputGroup>
    </Surface>
  );
};
