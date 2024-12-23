/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Box, type PolymorphicForwardRefComponent } from '../../utils/index.js';
import { FloatingDelayGroup } from '@floating-ui/react';
import { defaultTooltipDelay } from '../Tooltip/Tooltip.js';
import cx from 'classnames';

export const List = React.forwardRef((props, ref) => {
  const { className, ...rest } = props;

  return (
    <FloatingDelayGroup delay={defaultTooltipDelay}>
      <Box
        as='div'
        ref={ref}
        role='list'
        {...rest}
        className={cx('iui-list', className)}
      />
    </FloatingDelayGroup>
  );
}) as PolymorphicForwardRefComponent<'div'>;
if (process.env.NODE_ENV === 'development') {
  List.displayName = 'List';
}
