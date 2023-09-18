/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Meta } from '@storybook/react';
import React from 'react';
import { Badge } from '@itwin/itwinui-react';

type BadgeProps = React.ComponentProps<typeof Badge>;

export default {
  component: Badge,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    id: { control: { disable: true } },
    title: { control: { disable: true } },
  },
  title: 'Core/Badge',
} as Meta<BadgeProps>;

export const Basic = () => {
  return <Badge backgroundColor='skyblue'>Label</Badge>;
};

export const LongLabel = () => {
  return (
    <Badge backgroundColor='skyblue' title='Long label that gets truncated'>
      Long label that gets truncated
    </Badge>
  );
};

export const Statuses = () => {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <Badge backgroundColor='positive'>Success</Badge>
      <Badge backgroundColor='negative'>Error</Badge>
      <Badge backgroundColor='primary'>Informational</Badge>
      <Badge backgroundColor='warning'>Warning</Badge>
    </div>
  );
};
