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
      status: 'positive',
      inputProps: { placeholder: 'Positive search...' },
    }),
    React.createElement(SearchBox, {
      status: 'warning',
      inputProps: { placeholder: 'Warning search...' },
    }),
    React.createElement(SearchBox, {
      status: 'negative',
      inputProps: { placeholder: 'Negative search...' },
    }),
  );
};
