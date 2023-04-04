/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import { List, ListItem, ListItemProps } from '@itwin/itwinui-react';
import { SvgCheckmark, SvgPlaceholder } from '@itwin/itwinui-icons-react';

export default {
  component: List,
  title: 'Core/List',
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 'clamp(300px, 50%, 100%)' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    active: { type: 'boolean' },
    actionable: { type: 'boolean' },
    focused: { type: 'boolean' },
    disabled: { type: 'boolean' },
    size: {
      options: ['large'],
      control: { type: 'select' },
    },
  },
} as Meta<ListItemProps>;

export const Basic: Story<ListItemProps> = (args) => {
  return (
    <>
      <List>
        <ListItem {...args}>Item 1</ListItem>
        <ListItem {...args}>Item 2</ListItem>
        <ListItem {...args} size='large'>
          <ListItem.Content>
            <div>Item 3</div>
            <ListItem.Description>
              this is some additional information 👀
            </ListItem.Description>
          </ListItem.Content>
        </ListItem>
      </List>
    </>
  );
};
Basic.args = {};

export const WithIcon: Story<ListItemProps> = (args) => {
  return (
    <List>
      <ListItem {...args}>
        <ListItem.Icon aria-hidden>
          <SvgPlaceholder />
        </ListItem.Icon>
        <ListItem.Content>Item 1</ListItem.Content>
      </ListItem>
      <ListItem {...args}>
        <ListItem.Icon aria-hidden>
          <SvgPlaceholder />
        </ListItem.Icon>
        <ListItem.Content>Item 2</ListItem.Content>
        <ListItem.Icon aria-hidden>
          <SvgCheckmark />
        </ListItem.Icon>
      </ListItem>
      <ListItem {...args}>
        <ListItem.Icon aria-hidden>
          <SvgPlaceholder />
        </ListItem.Icon>
        <ListItem.Content>Item 3</ListItem.Content>
      </ListItem>
    </List>
  );
};
WithIcon.args = {};

export const Actionable: Story<ListItemProps> = (args) => {
  return (
    <List>
      <ListItem {...args}>Item 1</ListItem>
      <ListItem {...args} active>
        <ListItem.Content>Item 2</ListItem.Content>
        <ListItem.Icon aria-hidden>
          <SvgCheckmark />
        </ListItem.Icon>
      </ListItem>
      <ListItem {...args} disabled>
        Item 3
      </ListItem>
    </List>
  );
};
Actionable.args = {
  actionable: true,
};
