/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Badge } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    'div',
    {
      style: {
        display: 'flex',
        columnGap: 4,
        placeItems: 'center',
        flexWrap: 'wrap',
      },
    },
    React.createElement(Badge, null, 'Default'),
    React.createElement(Badge, { backgroundColor: 'primary' }, 'Informational'),
    React.createElement(Badge, { backgroundColor: 'positive' }, 'Positive'),
    React.createElement(Badge, { backgroundColor: 'warning' }, 'Warning'),
    React.createElement(Badge, { backgroundColor: 'negative' }, 'Negative'),
  );
};
