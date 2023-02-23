/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  PolymorphicComponentProps,
  PolymorphicForwardRefComponent,
} from '../props';

export type PolymorphicActionProps = PolymorphicComponentProps<
  'a',
  { children?: React.ReactNode }
>;

/**
 * Polymorphic action component.
 * It is rendered as `a` by default.
 */
export const PolymorphicAction = React.forwardRef((props, ref) => {
  const { as: Element = 'a', className, ...rest } = props;
  return (
    <Element
      ref={ref}
      className={cx('iui-component-action', className)}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'a', { children?: React.ReactNode }>;

PolymorphicAction.displayName = 'PolymorphicAction';

export default PolymorphicAction;
