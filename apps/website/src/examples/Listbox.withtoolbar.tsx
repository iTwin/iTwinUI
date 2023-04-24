/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Listbox, List, ListItem, IconButton } from '@itwin/itwinui-react';
import {
  SvgChevronDown,
  SvgChevronUp,
  SvgChevronRight,
  SvgChevronLeft,
} from '@itwin/itwinui-icons-react';

export default () => {
  return (
    <Listbox style={{ width: 500 }}>
      <Listbox.Area>
        <Listbox.Label>Options</Listbox.Label>
        <List role={'listbox'}>
          <ListItem>Option 1</ListItem>
          <ListItem>Option 2</ListItem>
          <ListItem>Option 3</ListItem>
          <ListItem>Option 4</ListItem>
          <ListItem>Option 5</ListItem>
          <ListItem>Option 6</ListItem>
        </List>
      </Listbox.Area>
      <Listbox.Toolbar>
        <IconButton styleType={'borderless'}>
          <SvgChevronUp />
        </IconButton>
        <IconButton styleType={'borderless'}>
          <SvgChevronDown />
        </IconButton>
        <IconButton styleType={'borderless'}>
          <SvgChevronLeft />
        </IconButton>
        <IconButton styleType={'borderless'}>
          <SvgChevronRight />
        </IconButton>
      </Listbox.Toolbar>
      <Listbox.Area>
        <Listbox.Label>Applied</Listbox.Label>
        <List role={'listbox'}>
          <ListItem>Option 7</ListItem>
        </List>
      </Listbox.Area>
    </Listbox>
  );
};
