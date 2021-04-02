/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Tooltip } from '../../src/core/Tooltip';
import { Position } from '../../src/utils/Positioner';
import { Story, Meta } from '@storybook/react';
import { TooltipProps } from '../../src/core/Tooltip/Tooltip';

export default {
  title: 'Core/Tooltip',
  component: Tooltip,
  argTypes: {
    content: {
      defaultValue: 'Here I am!',
    },
    children: {
      defaultValue: (
        <div
          style={{
            marginTop: 40,
            marginLeft: 100,
            width: 'fit-content',
          }}
        >
          Please, try to hover me!
        </div>
      ),
      control: { disable: true },
    },
    placement: {
      control: {
        type: 'select',
        options: Object.values(Position),
      },
    },
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    visible: { defaultValue: false },
  },
} as Meta<TooltipProps>;

export const Top: Story<TooltipProps> = (args) => {
  const { children, ...rest } = args;
  return <Tooltip {...rest}>{children}</Tooltip>;
};

Top.argTypes = {
  placement: {
    defaultValue: Position.TOP,
  },
};

export const Right: Story<TooltipProps> = (args) => {
  const { children, ...rest } = args;
  return <Tooltip {...rest}>{children}</Tooltip>;
};

Right.argTypes = {
  placement: {
    defaultValue: Position.RIGHT,
  },
};

export const Bottom: Story<TooltipProps> = (args) => {
  const { children, ...rest } = args;
  return <Tooltip {...rest}>{children}</Tooltip>;
};

Bottom.argTypes = {
  placement: {
    defaultValue: Position.BOTTOM,
  },
};

export const Left: Story<TooltipProps> = (args) => {
  const { children, ...rest } = args;
  return <Tooltip {...rest}>{children}</Tooltip>;
};

Left.argTypes = {
  placement: {
    defaultValue: Position.LEFT,
  },
};

export const Controlled: Story<TooltipProps> = (args) => {
  const { children, isVisible = true, ...rest } = args;
  return (
    <Tooltip isVisible={isVisible} {...rest}>
      {children}
    </Tooltip>
  );
};

Controlled.argTypes = {
  placement: {
    defaultValue: Position.LEFT,
  },
  visible: {
    defaultValue: true,
  },
  children: {
    defaultValue: (
      <div
        style={{
          marginTop: 40,
          marginLeft: 100,
          width: 'fit-content',
        }}
      >
        No need to hover me!
      </div>
    ),
  },
};
