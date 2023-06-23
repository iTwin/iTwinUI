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
      tickLabels: ['0', '20', '40', '60', '80', '100'],
      tooltipProps: (index, val) => {
        return { placement: 'right', content: `\$${val}.00` };
      },
    }),
  );
};
