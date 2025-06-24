/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Svg } from './Svg.js';

export const SvgHourGlass = (props: React.ComponentPropsWithoutRef<'svg'>) => {
  return (
    <Svg {...props}>
      <path d='M10.82 4.093A10.672 10.672 0 018 7.163a10.672 10.672 0 01-2.82-3.07zm-.665 3.828C11.528 9.105 13 10.774 13 12.491V14h1v2H2v-2h1v-1.509c0-1.717 1.472-3.386 2.845-4.57C4.476 6.674 3 4.933 3 3.224V2H2V0h12v2h-1v1.224c0 1.71-1.476 3.45-2.845 4.697zm-1.879.03c.88-.681 3.57-2.911 3.57-4.727V2.018H4.154v1.206c0 1.816 2.69 4.046 3.57 4.727-.88.635-3.57 2.725-3.57 4.54v.869l3.849-3.018 3.843 3.017v-.868c0-1.816-2.69-3.905-3.57-4.54z' />
    </Svg>
  );
};
