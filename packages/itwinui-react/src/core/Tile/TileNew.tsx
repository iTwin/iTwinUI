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

type TileOwnProps = {
  /**
   * Status of the tile.
   */
  status?: 'positive' | 'warning' | 'negative';
};

// ----------------------------------------------------------------------------
// Tile.Thumbnail component

const TileThumbnail = React.forwardRef((props, ref) => {
  const {
    as: Element = 'div',
    className,
    thumbnail,
    leftIcon,
    rightIcon,
    badge,
    ...rest
  } = props;
  return (
    <Element
      className={cx(
        'iui-tile-thumbnail',
        {
          // 'iui-tile-thumbnail-picture': typeof picture === 'string',
          // 'iui-tile-thumbnail-type-indicator': leftIcon,
          //   'iui-selected': isSelected,
          //   'iui-actionable': isActionable,
          // [`iui-${status}`]: !!status,
          //   'iui-loading': isLoading,
        },
        className,
      )}
      style={
        {
          // backgroundImage: `url(${picture})`,
          // typeof picture === 'string' ? `url(${picture})` : undefined,
        }
      }
      ref={ref}
      {...rest}
    >
      {thumbnail && typeof thumbnail === 'string' ? (
        <div
          className='iui-tile-thumbnail-picture'
          style={{ backgroundImage: `url(${thumbnail})` }}
        />
      ) : thumbnail && (thumbnail as JSX.Element).type === 'img' ? (
        React.cloneElement(thumbnail as JSX.Element, {
          className: 'iui-tile-thumbnail-picture',
        })
      ) : React.isValidElement(thumbnail) ? (
        React.cloneElement(thumbnail, {
          className: cx('iui-thumbnail-icon', thumbnail.props.className),
        })
      ) : (
        thumbnail
      )}
      {leftIcon &&
        React.cloneElement(leftIcon as React.ReactElement, {
          className: 'iui-tile-thumbnail-type-indicator',
          'data-iui-size': 'small',
        })}
      {rightIcon &&
        React.cloneElement(rightIcon as React.ReactElement, {
          className: 'iui-tile-thumbnail-quick-action',
          'data-iui-size': 'small',
        })}

      {badge && (
        <div className='iui-tile-thumbnail-badge-container'>{badge}</div>
      )}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TileThumbnailOwnProps>;

type TileThumbnailOwnProps = {
  /**
   * Thumbnail image url, a custom component or an svg.
   * @example
   * <Tile
   *  // ...
   *  <Tile.Thumbnail picture='/url/to/image.jpg'/>
   *  // or
   *  <Tile.Thumbnail picture={<Avatar image={<img src='icon.png' />} />} />
   *  // or
   *  <Tile.Thumbnail picture={<SvgImodelHollow />}/>
   * />
   */
  thumbnail?: string | JSX.Element;
  /**
   * Icon shown on top left of the tile. Also known as "type indicator".
   * Recommended to use an invisible `IconButton`.
   */
  leftIcon?: React.ReactNode;
  /**
   * Icon shown on top right of the tile. Also known as "quick action".
   * Recommended to use an invisible `IconButton`.
   */
  rightIcon?: React.ReactNode;
  /**
   * `Badge` shown on the bottom right of thumbnail.
   */
  badge?: React.ReactNode;
};

export const TileNew = Object.assign(TileComponent, {
  // subcomponents and usage write up go in here
  Thumbnail: TileThumbnail,
});

export type TileNewProps = PolymorphicComponentProps<'div', TileOwnProps>;
export type TileNewThumbnailProps = PolymorphicComponentProps<
  'div',
  TileThumbnailOwnProps
>;
// do same for other subcomponent types here , right now only have main

export default TileNew;
