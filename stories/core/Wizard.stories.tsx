// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { Wizard } from '../../src/core';
import { WizardProps } from '../../src/core/Wizard/Wizard';

export default {
  title: 'Core/Wizard',
  component: Wizard,
  parameters: {
    docs: {
      description: {
        component: 'Basic Wizard Component',
      },
    },
  },
  argTypes: {
    localization: { table: { disable: true } },
    onStepClick: { table: { disable: true } },
  },
} as Meta<WizardProps>;

export const Basic: Story<WizardProps> = (args) => {
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
    <Wizard
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

export const Long: Story<WizardProps> = (args) => {
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
    <Wizard
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

export const WorkflowDiagram: Story<WizardProps> = (args) => {
  const {
    currentStep = 1,
    steps = [
      { name: 'Start' },
      { name: 'Review & Approve' },
      { name: 'Complete' },
    ],
    type = 'workflow',
    ...rest
  } = args;
  const onStepClick = (index: number) => {
    action(`Clicked index: ${index}`)();
  };
  return (
    <Wizard
      type={type}
      currentStep={currentStep}
      steps={steps}
      onStepClick={onStepClick}
      {...rest}
    />
  );
};

WorkflowDiagram.args = {
  currentStep: 1,
  steps: [
    { name: 'Start' },
    { name: 'Review & Approve' },
    { name: 'Complete' },
  ],
  type: 'workflow',
};

export const LocalizedLong: Story<WizardProps> = (args) => {
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
  const localization = {
    stepsCountLabel: (currentStep, totalSteps) =>
      `Localized step ${currentStep} of ${totalSteps}:`,
  };
  const onStepClick = (index: number) => {
    action(`Clicked index: ${index}`)();
  };
  return (
    <Wizard
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
