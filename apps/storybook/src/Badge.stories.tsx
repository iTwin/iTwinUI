/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import { Badge, BadgeProps } from '@itwin/itwinui-react';
import { SoftBackgrounds } from '@itwin/itwinui-react/esm/core/utils';

export default {
  component: Badge,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    id: { control: { disable: true } },
    title: { control: { disable: true } },
    backgroundColor: {
      options: [
        'primary',
        'positive',
        'negative',
        'warning',
        ...Object.keys(SoftBackgrounds),
      ],
    },
  },
  title: 'Core/Badge',
} as Meta<BadgeProps>;

export const Basic: Story<BadgeProps> = ({ backgroundColor, children }) => {
  return <Badge backgroundColor={backgroundColor}>{children}</Badge>;
};

Basic.args = {
  backgroundColor: 'skyblue',
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
  backgroundColor: 'skyblue',
  children: 'Long label that gets truncated',
  title: 'Long label that gets truncated',
};

export const Statuses: Story<BadgeProps> = () => {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Badge backgroundColor='positive'>Success</Badge>
      <Badge backgroundColor='negative'>Error</Badge>
      <Badge backgroundColor='primary'>Informational</Badge>
      <Badge backgroundColor='warning'>Warning</Badge>
    </div>
  );
};

Statuses.parameters = {
  controls: { hideNoControlsWarning: true },
};
