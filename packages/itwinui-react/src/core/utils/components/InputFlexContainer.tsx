/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { PolymorphicForwardRefComponent } from '../props';

export type InputFlexContainerProps<T extends React.ElementType = 'div'> = {
  as?: T;
  disabled?: boolean;
  required?: boolean;
  status?: 'positive' | 'warning' | 'negative';
  message?: React.ReactNode;
  icon?: JSX.Element;
  statusMessage?: React.ReactNode;
} & React.ComponentPropsWithoutRef<T>;

/**
 * Input flex container.
 * @private
 */
export const InputFlexContainer = React.forwardRef((props) => {
  const {
    as: Element = 'div',
    disabled,
    status,
    children,
    className,
    style,
    ...rest
  } = props;

  return (
    <Element
      className={cx(
        'iui-input-flex-container',
        {
          'iui-disabled': disabled,
        },
        className,
      )}
      data-iui-status={status}
      style={style}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', InputFlexContainerProps>;
