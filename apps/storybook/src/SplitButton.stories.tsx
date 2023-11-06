/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { MenuItem, SplitButton } from '@itwin/itwinui-react';
import type { StoryDefault } from '@ladle/react';

export default {
  title: 'Buttons/SplitButton',
  decorators: [
    (Story) => (
      <div style={{ minHeight: 150 }}>
        <Story />
      </div>
    ),
  ],
} satisfies StoryDefault;

export const Basic = () => {
  const onMenuItemClick = (index: number, close: () => void) => () => {
    console.log(`Item #${index} clicked!`);
    close();
  };

  const buttonMenuItems = (close: () => void) => [
    <MenuItem key={1} onClick={onMenuItemClick(1, close)}>
      Item #1
    </MenuItem>,
    <MenuItem key={2} onClick={onMenuItemClick(2, close)}>
      Item #2
    </MenuItem>,
    <MenuItem key={3} onClick={onMenuItemClick(3, close)}>
      Item #3
    </MenuItem>,
  ];

  return (
    <SplitButton
      onClick={() => console.log('Primary button clicked!')}
      menuItems={buttonMenuItems}
      styleType='default'
    >
      Default
    </SplitButton>
  );
};
