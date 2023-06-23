/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { NonIdealState } from '@itwin/itwinui-react';
import { Svg404 } from '@itwin/itwinui-illustrations-react';
export default () => {
  return React.createElement(
    'div',
    { style: { position: 'relative', minHeight: 400 } },
    React.createElement(NonIdealState, {
      svg: React.createElement(Svg404, null),
      heading: 'Page not found',
      description: React.createElement(
        React.Fragment,
        null,
        'We can not find the iModel that you are looking for or it does not exist.',
      ),
    }),
  );
};
