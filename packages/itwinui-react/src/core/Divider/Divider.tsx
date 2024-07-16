/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box } from '../../utils/components/Box.js';
import type { PolymorphicForwardRefComponent } from '../../utils/props.js';

type DividerProps = {
  /**
   * Sets the orientation of the divider
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
};

/**
 * Shows a divider
 */
export const Divider = React.forwardRef((props, ref) => {
  const { className, orientation = 'horizontal', ...rest } = props;

  return (
    <Box
      as='hr'
      className={cx('iui-divider', className)}
      aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
      ref={ref}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'hr', DividerProps>;
if (process.env.NODE_ENV === 'development') {
  Divider.displayName = 'Divider';
}
