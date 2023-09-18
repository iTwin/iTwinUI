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
  const labelId = React.useId();

  return (
    <LabeledSelect
      label={'Choose feeling'}
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
