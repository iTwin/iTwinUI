/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Box, type CommonProps } from '../utils/index.js';
import type { StepperStepProps } from './StepperStep.js';
import { Tooltip } from '../Tooltip/index.js';
export type WorkflowDiagramStepProps = Pick<
  StepperStepProps,
  'title' | 'description'
> &
  Omit<CommonProps, 'title'>;

export const WorkflowDiagramStep = (props: WorkflowDiagramStepProps) => {
  const { title, description, className, style, ...rest } = props;

  const stepShape = (
    <Box
      as='li'
      className={cx('iui-workflow-diagram-step', className)}
      style={style}
      {...rest}
    >
      <Box as='span' className='iui-workflow-diagram-content'>
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
