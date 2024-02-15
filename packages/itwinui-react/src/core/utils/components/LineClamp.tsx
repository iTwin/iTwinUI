/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import type { PolymorphicForwardRefComponent } from '../props.js';
import { Box } from './Box.js';

/** @private */
export const LineClamp = React.forwardRef((props, forwardedRef) => {
  const { lines, ...rest } = props;
  return (
    <Box
      ref={forwardedRef}
      {...rest}
      style={
        { '--iui-line-clamp': lines, ...props.style } as React.CSSProperties
      }
      className={cx('iui-line-clamp', props.className)}
    />
  );
}) as PolymorphicForwardRefComponent<'div', { lines?: number }>;
