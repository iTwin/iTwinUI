/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Tag, TagContainer } from '@itwin/itwinui-react';

export default {
  title: 'TagContainer',
};

export const BasicTagsContainer = () => {
  return (
    <TagContainer>
      <Tag variant='basic'>Tag 1</Tag>
      <Tag variant='basic'>Tag 2</Tag>
      <Tag variant='basic'>Tag 3</Tag>
    </TagContainer>
  );
};

export const DefaultTagsContainer = () => {
  return (
    <TagContainer>
      <Tag>Tag 1</Tag>
      <Tag>Tag 2</Tag>
      <Tag>Tag 3</Tag>
    </TagContainer>
  );
};

export const ScrollableDefaultTagsContainer = () => {
  return (
    <TagContainer overflow='scroll' style={{ maxWidth: 200 }}>
      <Tag>Tag 1</Tag>
      <Tag>Tag 2</Tag>
      <Tag>Tag 3</Tag>
      <Tag>Tag 4</Tag>
      <Tag>Tag 5</Tag>
      <Tag>Tag 6</Tag>
      <Tag>Tag 7</Tag>
    </TagContainer>
  );
};

export const TruncatedBasicTagsContainer = () => {
  return (
    <TagContainer overflow='truncate' style={{ maxWidth: 200 }}>
      <Tag variant='basic'>Tag 1</Tag>
      <Tag variant='basic'>Tag 2</Tag>
      <Tag variant='basic'>Tag 3</Tag>
      <Tag variant='basic'>Tag 4</Tag>
      <Tag variant='basic'>Tag 5</Tag>
      <Tag variant='basic'>Tag 6</Tag>
      <Tag variant='basic'>Tag 7</Tag>
    </TagContainer>
  );
};
