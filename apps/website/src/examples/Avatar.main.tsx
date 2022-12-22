/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { UserIconGroup, UserIcon } from '@itwin/itwinui-react';

export default () => {
  return (
    <UserIconGroup animated iconSize='medium'>
      <UserIcon abbreviation='TR' backgroundColor='#6AB9EC' title='Terry Rivers' />
      <UserIcon abbreviation='RM' backgroundColor='#C8C2B4' title='Robin Mercer' />
      <UserIcon abbreviation='MV' backgroundColor='#73C7C1' title='Morgan Vera' />
      <UserIcon abbreviation='JM' backgroundColor='#A3779F' title='Jean Mullins' />
      <UserIcon abbreviation='AM' backgroundColor='#73C7C1' title='Ashley Miles' />
    </UserIconGroup>
  );
};
