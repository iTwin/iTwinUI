/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { InputGroup, Radio } from '@itwin/itwinui-react';

export default () => {
  return (
    <>
      <InputGroup label='Radio group' message='Tell me how happy you are'>
        <Radio name='choice' value='option1' label={'Very Happy'} />
        <Radio name='choice' value='option2' label={'Not Happy'} />
      </InputGroup>
    </>
  );
};
