/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, act } from '@testing-library/react';
import { Dialog } from './Dialog.js';
import { Button } from '../Buttons/Button.js';
import { userEvent } from '@testing-library/user-event';

it('should pass down the props through DialogContext', async () => {
  const onClose = vi.fn();
  const { container } = render(
    <Dialog
      isOpen={true}
      onClose={onClose}
      closeOnExternalClick
      placement={'top-left'}
    >
      <Dialog.Backdrop />
      <Dialog.Main>
        <Dialog.TitleBar titleText='Test title' />
        <Dialog.Content>Here is my dialog content</Dialog.Content>
        <Dialog.ButtonBar>
          <Button styleType='high-visibility'>Confirm</Button>
          <Button>Close</Button>
        </Dialog.ButtonBar>
      </Dialog.Main>
    </Dialog>,
  );

  const backdrop = container.querySelector('.iui-backdrop') as HTMLElement;
  expect(backdrop).toBeTruthy();
  expect(backdrop).toBeVisible();
  await userEvent.click(backdrop);
  expect(onClose).toHaveBeenCalledTimes(1);

  const dialog = container.querySelector('.iui-dialog') as HTMLElement;
  expect(dialog).toBeTruthy();
  expect(dialog).toBeVisible();

  const closeIcon = dialog.querySelector(
    '.iui-dialog-title-bar button',
  ) as HTMLElement;
  expect(closeIcon).toBeTruthy();
  await userEvent.click(closeIcon);
  expect(onClose).toHaveBeenCalledTimes(2);
});

it('should have position correctly dependant on viewport', async () => {
  const dialogContent = (
    <Dialog.Main>
      <Dialog.TitleBar titleText='Test title' />
      <Dialog.Content>Here is my dialog content</Dialog.Content>
      <Dialog.ButtonBar>
        <Button styleType='high-visibility'>Confirm</Button>
        <Button>Close</Button>
      </Dialog.ButtonBar>
    </Dialog.Main>
  );

  const containerViewport = render(
    <Dialog relativeTo='viewport' isOpen>
      <Dialog.Backdrop />
      {dialogContent}
    </Dialog>,
  );

  const containerContainer = render(
    <Dialog relativeTo='container' isOpen>
      <Dialog.Backdrop />
      {dialogContent}
    </Dialog>,
  );

  const dialogWrapperViewport = containerViewport.container.querySelector(
    '.iui-dialog-wrapper',
  ) as HTMLElement;
  const dialogWrapperContainer = containerContainer.container.querySelector(
    '.iui-dialog-wrapper',
  ) as HTMLElement;

  const backdropViewport = containerViewport.container.querySelector(
    '.iui-backdrop',
  ) as HTMLElement;
  const backdropContainer = containerContainer.container.querySelector(
    '.iui-backdrop',
  ) as HTMLElement;

  expect(dialogWrapperViewport).toHaveAttribute('data-iui-relative', 'false');
  expect(dialogWrapperContainer).toHaveAttribute('data-iui-relative', 'true');
  expect(backdropViewport).toHaveClass('iui-backdrop-fixed');
  expect(backdropContainer).not.toHaveClass('iui-backdrop-fixed');
});

it.each(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const)(
  'should position dialog to corners of page',
  async (placement) => {
    const { container } = render(
      <Dialog isOpen={true} placement={placement}>
        <Dialog.Backdrop />
        <Dialog.Main>
          <Dialog.TitleBar titleText='Test title' />
          <Dialog.Content>Here is my dialog content</Dialog.Content>
          <Dialog.ButtonBar>
            <Button styleType='high-visibility'>Confirm</Button>
            <Button>Close</Button>
          </Dialog.ButtonBar>
        </Dialog.Main>
      </Dialog>,
    );

    const dialog = container.querySelector('.iui-dialog') as HTMLElement;
    expect(dialog).toHaveAttribute('data-iui-placement', placement);
  },
);

it('should not allow to close the dialog when isDismissible false', async () => {
  const onClose = vi.fn();
  const { container } = render(
    <Dialog isOpen={true} onClose={onClose} isDismissible={false}>
      <Dialog.Backdrop />
      <Dialog.Main>
        <Dialog.TitleBar titleText='Test title' />
        <Dialog.Content>Here is my dialog content</Dialog.Content>
        <Dialog.ButtonBar>
          <Button styleType='high-visibility'>Confirm</Button>
          <Button>Close</Button>
        </Dialog.ButtonBar>
      </Dialog.Main>
    </Dialog>,
  );

  const backdrop = container.querySelector('.iui-backdrop') as HTMLElement;
  expect(backdrop).toBeTruthy();
  expect(backdrop).toBeVisible();
  await userEvent.click(backdrop);
  expect(onClose).not.toHaveBeenCalled();

  const dialog = container.querySelector('.iui-dialog') as HTMLElement;
  expect(dialog).toBeTruthy();
  expect(dialog).toBeVisible();

  const closeIcon = dialog.querySelector(
    '.iui-dialog-title-bar button',
  ) as HTMLElement;
  expect(closeIcon).toBeFalsy();
});

it('should not stay in the DOM when isOpen=false', () => {
  vi.useFakeTimers();

  const Component = ({ isOpen = false }) => (
    <Dialog isOpen={isOpen}>
      <Dialog.Backdrop />
      <Dialog.Main>
        <Dialog.TitleBar titleText='Test title' />
        <Dialog.Content>Here is my dialog content</Dialog.Content>
        <Dialog.ButtonBar>
          <Button styleType='high-visibility'>Confirm</Button>
          <Button>Close</Button>
        </Dialog.ButtonBar>
      </Dialog.Main>
    </Dialog>
  );

  const { container, rerender } = render(<Component isOpen={false} />);

  let dialogWrapper = container.querySelector(
    '.iui-dialog-wrapper',
  ) as HTMLElement;
  expect(dialogWrapper).toBeFalsy();

  rerender(<Component isOpen={true} />);

  dialogWrapper = container.querySelector('.iui-dialog-wrapper') as HTMLElement;
  expect(dialogWrapper).toBeTruthy();

  rerender(<Component isOpen={false} />);

  // Should be there in the DOM until the exit animation is finished
  dialogWrapper = container.querySelector('.iui-dialog-wrapper') as HTMLElement;
  expect(dialogWrapper).toBeTruthy();

  // Since timeout for the exit animation is 600ms
  act(() => vi.advanceTimersByTime(600));

  dialogWrapper = container.querySelector('.iui-dialog-wrapper') as HTMLElement;
  expect(dialogWrapper).toBeFalsy();
});
