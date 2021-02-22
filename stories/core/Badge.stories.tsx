// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { Story, Meta } from '@storybook/react';
import React from 'react';
import { Badge, BadgeProps } from '../../src/core';

export default {
  component: Badge,
  argTypes: {
    className: { table: { disable: true } },
    style: { table: { disable: true } },
    backgroundColor: { control: 'color' },
  },
  title: 'Core/Badge',
} as Meta<BadgeProps>;

export const Basic: Story<BadgeProps> = ({ backgroundColor, children }) => {
  return <Badge backgroundColor={backgroundColor}>{children}</Badge>;
};

Basic.args = {
  backgroundColor: '#6AB9EC',
  children: 'Label',
};

export const LongLabel: Story<BadgeProps> = ({
  backgroundColor,
  title,
  children,
}) => {
  return (
    <Badge backgroundColor={backgroundColor} title={title}>
      {children}
    </Badge>
  );
};

LongLabel.args = {
  backgroundColor: 'steelblue',
  children: 'Long label that gets truncated',
  title: 'Long label that gets truncated',
};
