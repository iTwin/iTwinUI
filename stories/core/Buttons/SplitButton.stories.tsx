/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react';
import { MenuItem, SplitButton, SplitButtonProps } from '../../../src/core';
import { CreeveyMeta } from 'creevey';

export default {
  title: 'Buttons/SplitButton',
  component: SplitButton,
  argTypes: {
    style: { control: { disable: true } },
    className: { control: { disable: true } },
  },
  parameters: {
    creevey: {
      captureElement: null,
      tests: {
        async open() {
          const button = await this.browser.findElement({
            css: '.iui-button:last-child',
          });
          const closed = await this.takeScreenshot();

          await button.sendKeys(' ');
          const opened = await this.takeScreenshot();
          await this.expect({ closed, opened }).to.matchImages();
        },
      },
    },
  },
} as Meta<SplitButtonProps> & CreeveyMeta;

export const Basic: Story<SplitButtonProps> = (args) => {
  const { onClick, menuItems, children, ...rest } = args;
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
      onClick={onClick || action('Primary button clicked!')}
      menuItems={menuItems || buttonMenuItems}
      styleType='default'
      {...rest}
    >
      {children}
    </SplitButton>
  );
};

Basic.args = {
  children: 'Default',
  styleType: 'default',
};
