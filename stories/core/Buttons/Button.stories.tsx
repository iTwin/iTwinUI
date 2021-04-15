/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react';
import Button, { ButtonProps } from '../../../src/core/Buttons/Button/Button';
import SvgAdd from '@itwin/itwinui-icons-react/cjs/icons/Add';

export default {
  title: 'Buttons/Button',
  component: Button,
  argTypes: {
    onClick: { control: { disable: true } },
    startIcon: { control: { disable: true } },
    endIcon: { control: { disable: true } },
    style: { control: { disable: true } },
    className: { control: { disable: true } },
    type: { control: { disable: true } },
  },
} as Meta<ButtonProps>;

export const CallToAction: Story<ButtonProps> = (args) => {
  return (
    <Button onClick={action('clicked')} styleType='cta' {...args}>
      {args.children}
    </Button>
  );
};

CallToAction.args = {
  children: 'Call To Action Button',
  styleType: 'cta',
};

export const HighVisibility: Story<ButtonProps> = (args) => {
  return (
    <Button onClick={action('clicked')} styleType='high-visibility' {...args}>
      {args.children}
    </Button>
  );
};

HighVisibility.args = {
  children: 'High Visibility Button',
  styleType: 'high-visibility',
};

export const Default: Story<ButtonProps> = (args) => {
  return (
    <Button onClick={action('clicked')} styleType='default' {...args}>
      {args.children}
    </Button>
  );
};

Default.args = {
  children: 'Default Button',
  styleType: 'default',
};

export const WithIcon: Story<ButtonProps> = (args) => {
  return (
    <Button
      onClick={action('clicked')}
      startIcon={<SvgAdd />}
      styleType='high-visibility'
      {...args}
    >
      {args.children}
    </Button>
  );
};

WithIcon.argTypes = {
  children: { control: { disable: true } },
};

WithIcon.args = {
  children: 'New',
  styleType: 'high-visibility',
  startIcon: <SvgAdd />,
};
