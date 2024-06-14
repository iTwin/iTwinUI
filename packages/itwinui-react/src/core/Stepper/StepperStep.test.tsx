/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from '@testing-library/react';
import { StepperStep } from './StepperStep.js';

describe('Stepper step (default)', () => {
  it('should render step correctly (past)', () => {
    const mockedClick = vi.fn();
    const step = (
      <StepperStep
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
      '.iui-stepper-step',
    ) as HTMLElement;
    expect(stepContainer).toBeTruthy();
    expect(stepContainer.className).toContain('iui-clickable');
    stepContainer.click();
    expect(mockedClick).toHaveBeenCalledTimes(1);

    // Handles keypresses
    fireEvent.keyDown(stepContainer, { key: 'Enter' });
    expect(mockedClick).toHaveBeenCalledTimes(2);
    fireEvent.keyDown(stepContainer, { key: 'Space' });
    expect(mockedClick).toHaveBeenCalledTimes(3);
    fireEvent.keyDown(stepContainer, { key: 'Esc' });
    expect(mockedClick).toHaveBeenCalledTimes(3);

    // Correct tabindex
    expect(stepContainer).toHaveAttribute('tabindex', '0');

    // Correct title
    const title = getByText('First step');
    expect(title.className).toBe('iui-stepper-step-name');
    // Circle
    const circle = getByText('1');
    expect(circle.className).toBe('iui-stepper-circle');
    // Main track content
    expect(container.querySelector('.iui-stepper-track-content')).toBeTruthy();
  });

  it('should render step correctly (future)', () => {
    const mockedClick = vi.fn();
    const step = (
      <StepperStep
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
      '.iui-stepper-step',
    ) as HTMLElement;
    expect(stepContainer).toBeTruthy();
    expect(stepContainer.className).not.toContain('iui-clickable');

    // Ignores clicks and keypresses
    stepContainer.click();
    expect(mockedClick).not.toHaveBeenCalled();
    fireEvent.keyDown(stepContainer, { key: 'Enter' });
    expect(mockedClick).not.toHaveBeenCalled();
    // No tabindex
    expect(stepContainer).not.toHaveAttribute('tabindex');

    // Correct title
    const title = getByText('Second step');
    expect(title.className).toBe('iui-stepper-step-name');
    // Circle
    const circle = getByText('2');
    expect(circle.className).toBe('iui-stepper-circle');
    // Main track content
    expect(container.querySelector('.iui-stepper-track-content')).toBeTruthy();
  });

  it('should render step correctly (current)', () => {
    const mockedClick = vi.fn();
    const step = (
      <StepperStep
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
      '.iui-stepper-step.iui-current',
    ) as HTMLElement;
    expect(stepContainer).toBeTruthy();
    expect(stepContainer.className).not.toContain('iui-clickable');

    // Ignores clicks and keypresses
    stepContainer.click();
    expect(mockedClick).not.toHaveBeenCalled();
    fireEvent.keyDown(stepContainer, { key: 'Enter' });
    expect(mockedClick).not.toHaveBeenCalled();
    // No tabindex
    expect(stepContainer).not.toHaveAttribute('tabindex');

    // Correct title
    const title = getByText('Current step');
    expect(title.className).toBe('iui-stepper-step-name');
    // Circle
    const circle = getByText('1');
    expect(circle.className).toBe('iui-stepper-circle');
    // Main track content
    expect(container.querySelector('.iui-stepper-track-content')).toBeTruthy();
  });

  it('should correctly pass custom className through stepProps, trackContentProps, circleProps, and nameProps', () => {
    const mockedClick = vi.fn();
    const step = (
      <StepperStep
        title='First step'
        index={0}
        currentStepNumber={1}
        totalSteps={3}
        type='default'
        onClick={mockedClick}
        stepProps={{ className: 'some-class' }}
        trackContentProps={{ className: 'some-content' }}
        circleProps={{ className: 'some-circle' }}
        nameProps={{ className: 'some-name' }}
      />
    );

    const { container } = render(step);

    expect(
      container.querySelector('.iui-stepper-step.some-class'),
    ).toBeTruthy();

    expect(
      container.querySelector('.iui-stepper-track-content.some-content'),
    ).toBeTruthy();

    expect(
      container.querySelector('.iui-stepper-circle.some-circle'),
    ).toBeTruthy();

    expect(
      container.querySelector('.iui-stepper-step-name.some-name'),
    ).toBeTruthy();
  });

  it('should set dynamic inline width based on total steps', () => {
    const { container: container1 } = render(
      <StepperStep
        title='Mock step'
        index={1}
        currentStepNumber={0}
        totalSteps={4}
        type='default'
      />,
    );

    const step1 = container1.querySelector('.iui-stepper-step') as HTMLElement;
    expect(step1).toBeTruthy();
    expect(step1.style.inlineSize).toEqual('25%');

    const { container: container2 } = render(
      <StepperStep
        title='Mock step'
        index={1}
        currentStepNumber={1}
        totalSteps={8}
        type='default'
      />,
    );

    const step2 = container2.querySelector('.iui-stepper-step') as HTMLElement;
    expect(step2).toBeTruthy();
    expect(step2.style.inlineSize).toEqual('12.5%');
  });
});

describe('Stepper step (long)', () => {
  it('should render correctly', () => {
    const mockedClick = vi.fn();
    const step = (
      <StepperStep
        title='Second step'
        index={1}
        currentStepNumber={0}
        totalSteps={3}
        type={'long'}
        onClick={mockedClick}
      />
    );

    const { container } = render(step);

    // Renders step
    const stepContainer = container.querySelector(
      '.iui-stepper-step',
    ) as HTMLElement;
    expect(stepContainer).toBeTruthy();

    // Ignores clicks and keypresses
    stepContainer.click();
    expect(mockedClick).not.toHaveBeenCalled();
    fireEvent.keyDown(stepContainer, { key: 'Enter' });
    expect(mockedClick).not.toHaveBeenCalled();

    // No tabindex
    expect(stepContainer).not.toHaveAttribute('tabindex');

    // No title
    expect(container.querySelector('.iui-stepper-step-name')).toBeFalsy();
    // Circle
    const circle = container.querySelector(
      '.iui-stepper-circle',
    ) as HTMLElement;
    expect(circle).toBeTruthy();
    expect(circle.textContent).toBe('2');
    // Main track content
    expect(container.querySelector('.iui-stepper-track-content')).toBeTruthy();
  });

  it('should not set dynamic inline width', () => {
    const { container } = render(
      <StepperStep
        title='Mock step'
        index={1}
        currentStepNumber={0}
        totalSteps={4}
        type={'long'}
      />,
    );

    const step = container.querySelector('.iui-stepper-step') as HTMLElement;
    expect(step).toBeTruthy();
    expect(step.style.inlineSize).toBeFalsy(); // not 25%
  });
});

it('should add className and style props correctly', () => {
  const { container } = render(
    <StepperStep
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
    '.iui-stepper-step.custom-class',
  ) as HTMLElement;
  expect(step).toBeTruthy();
  expect(step.style.width).toEqual('50px');
  expect(step.style.color).toEqual('red');
});
