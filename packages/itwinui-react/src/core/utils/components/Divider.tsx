/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme } from '../hooks';
import '@itwin/itwinui-css/css/utils.css';

export type DividerProps = React.ComponentPropsWithRef<'hr'>;

/**
 * Shows a divider
 */
export const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    useTheme();

    return <hr className={cx('iui-divider', className)} ref={ref} {...rest} />;
  },
);

export default Divider;
