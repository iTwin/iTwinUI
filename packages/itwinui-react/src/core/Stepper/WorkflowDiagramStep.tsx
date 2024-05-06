/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Tooltip } from '../Tooltip/Tooltip.js';
import { Box, type CommonProps } from '../../utils/index.js';
import type { StepperStepProps } from './StepperStep.js';

export type WorkflowDiagramStepProps = {
  /**
   *  Allows props to be passed for diagram content.
   */
  contentProps?: React.ComponentProps<'span'>;
} & Pick<StepperStepProps, 'title' | 'description'> &
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
