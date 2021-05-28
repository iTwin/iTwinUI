/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';
import { Step } from './Step';

describe('Wizard step (long)', () => {
  it('renders first step correctly in long wizard (current)', () => {
    const mockedClick = jest.fn();
    const step = (
      <Step
        title='First step'
        index={0}
        currentStepNumber={0}
        totalSteps={3}
        type={'long'}
        onClick={mockedClick}
      />
    );

    const { container, getByText } = render(step);

    // Renders as active
    const stepContainer = container.querySelector(
      '.iui-wizards-step-current',
    ) as HTMLElement;
    expect(stepContainer).toBeTruthy();
    expect(stepContainer.className).not.toContain('iui-clickable');
    stepContainer.click();
    expect(mockedClick).not.toHaveBeenCalled();
    // There is no track before
    expect(
      container.querySelector('.iui-wizards-step-track-before'),
    ).toBeNull();
    // Correct title
    const title = getByText('First step');
    expect(title.className).toBe('iui-wizards-step-title');
    // No track after
    expect(container.querySelector('.iui-wizards-step-track-after')).toBeNull();
    // Circle
    const circle = getByText('1');
    expect(circle.className).toBe('iui-wizards-step-circle');
    // Main track
    expect(
      container.querySelector('.iui-wizards-step-track-main'),
    ).toBeTruthy();
    // Click
  });

  it('renders first step correctly in long wizard (completed)', () => {
    const mockedClick = jest.fn();
    const step = (
      <Step
        title='First step'
        index={0}
        currentStepNumber={1}
        totalSteps={3}
        type={'long'}
        onClick={mockedClick}
      />
    );

    const { container, getByText } = render(step);

    // Renders as completed
    const stepContainer = container.querySelector(
      '.iui-wizards-step-completed',
    ) as HTMLElement;
    expect(stepContainer).toBeTruthy();
    expect(stepContainer.className).toContain('iui-clickable');
    stepContainer.click();
    expect(mockedClick).toHaveBeenCalled();
    // Track before
    expect(
      container.querySelector('.iui-wizards-step-track-before'),
    ).toBeNull();
    // Correct title
    const title = getByText('First step');
    expect(title.className).toBe('iui-wizards-step-title');
    // No track after
    expect(container.querySelector('.iui-wizards-step-track-after')).toBeNull();
    // Circle
    const circle = getByText('1');
    expect(circle.className).toBe('iui-wizards-step-circle');
    // Main track
    const main = container.querySelector(
      '.iui-wizards-step-track-main',
    ) as HTMLElement;
    expect(main).toBeTruthy();
    expect(main.className).toContain('iui-wizards-step-track-filled');
  });

  it('renders step correctly in long wizard (future)', () => {
    const mockedClick = jest.fn();
    const step = (
      <Step
        title='Second step'
        index={1}
        currentStepNumber={0}
        totalSteps={3}
        type={'long'}
        onClick={mockedClick}
      />
    );

    const { container, getByText } = render(step);

    // Renders step
    const stepContainer = container.querySelector(
      '.iui-wizards-step',
    ) as HTMLElement;
    expect(stepContainer).toBeTruthy();
    expect(stepContainer.className).not.toContain('iui-clickable');
    stepContainer.click();
    expect(mockedClick).not.toHaveBeenCalled();
    // No track before
    expect(
      container.querySelector('.iui-wizards-step-track-before'),
    ).toBeNull();
    // Correct title
    const title = getByText('Second step');
    expect(title.className).toBe('iui-wizards-step-title');
    // No track after
    expect(container.querySelector('.iui-wizards-step-track-after')).toBeNull();
    // Circle
    const circle = getByText('2');
    expect(circle.className).toBe('iui-wizards-step-circle');
    // Main track
    expect(
      container.querySelector('.iui-wizards-step-track-main'),
    ).toBeTruthy();
  });

  it('renders last step correctly in long wizard (current)', () => {
    const step = (
      <Step
        title='Last step'
        index={2}
        currentStepNumber={2}
        totalSteps={3}
        type={'long'}
      />
    );

    const { container, getByText } = render(step);

    // Renders as active
    expect(container.querySelector('.iui-wizards-step-current')).toBeTruthy();
    // No track before
    expect(
      container.querySelector('.iui-wizards-step-track-before'),
    ).toBeNull();
    // Correct title
    const title = getByText('Last step');
    expect(title.className).toBe('iui-wizards-step-title');
    // Track after
    expect(container.querySelector('.iui-wizards-step-track-after')).toBeNull();
    // Circle
    const circle = getByText('3');
    expect(circle.className).toBe('iui-wizards-step-circle');
    // Main track
    expect(container.querySelector('.iui-wizards-step-track-main')).toBeNull();
  });
});

describe('Wizard step (workflow)', () => {
  it('renders first step correctly in workflow wizard (current)', () => {
    const step = (
      <Step
        title='First step'
        index={0}
        currentStepNumber={0}
        totalSteps={3}
        type={'workflow'}
      />
    );

    const { container } = render(step);

    // Renders as active
    expect(container.querySelector('.iui-wizards-step-current')).toBeTruthy();
    // No track before
    expect(
      container.querySelector('.iui-wizards-step-track-before'),
    ).toBeNull();
    // No title
    expect(container.querySelector('iui-wizards-step-title')).toBeNull();
    // No track after
    expect(container.querySelector('.iui-wizards-step-track-after')).toBeNull();
    // Circle
    const circle = container.querySelector(
      '.iui-wizards-step-circle',
    ) as HTMLElement;
    expect(circle).toBeTruthy();
    expect(circle.textContent).toBe('First step');
    // Main track
    expect(
      container.querySelector('.iui-wizards-step-track-main'),
    ).toBeTruthy();
  });

  it('renders first step correctly in workflow wizard (completed)', () => {
    const step = (
      <Step
        title='First step'
        index={0}
        currentStepNumber={1}
        totalSteps={3}
        type={'workflow'}
      />
    );

    const { container } = render(step);

    // Renders as completed
    expect(container.querySelector('.iui-wizards-step-completed')).toBeTruthy();
    // No track before
    expect(
      container.querySelector('.iui-wizards-step-track-before'),
    ).toBeNull();
    // No title
    expect(container.querySelector('iui-wizards-step-title')).toBeNull();
    // No track after
    expect(container.querySelector('.iui-wizards-step-track-after')).toBeNull();
    // Circle
    const circle = container.querySelector(
      '.iui-wizards-step-circle',
    ) as HTMLElement;
    expect(circle).toBeTruthy();
    expect(circle.textContent).toBe('First step');
    // Main track
    const main = container.querySelector(
      '.iui-wizards-step-track-main',
    ) as HTMLElement;
    expect(main).toBeTruthy();
    expect(main.className).not.toContain('iui-wizards-step-track-filled');
  });

  it('renders step correctly in workflow wizard (future)', () => {
    const step = (
      <Step
        title='Second step'
        index={1}
        currentStepNumber={0}
        totalSteps={3}
        type={'workflow'}
      />
    );

    const { container } = render(step);

    // Renders step
    expect(container.querySelector('.iui-wizards-step')).toBeTruthy();
    // No track before
    expect(
      container.querySelector('.iui-wizards-step-track-before'),
    ).toBeNull();
    // No title
    expect(container.querySelector('iui-wizards-step-title')).toBeNull();
    // No track after
    expect(container.querySelector('.iui-wizards-step-track-after')).toBeNull();
    // Circle
    const circle = container.querySelector(
      '.iui-wizards-step-circle',
    ) as HTMLElement;
    expect(circle).toBeTruthy();
    expect(circle.textContent).toBe('Second step');
    // Main track
    expect(
      container.querySelector('.iui-wizards-step-track-main'),
    ).toBeTruthy();
  });

  it('renders last step correctly in workflow wizard (current)', () => {
    const step = (
      <Step
        title='Last step'
        index={2}
        currentStepNumber={2}
        totalSteps={3}
        type={'workflow'}
      />
    );

    const { container } = render(step);

    // Renders as active
    expect(container.querySelector('.iui-wizards-step-current')).toBeTruthy();
    // No track before
    expect(
      container.querySelector('.iui-wizards-step-track-before'),
    ).toBeNull();
    // No title
    expect(container.querySelector('iui-wizards-step-title')).toBeNull();
    // Track after
    expect(container.querySelector('.iui-wizards-step-track-after')).toBeNull();
    // Circle
    const circle = container.querySelector(
      '.iui-wizards-step-circle',
    ) as HTMLElement;
    expect(circle).toBeTruthy();
    expect(circle.textContent).toBe('Last step');
    // Main track
    expect(container.querySelector('.iui-wizards-step-track-main')).toBeNull();
  });
});

it('should set dynamic inline width based on total steps', () => {
  const { container: container1 } = render(
    <Step
      title='Mock step'
      index={1}
      currentStepNumber={0}
      totalSteps={4}
      type={'default'}
    />,
  );

  const step1 = container1.querySelector('.iui-wizards-step') as HTMLElement;
  expect(step1).toBeTruthy();
  expect(step1.style.width).toEqual('25%');

  const { container: container2 } = render(
    <Step
      title='Mock step'
      index={1}
      currentStepNumber={1}
      totalSteps={8}
      type={'default'}
    />,
  );

  const step2 = container2.querySelector('.iui-wizards-step') as HTMLElement;
  expect(step2).toBeTruthy();
  expect(step2.style.width).toEqual('12.5%');
});

it('should not set dynamic inline width for long and workflow wizard types', () => {
  const { container: container1 } = render(
    <Step
      title='Mock step'
      index={1}
      currentStepNumber={0}
      totalSteps={4}
      type={'long'}
    />,
  );

  const step1 = container1.querySelector('.iui-wizards-step') as HTMLElement;
  expect(step1).toBeTruthy();
  expect(step1.style.width).toBeFalsy(); // not 25%

  const { container: container2 } = render(
    <Step
      title='Mock step'
      index={1}
      currentStepNumber={1}
      totalSteps={8}
      type={'workflow'}
    />,
  );

  const step2 = container2.querySelector('.iui-wizards-step') as HTMLElement;
  expect(step2).toBeTruthy();
  expect(step2.style.width).toBeFalsy(); // not 12.5%
});

it('should add className and style props correctly', () => {
  const { container } = render(
    <Step
      title='Mock step'
      index={1}
      currentStepNumber={0}
      totalSteps={4}
      type={'default'}
      className='custom-class'
      style={{ width: 50, color: 'red' }}
    />,
  );

  const step = container.querySelector(
    '.iui-wizards-step.custom-class',
  ) as HTMLElement;
  expect(step).toBeTruthy();
  expect(step.style.width).toEqual('50px');
  expect(step.style.color).toEqual('red');
});
