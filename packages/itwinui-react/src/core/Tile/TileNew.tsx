/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import cx from 'classnames';
import {
  // StatusIconMap,
  // useTheme,
  // SvgMore,
  // SvgNew,
  // SvgCheckmark,
  // LinkAction,
  PolymorphicComponentProps,
  // useSafeContext,
  // supportsHas,
  PolymorphicForwardRefComponent,
} from '../utils';
import '@itwin/itwinui-css/css/tile.css';
// import { DropdownMenu } from '../DropdownMenu';
// import { IconButton } from '../Buttons';
// import { ProgressRadial } from '../ProgressIndicators';
// import Tile from '.';

// const TileContext = React.createContext<
//   | {
//       setActionable: React.Dispatch<React.SetStateAction<boolean>>;
//     }
//   | undefined
// >(undefined);

//<Tile>
//  <Tile.Thumbnail>
//  <Tile.Name>
//  <Tile.Content>  //has meta data
//  <Tile.Buttons>
//</Tile>

// ----------------------------------------------------------------------------
// Main Tile component

const TileComponent = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, status, ...rest } = props;
  return (
    <Element
      className={cx(
        'iui-tile',
        {
          //   'iui-folder': variant === 'folder',
          //   'iui-new': isNew,
          //   'iui-selected': isSelected,
          //   'iui-actionable': isActionable,
          [`iui-${status}`]: !!status,
          //   'iui-loading': isLoading,
        },
        className,
      )}
      ref={ref}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', TileOwnProps>;
TileComponent.displayName = 'TileNew';

type TileOwnProps = {
  /**
   * Status of the tile.
   */
  status?: 'positive' | 'warning' | 'negative';
};

// ----------------------------------------------------------------------------
// Tile.ThumbnailArea component

const TileThumbnailArea = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, badge, children, ...rest } = props;
  return (
    <Element
      className={cx('iui-tile-thumbnail', className)}
      ref={ref}
      {...rest}
    >
      {badge && (
        <div className='iui-tile-thumbnail-badge-container'>{badge}</div>
      )}
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TileThumbnailAreaOwnProps>;
TileThumbnailArea.displayName = 'TileNew.ThumbnailArea';

type TileThumbnailAreaOwnProps = {
  /**
   * Icon shown on top left of the tile. Also known as "type indicator".
   * Recommended to use an invisible `IconButton`.
   */
  leftIcon?: React.ReactNode;
  /**
   * `Badge` shown on the bottom right of thumbnail.
   */
  badge?: React.ReactNode;
};

// ----------------------------------------------------------------------------
// Tile.ThumbnailPicture component

const TileThumbnailPicture = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, thumbnail, ...rest } = props;
  return (
    <Element
      className={cx('iui-tile-thumbnail', className)}
      ref={ref}
      {...rest}
    >
      {thumbnail && typeof thumbnail === 'string' ? (
        <div
          className='iui-tile-thumbnail-picture'
          style={{ backgroundImage: `url(${thumbnail})` }}
        />
      ) : React.isValidElement(thumbnail) ? (
        React.createElement(thumbnail.type, {
          ...thumbnail.props,
          className: cx('iui-thumbnail-icon', thumbnail.props.className),
        })
      ) : (
        thumbnail
      )}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TileThumbnailPictureOwnProps>;

TileThumbnailPicture.displayName = 'TileNew.TileThumbnailPicture';

type TileThumbnailPictureOwnProps = {
  /**
   * Thumbnail image url, a custom component or an svg.
   * @example
   * <Tile
   *  // ...
   *  thumbnail='/url/to/image.jpg'
   *  // or
   *  thumbnail={<Avatar image={<img src='icon.png' />} />}
   *  // or
   *  thumbnail={<SvgImodelHollow />}
   * />
   */
  thumbnail?: string | React.ReactNode;
};

// ----------------------------------------------------------------------------
// Tile.QuickAction component

const TileQuickAction = React.forwardRef((props, ref) => {
  const { as: Element = 'button', className, children, ...rest } = props;
  return (
    //todo: styling is all off, need to fix after
    <Element
      className={cx('iui-button', 'iui-tile-thumbnail-quick-action', className)}
      data-iui-size='small'
      ref={ref}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'button', TileQuickActionOwnProps>;
TileQuickAction.displayName = 'Tile.QuickAction';

type TileQuickActionOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

// ----------------------------------------------------------------------------
// Tile.TypeIndicator component

const TileTypeIndicator = React.forwardRef((props, ref) => {
  const { as: Element = 'button', className, children, ...rest } = props;
  return (
    //todo: styling is all off, need to fix after
    <Element
      className={cx(
        'iui-button',
        'iui-tile-thumbnail-type-indicator',
        className,
      )}
      data-iui-size='small'
      ref={ref}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'button', TileTypeIndicatorOwnProps>;
TileTypeIndicator.displayName = 'Tile.TypeIndicator';

type TileTypeIndicatorOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

// ----------------------------------------------------------------------------
// Tile.Badge component

const TileBadge = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, children, ...rest } = props;
  return (
    <Element
      className={cx('iui-tile-thumbnail-badge-container', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TileBadgeOwnProps>;
TileBadge.displayName = 'Tile.Badge';

type TileBadgeOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

export const TileNew = Object.assign(TileComponent, {
  /**
   * ThumbnailArea subcomponent that contains `ThumbnailPicture`, `QuickAction`, `TypeIndicator` or `Badge`
   */
  ThumbnailArea: TileThumbnailArea,
  /**
   * Thumbnail image url, a custom component or an svg.
   * @example
   * <Tile.ThumbnailPicture
   *  // ...
   *  thumbnail='/url/to/image.jpg'
   *  // or
   *  thumbnail={<Avatar image={<img src='icon.png' />} />}
   *  // or
   *  thumbnail={<SvgImodelHollow />}
   * />
   */
  ThumbnailPicture: TileThumbnailPicture,
  /**
   * QuickAction subcomponent shown on top left of the tile.
   * Recommended to use an invisible `IconButton`.
   */
  QuickAction: TileQuickAction,
  /**
   * TypeIndicator subcomponent shown on top left of the tile.
   * Recommended to use an invisible `IconButton`.
   */
  TypeIndicator: TileTypeIndicator,
  /**
   * `Badge` subcomponent shown on the bottom right of thumbnail.
   */
  Badge: TileBadge,
});

export type TileNewProps = PolymorphicComponentProps<'div', TileOwnProps>;
export type TileNewThumbnailAreaProps = PolymorphicComponentProps<
  'div',
  TileThumbnailAreaOwnProps
>;
export type TileNewThumbnailPictureProps = PolymorphicComponentProps<
  'div',
  TileThumbnailPictureOwnProps
>;
export type TileNewQuickActionProps = PolymorphicComponentProps<
  'button',
  TileQuickActionOwnProps
>;
export type TileNewTypeIndicatorProps = PolymorphicComponentProps<
  'button',
  TileTypeIndicatorOwnProps
>;
export type TileNewBadgeProps = PolymorphicComponentProps<
  'button',
  TileBadgeOwnProps
>;

export default TileNew;
