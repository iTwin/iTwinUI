/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Avatar, getUserColor } from '@itwin/itwinui-react';

export default () => {
  return (
    <Avatar
      abbreviation='GB'
      backgroundColor={getUserColor('Greg Bentley')}
      image={<img src='https://www.bentley.com/wp-content/uploads/greg-bentley-hr-profile.jpeg' />}
      size='x-large'
      title='Greg Bentley'
    />
  );
};
