/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';

import { Tag } from './Tag';
import { TagContainer } from './TagContainer';

it('should render correctly', () => {
  const { container } = render(
    <TagContainer>
      <Tag variant='basic'>Mocked tag 1</Tag>
      <Tag variant='basic'>Mocked tag 2</Tag>
    </TagContainer>,
  );
  expect(container.querySelector('.iui-tag-container')).toBeTruthy();
  expect(container.querySelectorAll('.iui-tag-basic').length).toEqual(2);
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

it('should render scroll container', () => {
  const { container } = render(
    <TagContainer overflow='scroll' style={{ maxWidth: 200 }}>
      <Tag variant='basic'>Mocked tag 1</Tag>
      <Tag variant='basic'>Mocked tag 2</Tag>
      <Tag variant='basic'>Mocked tag 3</Tag>
      <Tag variant='basic'>Mocked tag 4</Tag>
    </TagContainer>,
  );
  expect(container.querySelector('.iui-tag-container.iui-scroll')).toBeTruthy();
  expect(container.querySelectorAll('.iui-tag-basic').length).toEqual(4);
});

it('should render truncated container', () => {
  const { container } = render(
    <TagContainer overflow='truncate' style={{ maxWidth: 200 }}>
      <Tag variant='basic'>Mocked tag 1</Tag>
      <Tag variant='basic'>Mocked tag 2</Tag>
      <Tag variant='basic'>Mocked tag 3</Tag>
      <Tag variant='basic'>Mocked tag 4</Tag>
    </TagContainer>,
  );
  expect(
    container.querySelector('.iui-tag-container.iui-truncate'),
  ).toBeTruthy();
  expect(container.querySelectorAll('.iui-tag-basic').length).toEqual(4);
});

it('should render filled background', () => {
  const { container } = render(
    <TagContainer background='filled'>
      <Tag variant='basic'>Mocked tag 1</Tag>
      <Tag variant='basic'>Mocked tag 2</Tag>
      <Tag variant='basic'>Mocked tag 3</Tag>
      <Tag variant='basic'>Mocked tag 4</Tag>
    </TagContainer>,
  );
  expect(
    container.querySelector('.iui-tag-container.iui-visible'),
  ).toBeTruthy();
  expect(container.querySelectorAll('.iui-tag-basic').length).toEqual(4);
});
