import React from 'react';
import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react';
import Button, { ButtonProps } from '../../../src/core/Buttons/Button/Button';
import { SvgAdd } from '@bentley/icons-generic-react';

export default {
  title: 'Buttons/Button',
  component: Button,
  parameters: {
    docs: { description: { component: 'Generic button component' } },
  },
  argTypes: {
    onClick: { table: { disable: true } },
    style: { table: { disable: true } },
    className: { table: { disable: true } },
    type: { table: { disable: true } },
  },
} as Meta<React.PropsWithChildren<ButtonProps>>;

export const CallToAction: Story<React.PropsWithChildren<ButtonProps>> = (
  args,
) => {
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

export const HighVisibility: Story<React.PropsWithChildren<ButtonProps>> = (
  args,
) => {
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

export const Default: Story<React.PropsWithChildren<ButtonProps>> = (args) => {
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

export const WithIcon: Story<React.PropsWithChildren<ButtonProps>> = (args) => {
  return (
    <Button onClick={action('clicked')} styleType='high-visibility' {...args}>
      <div>
        <SvgAdd className='iui-buttons-icon' />
        New
      </div>
    </Button>
  );
};

WithIcon.argTypes = {
  children: { table: { disable: true } },
};

WithIcon.args = {
  styleType: 'high-visibility',
};
