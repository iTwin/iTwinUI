/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Select } from '@itwin/itwinui-react';
import {
  SvgSmileyHappy,
  SvgSmileySad,
  SvgSmileyNeutral,
} from '@itwin/itwinui-react/cjs/core/utils';

export default (args) => {
  const {
    options = [
      {
        value: 'happy',
        label: 'Happy',
        icon: <SvgSmileyHappy />,
      },
      {
        value: 'neutral',
        label: 'Neutral',
        icon: <SvgSmileyNeutral />,
      },
      {
        value: 'sad',
        label: 'Sad',
        icon: <SvgSmileySad />,
      },
    ],
    placeholder = 'How are you today?',
    ...rest
  } = args;
  const [value, setValue] = React.useState<string | undefined>(undefined);
  return (
    <Select<string>
      {...rest}
      options={options}
      value={value}
      onChange={setValue}
      placeholder={placeholder}
    />
  );
};
