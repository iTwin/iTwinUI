/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme } from '../hooks';
import '@itwin/itwinui-css/css/utils.css';

export type VisuallyHiddenProps = React.ComponentPropsWithRef<'div'>;

/**
 * Hides content visually but is still accessible to screen readers.
 */
export const VisuallyHidden = React.forwardRef<
  HTMLDivElement,
  VisuallyHiddenProps
>((props, ref) => {
  const { className, ...rest } = props;

  useTheme();

  return (
    <div className={cx('iui-visually-hidden', className)} ref={ref} {...rest} />
  );
});

export default VisuallyHidden;
