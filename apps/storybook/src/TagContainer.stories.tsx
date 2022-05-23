/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import { Tag, TagContainer, TagContainerProps } from '@itwin/itwinui-react';

export default {
  component: TagContainer,
  title: 'Core/TagContainer',
  argTypes: {
    style: { table: { disable: true } },
    className: { table: { disable: true } },
    id: { control: { disable: true } },
    children: { control: { disable: true } },
  },
} as Meta<TagContainerProps>;

export const BasicTagsContainer: Story<TagContainerProps> = ({ ...rest }) => {
  return (
    <TagContainer {...rest}>
      <Tag variant='basic'>Tag 1</Tag>
      <Tag variant='basic'>Tag 2</Tag>
      <Tag variant='basic'>Tag 3</Tag>
    </TagContainer>
  );
};

export const DefaultTagsContainer: Story<TagContainerProps> = ({ ...rest }) => {
  return (
    <TagContainer {...rest}>
      <Tag>Tag 1</Tag>
      <Tag>Tag 2</Tag>
      <Tag>Tag 3</Tag>
    </TagContainer>
  );
};

export const ScrollableDefaultTagsContainer: Story<TagContainerProps> = ({
  ...rest
}) => {
  return (
    <TagContainer overflow='scroll' {...rest} style={{ maxWidth: 200 }}>
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

ScrollableDefaultTagsContainer.args = {
  overflow: 'scroll',
};

export const TruncatedBasicTagsContainer: Story<TagContainerProps> = ({
  ...rest
}) => {
  return (
    <TagContainer overflow='truncate' {...rest} style={{ maxWidth: 200 }}>
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

TruncatedBasicTagsContainer.args = {
  overflow: 'truncate',
};
