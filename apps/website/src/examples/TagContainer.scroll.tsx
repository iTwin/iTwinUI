/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { TagContainer, Tag } from '@itwin/itwinui-react';

export default () => {
  return (
    <TagContainer overflow='scroll' background='filled' style={{ maxWidth: '70%' }}>
      <Tag onRemove={() => {}}>Tag 1</Tag>
      <Tag onRemove={() => {}}>Tag 2</Tag>
      <Tag onRemove={() => {}}>Tag 3</Tag>
      <Tag onRemove={() => {}}>Medium tag 4</Tag>
      <Tag onRemove={() => {}}>Very long tag 5</Tag>
      <Tag onRemove={() => {}}>Tag 6</Tag>
      <Tag onRemove={() => {}}>Tag 7</Tag>
      <Tag onRemove={() => {}}>Long tag 8</Tag>
      <Tag onRemove={() => {}}>Tag 9</Tag>
    </TagContainer>
  );
};
