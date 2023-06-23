/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { NonIdealState } from '@itwin/itwinui-react';
import { Svg503 } from '@itwin/itwinui-illustrations-react';
export default () => {
  return React.createElement(
    'div',
    { style: { position: 'relative', minHeight: 400 } },
    React.createElement(NonIdealState, {
      svg: React.createElement(Svg503, null),
      heading: 'Service Unavailable',
      description: React.createElement(
        React.Fragment,
        null,
        'This service is being worked on. Please come back in a little bit.',
      ),
    }),
  );
};
