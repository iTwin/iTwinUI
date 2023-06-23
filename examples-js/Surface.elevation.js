/*---------------------------------------------------------------------------------------------

* Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Surface, Flex } from '@itwin/itwinui-react';
export default () => {
  const cardStyle = {
    display: 'flex',
    width: '100px',
    padding: '12px',
    justifyContent: 'center',
    textAlign: 'center',
    flex: '1',
  };
  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      Flex,
      { gap: '2xl' },
      React.createElement(
        Surface,
        { elevation: 0, style: cardStyle },
        React.createElement('p', null, 'Elevation 0 (0dp)'),
      ),
      React.createElement(
        Surface,
        { elevation: 1, style: cardStyle },
        React.createElement('p', null, 'Elevation 1 (2dp)'),
      ),
      React.createElement(
        Surface,
        { elevation: 2, style: cardStyle },
        React.createElement('p', null, 'Elevation 2 (4dp)'),
      ),
    ),
    React.createElement(
      Flex,
      { gap: '2xl' },
      React.createElement(
        Surface,
        { elevation: 3, style: cardStyle },
        React.createElement('p', null, 'Elevation 3 (8dp)'),
      ),
      React.createElement(
        Surface,
        { elevation: 4, style: cardStyle },
        React.createElement('p', null, 'Elevation 4 (16dp)'),
      ),
      React.createElement(
        Surface,
        { elevation: 5, style: cardStyle },
        React.createElement('p', null, 'Elevation 5 (24dp)'),
      ),
    ),
  );
};
