/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import type { StepperProps } from './Stepper.js';
import { WorkflowDiagramStep } from './WorkflowDiagramStep.js';

type WorkflowDiagramProps = Pick<StepperProps, 'steps'> & {
  /**
   *  Allows props to be passed for diagram
   */
  contentProps?: (index: number) => React.ComponentProps<'span'>;
  /**
   *  Allows props to be passed for diagram-wrapper
   */
  wrapperProps?: React.ComponentProps<'div'>;
};

export const WorkflowDiagram = React.forwardRef(
  (props: React.Ref<HTMLDivElement>) => {
    const { steps, className, contentProps, wrapperProps, ref, ...rest } =
      props;

    return (
      <Box as='div' {...wrapperProps}>
        <Box
          as='ol'
          className={cx('iui-workflow-diagram', className)}
          ref={ref}
          {...rest}
        >
          {steps.map((s, index) => {
            const thisContentProps = contentProps?.(index);
            return (
              <WorkflowDiagramStep
                contentProps={thisContentProps}
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
