/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { Tooltip, TooltipProps } from '../Tooltip';

export type ThumbProps = {
  /**
   * Thumb value.
   */
  value: number;
  /**
   * Index of Thumb Value in Slider `values`.
   */
  index: number;
  /**
   * Minimum value for Thumb.
   */
  minVal: number;
  /**
   * Maximum value for Thumb.
   */
  maxVal: number;
  /**
   * Step value defines the value to increment Thumb value by during keyboard processing.
   */
  step: number;
  /**
   * Minimum value allowed for Slider.
   */
  sliderMin: number;
  /**
   * Maximum value allowed for Slider.
   */
  sliderMax: number;
  /**
   * true if the Thumb is being moved by pointer events.
   */
  isActive: boolean;
  /**
   * true if the Thumb is disabled.
   */
  disabled?: boolean;
  /**
   * Callback to invoke when Thumb receives a pointer down event.
   */
  onThumbActivated: (index: number) => void;
  /**
   * Callback to invoke when keyboard is used to modify Thumb value.
   */
  onThumbValueChanged: (index: number, value: number) => void;
  /**
   * Additional tooltip props.
   */
  tooltipProps: Omit<TooltipProps, 'children'>;
  /**
   * Additional props for Thumb.
   */
  thumbProps?: React.HTMLAttributes<HTMLDivElement>;
};

/**
 * Thumb is a local component used to show and modify the values maintained by the Slider.
 * Only one Thumb can be active at a time. A Thumb is made active when the user selects
 * it with pointer. Whenever a Thumb is active, focused, or hovered its tooltip is shown.
 */
export const Thumb = (props: ThumbProps) => {
  const {
    value,
    index,
    minVal,
    maxVal,
    step,
    sliderMin,
    sliderMax,
    isActive,
    onThumbActivated,
    onThumbValueChanged,
    tooltipProps,
    thumbProps,
    disabled,
  } = props;
  const thumbRef = React.useRef<HTMLDivElement>(null);
  const handleOnKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled || event.altKey) {
        return;
      }
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowDown':
          onThumbValueChanged(index, Math.max(value - step, minVal));
          return;
        case 'ArrowRight':
        case 'ArrowUp':
          onThumbValueChanged(index, Math.min(value + step, maxVal));
          return;
        case 'Home':
          onThumbValueChanged(index, minVal);
          return;
        case 'End':
          onThumbValueChanged(index, maxVal);
          return;
      }
    },
    [disabled, onThumbValueChanged, index, value, step, minVal, maxVal],
  );

  const handlePointerDownOnThumb = React.useCallback(() => {
    !disabled && onThumbActivated(index);
  }, [disabled, index, onThumbActivated]);

  const [hasFocus, setHasFocus] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  const leftPercent = (100.0 * (value - sliderMin)) / (sliderMax - sliderMin);
  const { style, className, ...rest } = thumbProps || {};

  return (
    <Tooltip
      visible={isActive || hasFocus || isHovered}
      content={tooltipProps.content}
      placement='top'
      {...tooltipProps}
    >
      <div
        {...rest}
        data-index={index}
        ref={thumbRef}
        style={{ ...style, left: `${leftPercent}%` }}
        className={cx(
          'iui-slider-thumb',
          { 'iui-active': isActive },
          className,
        )}
        role='slider'
        tabIndex={disabled ? undefined : 0}
        aria-valuemin={minVal}
        aria-valuenow={value}
        aria-valuemax={maxVal}
        aria-disabled={disabled}
        onPointerDown={handlePointerDownOnThumb}
        onKeyDown={handleOnKeyDown}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </Tooltip>
  );
};
