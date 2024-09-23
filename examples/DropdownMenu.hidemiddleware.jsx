/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Surface,
  List,
  ListItem,
  DropdownMenu,
  IconButton,
  MenuItem,
} from '@itwin/itwinui-react';
import { SvgMore } from '@itwin/itwinui-icons-react';

export default () => {
  const dropdownMenuItems = (close) => [
    <MenuItem key={1} onClick={() => close()}>
      Option #1
    </MenuItem>,
    <MenuItem key={2} onClick={() => close()}>
      Option #2
    </MenuItem>,
    <MenuItem key={3} onClick={() => close()} disabled>
      Option #3
    </MenuItem>,
  ];

  const items = new Array(30).fill(0);

  return (
    <Surface className='demo-container'>
      <Surface.Body as={List} className='list'>
        {items.map((_, i) => (
          <ListItem key={i}>
            <ListItem.Content>Item {i}</ListItem.Content>
            <DropdownMenu menuItems={dropdownMenuItems}>
              <IconButton
                styleType='borderless'
                label='More options'
                size='small'
              >
                <SvgMore />
              </IconButton>
            </DropdownMenu>
          </ListItem>
        ))}
      </Surface.Body>
    </Surface>
  );
};
