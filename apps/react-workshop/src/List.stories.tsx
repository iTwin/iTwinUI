/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { List, ListItem } from '@itwin/itwinui-react';
import { SvgCheckmark, SvgPlaceholder } from '@itwin/itwinui-icons-react';
import type { StoryDefault } from '@ladle/react';

export default {
  title: 'List',
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 'clamp(300px, 50%, 100%)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies StoryDefault;

export const Basic = () => {
  return (
    <>
      <List>
        <ListItem>Item 1</ListItem>
        <ListItem>Item 2</ListItem>
        <ListItem size='large'>
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

export const WithIcon = () => {
  return (
    <List>
      <ListItem>
        <ListItem.Icon aria-hidden>
          <SvgPlaceholder />
        </ListItem.Icon>
        <ListItem.Content>Item 1</ListItem.Content>
      </ListItem>
      <ListItem>
        <ListItem.Icon aria-hidden>
          <SvgPlaceholder />
        </ListItem.Icon>
        <ListItem.Content>Item 2</ListItem.Content>
        <ListItem.Icon aria-hidden>
          <SvgCheckmark />
        </ListItem.Icon>
      </ListItem>
      <ListItem>
        <ListItem.Icon aria-hidden>
          <SvgPlaceholder />
        </ListItem.Icon>
        <ListItem.Content>Item 3</ListItem.Content>
      </ListItem>
    </List>
  );
};

export const Actionable = () => {
  return (
    <List>
      <ListItem actionable>Item 1</ListItem>
      <ListItem actionable active>
        <ListItem.Content>Item 2</ListItem.Content>
        <ListItem.Icon aria-hidden>
          <SvgCheckmark />
        </ListItem.Icon>
      </ListItem>
      <ListItem actionable disabled>
        Item 3
      </ListItem>
    </List>
  );
};
