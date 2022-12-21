/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';
import { FooterItem } from './FooterItem';

it('should render with misc props', () => {
  const { container } = render(
    <FooterItem className='test-class' style={{ color: 'red' }}>
      test-title
    </FooterItem>,
  );

  const item = container.querySelector('.iui-legal-footer-item') as HTMLElement;
  expect(item).toBeTruthy();
  expect(item.textContent).toEqual('test-title');
  expect(item).toHaveClass('test-class');
  expect(item.style.color).toEqual('red');
});
