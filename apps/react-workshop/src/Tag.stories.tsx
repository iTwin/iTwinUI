/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Tag } from '@itwin/itwinui-react';

export default {
  title: 'Tag',
};

export const Default = () => {
  const onRemove = () => {
    console.log('Closed me!');
  };
  return <Tag onRemove={onRemove}>{`I'm a tag`}</Tag>;
};

export const NoClose = () => {
  return <Tag>Cannot close me!</Tag>;
};

export const Clickable = () => {
  return <Tag onClick={() => console.log('clicked!')}>Click me</Tag>;
};
