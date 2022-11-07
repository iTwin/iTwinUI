/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { Tooltip } from '../Tooltip';
import { StylingProps } from '../utils';

export type StepperStepProps = {
  /**
   * The title/label of the step.
   */
  title: string;
  /**
   * the index of this step, 0-based.
   */
  index: number;
  /**
   * the Stepper's current step number, 0-based.
   */
  currentStepNumber: number;
  /**
   * number of total steps in the stepper.
   */
  totalSteps: number;
  /**
   * Stepper type.
   */
  type: 'default' | 'long';
  /**
   *  Click handler on completed step.
   */
  onClick?: (clickedIndex: number) => void;
  /**
   * A tooltip giving detailed description to this step.
   */
  description?: string;
} & StylingProps;

export const StepperStep = (props: StepperStepProps) => {
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

  const isPast = currentStepNumber > index;
  const isActive = currentStepNumber === index;
  const isClickable = isPast && !!onClick;

  const onCompletedClick = () => {
    if (isClickable) {
      onClick?.(index);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!isClickable) {
      return;
    }

    if (e.key === 'Enter' || e.key === 'Space' || e.key === ' ') {
      onCompletedClick();
    }
  };

  const stepShape = (
    <li
      className={cx(
        'iui-stepper-step',
        {
          'iui-current': isActive,
          'iui-clickable': isClickable,
        },
        className,
      )}
      style={{
        width: type === 'default' ? `${100 / totalSteps}%` : undefined,
        ...style,
      }}
      onClick={onCompletedClick}
      onKeyDown={onKeyDown}
      aria-current={isActive ? 'step' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      {...rest}
    >
      <div className='iui-stepper-track-content'>
        <span className='iui-stepper-circle'>{index + 1}</span>
      </div>

      {type === 'default' && (
        <span className='iui-stepper-step-name'>{title}</span>
      )}
    </li>
  );

  return description ? (
    <Tooltip content={description}>{stepShape}</Tooltip>
  ) : (
    stepShape
  );
};
