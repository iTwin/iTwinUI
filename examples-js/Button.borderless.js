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
    React.createElement(Button, { styleType: 'borderless' }, 'Default'),
    React.createElement(
      Button,
      { styleType: 'borderless', disabled: true },
      'Disabled',
    ),
    React.createElement(
      Button,
      { styleType: 'borderless', startIcon: React.createElement(SvgAdd, null) },
      'With startIcon',
    ),
    React.createElement(
      Button,
      {
        styleType: 'borderless',
        endIcon: React.createElement(SvgCheckmarkSmall, null),
      },
      'With endIcon',
    ),
  );
};
