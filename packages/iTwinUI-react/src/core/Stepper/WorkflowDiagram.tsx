/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useTheme } from '../utils';
import '@itwin/itwinui-css/css/workflow-diagram.css';
import { StepperProps } from './Stepper';
import { WorkflowDiagramStep } from './WorkflowDiagramStep';

export type WorkflowDiagramProps = Pick<StepperProps, 'steps'>;

export const WorkflowDiagram = React.forwardRef<
  HTMLDivElement,
  WorkflowDiagramProps
>((props, ref) => {
  const { steps, ...rest } = props;

  useTheme();

  return (
    <div ref={ref}>
      <ol className={'iui-workflow-diagram'} {...rest}>
        {steps.map((s, index) => (
          <WorkflowDiagramStep
            key={index}
            title={s.name}
            description={s.description}
          />
        ))}
      </ol>
    </div>
  );
});

export default WorkflowDiagram;
