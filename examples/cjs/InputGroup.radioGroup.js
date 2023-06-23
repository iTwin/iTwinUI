/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { InputGroup, Radio } from '@itwin/itwinui-react';
import { SvgSmileyHappy, SvgSmileySad } from '@itwin/itwinui-icons-react';
export default () => {
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      InputGroup,
      { label: 'Radio group', message: 'Tell me how happy you are' },
      React.createElement(Radio, {
        name: 'choice',
        value: 'option1',
        label: React.createElement(SvgSmileyHappy, null),
      }),
      React.createElement(Radio, {
        name: 'choice',
        value: 'option2',
        label: React.createElement(SvgSmileySad, null),
      }),
    ),
  );
};
