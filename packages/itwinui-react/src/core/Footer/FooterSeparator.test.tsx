/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';
import { FooterSeparator } from './FooterSeparator';

it('should render with misc props', () => {
  const { container } = render(
    <FooterSeparator className='test-class' style={{ color: 'red' }} />,
  );

  const separator = container.querySelector(
    '.iui-legal-footer-separator',
  ) as HTMLElement;
  expect(separator).toBeTruthy();
  expect(separator).toHaveClass('test-class');
  expect(separator.style.color).toEqual('red');
});
