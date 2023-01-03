/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme } from '../utils';
import '@itwin/itwinui-css/css/backdrop.css';

export type BackdropProps = {
  /**
   * Flag whether backdrop should be shown.
   * @default true
   */
  isVisible?: boolean;
} & React.ComponentPropsWithRef<'div'>;

export const Backdrop = React.forwardRef<HTMLDivElement, BackdropProps>(
  (props, ref) => {
    const { isVisible = true, className, ...rest } = props;
    useTheme();
    return (
      <div
        className={cx(
          'iui-backdrop',
          { 'iui-backdrop-visible': isVisible },
          className,
        )}
        ref={ref}
        {...rest}
      />
    );
  },
);
