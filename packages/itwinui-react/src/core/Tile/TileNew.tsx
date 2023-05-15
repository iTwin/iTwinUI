/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import cx from 'classnames';
import {
  useSafeContext,
  // useTheme,
  // SvgMore,
  type PolymorphicComponentProps,
  type PolymorphicForwardRefComponent,
  StatusIconMap,
  SvgCheckmark,
  SvgNew,
  LinkAction,
  supportsHas,
} from '../utils/index.js';
import '@itwin/itwinui-css/css/tile.css';
import { ProgressRadial } from '../ProgressIndicators/index.js';
// import { DropdownMenu } from '../DropdownMenu';
// import { IconButton } from '../Buttons';
// import { ProgressRadial } from '../ProgressIndicators';
// import Tile from '.';

const TileContext = React.createContext<
  | {
      // setActionable: React.Dispatch<React.SetStateAction<boolean>>;
      status: 'positive' | 'warning' | 'negative' | undefined;
      /**
       * Whether the tile is selected or in "active" state.
       * Gets highlighted and shows a checkmark icon near tile name.
       */
      isSelected?: boolean;
      /**
       * Whether the tile is "new". Tile name becomes bold and gets a new status icon.
       */
      isNew?: boolean;
      /**
       * Default tile variant or the folder layout.
       * @default 'default'
       */
      variant?: 'default' | 'folder';
      /**
       * Whether the tile is expected to be interactable (i.e. `onClick`).
       * It becomes focusable and gets on hover styling.
       */
      isActionable?: boolean;
      /**
       * Display a loading state.
       * @default false
       */
      isLoading?: boolean;
      /**
       * Flag whether the tile is disabled.
       *
       * Note: This only affects the tile. You need to manually disable
       * the buttons and other interactive elements inside the tile.
       *
       * @default false
       */
      isDisabled?: boolean;
      setActionable: React.Dispatch<React.SetStateAction<boolean>>;
      onClick?: React.MouseEventHandler<HTMLElement>;
    }
  | undefined
>(undefined);
TileContext.displayName = 'TileContext';

type TileActionOwnProps = {}; // eslint-disable-line

/**
 * Polymorphic Tile action component. Recommended to be used in a "name" of `Tile`.
 * Renders `a` element by default.
 * @example
 * <Tile
 *   name={<Tile.Action href='/new-page'>Tile name<Tile.Action/>}
 * />
 */
export const TileAction = (
  props: PolymorphicComponentProps<'a', TileActionOwnProps>,
) => {
  const tileContext = useSafeContext(TileContext);
  React.useEffect(() => {
    if (!supportsHas()) {
      tileContext.setActionable(true);
    }
  }, [tileContext]);

  return <LinkAction {...props} />;
};

//<Tile>
//  <Tile.Thumbnail>
//  <Tile.Name>
//  <Tile.Content>  //has meta data
//  <Tile.Buttons>
//</Tile>

// ----------------------------------------------------------------------------
// Main Tile component

const TileComponent = React.forwardRef((props, ref) => {
  const {
    as: Element = 'div',
    className,
    status,
    variant,
    isNew,
    isSelected,
    isLoading,
    isActionable,
    isDisabled,
    setActionable,
    onClick,
    ...rest
  } = props;
  return (
    <TileContext.Provider
      value={{
        status,
        variant,
        isNew,
        isSelected,
        isLoading,
        isActionable,
        isDisabled,
        setActionable,
        onClick,
      }}
    >
      <Element
        className={cx(
          'iui-tile',
          {
            'iui-folder': variant === 'folder',
            'iui-new': isNew,
            'iui-selected': isSelected,
            'iui-actionable': isActionable,
            [`iui-${status}`]: !!status,
            'iui-loading': isLoading,
          },
          className,
        )}
        ref={ref}
        {...rest}
      />
    </TileContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', TileOwnProps>;
TileComponent.displayName = 'TileNew';

type TileOwnProps = {
  /**
   * Status of the tile.
   */
  status?: 'positive' | 'warning' | 'negative';
  /**
   * Whether the tile is selected or in "active" state.
   * Gets highlighted and shows a checkmark icon near tile name.
   */
  isSelected?: boolean;
  /**
   * Whether the tile is "new". Tile name becomes bold and gets a new status icon.
   */
  isNew?: boolean;
  /**
   * Default tile variant or the folder layout.
   * @default 'default'
   */
  variant?: 'default' | 'folder';
  /**
   * Whether the tile is expected to be interactable (i.e. `onClick`).
   * It becomes focusable and gets on hover styling.
   */
  isActionable?: boolean;
  /**
   * Display a loading state.
   * @default false
   */
  isLoading?: boolean;
  /**
   * Flag whether the tile is disabled.
   *
   * Note: This only affects the tile. You need to manually disable
   * the buttons and other interactive elements inside the tile.
   *
   * @default false
   */
  isDisabled?: boolean;
  setActionable: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

// ----------------------------------------------------------------------------
// Tile.ThumbnailArea component

const TileThumbnailArea = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, children, ...rest } = props;
  return (
    <Element
      className={cx('iui-tile-thumbnail', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TileThumbnailAreaOwnProps>;
TileThumbnailArea.displayName = 'TileNew.ThumbnailArea';

type TileThumbnailAreaOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

// ----------------------------------------------------------------------------
// Tile.ThumbnailPicture component

const TileThumbnailPicture = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, thumbnail, ...rest } = props;
  return (
    <Element
      className={cx('iui-tile-thumbnail-picture', className)}
      style={{
        backgroundImage:
          thumbnail && typeof thumbnail === 'string'
            ? `url(${thumbnail})`
            : undefined,
      }}
      ref={ref}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', TileThumbnailPictureOwnProps>;

TileThumbnailPicture.displayName = 'TileNew.TileThumbnailPicture';

type TileThumbnailPictureOwnProps = {
  /**
   * Thumbnail image url
   * @example
   * <Tile
   *  // ...
   *  <Tile.ThumbnailPicture
   *    thumbnail='/url/to/image.jpg'
   *  />
   * />
   */
  thumbnail?: string | React.ReactNode;
};

// ----------------------------------------------------------------------------
// Tile.ThumbnailAvatar component

const TileThumbnailAvatar = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, avatar, ...rest } = props;
  if (React.isValidElement(avatar)) {
    return React.createElement(avatar.type, {
      ...avatar.props,
      className: cx('iui-thumbnail-icon', avatar.props.className),
    });
  }

  return (
    <Element className={cx(className)} ref={ref} {...rest}>
      {avatar}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TileThumbnailAvatarOwnProps>;

TileThumbnailPicture.displayName = 'TileNew.TileThumbnailAvatar';

type TileThumbnailAvatarOwnProps = {
  /**
   * Thumbnail avatar, a custom component or an svg.
   * @example
   * <Tile
   *  // ...
   *  <Tile.ThumbnailAvatar avatar={<Avatar image={<img src='icon.png' />} />} />
   *  // or
   *  <Tile.ThumbnailAvatar avatar={<SvgImodelHollow />} />
   * />
   */
  avatar?: React.ReactNode;
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

// ----------------------------------------------------------------------------
// Tile.Name component

const TileName = React.forwardRef(
  ({ as: Element = 'div', name, ...rest }, ref) => {
    const {
      status,
      isLoading,
      isSelected,
      isNew,
      isActionable,
      isDisabled,
      onClick,
    } = useSafeContext(TileContext);

    type TitleIconProps = {
      isLoading?: boolean;
      isSelected?: boolean;
      isNew?: boolean;
      status?: 'positive' | 'warning' | 'negative';
    };

    const TitleIcon = ({
      isLoading = false,
      isSelected = false,
      isNew = false,
      status,
    }: TitleIconProps) => {
      const StatusIcon = !!status && StatusIconMap[status];

      if (isLoading) {
        return (
          <ProgressRadial
            className='iui-tile-status-icon'
            aria-hidden
            indeterminate
          />
        );
      }
      if (isSelected) {
        return <SvgCheckmark className='iui-tile-status-icon' aria-hidden />;
      }
      if (isNew) {
        return <SvgNew className='iui-tile-status-icon' aria-hidden />;
      }
      if (StatusIcon) {
        return <StatusIcon className='iui-tile-status-icon' />;
      }
      return null;
    };

    return (
      <Element className='iui-tile-name' ref={ref} {...rest}>
        <TitleIcon
          isLoading={isLoading}
          isSelected={isSelected}
          isNew={isNew}
          status={status}
        />
        <span className='iui-tile-name-label'>
          {isActionable && onClick ? (
            <LinkAction
              as='button'
              onClick={!isDisabled ? onClick : undefined}
              aria-disabled={isDisabled}
            >
              {name}
            </LinkAction>
          ) : (
            name
          )}
        </span>
      </Element>
    );
  },
) as PolymorphicForwardRefComponent<'div', TileNameOwnProps>;
TileName.displayName = 'TileNew.Name';

type TileNameOwnProps = {
  /**
   * Name or title of the tile.
   */
  name: React.ReactNode;
};

export const TileNew = Object.assign(TileComponent, {
  /**
   * ThumbnailArea subcomponent that contains `ThumbnailPicture`, `QuickAction`, `TypeIndicator` or `Badge`
   */
  ThumbnailArea: TileThumbnailArea,
  /**
   * Thumbnail image url
   * @example
   * <Tile
   *  // ...
   *  <Tile.ThumbnailPicture
   *    thumbnail='/url/to/image.jpg'
   *  />
   * />
   */
  ThumbnailPicture: TileThumbnailPicture,
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
   */ ThumbnailAvatar: TileThumbnailAvatar,
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
  /**
   * Name or title of the tile.
   */
  Name: TileName,
  /**
   * Polymorphic Tile action component. Recommended to be used in a "name" of `Tile`.
   * Renders `a` element by default.
   * @example
   * <Tile.Name
   *   name={<Tile.Action href='/new-page'>Tile name<Tile.Action/>}
   * />
   */
  Action: TileAction,
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
export type TileNewThumbnailAvatarProps = PolymorphicComponentProps<
  'div',
  TileThumbnailAvatarOwnProps
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
export type TileNewNameProps = PolymorphicComponentProps<
  'div',
  TileNameOwnProps
>;
export type TileNewActionProps = PolymorphicComponentProps<
  'a',
  TileActionOwnProps
>;

export default TileNew;
