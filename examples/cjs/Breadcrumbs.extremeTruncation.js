/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Breadcrumbs,
  Button,
  MiddleTextTruncation,
} from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    'div',
    {
      style: {
        width: '75%',
        minWidth: 150,
        maxWidth: 425,
        border: '1px solid pink',
        padding: 8,
      },
    },
    React.createElement(
      Breadcrumbs,
      null,
      React.createElement(
        Button,
        { style: { maxWidth: 90 } },
        React.createElement(MiddleTextTruncation, {
          text: 'Root',
          endCharsCount: 7,
        }),
      ),
      React.createElement(
        Button,
        { style: { maxWidth: 90 } },
        React.createElement(MiddleTextTruncation, {
          text: 'My files',
          endCharsCount: 7,
        }),
      ),
      React.createElement(
        Button,
        { style: { maxWidth: 90 } },
        React.createElement(MiddleTextTruncation, {
          text: 'Documents',
          endCharsCount: 7,
        }),
      ),
      React.createElement(
        Button,
        { style: { maxWidth: 90 } },
        React.createElement(MiddleTextTruncation, {
          text: 'Status reports',
          endCharsCount: 7,
        }),
      ),
      React.createElement(
        Button,
        { style: { maxWidth: 90 } },
        React.createElement(MiddleTextTruncation, {
          text: 'December',
          endCharsCount: 7,
        }),
      ),
    ),
  );
};
