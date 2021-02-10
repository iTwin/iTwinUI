// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
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
    // Track after
    expect(
      container.querySelector('.iui-wizards-step-track-after'),
    ).toBeTruthy();
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
    // Track after
    expect(
      container.querySelector('.iui-wizards-step-track-after'),
    ).toBeTruthy();
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
    // Track before
    expect(
      container.querySelector('.iui-wizards-step-track-before'),
    ).toBeTruthy();
    // Correct title
    const title = getByText('Second step');
    expect(title.className).toBe('iui-wizards-step-title');
    // Track after
    expect(
      container.querySelector('.iui-wizards-step-track-after'),
    ).toBeTruthy();
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
    // Track before
    expect(
      container.querySelector('.iui-wizards-step-track-before'),
    ).toBeTruthy();
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
    // There is no track before
    expect(
      container.querySelector('.iui-wizards-step-track-before'),
    ).toBeNull();
    // No title
    expect(container.querySelector('iui-wizards-step-title')).toBeNull();
    // Track after
    expect(
      container.querySelector('.iui-wizards-step-track-after'),
    ).toBeTruthy();
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
    // Track before
    expect(
      container.querySelector('.iui-wizards-step-track-before'),
    ).toBeNull();
    // No title
    expect(container.querySelector('iui-wizards-step-title')).toBeNull();
    // Track after
    expect(
      container.querySelector('.iui-wizards-step-track-after'),
    ).toBeTruthy();
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
    // Track before
    expect(
      container.querySelector('.iui-wizards-step-track-before'),
    ).toBeTruthy();
    // No title
    expect(container.querySelector('iui-wizards-step-title')).toBeNull();
    // Track after
    expect(
      container.querySelector('.iui-wizards-step-track-after'),
    ).toBeTruthy();
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
    // Track before
    expect(
      container.querySelector('.iui-wizards-step-track-before'),
    ).toBeTruthy();
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
