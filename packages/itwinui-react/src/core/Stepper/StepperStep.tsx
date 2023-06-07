/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { OldTooltip } from '../Tooltip/index.js';
import { Box } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';

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
};

export const StepperStep = React.forwardRef((props, forwardedRef) => {
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
    if (e.altKey) {
      return;
    }

    if (!isClickable) {
      return;
    }

    if (e.key === 'Enter' || e.key === 'Space' || e.key === ' ') {
      onCompletedClick();
    }
  };

  const stepShape = (
    <Box
      as='li'
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
      ref={forwardedRef}
      {...rest}
    >
      <Box className='iui-stepper-track-content'>
        <Box as='span' className='iui-stepper-circle'>
          {index + 1}
        </Box>
      </Box>

      {type === 'default' && (
        <Box as='span' className='iui-stepper-step-name'>
          {title}
        </Box>
      )}
    </Box>
  );

  return description ? (
    <OldTooltip content={description}>{stepShape}</OldTooltip>
  ) : (
    stepShape
  );
}) as PolymorphicForwardRefComponent<'li', StepperStepProps>;
