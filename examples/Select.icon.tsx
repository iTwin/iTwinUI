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
} from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Select
      options={[
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
      ]}
      placeholder={'How are you today?'}
    />
  );
};
