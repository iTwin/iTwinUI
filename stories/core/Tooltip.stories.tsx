/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Tooltip, TooltipProps } from '../../src/core';
import { Story, Meta } from '@storybook/react';
import { CreeveyMeta } from 'creevey';

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
      control: { disable: true },
    },
    visible: { control: { type: 'boolean' } },
    className: { control: { disable: true } },
    style: { control: { disable: true } },
  },
  parameters: {
    creevey: {
      captureElement: null,
      skip: { stories: 'Controlled' },
      tests: {
        async hover() {
          const text = await this.browser.findElement({
            css: '#tooltip-target',
          });
          await this.browser.actions().move({ origin: text }).perform();
          await this.expect(await this.takeScreenshot()).to.matchImage(
            'hovered',
          );
        },
      },
    },
  },
} as Meta<TooltipProps> & CreeveyMeta;

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
