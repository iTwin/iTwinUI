/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useTheme } from '../utils/index.js';
import '@itwin/itwinui-css/css/workflow-diagram.css';
import type { StepperProps } from './Stepper.js';
import { WorkflowDiagramStep } from './WorkflowDiagramStep.js';

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
