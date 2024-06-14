/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import {
  DatePickerInput,
  type DatePickerInputProps,
} from './DatePickerInput.js';

const renderComponent = (initialProps?: Partial<DatePickerInputProps>) => {
  const props = {
    onChange: vi.fn(),
    parseInput: (text: string) => new Date(text),
    formatDate: (date: Date) => date.toISOString(),
    ...initialProps,
  };
  return render(<DatePickerInput {...props} />);
};

it('should render correctly', async () => {
  const { container } = renderComponent();

  const labeledInput = container.querySelector('.iui-input-grid');
  expect(labeledInput).toBeTruthy();
  expect(labeledInput).toHaveAttribute('data-iui-label-placement', 'inline');

  const iconButton = container.querySelector(
    '.iui-input-flex-container > .iui-button[data-iui-variant="borderless"]',
  ) as HTMLButtonElement;
  expect(iconButton).toBeTruthy();

  await userEvent.click(iconButton);
  const calendar = document.querySelector('.iui-date-picker');
  expect(calendar).toBeTruthy();
});

it('should render correctly with given date', () => {
  const date = new Date();
  const { container } = renderComponent({ date });

  const input = container.querySelector(
    '.iui-input-flex-container input',
  ) as HTMLInputElement;
  expect(input).toBeTruthy();
  expect(input.value).toEqual(date.toISOString());
});

it('should render correctly with invalid given date', () => {
  const { container } = renderComponent({ date: new Date(' ') });

  const input = container.querySelector(
    '.iui-input-flex-container input',
  ) as HTMLInputElement;
  expect(input).toBeTruthy();
  expect(input.value).toEqual('');
});

it('should call onChange with parsed date', () => {
  const onChange = vi.fn();
  const { container } = renderComponent({ onChange });

  const input = container.querySelector(
    '.iui-input-flex-container input',
  ) as HTMLInputElement;
  expect(input).toBeTruthy();
  fireEvent.change(input, { target: { value: '2021-05-17T21:00:00.000Z' } });

  expect(onChange).toHaveBeenCalledWith(new Date('2021-05-17T21:00:00.000Z'));
});

it('should not call onChange with invalid value', () => {
  const onChange = vi.fn();
  const { container } = renderComponent({ onChange });

  const input = container.querySelector(
    '.iui-input-flex-container input',
  ) as HTMLInputElement;
  expect(input).toBeTruthy();
  fireEvent.change(input, { target: { value: ' ' } });

  expect(onChange).not.toHaveBeenCalledWith();
});

it('should call onChange when selected day from calendar', async () => {
  const onChange = vi.fn();
  const { container } = renderComponent({
    onChange,
    date: new Date(2021, 4, 18),
  });

  const iconButton = container.querySelector(
    '.iui-input-flex-container > .iui-button[data-iui-variant="borderless"]',
  ) as HTMLButtonElement;
  expect(iconButton).toBeTruthy();
  await userEvent.click(iconButton);

  const popover = document.querySelector('[role=dialog]') as HTMLElement;
  expect(popover).toBeVisible();
  fireEvent.click(screen.getByText('7'));

  expect(popover).not.toBeVisible();
  expect(document.activeElement).toEqual(iconButton);
  expect(onChange).toHaveBeenCalledWith(new Date(2021, 4, 7));
});

it('should call onChange with undefined when input field is cleared', async () => {
  const onChange = vi.fn();
  const { container } = renderComponent({
    onChange,
    date: new Date(2021, 4, 18),
  });

  const iconButton = container.querySelector(
    '.iui-input-flex-container > .iui-button[data-iui-variant="borderless"]',
  ) as HTMLButtonElement;
  expect(iconButton).toBeTruthy();
  await userEvent.click(iconButton);

  await userEvent.click(screen.getByText('7'));
  expect(onChange).toHaveBeenNthCalledWith(1, new Date(2021, 4, 7));

  const input = container.querySelector(
    '.iui-input-flex-container input',
  ) as HTMLInputElement;
  expect(input).toBeTruthy();
  fireEvent.change(input, { target: { value: '' } });
  expect(onChange).toHaveBeenNthCalledWith(2, undefined);
});

it('should disable dates before "from" date when using "to" date picker', async () => {
  const fromDate = new Date(2023, 3, 22);
  const onClick = vi.fn();
  const { container } = renderComponent({
    isFromOrTo: 'to',
    selectedDate: fromDate,
  });

  const iconButton = container.querySelector('button') as HTMLButtonElement;
  expect(iconButton).toBeTruthy();

  await userEvent.click(iconButton);
  const day12 = screen.getByText('12');
  await userEvent.click(day12);
  expect(onClick).not.toHaveBeenCalled();
});

it('should disable dates after "to" date when using "from" date picker', async () => {
  const toDate = new Date(2023, 3, 8);
  const onClick = vi.fn();
  const { container } = renderComponent({
    isFromOrTo: 'from',
    selectedDate: toDate,
  });

  const iconButton = container.querySelector('button') as HTMLButtonElement;
  expect(iconButton).toBeTruthy();

  await userEvent.click(iconButton);
  const day12 = screen.getByText('12');
  await userEvent.click(day12);
  expect(onClick).not.toHaveBeenCalled();
});
