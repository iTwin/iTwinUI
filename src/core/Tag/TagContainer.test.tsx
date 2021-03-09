// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { render } from '@testing-library/react';
import React from 'react';

import { Tag } from './Tag';
import { TagContainer } from './TagContainer';

it('should render correctly', () => {
  const { container } = render(
    <TagContainer>
      <Tag styleType='basic'>Mocked tag 1</Tag>
      <Tag styleType='basic'>Mocked tag 2</Tag>
    </TagContainer>,
  );
  expect(container.querySelector('.iui-tag-container')).toBeTruthy();
  expect(container.querySelectorAll('.iui-tag').length).toEqual(2);
});

it('should propagate custom styles and className', () => {
  const { container } = render(
    <TagContainer className='test-class' style={{ width: '50px' }}>
      <Tag>Mocked tag 1</Tag>
      <Tag>Mocked tag 2</Tag>
    </TagContainer>,
  );

  const tagsContainer = container.querySelector(
    '.iui-tag-container.test-class',
  ) as HTMLDivElement;
  expect(tagsContainer).toBeTruthy();
  expect(tagsContainer.style.width).toEqual('50px');
});
