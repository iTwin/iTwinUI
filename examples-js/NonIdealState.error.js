/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { NonIdealState } from '@itwin/itwinui-react';
import { SvgError } from '@itwin/itwinui-illustrations-react';
export default () => {
  return React.createElement(
    'div',
    { style: { position: 'relative', minHeight: 400 } },
    React.createElement(NonIdealState, {
      svg: React.createElement(SvgError, null),
      heading: 'Error',
      description: React.createElement(
        React.Fragment,
        null,
        "We can't find the iModel that you are looking for or it does not exist.",
      ),
    }),
  );
};
