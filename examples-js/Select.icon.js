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
  return React.createElement(Select, {
    options: [
      {
        value: 'happy',
        label: 'Happy',
        icon: React.createElement(SvgSmileyHappy, null),
      },
      {
        value: 'neutral',
        label: 'Neutral',
        icon: React.createElement(SvgSmileyNeutral, null),
      },
      {
        value: 'sad',
        label: 'Sad',
        icon: React.createElement(SvgSmileySad, null),
      },
    ],
    placeholder: 'How are you today?',
  });
};
