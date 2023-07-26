/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Tooltip } from '../Tooltip/index.js';
import { Box, type CommonProps } from '../utils/index.js';
import type { StepperProps } from './Stepper.js';
import type { StepperStepProps } from './StepperStep.js';

export type WorkflowDiagramStepProps = Pick<
  StepperStepProps,
  'title' | 'description'
> &
  Pick<StepperProps, 'contentProps'> &
  Omit<CommonProps, 'title'>;

export const WorkflowDiagramStep = (props: WorkflowDiagramStepProps) => {
  const { title, description, className, style, contentProps, ...rest } = props;

  const stepShape = (
    <Box
      as='li'
      className={cx('iui-workflow-diagram-step', className)}
      style={style}
      {...rest}
    >
      <Box
        as='span'
        {...contentProps}
        className={cx('iui-workflow-diagram-content', contentProps?.className)}
      >
        {title}
      </Box>
    </Box>
  );

  return description ? (
    <Tooltip content={description}>{stepShape}</Tooltip>
  ) : (
    stepShape
  );
};
