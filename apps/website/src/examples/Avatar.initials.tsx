/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Avatar, getUserColor } from '@itwin/itwinui-react';

export default () => {
  return (
    <Avatar
      abbreviation='TR'
      backgroundColor={getUserColor('Terry Rivers')}
      size='x-large'
      title='Terry Rivers'
    />
  );
};
