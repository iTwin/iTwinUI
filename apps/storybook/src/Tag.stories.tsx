/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Tag } from '@itwin/itwinui-react';
import { action } from '@storybook/addon-actions';

export default {
  component: Tag,
  title: 'Core/Tag',
};

export const Default = () => {
  const onRemove = () => {
    action('Closed me!');
  };
  return <Tag onRemove={onRemove}>{`I'm a tag`}</Tag>;
};

export const NoClose = () => {
  return <Tag>Cannot close me!</Tag>;
};
