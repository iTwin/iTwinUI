/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from '@testing-library/react';
import { Fieldset } from './Fieldset.js';
import { InputGroup } from '../InputGroup/InputGroup.js';
import { ToggleSwitch } from '../ToggleSwitch/ToggleSwitch.js';
import { Select } from '../Select/Select.js';

it('should render in its most basic state', () => {
  const { container } = render(
    <Fieldset legend='legend'>
      <InputGroup>
        <ToggleSwitch />
        <ToggleSwitch />
      </InputGroup>
    </Fieldset>,
  );

  const fieldset = container.querySelector(
    '.iui-fieldset',
  ) as HTMLFieldSetElement;
  expect(fieldset).toBeTruthy();
  expect(fieldset.textContent).toBe('legend');
  expect(fieldset.disabled).toBe(false);

  const inputs = container.querySelectorAll('input');
  inputs.forEach((input) => expect(input).not.toBeDisabled());
});

it('should add className and style correctly', () => {
  const { container } = render(
    <Fieldset className='test-class' legend='legend' style={{ width: '100px' }}>
      <InputGroup>
        <ToggleSwitch />
        <ToggleSwitch />
      </InputGroup>
    </Fieldset>,
  );
  const fieldset = container.querySelector(
    '.iui-fieldset.test-class',
  ) as HTMLFieldSetElement;
  expect(fieldset).toBeTruthy();
  expect(fieldset.style.width).toBe('100px');
  const inputs = container.querySelectorAll('input');
  expect(inputs.length).toBe(2);
});

it('should render disabled group', () => {
  const { container } = render(
    <Fieldset legend='legend' disabled={true}>
      <InputGroup>
        <ToggleSwitch />
        <ToggleSwitch />
      </InputGroup>
    </Fieldset>,
  );

  const fieldset = container.querySelector(
    '.iui-fieldset',
  ) as HTMLFieldSetElement;
  expect(fieldset).toBeTruthy();
  expect(fieldset.disabled).toBe(true);

  const inputContainers = container.querySelectorAll('.iui-input-grid');
  expect(inputContainers.length).toBe(1);

  const inputs = container.querySelectorAll('input');
  inputs.forEach((input) => expect(input).toBeDisabled());
});

it('should render disabled select group', () => {
  const mockedFn = vi.fn();
  const { container } = render(
    <Fieldset legend='legend' disabled={true}>
      <Select
        options={[
          { value: 1, label: '1' },
          { value: 2, label: '2' },
        ]}
      />
    </Fieldset>,
  );

  const fieldset = container.querySelector(
    '.iui-fieldset',
  ) as HTMLFieldSetElement;
  expect(fieldset).toBeTruthy();
  expect(fieldset.disabled).toBe(true);

  const selectButton = container.querySelector(
    '.iui-select-button[data-iui-disabled="true"]',
  ) as HTMLElement;
  expect(selectButton).toHaveAttribute('aria-disabled', 'true');
  expect(selectButton).toBeTruthy();
  selectButton.click();
  expect(mockedFn).not.toHaveBeenCalled();
  fireEvent.keyDown(selectButton, 'Spacebar');
  expect(document.querySelector('.iui-menu')).toBeNull();
});
