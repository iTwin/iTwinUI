/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { InputGroup, Radio } from '@itwin/itwinui-react';
import { SvgSmileyHappy, SvgSmileySad } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <>
      <InputGroup label='Radio group' message='Tell me how happy you are'>
        <Radio name='choice' value='option1' label={<SvgSmileyHappy />} />
        <Radio name='choice' value='option2' label={<SvgSmileySad />} />
      </InputGroup>
    </>
  );
};
