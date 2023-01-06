/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Avatar, getUserColor } from '@itwin/itwinui-react';
import { SvgBentleySystems } from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Avatar
      abbreviation='BS'
      backgroundColor={getUserColor('Bentley Systems')}
      image={<SvgBentleySystems className='iui-icon' aria-hidden='true' />}
      size='x-large'
      title='Bentley Systems'
    />
  );
};
