/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

export type BackdropProps = {
  /**
   * Flag whether backdrop should be shown.
   * @default true
   */
  isVisible?: boolean;
};

export const Backdrop = React.forwardRef((props, ref) => {
  const { isVisible = true, className, ...rest } = props;

  return (
    <Box
      className={cx(
        'iui-backdrop',
        { 'iui-backdrop-visible': isVisible },
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', BackdropProps>;
if (process.env.NODE_ENV === 'development') {
  Backdrop.displayName = 'Backdrop';
}
