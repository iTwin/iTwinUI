/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from '@storybook/addon-actions';
import { useEffect } from '@storybook/addons';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { ExpandableBlock } from '@itwin/itwinui-react';

type ExpandableBlockProps = React.ComponentProps<typeof ExpandableBlock>;

export default {
  title: 'Core/ExpandableBlock',
  component: ExpandableBlock,
  argTypes: {
    onToggle: {
      action: 'isExpanding',
    },
    style: { control: { disable: true } },
    className: { control: { disable: true } },
    id: { control: { disable: true } },
  },
  args: {
    children: 'Content in block!',
  },
} as Meta<ExpandableBlockProps>;

export const Basic: Story<Partial<ExpandableBlockProps>> = (args) => {
  return (
    <ExpandableBlock title='Basic Block' {...args}>
      Content in block!
    </ExpandableBlock>
  );
};

export const WithCaption: Story<Partial<ExpandableBlockProps>> = (args) => {
  return (
    <ExpandableBlock.Wrapper {...args}>
      <ExpandableBlock.Trigger>
        <ExpandableBlock.ExpandIcon />
        <ExpandableBlock.LabelArea>
          <ExpandableBlock.Title>Basic Block</ExpandableBlock.Title>
          <ExpandableBlock.Caption>basic caption</ExpandableBlock.Caption>
        </ExpandableBlock.LabelArea>
      </ExpandableBlock.Trigger>
      <ExpandableBlock.Content>{args.children}</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>
  );
};

export const Accordion: Story<Partial<ExpandableBlockProps>> = (args) => {
  useEffect(() => {
    return () => action('', { clearOnStoryChange: true })();
  }, []);

  return (
    <>
      {[...Array(3).fill(null)].map((_, index) => (
        <ExpandableBlock.Wrapper key={index} {...args}>
          <ExpandableBlock.Trigger label={`Basic Block #${index + 1}`} />
          <ExpandableBlock.Content>{args.children}</ExpandableBlock.Content>
        </ExpandableBlock.Wrapper>
      ))}
    </>
  );
};

Accordion.argTypes = {
  isExpanded: { control: { disable: true } },
  onToggle: { control: { disable: true } },
};

export const StatusIcon: Story<Partial<ExpandableBlockProps>> = (args) => {
  return (
    <ExpandableBlock.Wrapper status='positive' {...args}>
      <ExpandableBlock.Trigger>
        <ExpandableBlock.ExpandIcon />
        <ExpandableBlock.LabelArea>
          <ExpandableBlock.Title>Basic Block With Status</ExpandableBlock.Title>
        </ExpandableBlock.LabelArea>
        <ExpandableBlock.EndIcon />
      </ExpandableBlock.Trigger>
      <ExpandableBlock.Content>{args.children}</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>
  );
};

StatusIcon.args = {
  status: 'positive',
};

export const Small: Story<Partial<ExpandableBlockProps>> = (args) => {
  return (
    <ExpandableBlock.Wrapper size='small' {...args}>
      <ExpandableBlock.Trigger label='Basic Block' />
      <ExpandableBlock.Content>{args.children}</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>
  );
};

Small.args = {
  size: 'small',
};

export const Borderless: Story<Partial<ExpandableBlockProps>> = (args) => {
  return (
    <ExpandableBlock.Wrapper styleType='borderless' {...args}>
      <ExpandableBlock.Trigger label='Basic Block' />
      <ExpandableBlock.Content>{args.children}</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>
  );
};

Borderless.args = {
  styleType: 'borderless',
};

export const Disabled: Story<Partial<ExpandableBlockProps>> = (args) => {
  return (
    <ExpandableBlock.Wrapper disabled {...args}>
      <ExpandableBlock.Trigger label='Disabled Block' />
      <ExpandableBlock.Content>{args.children}</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>
  );
};
