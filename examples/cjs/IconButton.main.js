/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { IconButton, Flex } from '@itwin/itwinui-react';
import { SvgAdd, SvgClose } from '@itwin/itwinui-icons-react';
export default () => {
  return React.createElement(
    Flex,
    null,
    React.createElement(IconButton, null, React.createElement(SvgAdd, null)),
    React.createElement(
      IconButton,
      { styleType: 'borderless' },
      React.createElement(SvgClose, null),
    ),
  );
};
