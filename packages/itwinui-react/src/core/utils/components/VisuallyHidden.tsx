/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme } from '../hooks';
import '@itwin/itwinui-css/css/utils.css';
import type {
  PolymorphicComponentProps,
  PolymorphicForwardRefComponent,
} from '../props';

type VisuallyHiddenOwnProps = {
  /**
   * When VisuallyHidden is used with an interactive element (e.g. button),
   * that element will "unhide" (become visible again) when focused.
   *
   * @default true
   */
  unhideOnFocus?: boolean;
};

export type VisuallyHiddenProps = PolymorphicComponentProps<
  'div',
  VisuallyHiddenOwnProps
>;

/**
 * Hides content visually but keeps it still accessible to screen readers
 * and other assistive technologies.
 *
 * @example
 * <div aria-hidden='true'>★★★☆☆</div>
 * <VisuallyHidden>3 stars out of 5</VisuallyHidden>
 *
 * @see https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html
 */
export const VisuallyHidden = React.forwardRef((props, ref) => {
  const {
    as: Element = 'div',
    className,
    unhideOnFocus = true,
    ...rest
  } = props;

  useTheme();

  return (
    <Element
      className={cx('iui-visually-hidden', className)}
      data-iui-unhide-on-focus={unhideOnFocus ? true : undefined}
      ref={ref}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', VisuallyHiddenOwnProps>;

export default VisuallyHidden;
