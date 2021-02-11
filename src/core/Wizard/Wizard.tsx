// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import '@bentley/itwinui/css/wizards.css';
import cx from 'classnames';
import React from 'react';
import { useTheme } from '../utils/hooks/useTheme';
import { Step } from './Step';

export type WizardLocalization = {
  stepsCountLabel: (currentStep: number, totalSteps: number) => string;
};

export type WizardType = 'default' | 'long' | 'workflow';

export type StepProperties = {
  name: string;
};

export type WizardProps = {
  /**
   * Current step index, 0 - based.
   */
  currentStep: number;
  /**
   * An array of step objects.
   */
  steps: StepProperties[];
  /**
   *  The type of Wizard to display.
   *  @default 'default'
   */
  type?: WizardType;
  /**
   *  Option to provide localized strings.
   */
  localization?: WizardLocalization;
  /**
   *  Click handler on completed step.
   */
  onStepClick?: (clickedIndex: number) => void;
};

const defaultWizardLocalization: WizardLocalization = {
  stepsCountLabel: (currentStep, totalSteps) =>
    `Step ${currentStep} of ${totalSteps}:`,
};

/**
 * A Wizard.
 * Give it some steps.
 * Tell it what step to display.
 * Set the type if you'd like.
 * That's about it.
 * @example
 * <Wizard
 *  steps=[{name: "Step One"}, {name: "Step Two"}, {name: "Step Three"}]
 *  currentStep={0}
 *  type='long'
 *  />
 */

export const Wizard: React.FC<WizardProps> = ({
  currentStep,
  steps,
  type = 'default',
  localization = defaultWizardLocalization,
  onStepClick,
}) => {
  const boundedCurrentStep = Math.min(
    Math.max(0, currentStep),
    steps.length - 1,
  );

  useTheme();

  return (
    <>
      <div
        className={cx({
          'iui-wizards': type === 'default',
          'iui-wizards-long': type === 'long',
          'iui-wizards-workflow': type === 'workflow',
        })}
      >
        <div className='iui-wizards-wrapper'>
          {steps.map((s, index) => (
            <Step
              key={index}
              index={index}
              title={type === 'long' ? '' : s.name}
              currentStepNumber={boundedCurrentStep}
              totalSteps={steps.length}
              type={type}
              onClick={onStepClick}
            />
          ))}
        </div>
        {type === 'long' && (
          <p className='iui-wizards-steps'>
            <span className='iui-wizards-steps-count'>
              {localization.stepsCountLabel(
                boundedCurrentStep + 1,
                steps.length,
              )}
            </span>
            {steps[boundedCurrentStep].name}
          </p>
        )}
      </div>
    </>
  );
};

export default Wizard;
