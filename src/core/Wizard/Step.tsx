// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import cx from 'classnames';
import React from 'react';
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
};

export const Step = ({
  title,
  index,
  currentStepNumber,
  totalSteps,
  type,
  onClick,
  ...rest
}: StepProps) => {
  const isLast = totalSteps === index + 1;
  const isPast = currentStepNumber > index;
  const isActive = currentStepNumber === index;

  const onCompletedClick = () => {
    if (isPast && !!onClick) {
      onClick(index);
    }
  };

  return (
    <>
      <span
        className={cx('iui-wizards-step', {
          'iui-wizards-step-completed': isPast,
          'iui-wizards-step-current': isActive,
          'iui-clickable': !!onClick && isPast,
        })}
        onClick={onCompletedClick}
        {...rest}
      >
        {index !== 0 && (
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
        {!isLast && (
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
