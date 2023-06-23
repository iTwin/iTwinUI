/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Breadcrumbs } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    Breadcrumbs,
    null,
    React.createElement('a', { href: '#' }, 'Home'),
    React.createElement('a', { href: '#' }, 'Support'),
    React.createElement('span', null, 'Contact us'),
  );
};
