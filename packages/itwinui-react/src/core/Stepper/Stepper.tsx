/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useTheme } from '../utils';
import '@itwin/itwinui-css/css/stepper.css';
import { StepperStep } from './StepperStep';

export type StepperLocalization = {
  stepsCountLabel: (currentStep: number, totalSteps: number) => string;
};

export type StepProperties = {
  /**
   * The title/label of the step.
   */
  name: string;
  /**
   * A tooltip giving detailed description to this step.
   */
  description?: string;
};

export type StepperProps = {
  /**
   * Current step index, 0 - based.
   */
  currentStep?: number;
  /**
   * An array of step objects.
   */
  steps: StepProperties[];
  /**
   *  The type of Stepper to display.
   *  @default 'default'
   */
  type?: 'default' | 'long';
  /**
   *  Option to provide localized strings.
   */
  localization?: StepperLocalization;
  /**
   *  Click handler on completed step.
   */
  onStepClick?: (clickedIndex: number) => void;
};

const defaultStepperLocalization: StepperLocalization = {
  stepsCountLabel: (currentStep, totalSteps) =>
    `Step ${currentStep} of ${totalSteps}:`,
};

export const Stepper = React.forwardRef(
  (props: StepperProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      currentStep,
      steps,
      type = 'default',
      localization = defaultStepperLocalization,
      onStepClick,
      ...rest
    } = props;

    const boundedCurrentStep = Math.min(
      Math.max(0, currentStep ?? 0),
      steps.length - 1,
    );

    useTheme();

    return (
      <div className={'iui-stepper'} ref={ref} {...rest}>
        <ol>
          {steps.map((s, index) => (
            <StepperStep
              key={index}
              index={index}
              title={type === 'long' ? '' : s.name}
              currentStepNumber={boundedCurrentStep}
              totalSteps={steps.length}
              type={type}
              onClick={onStepClick}
              description={s.description}
            />
          ))}
        </ol>
        {type === 'long' && (
          <div className='iui-stepper-steps-label'>
            <span className='iui-stepper-steps-label-count'>
              {localization.stepsCountLabel(
                boundedCurrentStep + 1,
                steps.length,
              )}
            </span>
            {steps[boundedCurrentStep].name}
          </div>
        )}
      </div>
    );
  },
);

export default Stepper;
