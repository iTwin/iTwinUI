/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import type {
  PolymorphicComponentProps,
  PolymorphicForwardRefComponent,
} from '../props.js';
import '@itwin/itwinui-css/css/utils.css';

type InputFlexContainerOwnProps = {
  isDisabled?: boolean;
  status?: 'positive' | 'warning' | 'negative';
};

/**
 * Utility component for input container with display flex abilities.
 * @private
 */
export const InputFlexContainer = React.forwardRef((props, ref) => {
  const {
    as: Element = 'div',
    isDisabled,
    status,
    children,
    className,
    style,
    ...rest
  } = props;

  return (
    <Element
      className={cx('iui-input-flex-container', className)}
      data-iui-status={status}
      data-iui-disabled={isDisabled ? 'true' : undefined}
      ref={ref}
      style={style}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', InputFlexContainerOwnProps>;

export type InputFlexContainerProps = PolymorphicComponentProps<
  'div',
  InputFlexContainerOwnProps
>;
