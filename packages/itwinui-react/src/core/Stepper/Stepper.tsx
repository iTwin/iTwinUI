/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { StepperStep } from './StepperStep.js';

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
} & React.ComponentProps<'li'>;

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
   * Custom content passed for completed steps.
   */
  stepCircleRenderer?: (completedIndex: number) => React.ReactNode;
  /**
   *  Click handler on completed step.
   */
  onStepClick?: (clickedIndex: number) => void;
  /**
   * Callback that can provide additional props for `<li>` representing a step.
   */
  stepProps?: (index: number) => React.ComponentProps<'li'>;
  /**
   * Allows props to be passed for track content.
   */
  trackContentProps?: (index: number) => React.ComponentProps<'div'>;
  /**
   * Allows props to be passed for circle.
   */
  circleProps?: (index: number) => React.ComponentProps<'span'>;
  /**
   * Allows props to be passed for name.
   */
  nameProps?: (index: number) => React.ComponentProps<'span'>;
  /**
   * Allows props to be passed for label.
   */
  labelProps?: React.ComponentProps<'div'>;
  /**
   * Allows props to be passed for label count.
   */
  labelCountProps?: React.ComponentProps<'span'>;
};

const defaultStepperLocalization: StepperLocalization = {
  stepsCountLabel: (currentStep, totalSteps) =>
    `Step ${currentStep} of ${totalSteps}:`,
};

export const Stepper = React.forwardRef((props, ref) => {
  const {
    currentStep,
    steps,
    type = 'default',
    localization = defaultStepperLocalization,
    stepCircleRenderer,
    onStepClick,
    stepProps,
    trackContentProps,
    circleProps,
    nameProps,
    labelProps,
    labelCountProps,
    ...rest
  } = props;

  const boundedCurrentStep = Math.min(
    Math.max(0, currentStep ?? 0),
    steps.length - 1,
  );

  return (
    <Box className={'iui-stepper'} ref={ref} {...rest}>
      <ol>
        {steps.map((s, index) => {
          const thisStepProps = stepProps?.(index);
          const thisTrackContentProps = trackContentProps?.(index);
          const thisCircleProps = circleProps?.(index);
          const thisNameProps = nameProps?.(index);
          return (
            <StepperStep
              stepProps={thisStepProps}
              trackContentProps={thisTrackContentProps}
              circleProps={thisCircleProps}
              nameProps={thisNameProps}
              key={index}
              index={index}
              title={type === 'long' ? '' : s.name}
              currentStepNumber={boundedCurrentStep}
              totalSteps={steps.length}
              type={type}
              onClick={onStepClick}
              description={s.description}
              stepCircleRenderer={stepCircleRenderer}
            />
          );
        })}
      </ol>
      {type === 'long' && (
        <Box
          as='div'
          {...labelProps}
          className={cx('iui-stepper-steps-label', labelProps?.className)}
        >
          <Box
            as='span'
            {...labelCountProps}
            className={cx(
              'iui-stepper-steps-label-count',
              labelCountProps?.className,
            )}
          >
            {localization.stepsCountLabel(boundedCurrentStep + 1, steps.length)}
          </Box>
          {steps[boundedCurrentStep].name}
        </Box>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', StepperProps>;
if (process.env.NODE_ENV === 'development') {
  Stepper.displayName = 'Stepper';
}
