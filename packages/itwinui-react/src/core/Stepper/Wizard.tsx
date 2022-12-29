/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Stepper, StepperProps, StepperLocalization } from './Stepper';
import { WorkflowDiagram } from './WorkflowDiagram';

/**
 * @deprecated Since v2:
 *
 * - For `default` | `long`, use `StepperType` with `Stepper` instead
 * - For `workflow`, use `WorkflowDiagram` instead
 */
export type WizardType = 'default' | 'long' | 'workflow';

/**
 * @deprecated Since v2, use `StepperLocalization` with `Stepper`
 */
export type WizardLocalization = StepperLocalization;

/**
 * @deprecated Since v2, use `StepperProps` with `Stepper` or `WorkflowDiagramProps` with `WorkflowDiagram`
 */
export type WizardProps = {
  /**
   *  The type of Wizard to display.
   *  @default 'default'
   */
  type?: WizardType;
} & Omit<StepperProps, 'type'>;

/**
 * @deprecated Since v2, use `Stepper` (type = `default` | `long`) or WorkflowDiagram (type = `workflow`)
 *
 * A wizard displays progress through a sequence of logical and numbered steps.
 * It may also be used for navigation.
 *
 * The `type` can be set to 'long' to show labels under steps.
 *
 * @example
 * <Wizard
 *  steps=[{name: "Step One"}, {name: "Step Two"}, {name: "Step Three"}]
 *  currentStep={0}
 *  type='long'
 *  />
 */
export const Wizard = React.forwardRef<HTMLDivElement, WizardProps>(
  (props, ref) => {
    const {
      currentStep,
      steps,
      type = 'default',
      localization,
      onStepClick,
      ...rest
    } = props;

    return type !== 'workflow' ? (
      <Stepper
        type={type}
        currentStep={currentStep}
        steps={steps}
        localization={localization}
        onStepClick={onStepClick}
        ref={ref}
        {...rest}
      />
    ) : (
      <WorkflowDiagram steps={steps} ref={ref} {...rest} />
    );
  },
);

export default Wizard;
