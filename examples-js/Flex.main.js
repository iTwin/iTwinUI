/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Flex } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    Flex,
    null,
    React.createElement(MyItem, null, '1'),
    React.createElement(MyItem, null, '2'),
    React.createElement(MyItem, null, '3'),
  );
};
const MyItem = ({ children = '' }) =>
  React.createElement(
    'div',
    { style: { padding: '1rem', border: '1px solid' } },
    children,
  );
