/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react';
import IconButton, {
  IconButtonProps,
} from '../../../src/core/Buttons/IconButton/IconButton';
import SvgAdd from '@itwin/itwinui-icons-react/cjs/icons/Add';

export default {
  title: 'Buttons/IconButton',
  component: IconButton,
  argTypes: {
    onClick: { control: { disable: true } },
    styleType: {
      control: 'select',
    },
  },
} as Meta<IconButtonProps>;

export const Add: Story<IconButtonProps> = (args) => {
  return (
    <IconButton onClick={action('clicked')} {...args}>
      <SvgAdd />
    </IconButton>
  );
};

Add.args = {
  isActive: false,
};

export const SmallActiveAdd: Story<IconButtonProps> = (args) => {
  return (
    <IconButton onClick={action('clicked')} isActive {...args}>
      <SvgAdd />
    </IconButton>
  );
};

SmallActiveAdd.args = {
  size: 'small',
  isActive: true,
};

export const HighVisibilityAdd: Story<IconButtonProps> = (args) => {
  return (
    <IconButton onClick={action('clicked')} {...args}>
      <SvgAdd />
    </IconButton>
  );
};

HighVisibilityAdd.args = {
  isActive: false,
  styleType: 'high-visibility',
};

export const Borderless: Story<IconButtonProps> = ({ styleType, ...rest }) => {
  return (
    <IconButton styleType={styleType} onClick={action('clicked')} {...rest}>
      <SvgAdd />
    </IconButton>
  );
};

Borderless.args = { styleType: 'borderless' };
