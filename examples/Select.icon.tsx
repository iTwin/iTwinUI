/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { LabeledSelect } from '@itwin/itwinui-react';
import {
  SvgSmileyHappy,
  SvgSmileySad,
  SvgSmileyNeutral,
} from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <LabeledSelect
      label={'Choose feeling'}
      options={[
        {
          value: 'happy',
          label: 'Happy',
          startIcon: <SvgSmileyHappy />,
        },
        {
          value: 'neutral',
          label: 'Neutral',
          startIcon: <SvgSmileyNeutral />,
        },
        {
          value: 'sad',
          label: 'Sad',
          startIcon: <SvgSmileySad />,
        },
      ]}
      placeholder={'How are you today?'}
    />
  );
};
