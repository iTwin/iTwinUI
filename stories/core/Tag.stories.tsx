// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { Story, Meta } from '@storybook/react';
import React from 'react';
import { Tag } from '../../src/core';
import { TagProps } from '../../src/core/Tag/Tag';

export default {
  component: Tag,
  parameters: {
    docs: {
      description: { component: 'Tags for showing categories, filters etc.' },
    },
  },
  title: 'Core/Tag',
} as Meta<React.PropsWithChildren<TagProps>>;

export const Basic: Story<React.PropsWithChildren<TagProps>> = ({
  children,
  onRemove,
}) => {
  return <Tag onRemove={onRemove}>{children}</Tag>;
};

Basic.args = {
  children: "I'm a tag",
};

Basic.argTypes = {
  onRemove: {
    action: 'Closed me!',
  },
};

export const NoClose: Story<React.PropsWithChildren<TagProps>> = ({
  children,
}) => {
  return <Tag>{children}</Tag>;
};

NoClose.args = {
  children: 'Cannot close me!',
};

NoClose.argTypes = {
  onRemove: {
    table: {
      disable: true,
    },
  },
};
