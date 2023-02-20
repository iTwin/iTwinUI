/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
// import cx from 'classnames';

type TileActionOwnProps<T extends React.ElementType = 'button'> = {
  /**
   * What element should the label be rendered as?
   * @default 'button'
   */
  as?: T;
  /**
   * Dialog title bar content. If passed, then `title` prop is ignored.
   */
  children?: React.ReactNode;
};

export type TileActionProps<T extends React.ElementType = 'button'> =
  TileActionOwnProps<T> &
    React.ComponentPropsWithRef<'div'> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof TileActionOwnProps<T>>;

/**

 */
export const TileAction = <T extends React.ElementType = 'button'>(
  props: TileActionProps<T>,
) => {
  const { as: Element = 'button', className, children, ...rest } = props;
  return (
    <Element className={className} {...rest}>
      {children}
    </Element>
  );
};

TileAction.displayName = 'TileAction';

export default TileAction;
