/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';
import { Checkbox } from '../Checkbox';
import { Radio } from '../Radio';

import { InputGroup } from './InputGroup';

it('should render correctly in its most basic state', () => {
  const { container, getByText } = render(
    <InputGroup label='some label'>
      <Checkbox />
      <Checkbox />
    </InputGroup>,
  );
  expect(container.querySelector('.iui-input-container')).toBeTruthy();
  const label = getByText('some label') as HTMLElement;
  expect(label.className).toBe('iui-label');
  expect(container.querySelectorAll('input').length).toBe(2);
});

it('should render disabled group', () => {
  const { container, getByText } = render(
    <InputGroup label='some label' disabled>
      <Checkbox disabled />
      <Checkbox disabled />
    </InputGroup>,
  );
  expect(
    container.querySelector('.iui-input-container.iui-disabled'),
  ).toBeTruthy();
  getByText('some label');
  const inputs = container.querySelectorAll('input');
  expect(inputs.length).toBe(2);
  inputs.forEach((input) => expect(input.disabled).toBe(true));
});

it('should render required group', () => {
  const { container } = render(
    <InputGroup label='some label' required>
      <Checkbox required />
      <Checkbox required />
    </InputGroup>,
  );
  expect(container.querySelector('.iui-input-container')).toBeTruthy();
  expect(container.querySelector('.iui-label.iui-required')).toBeTruthy();

  const inputs = container.querySelectorAll('input');
  expect(inputs.length).toBe(2);
  inputs.forEach((input) => expect(input.required).toBeTruthy());
});

it('should render message', () => {
  const { container, getByText } = render(
    <InputGroup
      label='some label'
      message={<div className='my-message'>Message</div>}
    >
      <Radio />
      <Radio />
      <Radio />
    </InputGroup>,
  );
  expect(container.querySelector('.iui-input-container')).toBeTruthy();
  getByText('some label');
  const message = container.querySelector(
    '.iui-message > .my-message',
  ) as HTMLElement;
  expect(message).toBeTruthy();
  expect(message.textContent).toBe('Message');
  expect(container.querySelectorAll('input').length).toBe(3);
});

it.each(['positive', 'negative', 'warning'] as const)(
  'should render %s component',
  (status) => {
    const { container, getByText } = render(
      <InputGroup
        label='some label'
        message={<div className='my-message'>Message</div>}
        status={status}
      >
        <Radio />
        <Radio />
        <Radio />
      </InputGroup>,
    );
    expect(
      container.querySelector(`.iui-input-container.iui-${status}`),
    ).toBeTruthy();
    getByText('some label');
    expect(container.querySelector('.iui-input-icon')).toBeTruthy();
  },
);

it('should take class and style on container', () => {
  const { container, getByText } = render(
    <InputGroup label='some label' className='my-class' style={{ width: 80 }}>
      <Checkbox />
      <Checkbox />
      <Checkbox />
    </InputGroup>,
  );
  const groupContainer = container.querySelector(
    '.iui-input-container.my-class',
  ) as HTMLElement;
  expect(groupContainer).toBeTruthy();
  expect(groupContainer.style.width).toBe('80px');
  getByText('some label');
});

it('should render inline group', () => {
  const { container, getByText, queryByText } = render(
    <InputGroup
      label='some group label'
      message='My message'
      status='positive'
      displayStyle='inline'
    >
      <Checkbox />
      <Checkbox />
      <Checkbox />
    </InputGroup>,
  );
  expect(
    container.querySelector('.iui-input-container.iui-inline-label'),
  ).toBeTruthy();
  getByText('some group label');
  expect(queryByText('My message')).toBeNull();
  expect(container.querySelector('.iui-input-icon')).toBeTruthy();
});

it('should take custom icon', () => {
  const { container, getByText } = render(
    <InputGroup
      label='some group label'
      svgIcon={<svg className='my-icon' />}
      displayStyle='inline'
    >
      <Checkbox />
      <Checkbox />
      <Checkbox />
    </InputGroup>,
  );
  expect(
    container.querySelector('.iui-input-container.iui-inline-label'),
  ).toBeTruthy();
  getByText('some group label');
  expect(container.querySelector('.iui-input-icon.my-icon')).toBeTruthy();
});
