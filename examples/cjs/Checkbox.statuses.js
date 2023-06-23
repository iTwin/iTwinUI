/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Checkbox, Flex } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    Flex,
    { flexDirection: 'column', alignItems: 'flex-start' },
    React.createElement(Checkbox, { label: 'Default' }),
    React.createElement(Checkbox, { label: 'Positive', status: 'positive' }),
    React.createElement(Checkbox, { label: 'Warning', status: 'warning' }),
    React.createElement(Checkbox, { label: 'Negative', status: 'negative' }),
  );
};
