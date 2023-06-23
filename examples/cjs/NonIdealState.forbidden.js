/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { NonIdealState } from '@itwin/itwinui-react';
import { Svg403 } from '@itwin/itwinui-illustrations-react';
export default () => {
  return React.createElement(
    'div',
    { style: { position: 'relative', minHeight: 403 } },
    React.createElement(NonIdealState, {
      svg: React.createElement(Svg403, null),
      heading: 'Forbidden',
      description: React.createElement(
        React.Fragment,
        null,
        'Forbidden You do not have permission to access this server. Unable to fulfill request.',
      ),
    }),
  );
};
