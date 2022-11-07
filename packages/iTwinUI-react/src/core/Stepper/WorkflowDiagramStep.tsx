/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { Tooltip } from '../Tooltip';
import { StylingProps } from '../utils';
import { StepperStepProps } from './StepperStep';

export type WorkflowDiagramStepProps = Pick<
  StepperStepProps,
  'title' | 'description'
> &
  StylingProps;

export const WorkflowDiagramStep = (props: WorkflowDiagramStepProps) => {
  const { title, description, className, style, ...rest } = props;

  const stepShape = (
    <li
      className={cx('iui-workflow-diagram-step', className)}
      style={style}
      {...rest}
    >
      <span className='iui-workflow-diagram-content'>{title}</span>
    </li>
  );

  return description ? (
    <Tooltip content={description}>{stepShape}</Tooltip>
  ) : (
    stepShape
  );
};
