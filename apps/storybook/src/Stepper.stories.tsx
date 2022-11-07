/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import {
  Stepper,
  StepperLocalization,
  StepperProps,
} from '@itwin/itwinui-react';

export default {
  title: 'Core/Stepper',
  component: Stepper,
  argTypes: {
    localization: { control: { disable: true } },
    onStepClick: { control: { disable: true } },
  },
} as Meta<StepperProps>;

export const Basic: Story<StepperProps> = (args) => {
  const {
    currentStep = 2,
    steps = [
      { name: 'First Step' },
      { name: 'Completed Step' },
      { name: 'Current Step' },
      { name: 'Next Step' },
      { name: 'Last Step' },
    ],
    ...rest
  } = args;
  const onStepClick = (index: number) => {
    action(`Clicked index: ${index}`)();
  };
  return (
    <Stepper
      currentStep={currentStep}
      steps={steps}
      onStepClick={onStepClick}
      {...rest}
    />
  );
};

Basic.args = {
  currentStep: 2,
  steps: [
    { name: 'First Step' },
    { name: 'Completed Step' },
    { name: 'Current Step' },
    { name: 'Next Step' },
    { name: 'Last Step' },
  ],
};

export const Long: Story<StepperProps> = (args) => {
  const {
    currentStep = 2,
    steps = [
      { name: 'First Step' },
      { name: 'Completed Step' },
      { name: 'Current Step' },
      { name: 'Next Step' },
      { name: 'Last Step' },
    ],
    type = 'long',
    ...rest
  } = args;
  const onStepClick = (index: number) => {
    action(`Clicked index: ${index}`)();
  };
  return (
    <Stepper
      type={type}
      currentStep={currentStep}
      steps={steps}
      onStepClick={onStepClick}
      {...rest}
    />
  );
};

Long.args = {
  currentStep: 2,
  steps: [
    { name: 'First Step' },
    { name: 'Completed Step' },
    { name: 'Current Step' },
    { name: 'Next Step' },
    { name: 'Last Step' },
  ],
  type: 'long',
};

export const LocalizedLong: Story<StepperProps> = (args) => {
  const {
    currentStep = 2,
    steps = [
      { name: 'First Step' },
      { name: 'Completed Step' },
      { name: 'Current Step' },
      { name: 'Next Step' },
      { name: 'Last Step' },
    ],
    type = 'long',
    ...rest
  } = args;
  const localization: StepperLocalization = {
    stepsCountLabel: (currentStep, totalSteps) =>
      `Localized step ${currentStep} of ${totalSteps}:`,
  };
  const onStepClick = (index: number) => {
    action(`Clicked index: ${index}`)();
  };
  return (
    <Stepper
      type={type}
      currentStep={currentStep}
      steps={steps}
      localization={localization}
      onStepClick={onStepClick}
      {...rest}
    />
  );
};

LocalizedLong.args = {
  currentStep: 2,
  steps: [
    { name: 'First Step' },
    { name: 'Completed Step' },
    { name: 'Current Step' },
    { name: 'Next Step' },
    { name: 'Last Step' },
  ],
  type: 'long',
};

export const WithTooltips: Story<StepperProps> = (args) => {
  const {
    currentStep = 2,
    steps = [
      { name: 'First Step', description: 'First Tooltip' },
      { name: 'Completed Step', description: 'Completed Tooltip' },
      { name: 'Current Step', description: 'Current Tooltip' },
      { name: 'Next Step', description: 'Next Tooltip' },
      { name: 'Last Step', description: 'Last Tooltip' },
    ],
    ...rest
  } = args;
  const onStepClick = (index: number) => {
    action(`Clicked index: ${index}`)();
  };
  return (
    <Stepper
      currentStep={currentStep}
      steps={steps}
      onStepClick={onStepClick}
      {...rest}
    />
  );
};

WithTooltips.args = {
  currentStep: 2,
  steps: [
    { name: 'First Step', description: 'First Step Description' },
    { name: 'Completed Step', description: 'Completed Step Description' },
    { name: 'Current Step', description: 'Current Step Description' },
    { name: 'Next Step', description: 'Next Step Description' },
    { name: 'Last Step', description: 'Last Step Description' },
  ],
};
