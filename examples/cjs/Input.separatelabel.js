/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Input, Label, Flex } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    Flex,
    null,
    React.createElement(
      Flex,
      {
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 'var(--iui-size-m)',
      },
      React.createElement(Label, { htmlFor: 'first-name' }, 'First name'),
      React.createElement(
        Label,
        { htmlFor: 'middle-initial' },
        'Middle initial',
      ),
      React.createElement(Label, { htmlFor: 'last-name' }, 'Last name'),
    ),
    React.createElement(
      Flex,
      { flexDirection: 'column', alignItems: 'flex-start' },
      React.createElement(Input, { id: 'first-name' }),
      React.createElement(Input, { id: 'middle-initial', maxlength: '1' }),
      React.createElement(Input, { id: 'last-name' }),
    ),
  );
};
