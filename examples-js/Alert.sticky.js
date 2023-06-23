/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Alert } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    'div',
    null,
    React.createElement(
      Alert,
      { isSticky: true },
      React.createElement(Alert.Icon, null),
      React.createElement(
        Alert.Message,
        null,
        'This is a sticky alert',
        React.createElement(
          Alert.Action,
          { onClick: () => console.log('Clicked more info!') },
          'Learn more',
        ),
      ),
      React.createElement(Alert.CloseButton, {
        onClick: () => console.log('CLOSED'),
      }),
    ),
    React.createElement('p', null, 'Page content.'),
  );
};
