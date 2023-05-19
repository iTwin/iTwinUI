/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { useGlobals } from '../hooks/index.js';
import '@itwin/itwinui-css/css/utils.css';

export type DividerProps = {
  /**
   * Sets the orientation of the divider
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
} & React.ComponentPropsWithRef<'hr'>;

/**
 * Shows a divider
 */
export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  (props, ref) => {
    const { className, orientation = 'horizontal', ...rest } = props;

    useGlobals();

    return (
      <hr
        className={cx('iui-divider', className)}
        aria-orientation={orientation === 'vertical' ? 'vertical' : undefined}
        ref={ref}
        {...rest}
      />
    );
  },
);

export default Divider;
