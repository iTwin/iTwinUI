/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import { Checkbox } from '../Checkbox/Checkbox.js';
import { Radio } from '../Radio/Radio.js';

import { InputGroup } from './InputGroup.js';

it('should render correctly in its most basic state', () => {
  const { container, getByText } = render(
    <InputGroup label='some label'>
      <Checkbox />
      <Checkbox />
    </InputGroup>,
  );
  expect(container.querySelector('.iui-input-grid')).toBeTruthy();
  const label = getByText('some label') as HTMLElement;
  expect(label.className).toBe('iui-input-label');
  expect(container.querySelectorAll('input').length).toBe(2);
});

it('should render disabled group', () => {
  const { container, getByText } = render(
    <InputGroup label='some label' disabled>
      <Checkbox disabled />
      <Checkbox disabled />
    </InputGroup>,
  );
  expect(container.querySelector('.iui-input-grid')).toBeTruthy();
  getByText('some label');
  const inputs = container.querySelectorAll('input');
  expect(inputs.length).toBe(2);
  inputs.forEach((input) => expect(input).toBeDisabled());
});

it('should render required group', () => {
  const { container } = render(
    <InputGroup label='some label' required>
      <Checkbox required />
      <Checkbox required />
    </InputGroup>,
  );
  expect(container.querySelector('.iui-input-grid')).toBeTruthy();
  expect(container.querySelector('.iui-input-label.iui-required')).toBeTruthy();

  const inputs = container.querySelectorAll('input');
  expect(inputs.length).toBe(2);
  inputs.forEach((input) => expect(input.required).toBeTruthy());
});

it.each(['string', 'ReactNode'] as const)(
  'should render message=%s',
  (messageType) => {
    const { container, getByText } = render(
      <InputGroup
        label='some label'
        message={
          messageType === 'string' ? (
            'Message'
          ) : (
            <div className='my-message'>Message</div>
          )
        }
      >
        <Radio />
        <Radio />
        <Radio />
      </InputGroup>,
    );

    expect(container.querySelector('.iui-input-grid')).toBeTruthy();
    getByText('some label');

    let message;
    // Automatically wrap string message in `<StatusMessage />`
    if (messageType === 'string') {
      message = container.querySelector('.iui-status-message') as HTMLElement;
    }
    // Do not wrap ReactNode message in `<StatusMessage />`
    else {
      expect(container.querySelector('.iui-status-message')).toBeFalsy();
      message = container.querySelector('.my-message') as HTMLElement;
    }

    expect(message).toBeTruthy();
    expect(message.textContent).toBe('Message');
  },
);

it.each(['positive', 'negative', 'warning'] as const)(
  'should render %s component',
  (status) => {
    const { container, getByText } = render(
      <InputGroup label='some label' message='Message' status={status}>
        <Radio />
        <Radio />
        <Radio />
      </InputGroup>,
    );
    expect(container.querySelector(`.iui-status-message`)).toHaveAttribute(
      'data-iui-status',
      status,
    );
    getByText('some label');
    expect(container.querySelector('.iui-svg-icon')).toBeTruthy();
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
    '.iui-input-grid.my-class',
  ) as HTMLElement;
  expect(groupContainer).toBeTruthy();
  expect(groupContainer.style.width).toBe('80px');
  getByText('some label');
});

it('should take class and style on inner element', () => {
  const { container, getByText } = render(
    <InputGroup
      label='some label'
      innerProps={{ className: 'my-class', style: { width: 80 } }}
    >
      <Checkbox />
      <Checkbox />
      <Checkbox />
    </InputGroup>,
  );
  const innerEl = container.querySelector(
    '.iui-input-group.my-class',
  ) as HTMLElement;
  expect(innerEl).toBeTruthy();
  expect(innerEl.style.width).toBe('80px');
  getByText('some label');
});

it('should take class and style on label', () => {
  const { container, getByText } = render(
    <InputGroup
      label='some label'
      labelProps={{ className: 'my-class', style: { width: 80 } }}
    >
      <Checkbox />
      <Checkbox />
      <Checkbox />
    </InputGroup>,
  );
  const label = container.querySelector(
    '.iui-input-label.my-class',
  ) as HTMLElement;
  expect(label).toBeTruthy();
  expect(label.style.width).toBe('80px');
  getByText('some label');
});

it('should take class and style on message', () => {
  const { container, getByText } = render(
    <InputGroup
      label='some label'
      message='Test message'
      svgIcon={<svg />}
      messageProps={{
        contentProps: { className: 'my-class', style: { width: 80 } },
        iconProps: { className: 'my-icon-class', style: { width: 60 } },
      }}
    >
      <Checkbox />
      <Checkbox />
      <Checkbox />
    </InputGroup>,
  );
  const content = container.querySelector('.my-class') as HTMLElement;
  expect(content).toBeTruthy();
  expect(content.style.width).toBe('80px');
  const icon = container.querySelector(
    '.iui-svg-icon.my-icon-class',
  ) as HTMLElement;
  expect(icon).toBeTruthy();
  expect(icon.style.width).toBe('60px');
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
  expect(container.querySelector('.iui-input-grid')).toBeTruthy();
  expect(container.querySelector('.iui-input-grid')).toHaveAttribute(
    'data-iui-label-placement',
    'inline',
  );
  getByText('some group label');
  expect(queryByText('My message')).toBeNull();
  expect(container.querySelector('.iui-svg-icon')).toBeTruthy();
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
  expect(container.querySelector('.iui-input-grid')).toHaveAttribute(
    'data-iui-label-placement',
    'inline',
  );
  getByText('some group label');
  expect(container.querySelector('.iui-svg-icon > .my-icon')).toBeTruthy();
});
