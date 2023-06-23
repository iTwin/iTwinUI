/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { NonIdealState } from '@itwin/itwinui-react';
import { Svg500 } from '@itwin/itwinui-illustrations-react';
export default () => {
  return React.createElement(
    'div',
    { style: { position: 'relative', minHeight: 400 } },
    React.createElement(NonIdealState, {
      svg: React.createElement(Svg500, null),
      heading: 'Internal Server Error',
      description: React.createElement(
        React.Fragment,
        null,
        'Please retry again. If this continues to happen, please contact our support team.',
      ),
    }),
  );
};
