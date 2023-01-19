/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import { Flex, FlexProps } from '@itwin/itwinui-react';

export default {
  component: Flex,
  title: 'Utilities/Flex',
  argTypes: {
    display: {
      control: 'radio',
      options: ['flex', 'inline-flex'],
    },
    gap: {
      control: 'radio',
      defaultValue: '2xs',
      options: ['3xs', '2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl'],
    },
    flexDirection: {
      control: 'radio',
      options: ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    alignItems: {
      control: 'radio',
      defaultValue: 'center',
      options: [
        'normal',
        'flex-start',
        'flex-end',
        'center',
        'baseline',
        'space-between',
        'space-around',
        'space-evenly',
        'stretch',
      ],
    },
    justifyContent: {
      control: 'radio',
      options: [
        'normal',
        'flex-start',
        'flex-end',
        'center',
        'baseline',
        'space-between',
        'space-around',
        'space-evenly',
        'stretch',
      ],
    },
    flexWrap: {
      control: 'radio',
      options: ['wrap', 'nowrap'],
    },
  },
  decorators: [
    (Story) => (
      <div className='demo-flex-wrapper'>
        <style
          dangerouslySetInnerHTML={{
            __html:
              `:where(.demo-flex-wrapper :not([class*='iui'])) {` +
              ` font-family: var(--iui-font-sans);` +
              ` color: var(--iui-color-text);` +
              ` padding: 1rem;` +
              ` border: 1px solid;` +
              `}`,
          }}
        />
        <Story />
      </div>
    ),
  ],
} as Meta<FlexProps>;

export const Basic: Story<FlexProps> = (args) => {
  return (
    <Flex {...args}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Flex>
  );
};

export const WithSpacer: Story<FlexProps> = (args) => {
  return (
    <Flex {...args}>
      <div>1</div>
      <div>2</div>

      <Flex.Spacer />

      <div>3</div>
      <div>4</div>
      <div>5</div>
    </Flex>
  );
};

export const WithFlexItem: Story<FlexProps> = (args) => {
  return (
    <Flex {...args}>
      <Flex.Item flex='1'>
        <div>1</div>
      </Flex.Item>

      <Flex.Item flex='3'>
        <div>2</div>
      </Flex.Item>

      <Flex.Item flex='1'>
        <div>3</div>
      </Flex.Item>
    </Flex>
  );
};

export const IndividualGaps: Story<FlexProps> = (args) => {
  return (
    <>
      {/* '2xl' gap between all items that don't specify `gapBefore` or `gapAfter` */}
      <Flex gap='2xl' {...args}>
        <Flex.Item>
          <div>1</div>
        </Flex.Item>

        <Flex.Item>
          <div>2</div>
        </Flex.Item>

        {/* ⬇️ will always have 'xs' gap between it and the previous item */}
        <Flex.Item gapAfter='xs'>
          <div>3</div>
        </Flex.Item>

        <Flex.Item>
          <div>4</div>
        </Flex.Item>

        {/* ⬇️ will always have '2xs' gap between it and the next item */}
        <Flex.Item gapBefore='3xs'>
          <div>5</div>
        </Flex.Item>

        <Flex.Item>
          <div>6</div>
        </Flex.Item>
      </Flex>
    </>
  );
};
IndividualGaps.args = {
  gap: '2xl',
};
