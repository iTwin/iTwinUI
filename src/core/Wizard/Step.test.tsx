/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';
import { Step } from './Step';

describe('Wizard step (default)', () => {
  it('should render step correctly (past)', () => {
    const mockedClick = jest.fn();
    const step = (
      <Step
        title='First step'
        index={0}
        currentStepNumber={1}
        totalSteps={3}
        type='default'
        onClick={mockedClick}
      />
    );

    const { container, getByText } = render(step);

    // Renders as clickable
    const stepContainer = container.querySelector(
      '.iui-wizard-step',
    ) as HTMLElement;
    expect(stepContainer).toBeTruthy();
    expect(stepContainer.className).toContain('iui-clickable');
    stepContainer.click();
    expect(mockedClick).toHaveBeenCalled();
    // Correct title
    const title = getByText('First step');
    expect(title.className).toBe('iui-wizard-step-name');
    // Circle
    const circle = getByText('1');
    expect(circle.className).toBe('iui-wizard-circle');
    // Main track content
    expect(container.querySelector('.iui-wizard-track-content')).toBeTruthy();
  });

  it('should render step correctly (future)', () => {
    const mockedClick = jest.fn();
    const step = (
      <Step
        title='Second step'
        index={1}
        currentStepNumber={0}
        totalSteps={3}
        type='default'
        onClick={mockedClick}
      />
    );

    const { container, getByText } = render(step);

    // Renders as non-clickable
    const stepContainer = container.querySelector(
      '.iui-wizard-step',
    ) as HTMLElement;
    expect(stepContainer).toBeTruthy();
    expect(stepContainer.className).not.toContain('iui-clickable');
    stepContainer.click();
    expect(mockedClick).not.toHaveBeenCalled();
    // Correct title
    const title = getByText('Second step');
    expect(title.className).toBe('iui-wizard-step-name');
    // Circle
    const circle = getByText('2');
    expect(circle.className).toBe('iui-wizard-circle');
    // Main track content
    expect(container.querySelector('.iui-wizard-track-content')).toBeTruthy();
  });

  it('should render step correctly (current)', () => {
    const step = (
      <Step
        title='Current step'
        index={0}
        currentStepNumber={0}
        totalSteps={1}
        type='default'
      />
    );

    const { container, getByText } = render(step);

    // Renders as active
    const stepContainer = container.querySelector(
      '.iui-wizard-step.iui-current',
    ) as HTMLElement;
    expect(stepContainer).toBeTruthy();
    expect(stepContainer.className).not.toContain('iui-clickable');
    // Correct title
    const title = getByText('Current step');
    expect(title.className).toBe('iui-wizard-step-name');
    // Circle
    const circle = getByText('1');
    expect(circle.className).toBe('iui-wizard-circle');
    // Main track content
    expect(container.querySelector('.iui-wizard-track-content')).toBeTruthy();
  });

  it('should set dynamic inline width based on total steps', () => {
    const { container: container1 } = render(
      <Step
        title='Mock step'
        index={1}
        currentStepNumber={0}
        totalSteps={4}
        type='default'
      />,
    );

    const step1 = container1.querySelector('.iui-wizard-step') as HTMLElement;
    expect(step1).toBeTruthy();
    expect(step1.style.width).toEqual('25%');

    const { container: container2 } = render(
      <Step
        title='Mock step'
        index={1}
        currentStepNumber={1}
        totalSteps={8}
        type='default'
      />,
    );

    const step2 = container2.querySelector('.iui-wizard-step') as HTMLElement;
    expect(step2).toBeTruthy();
    expect(step2.style.width).toEqual('12.5%');
  });
});

describe.each(['long', 'workflow'] as const)('Wizard step (%s)', (type) => {
  it('should render correctly', () => {
    const step = (
      <Step
        title='Second step'
        index={1}
        currentStepNumber={0}
        totalSteps={3}
        type={type}
      />
    );

    const { container } = render(step);

    // Renders step
    expect(container.querySelector('.iui-wizard-step')).toBeTruthy();
    // No title
    expect(container.querySelector('.iui-wizard-step-name')).toBeFalsy();
    // Circle
    const circle = container.querySelector('.iui-wizard-circle') as HTMLElement;
    expect(circle).toBeTruthy();
    expect(circle.textContent).toBe(type === 'long' ? '2' : 'Second step');
    // Main track content
    expect(container.querySelector('.iui-wizard-track-content')).toBeTruthy();
  });

  it('should not set dynamic inline width', () => {
    const { container } = render(
      <Step
        title='Mock step'
        index={1}
        currentStepNumber={0}
        totalSteps={4}
        type={type}
      />,
    );

    const step = container.querySelector('.iui-wizard-step') as HTMLElement;
    expect(step).toBeTruthy();
    expect(step.style.width).toBeFalsy(); // not 25%
  });
});

it('should add className and style props correctly', () => {
  const { container } = render(
    <Step
      title='Mock step'
      index={1}
      currentStepNumber={0}
      totalSteps={4}
      type='default'
      className='custom-class'
      style={{ width: 50, color: 'red' }}
    />,
  );

  const step = container.querySelector(
    '.iui-wizard-step.custom-class',
  ) as HTMLElement;
  expect(step).toBeTruthy();
  expect(step.style.width).toEqual('50px');
  expect(step.style.color).toEqual('red');
});
