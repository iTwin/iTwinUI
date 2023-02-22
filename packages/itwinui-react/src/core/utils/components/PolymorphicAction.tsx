/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  PolymorphicComponentProps,
  PolymorphicForwardRefComponent,
} from '../index';

type PolymorphicActionOwnProps = {
  /**
   * Content in the action element.
   */
  children?: React.ReactNode;
};

export type PolymorphicActionProps = PolymorphicComponentProps<
  'a',
  PolymorphicActionOwnProps
>;

/**
 * Polymorphic action component.
 * It is rendered as `a` by default.
 *
 */
export const PolymorphicAction = React.forwardRef((props, ref) => {
  const { as: Element = 'a', className, children, ...rest } = props;
  return (
    <Element
      ref={ref}
      className={cx('iui-component-action', className)}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'a', PolymorphicActionOwnProps>;

PolymorphicAction.displayName = 'PolymorphicAction';

export default PolymorphicAction;
