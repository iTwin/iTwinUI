/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { screen, render, fireEvent, act } from '@testing-library/react';
import { Stepper } from './Stepper.js';
import { SvgCheckmarkSmall } from '../../utils/index.js';

it('should render all step names and numbers in default stepper', () => {
  const stepper = (
    <Stepper
      currentStep={0}
      steps={[
        {
          name: 'Step One',
        },
        {
          name: 'Step Two',
        },
        {
          name: 'Step Three',
        },
      ]}
    />
  );

  const { getByText } = render(stepper);

  getByText('1');
  getByText('2');
  getByText('3');

  getByText('Step One');
  getByText('Step Two');
  getByText('Step Three');
});

it('should add custom props to Stepper', () => {
  const stepper = (
    <Stepper
      currentStep={1}
      type='long'
      localization={{
        stepsCountLabel: (currentStep, totalSteps) =>
          `This is ${currentStep} of great ${totalSteps}:`,
      }}
      steps={[
        {
          name: 'Step One',
        },
        {
          name: 'Step Two',
        },
        {
          name: 'Step Three',
        },
      ]}
      labelProps={{ className: 'some-label' }}
      labelCountProps={{ className: 'some-count' }}
    />
  );

  const { container } = render(stepper);

  expect(
    container.querySelector('.iui-stepper-steps-label.some-label'),
  ).toBeTruthy();
  expect(
    container.querySelector('.iui-stepper-steps-label-count.some-count'),
  ).toBeTruthy();
});

it('should pass custom icon for completed steps', () => {
  const stepper = (
    <Stepper
      currentStep={3}
      steps={[
        {
          name: 'Step One',
          stepContent: () => (
            <span className={`test-icon`}>
              <SvgCheckmarkSmall />
            </span>
          ),
        },
        {
          name: 'Step Two',
          stepContent: () => (
            <span className={`test-icon`}>
              <SvgCheckmarkSmall />
            </span>
          ),
        },
        {
          name: 'Step Three',
          stepContent: () => (
            <span className={`test-icon`}>
              <SvgCheckmarkSmall />
            </span>
          ),
        },
      ]}
    />
  );

  const { container } = render(stepper);
  const completedSteps = container.querySelectorAll('.test-icon');
  expect(completedSteps).toHaveLength(3);
});

it('should set the active step to the step provided and raises onClick event on completed steps', () => {
  const mockedOnClick = vi.fn();
  const stepper = (
    <Stepper
      currentStep={1}
      onStepClick={mockedOnClick}
      steps={[
        {
          name: 'Step One',
        },
        {
          name: 'Step Two',
        },
        {
          name: 'Step Three',
        },
      ]}
    />
  );

  const { getByText } = render(stepper);
  const secondStep = getByText('Step Two');
  expect(secondStep.parentElement?.className).toContain('iui-current');
  const firstStep = getByText('Step One');
  firstStep.click();
  expect(mockedOnClick).toHaveBeenCalledWith(0);
  secondStep.click();
  expect(mockedOnClick).toHaveBeenCalledTimes(1);
});

it('should set the active step to the first step if step is less than 0', () => {
  const stepper = (
    <Stepper
      currentStep={-2}
      steps={[
        {
          name: 'Step One',
        },
        {
          name: 'Step Two',
        },
        {
          name: 'Step Three',
        },
      ]}
    />
  );

  const { getByText } = render(stepper);
  const firstStep = getByText('Step One') as HTMLSpanElement;
  expect(firstStep.parentElement?.className).toContain('iui-current');
});

it('should set the active step to the last step if the step is greater than number of steps', () => {
  const stepper = (
    <Stepper
      currentStep={42}
      steps={[
        {
          name: 'Step One',
        },
        {
          name: 'Step Two',
        },
        {
          name: 'Step Three',
        },
      ]}
    />
  );

  const { getByText } = render(stepper);
  const thirdStep = getByText('Step Three') as HTMLSpanElement;
  expect(thirdStep.parentElement?.className).toContain('iui-current');
});

it('should only display summary of current step name in long stepper', () => {
  const stepper = (
    <Stepper
      currentStep={2}
      type='long'
      steps={[
        {
          name: 'Step One',
        },
        {
          name: 'Step Two',
        },
        {
          name: 'Step Three',
        },
      ]}
    />
  );

  const { getByText, queryByText } = render(stepper);

  expect(getByText('Step 3 of 3:')).toHaveClass(
    'iui-stepper-steps-label-count',
  );
  expect(getByText('Step Three')).toHaveClass('iui-stepper-steps-label');

  getByText('1');
  getByText('2');
  getByText('3');

  expect(queryByText('Step One')).toBeNull();
  expect(queryByText('Step Two')).toBeNull();
});

it('should display localized string in long stepper', () => {
  const stepper = (
    <Stepper
      currentStep={1}
      type='long'
      localization={{
        stepsCountLabel: (currentStep, totalSteps) =>
          `This is ${currentStep} of great ${totalSteps}:`,
      }}
      steps={[
        {
          name: 'Step One',
        },
        {
          name: 'Step Two',
        },
        {
          name: 'Step Three',
        },
      ]}
    />
  );

  const { getByText } = render(stepper);

  getByText('This is 2 of great 3:');
  getByText('Step Two');
});

it('should display tooltip upon hovering step if description provided', async () => {
  vi.useFakeTimers();

  const stepper = (
    <Stepper
      currentStep={1}
      steps={[
        {
          name: 'Step One',
          description: 'Step one tooltip',
        },
        {
          name: 'Step Two',
          description: 'Step two tooltip',
        },
        {
          name: 'Step Three',
        },
      ]}
    />
  );

  render(stepper);

  expect(document.querySelector('.iui-tooltip')).not.toBeVisible();
  fireEvent.mouseEnter(screen.getByText('Step One'), { bubbles: true });
  act(() => void vi.advanceTimersByTime(200));
  const tooltip = document.querySelector('.iui-tooltip') as HTMLElement;
  expect(tooltip).toBeVisible();
  expect(tooltip).toHaveTextContent('Step one tooltip');

  fireEvent.mouseLeave(screen.getByText('Step One'), { bubbles: true });
  act(() => void vi.advanceTimersByTime(250));

  fireEvent.mouseEnter(screen.getByText('Step Three'), { bubbles: true });
  act(() => void vi.advanceTimersByTime(200));
  expect(tooltip).not.toBeVisible();

  vi.useRealTimers();
});
