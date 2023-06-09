/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Slider, Text } from '@itwin/itwinui-react';

export default () => {
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

  const updateValue = React.useCallback((values: ReadonlyArray<number>) => {
    const newDate = new Date(Date.UTC(2019, 0, values[0]));
    setCurrentValue({ number: values[0], date: newDate });
  }, []);

  return (
    <div style={{ width: 'min(100%, 300px)' }}>
      <Slider
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
        tickLabels={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <Text variant='body' style={{ width: '60px', marginRight: '6px' }}>
              {dateFormatter.format(currentValue.date)}
            </Text>
          </div>
        }
      />
    </div>
  );
};
