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
        justifyContent: 'center',
        margin: '10px',
      },
    },
    React.createElement(Badge, { backgroundColor: 'skyblue' }, 'Skyblue'),
    React.createElement(Badge, { backgroundColor: 'celery' }, 'Celery'),
    React.createElement(Badge, { backgroundColor: 'froly' }, 'Froly'),
    React.createElement(Badge, { backgroundColor: 'steelblue' }, 'Steelblue'),
    React.createElement(Badge, { backgroundColor: 'sunglow' }, 'Sunglow'),
    React.createElement(
      Badge,
      { backgroundColor: 'seabuckthorn' },
      'Seabuckthorn',
    ),
    React.createElement(Badge, { backgroundColor: 'montecarlo' }, 'Montecarlo'),
    React.createElement(Badge, { backgroundColor: 'poloblue' }, 'Poloblue'),
    React.createElement(Badge, { backgroundColor: 'bouquet' }, 'Bouquet'),
    React.createElement(Badge, { backgroundColor: 'ash' }, 'Ash'),
    React.createElement(Badge, { backgroundColor: 'oak' }, 'Oak'),
  );
};
