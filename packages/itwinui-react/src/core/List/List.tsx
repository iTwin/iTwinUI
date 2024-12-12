/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Box, type PolymorphicForwardRefComponent } from '../../utils/index.js';
import { FloatingDelayGroup } from '@floating-ui/react';

export const List = React.forwardRef((props, ref) => {
  return (
    <FloatingDelayGroup delay={{ open: 100, close: 200 }}>
      <Box as='div' ref={ref} className='iui-list' role='list' {...props} />
    </FloatingDelayGroup>
  );
}) as PolymorphicForwardRefComponent<'div'>;
if (process.env.NODE_ENV === 'development') {
  List.displayName = 'List';
}
