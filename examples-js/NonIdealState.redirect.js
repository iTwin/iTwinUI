/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { NonIdealState } from '@itwin/itwinui-react';
import { SvgRedirect } from '@itwin/itwinui-illustrations-react';
export default () => {
  return React.createElement(
    'div',
    { style: { position: 'relative', minHeight: 400 } },
    React.createElement(NonIdealState, {
      svg: React.createElement(SvgRedirect, null),
      heading: 'Redirect',
      description: React.createElement(
        React.Fragment,
        null,
        'Requested page has been moved permanently. Unable to fulfill request.',
      ),
    }),
  );
};
