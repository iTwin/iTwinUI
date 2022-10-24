/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Stepper, StepperProps, StepperLocalization } from './Stepper';
import { WorkflowDiagram } from './WorkflowDiagram';

export type WizardType = 'default' | 'long' | 'workflow';

export type WizardLocalization = StepperLocalization;

export type WizardProps = {
  /**
   *  The type of Wizard to display.
   *  @default 'default'
   */
  type?: WizardType;
} & Omit<StepperProps, 'type'>;

/**
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
