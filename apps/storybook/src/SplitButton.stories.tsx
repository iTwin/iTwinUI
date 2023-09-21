/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { action } from '@storybook/addon-actions';
import { MenuItem, SplitButton } from '@itwin/itwinui-react';

export default {
  title: 'Buttons/SplitButton',
  component: SplitButton,
  parameters: {
    docs: {
      source: { excludeDecorators: true },
    },
  },
  decorators: [(Story) => <div style={{ minHeight: 150 }}>{Story()}</div>],
};

export const Basic = () => {
  const onMenuItemClick = (index: number, close: () => void) => () => {
    action(`Item #${index} clicked!`)();
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
      onClick={action('Primary button clicked!')}
      menuItems={buttonMenuItems}
      styleType='default'
    >
      Default
    </SplitButton>
  );
};
