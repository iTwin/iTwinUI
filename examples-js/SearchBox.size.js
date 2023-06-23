/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SearchBox, Flex } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    Flex,
    { style: { width: '70%' }, flexDirection: 'column' },
    React.createElement(SearchBox, {
      size: 'small',
      inputProps: { placeholder: 'Small search...' },
    }),
    React.createElement(SearchBox, {
      inputProps: { placeholder: 'Default search...' },
    }),
    React.createElement(SearchBox, {
      size: 'large',
      inputProps: { placeholder: 'Large search...' },
    }),
  );
};
