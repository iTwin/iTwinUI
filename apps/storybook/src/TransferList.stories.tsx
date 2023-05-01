/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import {
  TransferList,
  TransferListProps,
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
        <TransferList.List role={'listbox'}>
          <TransferList.ListItem actionable>Item 1</TransferList.ListItem>
          <TransferList.ListItem actionable>Item 2</TransferList.ListItem>
          <TransferList.ListItem actionable>Item 3</TransferList.ListItem>
          <TransferList.ListItem actionable>Item 4</TransferList.ListItem>
          <TransferList.ListItem actionable>Item 5</TransferList.ListItem>
          <TransferList.ListItem actionable>Item 6</TransferList.ListItem>
        </TransferList.List>
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
        <TransferList.List role={'listbox'}>
          <TransferList.ListItem actionable>Option 1</TransferList.ListItem>
          <TransferList.ListItem actionable>Option 2</TransferList.ListItem>
          <TransferList.ListItem actionable>Option 3</TransferList.ListItem>
          <TransferList.ListItem actionable>Option 4</TransferList.ListItem>
          <TransferList.ListItem actionable>Option 5</TransferList.ListItem>
          <TransferList.ListItem actionable>Option 6</TransferList.ListItem>
        </TransferList.List>
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
        <TransferList.List role={'listbox'}>
          <TransferList.ListItem actionable>Item 1</TransferList.ListItem>
          <TransferList.ListItem actionable>Item 2</TransferList.ListItem>
          <TransferList.ListItem actionable>Item 3</TransferList.ListItem>
          <TransferList.ListItem actionable>Item 4</TransferList.ListItem>
          <TransferList.ListItem actionable>Item 5</TransferList.ListItem>
          <TransferList.ListItem actionable>Item 6</TransferList.ListItem>
        </TransferList.List>
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
        <TransferList.List role={'listbox'}>
          <TransferList.ListItem>Option 7</TransferList.ListItem>
        </TransferList.List>
      </TransferList.Area>
    </TransferList>
  );
};
WithToolbar.args = {};
