/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { InputGroup, Radio } from '@itwin/itwinui-react';
import { SvgSmileyHappy } from '@itwin/itwinui-react/cjs/core/utils';
import { SvgSmileySad } from '@itwin/itwinui-icons-react';
import * as React from 'react';

export default (args) => {
  const option1Label = <SvgSmileyHappy />;
  const option2Label = <SvgSmileySad />;
  function action(arg0: string): React.ChangeEventHandler<HTMLInputElement> {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <InputGroup label='Radio group' message='Tell me how happy you are' {...args}>
        <Radio
          name='choice'
          value='option1'
          onChange={action('Clicked option 1!')}
          label={option1Label}
          disabled={args.disabled}
          required={args.required}
        />
        <Radio
          name='choice'
          value='option2'
          onChange={action('Clicked option 2!')}
          label={option2Label}
          disabled={args.disabled}
          required={args.required}
        />
      </InputGroup>
    </>
  );
};
