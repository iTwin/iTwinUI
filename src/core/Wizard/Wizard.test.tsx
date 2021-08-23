/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, act } from '@testing-library/react';
import React from 'react';
import { Wizard } from './Wizard';

describe('<Wizard />', () => {
  it('should render all step names and numbers in default wizard', () => {
    const wizard = (
      <Wizard
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

    const { getByText } = render(wizard);

    getByText('1');
    getByText('2');
    getByText('3');

    getByText('Step One');
    getByText('Step Two');
    getByText('Step Three');
  });

  it('should set the active step to the step provided and raises onClick event on completed steps', () => {
    const mockedOnClick = jest.fn();
    const wizard = (
      <Wizard
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

    const { getByText } = render(wizard);
    const secondStep = getByText('Step Two');
    expect(secondStep.parentElement?.className).toContain('iui-current');
    const firstStep = getByText('Step One');
    firstStep.click();
    expect(mockedOnClick).toHaveBeenCalledWith(0);
    secondStep.click();
    expect(mockedOnClick).toHaveBeenCalledTimes(1);
  });

  it('should set the active step to the first step if step is less than 0', () => {
    const wizard = (
      <Wizard
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

    const { getByText } = render(wizard);
    const firstStep = getByText('Step One') as HTMLSpanElement;
    expect(firstStep.parentElement?.className).toContain('iui-current');
  });

  it('should set the active step to the last step if the step is greater than number of steps', () => {
    const wizard = (
      <Wizard
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

    const { getByText } = render(wizard);
    const thirdStep = getByText('Step Three') as HTMLSpanElement;
    expect(thirdStep.parentElement?.className).toContain('iui-current');
  });

  it('should only display summary of current step name in long wizard', () => {
    const wizard = (
      <Wizard
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

    const { getByText, queryByText } = render(wizard);

    expect(getByText('Step 3 of 3:')).toHaveClass('iui-steps-count');
    expect(getByText('Step Three')).toHaveClass('iui-wizard-steps-label');

    getByText('1');
    getByText('2');
    getByText('3');

    expect(queryByText('Step One')).toBeNull();
    expect(queryByText('Step Two')).toBeNull();
  });

  it('should display localized string in long wizard', () => {
    const wizard = (
      <Wizard
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

    const { getByText } = render(wizard);

    getByText('This is 2 of great 3:');
    getByText('Step Two');
  });

  it('should display all step names but no numbers in workflow diagram', () => {
    const wizard = (
      <Wizard
        currentStep={2}
        type='workflow'
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

    const { getByText, queryByText } = render(wizard);

    getByText('Step One');
    getByText('Step Two');
    getByText('Step Three');

    expect(queryByText('1')).toBeNull();
    expect(queryByText('2')).toBeNull();
    expect(queryByText('3')).toBeNull();
  });

  it('should display tooltip upon hovering step if description provided', () => {
    jest.useFakeTimers();

    const wizard = (
      <Wizard
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

    const { getByText, queryByText, container } = render(wizard);

    expect(container.querySelector('.iui-tooltip')).toBeNull();
    expect(queryByText('Step one tooltip')).toBeNull();
    act(() => {
      fireEvent.mouseEnter(getByText('Step One'), { bubbles: true });
    });
    expect(container.querySelector('.iui-tooltip')).not.toBeNull();
    getByText('Step one tooltip');

    act(() => {
      fireEvent.mouseLeave(getByText('Step One'), { bubbles: true });
    });
    jest.runAllTimers();
    expect(queryByText('Step one tooltip')).not.toBeVisible();

    act(() => {
      fireEvent.mouseEnter(getByText('Step Three'), { bubbles: true });
    });
    expect(container.querySelector('.iui-tooltip')).not.toBeVisible();

    jest.useRealTimers();
  });
});
