/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';

import { DialogTitleBar } from './DialogTitleBar';

it('should render in its most basic state', () => {
  const { container } = render(<DialogTitleBar titleText='test-title' />);
  const titleBar = container.querySelector(
    '.iui-dialog-title-bar',
  ) as HTMLElement;
  expect(titleBar).toBeTruthy();
  expect(titleBar).toHaveTextContent('test-title');
});

it('should render only render children while ignoring title prop', () => {
  const { container } = render(
    <DialogTitleBar titleText='test-title1' isDismissible>
      test-title2
    </DialogTitleBar>,
  );
  const titleBar = container.querySelector(
    '.iui-dialog-title-bar',
  ) as HTMLElement;
  expect(titleBar).toBeTruthy();
  expect(titleBar).toHaveTextContent('test-title2');

  const closeButton = titleBar.querySelector(
    '.iui-button',
  ) as HTMLButtonElement;
  expect(closeButton).toBeFalsy();
});

it('should render close button when isDismissible is true', () => {
  const onClose = jest.fn();
  const { container } = render(
    <DialogTitleBar isDismissible onClose={onClose} titleText='test-title' />,
  );
  const titleBar = container.querySelector(
    '.iui-dialog-title-bar',
  ) as HTMLElement;
  expect(titleBar).toBeTruthy();
  expect(titleBar).toHaveTextContent('test-title');

  const closeButton = titleBar.querySelector(
    '.iui-button',
  ) as HTMLButtonElement;
  expect(closeButton).toBeTruthy();
  closeButton.click();
  expect(onClose).toHaveBeenCalled();
});

it('should propagate miscellaneous props', () => {
  const { container } = render(
    <DialogTitleBar
      className='test-class'
      id='test-id'
      style={{ color: 'red' }}
      titleText='test-title'
    />,
  );

  const titleBar = container.querySelector(
    '.iui-dialog-title-bar',
  ) as HTMLElement;
  expect(titleBar).toHaveClass('test-class');
  expect(titleBar).toHaveStyle('color: red;');
  expect(titleBar.id).toEqual('test-id');
});

it('should render draggable title bar', () => {
  const { container } = render(
    <DialogTitleBar titleText='test-title' isDraggable />,
  );
  const titleBar = container.querySelector(
    '.iui-dialog-title-bar.iui-dialog-title-bar-filled',
  ) as HTMLElement;
  expect(titleBar).toBeTruthy();
  expect(titleBar).toHaveTextContent('test-title');
});
