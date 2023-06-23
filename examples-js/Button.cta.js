/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button, Flex } from '@itwin/itwinui-react';
import { SvgAdd, SvgCheckmarkSmall } from '@itwin/itwinui-icons-react';
export default () => {
  return React.createElement(
    Flex,
    null,
    React.createElement(Button, { styleType: 'cta' }, 'Default'),
    React.createElement(
      Button,
      { styleType: 'cta', disabled: true },
      'Disabled',
    ),
    React.createElement(
      Button,
      { styleType: 'cta', startIcon: React.createElement(SvgAdd, null) },
      'With startIcon',
    ),
    React.createElement(
      Button,
      {
        styleType: 'cta',
        endIcon: React.createElement(SvgCheckmarkSmall, null),
      },
      'With endIcon',
    ),
  );
};
