/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';

type TileActionOwnProps<T extends React.ElementType = 'button'> = {
  /**
   * What element should the label be rendered as?
   * @default 'button'
   */
  as?: T;
  /**
   * Content in the action element.
   */
  children?: React.ReactNode;
};

export type TileActionProps<T extends React.ElementType = 'button'> =
  TileActionOwnProps<T> &
    React.ComponentPropsWithRef<'div'> &
    Omit<React.ComponentPropsWithoutRef<T>, keyof TileActionOwnProps<T>>;

/**
 * Polymorphic action component for actionable Tiles. Should be used in name.
 * It is `button` by default. Can also be rendered as anchor link.
 *
 * @example
 * <Tile
 *   isActionable={isActionable}
 *   name={<Tile.Action onClick={() => doOnClick()}>Tile name</Tile.Action>}
 * />
 */
export const TileAction = <T extends React.ElementType = 'button'>(
  props: TileActionProps<T>,
) => {
  const { as: Element = 'button', className, children, ...rest } = props;
  return (
    <Element
      tabIndex={-1}
      className={cx('iui-tile-action', className)}
      {...rest}
    >
      {children}
    </Element>
  );
};

TileAction.displayName = 'TileAction';

export default TileAction;
