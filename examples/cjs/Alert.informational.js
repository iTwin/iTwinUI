/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Alert } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    Alert,
    { type: 'informational', style: { minWidth: 'min(100%, 350px)' } },
    React.createElement(Alert.Icon, null),
    React.createElement(
      Alert.Message,
      null,
      'This is an informational alert',
      React.createElement(
        Alert.Action,
        { onClick: () => console.log('Clicked more info!') },
        'Learn more',
      ),
    ),
    React.createElement(Alert.CloseButton, {
      onClick: () => console.log('CLOSED'),
    }),
  );
};
