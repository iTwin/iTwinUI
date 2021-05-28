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

  const isLast = totalSteps === index + 1;
  const isPast = currentStepNumber > index;
  const isActive = currentStepNumber === index;

  const onCompletedClick = () => {
    if (isPast && !!onClick) {
      onClick(index);
    }
  };

  const stepShape = (
    <span
      className={cx(
        'iui-wizards-step',
        {
          'iui-wizards-step-completed': isPast,
          'iui-wizards-step-current': isActive,
          'iui-clickable': !!onClick && isPast,
        },
        className,
      )}
      style={{
        width: type === 'default' ? `${100 / totalSteps}%` : undefined,
        ...style,
      }}
      onClick={onCompletedClick}
      {...rest}
    >
      {index !== 0 && type === 'default' && (
        <span
          className={cx(
            'iui-wizards-step-track',
            'iui-wizards-step-track-before',
          )}
        />
      )}

      {type !== 'workflow' && (
        <span className='iui-wizards-step-title'>{title}</span>
      )}
      {!isLast && type === 'default' && (
        <span
          className={cx(
            'iui-wizards-step-track',
            'iui-wizards-step-track-after',
          )}
        />
      )}
      <span className='iui-wizards-step-circle'>
        {type === 'workflow' ? title : index + 1}
      </span>
    </span>
  );

  return (
    <>
      {description ? (
        <Tooltip content={description}>{stepShape}</Tooltip>
      ) : (
        stepShape
      )}
      {!isLast && (
        <span
          className={cx(
            'iui-wizards-step-track',
            'iui-wizards-step-track-main',
            {
              'iui-wizards-step-track-filled': type !== 'workflow' && isPast,
            },
          )}
        />
      )}
    </>
  );
};
