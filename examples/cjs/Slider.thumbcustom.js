/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Slider } from '@itwin/itwinui-react';
export default () => {
  return React.createElement(
    'div',
    { style: { width: 'min(100%, 300px)' } },
    React.createElement(Slider, {
      values: [50],
      min: 0,
      max: 100,
      thumbProps: () => {
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
          children: React.createElement(
            'span',
            {
              style: {
                pointerEvents: 'none',
              },
            },
            '|||',
          ),
        };
      },
    }),
  );
};
