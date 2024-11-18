/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Tooltip } from '../Tooltip/Tooltip.js';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

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
  /**
   * Custom content passed for completed step.
   */
  stepContent?: (index: number) => React.ReactNode;
  /**
   * Allows props to be passed for stepper step.
   */
  stepProps?: React.ComponentProps<'li'>;
  /**
   * Allows props to be passed for track content.
   */
  trackContentProps?: React.ComponentProps<'div'>;
  /**
   * Allows props to be passed for stepper-step circle.
   */
  circleProps?: React.ComponentProps<'span'>;
  /**
   * Allows props to be passed for stepper name.
   */
  nameProps?: React.ComponentProps<'span'>;
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
    stepProps,
    trackContentProps,
    circleProps,
    nameProps,
    stepContent,
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
      {...stepProps}
      className={cx(
        'iui-stepper-step',
        { 'iui-current': isActive, 'iui-clickable': isClickable },
        className,
        stepProps?.className,
      )}
      style={{
        inlineSize: type === 'default' ? `${100 / totalSteps}%` : undefined,
        ...style,
        ...stepProps?.style,
      }}
      onClick={onCompletedClick}
      onKeyDown={onKeyDown}
      aria-current={isActive ? 'step' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      ref={forwardedRef}
      {...rest}
    >
      <Box
        as='div'
        {...trackContentProps}
        className={cx(
          'iui-stepper-track-content',
          trackContentProps?.className,
        )}
      >
        <Box
          as='span'
          {...circleProps}
          className={cx('iui-stepper-circle', circleProps?.className)}
        >
          {stepContent && isPast ? stepContent(index) : index + 1}
        </Box>
      </Box>

      {type === 'default' && (
        <Box
          as='span'
          {...nameProps}
          className={cx('iui-stepper-step-name', nameProps?.className)}
        >
          {title}
        </Box>
      )}
    </Box>
  );

  return description ? (
    <Tooltip content={description}>{stepShape}</Tooltip>
  ) : (
    stepShape
  );
}) as PolymorphicForwardRefComponent<'li', StepperStepProps>;
