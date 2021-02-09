import { render } from '@testing-library/react';
import React from 'react';
import { Wizard } from './Wizard';

describe('<Wizard />', () => {
  it('default wizard renders all step names and numbers', () => {
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

  it('sets the active step to the step provided and raises onClick event on completed steps', () => {
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
    expect(secondStep.parentElement?.className).toContain(
      'iui-wizards-step-current',
    );
    const firstStep = getByText('Step One');
    firstStep.click();
    expect(mockedOnClick).toHaveBeenCalledWith(0);
    secondStep.click();
    expect(mockedOnClick).toHaveBeenCalledTimes(1);
  });

  it('sets the active step to the first step if step is less than 0', () => {
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
    expect(firstStep.parentElement?.className).toContain(
      'iui-wizards-step-current',
    );
  });

  it('sets the active step to the last step if the step is greater than number of steps', () => {
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
    expect(thirdStep.parentElement?.className).toContain(
      'iui-wizards-step-current',
    );
  });

  it('long wizard only displays summary of current step name', () => {
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

    getByText('Step 3 of 3:');
    getByText('Step Three');

    getByText('1');
    getByText('2');
    getByText('3');

    expect(queryByText('Step One')).toBeNull();
    expect(queryByText('Step Two')).toBeNull();
  });

  it('long wizard displays localized string', () => {
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

  it('workflow wizard displays all step names but no numbers', () => {
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
});
