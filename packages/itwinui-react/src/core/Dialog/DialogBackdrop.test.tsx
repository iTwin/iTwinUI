/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import { DialogBackdrop } from './DialogBackdrop.js';
import { userEvent } from '@testing-library/user-event';

it('should render in its most basic state', async () => {
  const onClose = vi.fn();
  const { container } = render(
    <DialogBackdrop closeOnExternalClick onClose={onClose} isDismissible />,
  );

  const backdrop = container.querySelector('.iui-backdrop') as HTMLElement;
  expect(backdrop).toBeTruthy();
  await userEvent.click(backdrop);
  expect(onClose).toHaveBeenCalled();
});

it('should render with misc props', () => {
  const { container } = render(
    <DialogBackdrop style={{ color: 'red' }} className='test-class' />,
  );
  const backdrop = container.querySelector(
    '.iui-backdrop.test-class',
  ) as HTMLElement;
  expect(backdrop).toBeTruthy();
  expect(backdrop.style.color).toEqual('red');
});

it('should not close on closeOnExternalClick is false', async () => {
  const onClose = vi.fn();
  const { container } = render(<DialogBackdrop closeOnExternalClick={false} />);

  const backdrop = container.querySelector('.iui-backdrop') as HTMLElement;
  expect(backdrop).toBeTruthy();
  await userEvent.click(backdrop);
  expect(onClose).not.toHaveBeenCalled();
});
