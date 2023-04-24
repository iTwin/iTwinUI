/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import {
  Listbox,
  ListboxProps,
  List,
  ListItem,
  IconButton,
} from '@itwin/itwinui-react';

import SvgChevronUp from '@itwin/itwinui-icons-react/cjs/icons/ChevronUp';
import SvgChevronDown from '@itwin/itwinui-icons-react/cjs/icons/ChevronDown';
import SvgChevronLeft from '@itwin/itwinui-icons-react/cjs/icons/ChevronLeft';
import SvgChevronRight from '@itwin/itwinui-icons-react/cjs/icons/ChevronRight';

export default {
  component: Listbox,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
  },
  title: 'Core/Listbox',
} as Meta<ListboxProps>;

export const Basic: Story<ListboxProps> = (args) => {
  return (
    <Listbox {...args}>
      <Listbox.Area>
        <List role={'listbox'}>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
          <ListItem>Item 4</ListItem>
          <ListItem>Item 5</ListItem>
          <ListItem>Item 6</ListItem>
        </List>
      </Listbox.Area>
    </Listbox>
  );
};
Basic.args = {};

export const WithLabel: Story<ListboxProps> = (args) => {
  return (
    <Listbox {...args}>
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
    </Listbox>
  );
};
WithLabel.args = {};

export const WithToolbar: Story<ListboxProps> = (args) => {
  return (
    <Listbox {...args}>
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
WithToolbar.args = {};
