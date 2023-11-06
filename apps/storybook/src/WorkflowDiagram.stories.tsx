/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { WorkflowDiagram } from '@itwin/itwinui-react';

export default {
  title: 'Core/WorkflowDiagram',
  component: WorkflowDiagram,
};

export const Basic = () => {
  const onStepClick = (index: number) => {
    console.log(`Clicked index: ${index}`);
  };
  return (
    <WorkflowDiagram
      currentStep={2}
      steps={[
        { name: 'Start' },
        { name: 'Set parameters' },
        { name: 'Invite collaborators' },
        { name: 'Review & Approve' },
        { name: 'Complete' },
      ]}
      onStepClick={onStepClick}
    />
  );
};

export const WithTooltips = () => {
  const onStepClick = (index: number) => {
    console.log(`Clicked index: ${index}`);
  };
  return (
    <WorkflowDiagram
      steps={[
        { name: 'Start', description: 'Start Tooltip' },
        { name: 'Set parameters', description: 'Set parameters Tooltip' },
        {
          name: 'Invite collaborators',
          description: 'Invite collaborators Tooltip',
        },
        { name: 'Review & Approve', description: 'Review & Approve Tooltip' },
        { name: 'Complete', description: 'Complete Tooltip' },
      ]}
      onStepClick={onStepClick}
    />
  );
};
