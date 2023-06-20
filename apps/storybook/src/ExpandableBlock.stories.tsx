/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from '@storybook/addon-actions';
import { useEffect, useState } from '@storybook/addons';
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
    <ExpandableBlock {...args}>
      <ExpandableBlock.Header label='Basic Block' expandIcon />
      <ExpandableBlock.Content>{args.children}</ExpandableBlock.Content>
    </ExpandableBlock>
  );
};

Basic.args = {
  isExpanded: false,
};

export const WithCaption: Story<Partial<ExpandableBlockProps>> = (args) => {
  return (
    <ExpandableBlock {...args}>
      <ExpandableBlock.Header>
        <ExpandableBlock.ExpandIcon />
        <ExpandableBlock.LabelArea>
          <ExpandableBlock.Title>Basic Block</ExpandableBlock.Title>
          <ExpandableBlock.Caption>basic caption</ExpandableBlock.Caption>
        </ExpandableBlock.LabelArea>
      </ExpandableBlock.Header>
      <ExpandableBlock.Content>{args.children}</ExpandableBlock.Content>
    </ExpandableBlock>
  );
};

WithCaption.args = {
  isExpanded: false,
};

export const Accordion: Story<Partial<ExpandableBlockProps>> = (args) => {
  const [openedBlock, setOpenedBlock] = useState<number | undefined>(undefined);
  const toggleHandler = (isExpanding: boolean, id: number) => {
    action(`isExpanding: ${isExpanding}, id: ${id}`, {
      clearOnStoryChange: false,
    })();
    if (isExpanding) {
      setOpenedBlock(id);
    } else {
      setOpenedBlock(undefined);
    }
  };

  useEffect(() => {
    return () => action('', { clearOnStoryChange: true })();
  }, []);

  return (
    <>
      {[...Array(3).fill(null)].map((_, index) => (
        <ExpandableBlock
          key={index}
          isExpanded={openedBlock === index}
          onToggle={(isExpanding) => toggleHandler(isExpanding, index)}
          {...args}
        >
          <ExpandableBlock.Header
            label={`Basic Block #${index + 1}`}
            expandIcon
          />
          <ExpandableBlock.Content>{args.children}</ExpandableBlock.Content>
        </ExpandableBlock>
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
    <ExpandableBlock status='positive' {...args}>
      <ExpandableBlock.Header>
        <ExpandableBlock.ExpandIcon />
        <ExpandableBlock.LabelArea>
          <ExpandableBlock.Title>Basic Block With Status</ExpandableBlock.Title>
        </ExpandableBlock.LabelArea>
        <ExpandableBlock.EndIcon />
      </ExpandableBlock.Header>
      <ExpandableBlock.Content>{args.children}</ExpandableBlock.Content>
    </ExpandableBlock>
  );
};

StatusIcon.args = {
  isExpanded: false,
  status: 'positive',
};

export const Small: Story<Partial<ExpandableBlockProps>> = (args) => {
  return (
    <ExpandableBlock size='small' {...args}>
      <ExpandableBlock.Header label='Basic Block' expandIcon />
      <ExpandableBlock.Content>{args.children}</ExpandableBlock.Content>
    </ExpandableBlock>
  );
};

Small.args = {
  size: 'small',
};

export const Borderless: Story<Partial<ExpandableBlockProps>> = (args) => {
  return (
    <ExpandableBlock styleType='borderless' {...args}>
      <ExpandableBlock.Header label='Basic Block' expandIcon />
      <ExpandableBlock.Content>{args.children}</ExpandableBlock.Content>
    </ExpandableBlock>
  );
};

Borderless.args = {
  styleType: 'borderless',
};

export const Disabled: Story<Partial<ExpandableBlockProps>> = (args) => {
  return (
    <ExpandableBlock disabled {...args}>
      <ExpandableBlock.Header label='Disabled Block' expandIcon />
      <ExpandableBlock.Content>{args.children}</ExpandableBlock.Content>
    </ExpandableBlock>
  );
};

Disabled.args = {
  isExpanded: false,
};
