/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { Tooltip } from '../Tooltip';
import { StylingProps } from '../utils/props';
import { WizardType } from './Wizard';

export type StepProps = {
  /**
   * The title/label of the step.
   */
  title: string;
  /**
   * the index of this step, 0-based.
   */
  index: number;
  /**
   * the Wizard's current step number, 0-based.
   */
  currentStepNumber: number;
  /**
   * number of total steps in the wizard.
   */
  totalSteps: number;
  /**
   * Wizard type.
   */
  type: WizardType;
  /**
   *  Click handler on completed step.
   */
  onClick?: (clickedIndex: number) => void;
  /**
   * A tooltip giving detailed description to this step.
   */
  description?: string;
} & StylingProps;

export const Step = (props: StepProps) => {
  const {
    title,
    index,
    currentStepNumber,
    totalSteps,
    type,
    onClick,
    description,
    className,
    style,
    ...rest
  } = props;

  const isPast = type !== 'workflow' && currentStepNumber > index;
  const isActive = type !== 'workflow' && currentStepNumber === index;

  const onCompletedClick = () => {
    if (isPast && !!onClick) {
      onClick(index);
    }
  };

  const stepShape = (
    <li
      className={cx(
        'iui-wizard-step',
        {
          'iui-current': isActive,
          'iui-clickable': !!onClick && isPast,
        },
        className,
      )}
      style={{
        width: type === 'default' ? `${100 / totalSteps}%` : undefined,
        ...style,
      }}
      onClick={onCompletedClick}
      aria-current={isActive}
      {...rest}
    >
      <div className='iui-wizard-track-content'>
        <span className='iui-wizard-circle'>
          {type === 'workflow' ? title : index + 1}
        </span>
      </div>
      {type === 'default' && (
        <span className='iui-wizard-step-name'>{title}</span>
      )}
    </li>
  );

  return description ? (
    <Tooltip content={description}>{stepShape}</Tooltip>
  ) : (
    stepShape
  );
};
