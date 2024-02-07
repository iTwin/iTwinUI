/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Slider } from '@itwin/itwinui-react';

export default () => {
  return (
    <div style={{ width: 'min(100%, 300px)' }}>
      <Slider
        values={[50]}
        min={0}
        max={100}
        thumbProps={() => {
          return {
            'aria-label': `Choose a value`,
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
