/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import { Tag, TagProps } from '@itwin/itwinui-react';

export default {
  component: Tag,
  title: 'Core/Tag',
  argTypes: {
    style: { control: { disable: true } },
    className: { control: { disable: true } },
    title: { control: { disable: true } },
    id: { control: { disable: true } },
  },
  args: {
    variant: 'default',
  },
} as Meta<TagProps>;

export const Default: Story<TagProps> = ({ children, onRemove, ...rest }) => {
  return (
    <Tag onRemove={onRemove} {...rest}>
      {children}
    </Tag>
  );
};

Default.args = {
  children: "I'm a tag",
};

Default.argTypes = {
  onRemove: { action: 'Closed me!' },
};

export const NoClose: Story<TagProps> = ({ children, ...rest }) => {
  return <Tag {...rest}>{children}</Tag>;
};

NoClose.args = {
  children: 'Cannot close me!',
};

NoClose.argTypes = {
  onRemove: { control: { disable: true } },
};
