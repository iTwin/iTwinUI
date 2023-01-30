/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';

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
export const InputFlexContainer = <T extends React.ElementType = 'div'>(
  props: InputFlexContainerProps<T>,
) => {
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
          [`iui-${status}`]: !!status,
        },
        className,
      )}
      style={style}
      {...rest}
    >
      {children}
    </Element>
  );
};
