/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Box } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import type { StepperProps } from './Stepper.js';
import { WorkflowDiagramStep } from './WorkflowDiagramStep.js';

type WorkflowDiagramProps = Pick<StepperProps, 'steps'> &
  Pick<StepperProps, 'diagramProps'>;

export const WorkflowDiagram = React.forwardRef(
  // TODO: Remove this ref cast. ref and rest props should be applied on the same element
  (props, ref: React.Ref<HTMLDivElement>) => {
    const { steps, diagramProps, ...rest } = props;

    return (
      <Box ref={ref}>
        <Box as='ol' className='iui-workflow-diagram' {...rest}>
          {steps.map((s, index) => {
            const thisDiagramProps = diagramProps?.(index);
            return (
              <WorkflowDiagramStep
                diagramProps={thisDiagramProps}
                key={index}
                title={s.name}
                description={s.description}
              />
            );
          })}
        </Box>
      </Box>
    );
  },
) as PolymorphicForwardRefComponent<'ol', WorkflowDiagramProps>;

export default WorkflowDiagram;
