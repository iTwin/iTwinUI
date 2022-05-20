/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ModalContent } from './ModalContent';

it('should render in its most basic state', () => {
  const { container } = render(
    <ModalContent>
      <div>Lorem ipsum dolor sit amet.</div>
    </ModalContent>,
  );
  expect(container.querySelector('.iui-dialog-content')).toBeTruthy();
  screen.getByText('Lorem ipsum dolor sit amet.');
});

it('should propagate miscellaneous props', () => {
  const { container } = render(
    <ModalContent
      className='test-class'
      id='test-id'
      style={{ fontSize: 'x-large' }}
    >
      <div>Lorem ipsum dolor sit amet.</div>
    </ModalContent>,
  );

  const content = container.querySelector('.iui-dialog-content') as HTMLElement;
  expect(content).toHaveClass('test-class');
  expect(content).toHaveStyle('fontSize: x-large');
  expect(content.id).toEqual('test-id');
});
