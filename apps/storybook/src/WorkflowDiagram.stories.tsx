/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { WorkflowDiagram, WorkflowDiagramProps } from '@itwin/itwinui-react';

export default {
  title: 'Core/WorkflowDiagram',
  component: WorkflowDiagram,
  argTypes: {
    localization: { control: { disable: true } },
    onStepClick: { control: { disable: true } },
  },
} as Meta<WorkflowDiagramProps>;

export const Basic: Story<WorkflowDiagramProps> = (args) => {
  const {
    currentStep = 2,
    steps = [
      { name: 'Start' },
      { name: 'Set parameters' },
      { name: 'Invite collaborators' },
      { name: 'Review & Approve' },
      { name: 'Complete' },
    ],
    ...rest
  } = args;
  const onStepClick = (index: number) => {
    action(`Clicked index: ${index}`)();
  };
  return (
    <WorkflowDiagram
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
    { name: 'Start' },
    { name: 'Set parameters' },
    { name: 'Invite collaborators' },
    { name: 'Review & Approve' },
    { name: 'Complete' },
  ],
};

export const WithTooltips: Story<WorkflowDiagramProps> = (args) => {
  const {
    steps = [
      { name: 'Start', description: 'Start Tooltip' },
      { name: 'Set parameters', description: 'Set parameters Tooltip' },
      {
        name: 'Invite collaborators',
        description: 'Invite collaborators Tooltip',
      },
      { name: 'Review & Approve', description: 'Review & Approve Tooltip' },
      { name: 'Complete', description: 'Complete Tooltip' },
    ],
    ...rest
  } = args;
  const onStepClick = (index: number) => {
    action(`Clicked index: ${index}`)();
  };
  return <WorkflowDiagram steps={steps} onStepClick={onStepClick} {...rest} />;
};

WithTooltips.args = {
  steps: [
    { name: 'Start', description: 'Start Tooltip' },
    { name: 'Set parameters', description: 'Set parameters Tooltip' },
    {
      name: 'Invite collaborators',
      description: 'Invite collaborators Tooltip',
    },
    { name: 'Review & Approve', description: 'Review & Approve Tooltip' },
    { name: 'Complete', description: 'Complete Tooltip' },
  ],
};
