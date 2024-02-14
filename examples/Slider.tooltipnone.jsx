/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Slider, Text, Label, InputGrid } from '@itwin/itwinui-react';

export default () => {
  const labelId = React.useId();

  const dateFormatter = React.useMemo(() => {
    return new Intl.DateTimeFormat('default', {
      month: 'short',
      day: '2-digit',
      timeZone: 'UTC',
    });
  }, []);

  const [currentValue, setCurrentValue] = React.useState({
    number: 1,
    date: new Date(Date.UTC(2019, 0, 1)),
  });

  const updateValue = React.useCallback((values) => {
    const newDate = new Date(Date.UTC(2019, 0, values[0]));
    setCurrentValue({ number: values[0], date: newDate });
  }, []);

  return (
    <InputGrid className='tooltip-none-slider-input-grid'>
      <Label id={labelId} as='div'>
        Choose a start date
      </Label>
      <Slider
        thumbProps={() => ({
          'aria-labelledby': labelId,
          'aria-valuetext': dateFormatter.format(currentValue.date),
        })}
        values={[currentValue.number]}
        min={1}
        max={365}
        minLabel={'Date'}
        maxLabel={''}
        tooltipProps={() => {
          return { visible: false };
        }}
        onUpdate={updateValue}
        onChange={updateValue}
      />
      <Text variant='body' className='tooltip-none-slider-text'>
        {dateFormatter.format(currentValue.date)}
      </Text>
    </InputGrid>
  );
};
