/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { TrackDisplayMode } from './Slider';

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
  let lastValue = min;
  for (let i = 0; i < values.length; i++) {
    segments.push({ left: lastValue, right: values[i] });
    lastValue = values[i];
  }
  segments.push({ left: lastValue, right: max });
  return segments;
}

export type TrackProps = {
  trackDisplayMode: TrackDisplayMode;
  sliderMin: number;
  sliderMax: number;
  values: number[];
};

/**
 * Track displays color segments above Rail. Which, if any, segments that are
 * colorized is based on `trackDisplayMode`.
 */
export const Track = (props: TrackProps) => {
  const { trackDisplayMode, sliderMin, sliderMax, values } = props;
  const [currentValues, setCurrentValues] = React.useState(
    [...values].sort((a, b) => a - b),
  );
  const segmentKeyRef = React.useRef(0);

  React.useEffect(() => {
    const newValues = [...values];
    newValues.sort((a, b) => a - b);
    segmentKeyRef.current = segmentKeyRef.current++;
    setCurrentValues(newValues);
  }, [values]);

  const segments = React.useMemo(
    () => generateSegments(currentValues, sliderMin, sliderMax),
    [currentValues, sliderMin, sliderMax],
  );

  return (
    <>
      {'none' !== trackDisplayMode &&
        segments.map((segment, index) => {
          const leftPercent =
            (100.0 * (segment.left - sliderMin)) / (sliderMax - sliderMin);
          let rightPercent =
            (100.0 * (segment.right - sliderMin)) / (sliderMax - sliderMin);
          rightPercent = 100.0 - rightPercent;
          return (
            <React.Fragment key={`${segmentKeyRef.current}-${index}`}>
              {shouldDisplaySegment(index, trackDisplayMode) ? (
                <div
                  className='iui-slider-track'
                  style={{ left: `${leftPercent}%`, right: `${rightPercent}%` }}
                />
              ) : null}
            </React.Fragment>
          );
        })}
    </>
  );
};
