'use strict';
exports.__esModule = true;
/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
var React = require('react');
var itwinui_react_1 = require('@itwin/itwinui-react');
exports['default'] = function () {
  return (
    <div style={{ width: 'min(100%, 300px)' }}>
      <itwinui_react_1.Slider
        values={[50]}
        min={0}
        max={100}
        thumbProps={function () {
          return {
            style: {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'var(--iui-color-background-accent)',
              borderColor: 'var(--iui-color-border-accent)',
              width: 'var(--iui-size-xl)',
              height: 'var(--iui-component-height-small)',
              borderRadius: 'var(--iui-border-radius-1)',
              transform: 'translateX(calc(var(--iui-size-xl) * 0.5 * -1))',
              top: '1px',
            },
            children: (
              <span
                style={{
                  pointerEvents: 'none',
                }}
              >
                |||
              </span>
            ),
          };
        }}
      />
    </div>
  );
};
