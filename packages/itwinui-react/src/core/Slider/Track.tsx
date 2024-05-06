/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box } from '../../utils/index.js';
import type { SliderProps, TrackDisplayMode } from './Slider.js';

function shouldDisplaySegment(segmentIndex: number, mode: TrackDisplayMode) {
  if ('odd-segments' === mode && 0 === (segmentIndex + 1) % 2) {
    return true;
  } else if ('even-segments' === mode && 0 === segmentIndex % 2) {
    return true;
  }
  return false;
}

function generateSegments(
  values: number[],
  min: number,
  max: number,
): { left: number; right: number }[] {
  const segments: { left: number; right: number }[] = [];
  const newValues = [...values];
  newValues.sort((a, b) => a - b);

  if (
    0 === newValues.length ||
    newValues[0] < min ||
    newValues[newValues.length - 1] > max ||
    min === max
  ) {
    return [];
  }

  let lastValue = min;
  for (let i = 0; i < newValues.length; i++) {
    segments.push({ left: lastValue, right: newValues[i] });
    lastValue = newValues[i];
  }
  segments.push({ left: lastValue, right: max });
  return segments;
}

export type TrackProps = {
  trackDisplayMode: TrackDisplayMode;
  sliderMin: number;
  sliderMax: number;
  values: number[];
  orientation: SliderProps['orientation'];
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Track displays color segments above Rail. Which, if any, segments that are
 * colorized is based on `trackDisplayMode`.
 */
export const Track = (props: TrackProps) => {
  const {
    className,
    trackDisplayMode,
    sliderMin,
    sliderMax,
    values,
    orientation,
  } = props;
  const [segments, setSegments] = React.useState(() =>
    generateSegments(values, sliderMin, sliderMax),
  );

  React.useEffect(() => {
    setSegments(generateSegments(values, sliderMin, sliderMax));
  }, [values, sliderMin, sliderMax]);

  return (
    <>
      {'none' !== trackDisplayMode &&
        segments.map((segment, index) => {
          const lowPercent =
            segment.left >= sliderMin && sliderMax !== sliderMin
              ? (100.0 * (segment.left - sliderMin)) / (sliderMax - sliderMin)
              : 0;
          const highPercent =
            segment.right >= sliderMin && sliderMax !== sliderMin
              ? 100.0 -
                (100.0 * (segment.right - sliderMin)) / (sliderMax - sliderMin)
              : 100;
          return (
            <React.Fragment key={index}>
              {shouldDisplaySegment(index, trackDisplayMode) ? (
                <Box
                  className={cx('iui-slider-track', className)}
                  style={{
                    ...(orientation === 'horizontal'
                      ? {
                          insetInlineStart: `${lowPercent}%`,
                          insetInlineEnd: `${highPercent}%`,
                        }
                      : {
                          insetBlockStart: `${highPercent}%`,
                          insetBlockEnd: `${lowPercent}%`,
                        }),
                  }}
                />
              ) : null}
            </React.Fragment>
          );
        })}
    </>
  );
};
