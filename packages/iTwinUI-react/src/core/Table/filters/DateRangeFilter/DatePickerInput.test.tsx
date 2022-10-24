/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import DatePickerInput, { DatePickerInputProps } from './DatePickerInput';

const renderComponent = (initialProps?: Partial<DatePickerInputProps>) => {
  const props = {
    onChange: jest.fn(),
    parseInput: (text: string) => new Date(text),
    formatDate: (date: Date) => date.toISOString(),
    ...initialProps,
  };
  return render(<DatePickerInput {...props} />);
};

it('should render correctly', async () => {
  const { container } = renderComponent();

  const labeledInput = container.querySelector(
    '.iui-input-container.iui-inline-label',
  );
  expect(labeledInput).toBeTruthy();

  const iconButton = container.querySelector(
    '.iui-input-icon.iui-button[data-iui-variant="borderless"]',
  ) as HTMLButtonElement;
  expect(iconButton).toBeTruthy();

  await userEvent.click(iconButton);
  const calendar = container.querySelector('.iui-date-picker');
  expect(calendar).toBeTruthy();
});

it('should render correctly with given date', () => {
  const date = new Date();
  const { container } = renderComponent({ date });

  const input = container.querySelector(
    '.iui-input-container input',
  ) as HTMLInputElement;
  expect(input).toBeTruthy();
  expect(input.value).toEqual(date.toISOString());
});

it('should render correctly with invalid given date', () => {
  const { container } = renderComponent({ date: new Date(' ') });

  const input = container.querySelector(
    '.iui-input-container input',
  ) as HTMLInputElement;
  expect(input).toBeTruthy();
  expect(input.value).toEqual('');
});

it('should call onChange with parsed date', () => {
  const onChange = jest.fn();
  const { container } = renderComponent({ onChange });

  const input = container.querySelector(
    '.iui-input-container input',
  ) as HTMLInputElement;
  expect(input).toBeTruthy();
  fireEvent.change(input, { target: { value: '2021-05-17T21:00:00.000Z' } });

  expect(onChange).toHaveBeenCalledWith(new Date('2021-05-17T21:00:00.000Z'));
});

it('should not call onChange with invalid value', () => {
  const onChange = jest.fn();
  const { container } = renderComponent({ onChange });

  const input = container.querySelector(
    '.iui-input-container input',
  ) as HTMLInputElement;
  expect(input).toBeTruthy();
  fireEvent.change(input, { target: { value: ' ' } });

  expect(onChange).not.toHaveBeenCalledWith();
});

it('should call onChange when selected day from calendar', async () => {
  const onChange = jest.fn();
  const { container } = renderComponent({
    onChange,
    date: new Date(2021, 4, 18),
  });

  const iconButton = container.querySelector(
    '.iui-input-icon.iui-button[data-iui-variant="borderless"]',
  ) as HTMLButtonElement;
  expect(iconButton).toBeTruthy();
  await userEvent.click(iconButton);

  const tippy = document.querySelector('[data-tippy-root]') as HTMLElement;
  expect(tippy.style.visibility).toEqual('visible');
  fireEvent.click(screen.getByText('7'));

  expect(tippy).not.toBeVisible();
  expect(document.activeElement).toEqual(iconButton);
  expect(onChange).toHaveBeenCalledWith(new Date(2021, 4, 7));
});

it('should call onChange with undefined when input field is cleared', async () => {
  const onChange = jest.fn();
  const { container } = renderComponent({
    onChange,
    date: new Date(2021, 4, 18),
  });

  const iconButton = container.querySelector(
    '.iui-input-icon.iui-button[data-iui-variant="borderless"]',
  ) as HTMLButtonElement;
  expect(iconButton).toBeTruthy();
  await userEvent.click(iconButton);

  await userEvent.click(screen.getByText('7'));
  expect(onChange).toHaveBeenNthCalledWith(1, new Date(2021, 4, 7));

  const input = container.querySelector(
    '.iui-input-container input',
  ) as HTMLInputElement;
  expect(input).toBeTruthy();
  fireEvent.change(input, { target: { value: '' } });
  expect(onChange).toHaveBeenNthCalledWith(2, undefined);
});
