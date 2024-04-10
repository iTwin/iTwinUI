/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { getBoundedValue, useEventListener, Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { Track } from './Track.js';
import { Thumb } from './Thumb.js';
import type { Tooltip } from '../Tooltip/Tooltip.js';

/**
 * Determines which segments are shown with color.
 */
export type TrackDisplayMode =
  | 'auto'
  | 'none'
  | 'odd-segments'
  | 'even-segments';

type TooltipProps = React.ComponentProps<typeof Tooltip>;

const getPercentageOfRectangle = (
  rect: DOMRect,
  pointerX: number,
  pointerY: number,
  orientation: SliderProps['orientation'],
) => {
  if (orientation === 'horizontal') {
    const position = getBoundedValue(pointerX, rect.left, rect.right);
    return (position - rect.left) / rect.width;
  }
  const position = getBoundedValue(pointerY, rect.top, rect.bottom);
  return (rect.bottom - position) / rect.height;
};

const getClosestValueIndex = (values: number[], pointerValue: number) => {
  if (1 === values.length) {
    return 0;
  }
  const distances = values.map((value) => Math.abs(value - pointerValue));
  const smallest = Math.min(...distances);
  return distances.indexOf(smallest);
};

const getDefaultTrackDisplay = (
  trackDisplayMode: TrackDisplayMode,
  values: number[],
) => {
  if ('auto' !== trackDisplayMode) {
    return trackDisplayMode;
  }

  return values.length % 2 ? 'even-segments' : 'odd-segments';
};

const roundValueToClosestStep = (value: number, step: number, min: number) => {
  return Math.round((value - min) / step) * step + min;
};

const formatNumberValue = (
  value: number,
  step: number,
  numDecimals: number,
) => {
  if (Number.isInteger(step)) {
    return value.toFixed(0);
  }
  return value.toFixed(numDecimals);
};

/**
 * Focus specified thumb on Slider control
 */
const focusThumb = (sliderContainer: HTMLDivElement, activeIndex: number) => {
  const doc = sliderContainer.ownerDocument;
  if (
    !sliderContainer.contains(doc.activeElement) ||
    Number(doc.activeElement?.getAttribute('data-index')) !== activeIndex
  ) {
    const thumbToFocus = sliderContainer.querySelector(
      `[data-index="${activeIndex}"]`,
    );
    thumbToFocus && (thumbToFocus as HTMLElement).focus();
  }
};

export type SliderProps = {
  /**
   * Minimum slider value.
   * @default 0
   */
  min?: number;
  /**
   * Maximum slider value.
   * @default 100
   */
  max?: number;
  /**
   * Array of one or more values to show.
   */
  values: number[];
  /**
   *  Determines which segments are shown with color.
   * 'none' - no colored tracks are displayed.
   * 'auto' - segment display is based on number of values.
   * 'odd-segments'- colored tracks shown in segments 1,3,5, etc.
   *                 Default if number of thumbs values are even.
   * 'even-segments'- colored tracks shown in segments 0,2,4, etc.
   *                 Default if number of thumbs values are odd.
   * @default 'auto'
   */
  trackDisplayMode?: TrackDisplayMode;
  /**
   * Step increment controls what values are allowed and the amount the value will
   * change when left and right arrows are pressed when a Thumb has focus.
   * @default 1
   */
  step?: number;
  /**
   * Forces control to be displayed in a disabled state where no interactive value
   * changes are allowed.
   * @default false
   */
  disabled?: boolean;
  /**
   * Function that can return tooltip props including content.
   */
  tooltipProps?: (
    index: number,
    val: number,
    step: number,
  ) => Partial<Omit<TooltipProps, 'children'>>;
  /**
   * Either an array of labels that will be placed under auto generated tick marks
   * that are spaced evenly across width of Slider or a custom component that allows
   * custom content to be placed in tick mark area below slider.
   */
  tickLabels?: React.ReactNode;
  /**
   * Label for the minimum value. If undefined then the min
   * value is shown. Use empty string for no label.
   */
  minLabel?: React.ReactNode;
  /**
   * Label for the maximum value. If undefined then the max
   * value is shown. Use empty string for no label.
   */
  maxLabel?: React.ReactNode;
  /**
   * Additional props for container `<div>` that hold the slider thumbs, and tracks.
   */
  trackContainerProps?: React.HTMLAttributes<HTMLDivElement>;
  /**
   * Allows props to be passed for slider-min
   */
  minProps?: React.ComponentProps<'span'>;
  /**
   * Allows props to be passed for slider-max
   */
  maxProps?: React.ComponentProps<'span'>;
  /**
   * Allows props to be passed for slider-track
   */
  trackProps?: React.ComponentProps<'div'>;
  /**
   * Allows props to be passed for slider-tick
   */
  tickProps?: React.ComponentProps<'span'>;
  /**
   * Allows props to be passed for slider-ticks
   */
  ticksProps?: React.ComponentProps<'div'>;
  /**
   * Defines the allowed behavior when moving Thumbs when multiple Thumbs are
   * shown. It controls if a Thumb movement should be limited to only move in
   * the segments adjacent to the Thumb. Possible values:
   * 'allow-crossing' - allows thumb to cross other thumbs. Default.
   * 'inhibit-crossing'- keeps the thumb from crossing and separated by a step.
   * @default 'inhibit-crossing'
   */
  thumbMode?: 'allow-crossing' | 'inhibit-crossing';
  /**
   * Callback that can provide additional props for `<div>` representing a thumb.
   */
  thumbProps?: (index: number) => React.ComponentPropsWithRef<'div'>;
  /**
   * Callback fired at the end of a thumb move (i.e. on pointerUp) and when user clicks on rail.
   */
  onChange?: (values: ReadonlyArray<number>) => void;
  /**
   * Callback fired when the value(s) of the slider are internally updated during
   * operations like dragging a Thumb. Use this callback with caution as a
   * high-volume of updates will occur when dragging.
   */
  onUpdate?: (values: ReadonlyArray<number>) => void;
  /**
   * The orientation of slider
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
};

/**
 * Slider component that display Thumbs for each value specified along a Rail.
 * @example
 * <Slider values={[10]} min={0} max={60} disabled />
 * <Slider values={[10, 20]} min={0} max={50} step={2} />
 * <Slider values={[10, 20, 30, 40]} min={0} max={60}
 *   thumbMode='allow-crossing' />
 */
export const Slider = React.forwardRef((props, ref) => {
  const {
    min = 0,
    max = 100,
    values,
    step = 1,
    tooltipProps,
    disabled = false,
    tickLabels,
    minLabel,
    maxLabel,
    trackDisplayMode = 'auto',
    thumbMode = 'inhibit-crossing',
    onChange,
    onUpdate,
    thumbProps,
    className,
    trackContainerProps,
    minProps,
    maxProps,
    trackProps,
    tickProps,
    ticksProps,
    orientation = 'horizontal',
    ...rest
  } = props;

  const [currentValues, setCurrentValues] = React.useState(values);
  React.useEffect(() => {
    setCurrentValues(values);
  }, [values]);

  const [minValueLabel, setMinValueLabel] = React.useState(
    () => minLabel ?? min.toString(),
  );
  React.useEffect(() => {
    setMinValueLabel(minLabel ?? min.toString());
  }, [minLabel, min]);

  const [maxValueLabel, setMaxValueLabel] = React.useState(
    () => maxLabel ?? max.toString(),
  );
  React.useEffect(() => {
    setMaxValueLabel(maxLabel ?? max.toString());
  }, [maxLabel, max]);

  const [trackDisplay, setTrackDisplay] = React.useState<TrackDisplayMode>(() =>
    getDefaultTrackDisplay(trackDisplayMode, currentValues),
  );
  React.useEffect(() => {
    setTrackDisplay(getDefaultTrackDisplay(trackDisplayMode, currentValues));
  }, [trackDisplayMode, currentValues]);

  const containerRef = React.useRef<HTMLDivElement>(null);

  const getNumDecimalPlaces = React.useMemo(() => {
    const stepString = step.toString();
    const decimalIndex = stepString.indexOf('.');
    return stepString.length - (decimalIndex + 1);
  }, [step]);

  const getAllowableThumbRange = React.useCallback(
    (index: number) => {
      if (thumbMode === 'inhibit-crossing') {
        const minVal = index === 0 ? min : currentValues[index - 1] + step;
        const maxVal =
          index < currentValues.length - 1
            ? currentValues[index + 1] - step
            : max;
        return [minVal, maxVal];
      }
      return [min, max];
    },
    [max, min, step, thumbMode, currentValues],
  );

  const [activeThumbIndex, setActiveThumbIndex] = React.useState<
    number | undefined
  >(undefined);

  const updateThumbValue = React.useCallback(
    (event: PointerEvent, callbackType: 'onChange' | 'onUpdate') => {
      if (containerRef.current && undefined !== activeThumbIndex) {
        const percent = getPercentageOfRectangle(
          containerRef.current.getBoundingClientRect(),
          event.clientX,
          event.clientY,
          orientation,
        );
        let pointerValue = min + (max - min) * percent;
        pointerValue = roundValueToClosestStep(pointerValue, step, min);
        const [minVal, maxVal] = getAllowableThumbRange(activeThumbIndex);
        pointerValue = getBoundedValue(pointerValue, minVal, maxVal);
        if (pointerValue !== currentValues[activeThumbIndex]) {
          const newValues = [...currentValues];
          newValues[activeThumbIndex] = pointerValue;
          setCurrentValues(newValues);
          'onChange' === callbackType
            ? onChange?.(newValues)
            : onUpdate?.(newValues);
        } else if ('onChange' === callbackType) {
          onChange?.(currentValues);
        }
      }
    },
    [
      activeThumbIndex,
      min,
      max,
      step,
      getAllowableThumbRange,
      currentValues,
      onUpdate,
      onChange,
      orientation,
    ],
  );

  const handlePointerMove = React.useCallback(
    (event: PointerEvent): void => {
      if (activeThumbIndex === undefined) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      updateThumbValue(event, 'onUpdate');
    },
    [activeThumbIndex, updateThumbValue],
  );

  // function called by Thumb keyboard processing
  const onThumbValueChanged = React.useCallback(
    (index: number, value: number, keyboardReleased: boolean) => {
      if (currentValues[index] === value && !keyboardReleased) {
        return;
      }

      if (keyboardReleased) {
        onChange?.(currentValues); // currentValues since key up should not change value but only stop continuous value selection
      } else {
        const newValues = [...currentValues]; // newValues since key down should change value
        newValues[index] = value;
        onUpdate?.(newValues);
        setCurrentValues(newValues);
      }
    },
    [currentValues, onUpdate, onChange],
  );

  const onThumbActivated = React.useCallback((index: number) => {
    setActiveThumbIndex(index);
  }, []);

  const handlePointerUp = React.useCallback(
    (event: PointerEvent) => {
      if (activeThumbIndex === undefined) {
        return;
      }
      updateThumbValue(event, 'onChange');
      setActiveThumbIndex(undefined);
      event.preventDefault();
      event.stopPropagation();
    },
    [activeThumbIndex, updateThumbValue],
  );

  const handlePointerDownOnSlider = React.useCallback(
    (event: React.PointerEvent) => {
      if (containerRef.current) {
        const percent = getPercentageOfRectangle(
          containerRef.current.getBoundingClientRect(),
          event.clientX,
          event.clientY,
          orientation,
        );
        let pointerValue = min + (max - min) * percent;
        pointerValue = roundValueToClosestStep(pointerValue, step, min);

        const closestValueIndex = getClosestValueIndex(
          currentValues,
          pointerValue,
        );
        const [minVal, maxVal] = getAllowableThumbRange(closestValueIndex);
        pointerValue = getBoundedValue(pointerValue, minVal, maxVal);
        if (pointerValue === currentValues[closestValueIndex]) {
          return;
        }
        const newValues = [...currentValues];
        newValues[closestValueIndex] = pointerValue;
        setCurrentValues(newValues);
        onChange?.(newValues);
        onUpdate?.(newValues);
        focusThumb(containerRef.current, closestValueIndex);
        event.preventDefault();
        event.stopPropagation();
      }
    },
    [
      min,
      max,
      step,
      currentValues,
      getAllowableThumbRange,
      onChange,
      onUpdate,
      orientation,
    ],
  );

  useEventListener(
    'pointermove',
    handlePointerMove,
    containerRef.current?.ownerDocument,
  );
  useEventListener(
    'pointerup',
    handlePointerUp,
    containerRef.current?.ownerDocument,
  );

  const tickMarkArea = React.useMemo(() => {
    if (!tickLabels) {
      return null;
    }

    if (Array.isArray(tickLabels)) {
      return (
        <Box
          as='div'
          {...ticksProps}
          className={cx('iui-slider-ticks', ticksProps?.className)}
        >
          {tickLabels.map((label, index) => (
            <Box
              as='span'
              {...tickProps}
              key={index}
              className={cx('iui-slider-tick', tickProps?.className)}
            >
              {label}
            </Box>
          ))}
        </Box>
      );
    }

    return tickLabels;
  }, [tickLabels, tickProps, ticksProps]);

  const generateTooltipProps = React.useCallback(
    (index: number, val: number): Omit<TooltipProps, 'children'> => {
      const outProps: Partial<Omit<TooltipProps, 'children'>> = tooltipProps
        ? tooltipProps(index, val, step)
        : {};

      return {
        ...outProps,
        content: outProps.content
          ? outProps.content
          : formatNumberValue(val, step, getNumDecimalPlaces),
      };
    },
    [getNumDecimalPlaces, step, tooltipProps],
  );

  return (
    <Box
      ref={ref}
      className={cx('iui-slider-container', className)}
      data-iui-orientation={orientation}
      data-iui-disabled={disabled ? 'true' : undefined}
      {...rest}
    >
      {minValueLabel && (
        <Box
          as='span'
          {...minProps}
          className={cx('iui-slider-min', minProps?.className)}
        >
          {minValueLabel}
        </Box>
      )}
      <Box
        ref={containerRef}
        {...trackContainerProps}
        className={cx(
          'iui-slider',
          {
            'iui-grabbing': undefined !== activeThumbIndex,
          },
          trackContainerProps?.className,
        )}
        onPointerDown={handlePointerDownOnSlider}
      >
        {currentValues.map((thumbValue, index) => {
          const [minVal, maxVal] = getAllowableThumbRange(index);
          const thisThumbProps = thumbProps?.(index);
          return (
            <Thumb
              key={thisThumbProps?.id ?? index}
              index={index}
              disabled={disabled}
              isActive={activeThumbIndex === index}
              onThumbActivated={onThumbActivated}
              onThumbValueChanged={onThumbValueChanged}
              minVal={minVal}
              maxVal={maxVal}
              value={thumbValue}
              tooltipProps={generateTooltipProps(index, thumbValue)}
              thumbProps={thisThumbProps}
              step={step}
              sliderMin={min}
              sliderMax={max}
            />
          );
        })}
        <Track
          trackDisplayMode={trackDisplay}
          sliderMin={min}
          sliderMax={max}
          values={currentValues}
          orientation={orientation}
          {...trackProps}
        />
      </Box>
      {tickMarkArea}
      {maxValueLabel && (
        <Box
          as='span'
          {...maxProps}
          className={cx('iui-slider-max', maxProps?.className)}
        >
          {maxValueLabel}
        </Box>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', SliderProps>;
