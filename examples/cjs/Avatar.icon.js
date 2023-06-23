/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Avatar, getUserColor } from '@itwin/itwinui-react';
import { SvgUser } from '@itwin/itwinui-icons-react';
export default () => {
  return React.createElement(Avatar, {
    abbreviation: 'AU',
    backgroundColor: getUserColor('Anonymous user'),
    image: React.createElement(SvgUser, { 'aria-hidden': 'true' }),
    size: 'x-large',
    title: 'Anonymous user',
  });
};
