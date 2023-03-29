/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Slider, Body } from '@itwin/itwinui-react';

export default () => {
  const dateFormatter = React.useMemo(() => {
    return new Intl.DateTimeFormat('default', {
      month: 'short',
      day: '2-digit',
      timeZone: 'UTC',
    });
  }, []);

  const [currentDate, setCurrentDate] = React.useState(new Date(Date.UTC(2019, 0, 1)));

  const updateDate = React.useCallback((values: ReadonlyArray<number>) => {
    const newDate = new Date(Date.UTC(2019, 0, values[0]));
    setCurrentDate(newDate);
  }, []);

  return (
    <div style={{ width: 'min(100%, 300px)' }}>
      <Slider
        values={[0]}
        min={1}
        max={365}
        minLabel={'Date'}
        maxLabel={''}
        tooltipProps={() => {
          return { visible: false };
        }}
        onUpdate={updateDate}
        onChange={updateDate}
        tickLabels={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <Body
              style={{
                width: '60px',
                marginRight: '6px',
              }}
            >
              {dateFormatter.format(currentDate)}
            </Body>
          </div>
        }
      />
    </div>
  );
};
