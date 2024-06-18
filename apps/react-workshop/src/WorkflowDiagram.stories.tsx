/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { WorkflowDiagram } from '@itwin/itwinui-react';

export default {
  title: 'WorkflowDiagram',
};

export const Basic = () => {
  return (
    <WorkflowDiagram
      steps={[
        { name: 'Start' },
        { name: 'Set parameters' },
        { name: 'Invite collaborators' },
        { name: 'Review & Approve' },
        { name: 'Complete' },
      ]}
    />
  );
};

export const WithTooltips = () => {
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
    />
  );
};
