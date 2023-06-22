'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  var dateFormatter = React.useMemo(function () {
    return new Intl.DateTimeFormat('default', {
      month: 'short',
      day: '2-digit',
      timeZone: 'UTC',
    });
  }, []);
  var _a = React.useState({
      number: 1,
      date: new Date(Date.UTC(2019, 0, 1)),
    }),
    currentValue = _a[0],
    setCurrentValue = _a[1];
  var updateValue = React.useCallback(function (values) {
    var newDate = new Date(Date.UTC(2019, 0, values[0]));
    setCurrentValue({ number: values[0], date: newDate });
  }, []);
  return (
    <div style={{ width: 'min(100%, 300px)' }}>
      <itwinui_react_1.Slider
        values={[currentValue.number]}
        min={1}
        max={365}
        minLabel={'Date'}
        maxLabel={''}
        tooltipProps={function () {
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
            <itwinui_react_1.Text
              variant='body'
              style={{ width: '60px', marginRight: '6px' }}
            >
              {dateFormatter.format(currentValue.date)}
            </itwinui_react_1.Text>
          </div>
        }
      />
    </div>
  );
};
