/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Tooltip, TooltipProps } from '@itwin/itwinui-react';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Core/Tooltip',
  component: Tooltip,
  args: {
    content: 'Here I am!',
    children: (
      <div
        id='tooltip-target'
        style={{
          marginTop: 40,
          marginLeft: 100,
          width: 'fit-content',
        }}
      >
        Please, try to hover me!
      </div>
    ),
  },
  argTypes: {
    children: { control: { disable: true } },
    visible: { control: { type: 'boolean' } },
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    id: { control: { disable: true } },
  },
} as Meta<TooltipProps>;

export const Top: Story<TooltipProps> = (args) => {
  const { children, placement, ...rest } = args;
  return (
    <Tooltip placement={placement} {...rest}>
      {children}
    </Tooltip>
  );
};

Top.args = { placement: 'top' };

export const Right: Story<TooltipProps> = (args) => {
  const { children, placement, ...rest } = args;
  return (
    <Tooltip placement={placement} {...rest}>
      {children}
    </Tooltip>
  );
};

Right.args = { placement: 'right' };

export const Bottom: Story<TooltipProps> = (args) => {
  const { children, placement, ...rest } = args;
  return (
    <Tooltip placement={placement} {...rest}>
      {children}
    </Tooltip>
  );
};

Bottom.args = { placement: 'bottom' };

export const Left: Story<TooltipProps> = (args) => {
  const { children, placement, ...rest } = args;
  return (
    <Tooltip placement={placement} {...rest}>
      {children}
    </Tooltip>
  );
};

Left.args = { placement: 'left' };

export const Controlled: Story<TooltipProps> = (args) => {
  const { visible = true, ...rest } = args;
  return (
    <Tooltip visible={visible} {...rest}>
      <div
        style={{
          marginTop: 40,
          marginLeft: 100,
          width: 'fit-content',
        }}
      >
        No need to hover me
      </div>
    </Tooltip>
  );
};

Controlled.args = {
  placement: 'left',
  visible: true,
};
