/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';
import { FooterList } from './FooterList';

it('should render with misc props', () => {
  const { container } = render(
    <FooterList className='test-class' style={{ color: 'red' }}>
      test content
    </FooterList>,
  );

  const list = container.querySelector('.iui-legal-footer-list') as HTMLElement;
  expect(list).toBeTruthy();
  expect(list.textContent).toEqual('test content');
  expect(list).toHaveClass('test-class');
  expect(list.style.color).toEqual('red');
});
