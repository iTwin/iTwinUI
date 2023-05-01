/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import {
  TransferList,
  TransferListProps,
  List,
  ListItem,
  IconButton,
} from '@itwin/itwinui-react';

import SvgChevronUp from '@itwin/itwinui-icons-react/cjs/icons/ChevronUp';
import SvgChevronDown from '@itwin/itwinui-icons-react/cjs/icons/ChevronDown';
import SvgChevronLeft from '@itwin/itwinui-icons-react/cjs/icons/ChevronLeft';
import SvgChevronRight from '@itwin/itwinui-icons-react/cjs/icons/ChevronRight';

export default {
  component: TransferList,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
  },
  title: 'Core/TransferList',
} as Meta<TransferListProps>;

export const Basic: Story<TransferListProps> = (args) => {
  return (
    <TransferList {...args}>
      <TransferList.Area>
        <List role={'listbox'}>
          <ListItem actionable>Item 1</ListItem>
          <ListItem actionable>Item 2</ListItem>
          <ListItem actionable>Item 3</ListItem>
          <ListItem actionable>Item 4</ListItem>
          <ListItem actionable>Item 5</ListItem>
          <ListItem actionable>Item 6</ListItem>
        </List>
      </TransferList.Area>
    </TransferList>
  );
};
Basic.args = {};

export const WithLabel: Story<TransferListProps> = (args) => {
  return (
    <TransferList {...args}>
      <TransferList.Area>
        <TransferList.Label>Options</TransferList.Label>
        <List role={'listbox'}>
          <ListItem actionable>Option 1</ListItem>
          <ListItem actionable>Option 2</ListItem>
          <ListItem actionable>Option 3</ListItem>
          <ListItem actionable>Option 4</ListItem>
          <ListItem actionable>Option 5</ListItem>
          <ListItem actionable>Option 6</ListItem>
        </List>
      </TransferList.Area>
    </TransferList>
  );
};
WithLabel.args = {};

export const WithToolbar: Story<TransferListProps> = (args) => {
  return (
    <TransferList {...args}>
      <TransferList.Area>
        <TransferList.Label>Options</TransferList.Label>
        <List role={'listbox'}>
          <ListItem actionable>Option 1</ListItem>
          <ListItem actionable>Option 2</ListItem>
          <ListItem actionable>Option 3</ListItem>
          <ListItem actionable>Option 4</ListItem>
          <ListItem actionable>Option 5</ListItem>
          <ListItem actionable>Option 6</ListItem>
        </List>
      </TransferList.Area>
      <TransferList.Toolbar>
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
      </TransferList.Toolbar>
      <TransferList.Area>
        <TransferList.Label>Applied</TransferList.Label>
        <List role={'listbox'}>
          <ListItem>Option 7</ListItem>
        </List>
      </TransferList.Area>
    </TransferList>
  );
};
WithToolbar.args = {};
