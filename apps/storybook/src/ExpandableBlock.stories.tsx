/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from '@storybook/addon-actions';
import { useEffect, useState } from '@storybook/addons';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { ExpandableBlock, ExpandableBlockProps } from '@itwin/itwinui-react';

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
    endIcon: { control: { disable: true } },
  },
  args: {
    children: 'Content in block!',
  },
} as Meta<ExpandableBlockProps>;

export const Basic: Story<Partial<ExpandableBlockProps>> = (args) => {
  return (
    <ExpandableBlock title='Basic Block' {...args}>
      {args.children}
    </ExpandableBlock>
  );
};

Basic.args = {
  title: 'Basic Block',
  isExpanded: false,
};

export const WithCaption: Story<Partial<ExpandableBlockProps>> = (args) => {
  return (
    <ExpandableBlock title='Basic Block' caption='basic caption' {...args}>
      {args.children}
    </ExpandableBlock>
  );
};

WithCaption.args = {
  title: 'Basic Block',
  isExpanded: false,
  caption: 'basic caption',
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
          title={`Basic Block #${index + 1}`}
          isExpanded={openedBlock === index}
          onToggle={(isExpanding) => toggleHandler(isExpanding, index)}
          caption={args.caption}
          {...args}
        >
          {args.children}
        </ExpandableBlock>
      ))}
    </>
  );
};

Accordion.argTypes = {
  title: { control: { disable: true } },
  isExpanded: { control: { disable: true } },
  onToggle: { control: { disable: true } },
};

export const StatusIcon: Story<Partial<ExpandableBlockProps>> = (args) => {
  return (
    <ExpandableBlock title='Basic Block' status='positive' {...args}>
      {args.children}
    </ExpandableBlock>
  );
};

StatusIcon.args = {
  title: 'Basic Block With Status',
  isExpanded: false,
  status: 'positive',
};

export const Small: Story<Partial<ExpandableBlockProps>> = (args) => {
  return (
    <ExpandableBlock title='Basic Block' size='small' {...args}>
      {args.children}
    </ExpandableBlock>
  );
};

Small.args = {
  title: 'Basic Block',
  size: 'small',
};

export const Borderless: Story<Partial<ExpandableBlockProps>> = (args) => {
  return (
    <ExpandableBlock title='Basic Block' styleType='borderless' {...args}>
      {args.children}
    </ExpandableBlock>
  );
};

Borderless.args = {
  title: 'Basic Block',
  styleType: 'borderless',
};
