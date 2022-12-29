/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { TagContainer, Tag } from '@itwin/itwinui-react';

export default () => {
  return (
    <TagContainer>
      <Tag onRemove={() => {}}>Tag 1</Tag>
      <Tag onRemove={() => {}}>Tag 2</Tag>
      <Tag onRemove={() => {}}>Tag 3</Tag>
    </TagContainer>
  );
};
