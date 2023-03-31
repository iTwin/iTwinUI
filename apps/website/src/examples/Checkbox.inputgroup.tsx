/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Checkbox, InputGroup } from '@itwin/itwinui-react';

export default () => {
  return (
    <InputGroup label='What are your hobbies?'>
      <Checkbox label='Sports' defaultChecked />
      <Checkbox label='Writing' />
      <Checkbox label='Cooking' />
      <Checkbox label='Arts and crafts' />
    </InputGroup>
  );
};
