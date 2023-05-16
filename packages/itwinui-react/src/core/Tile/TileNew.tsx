/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import cx from 'classnames';
import {
  useSafeContext,
  // useTheme,
  SvgMore,
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
import { DropdownMenu } from '../DropdownMenu/index.js';
import { IconButton } from '../Buttons/index.js';
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
        aria-disabled={isDisabled}
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
  const { as: Element = 'div', className, children, ...rest } = props;
  return (
    <Element
      className={cx('iui-tile-thumbnail-picture', className)}
      style={{
        backgroundImage:
          children && typeof children === 'string'
            ? `url(${children})`
            : undefined,
      }}
      ref={ref}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', TileThumbnailPictureOwnProps>;

TileThumbnailPicture.displayName = 'TileNew.TileThumbnailPicture';

type TileThumbnailPictureOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

// ----------------------------------------------------------------------------
// Tile.ThumbnailAvatar component

const TileThumbnailAvatar = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, children, ...rest } = props;
  if (React.isValidElement(children)) {
    return React.createElement(children.type, {
      ...children.props,
      className: cx('iui-thumbnail-icon', children.props.className),
    });
  }

  return (
    <Element className={cx(className)} ref={ref} {...rest}>
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TileThumbnailAvatarOwnProps>;

TileThumbnailPicture.displayName = 'TileNew.TileThumbnailAvatar';

type TileThumbnailAvatarOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

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
  ({ as: Element = 'div', children, ...rest }, ref) => {
    const {
      status,
      isLoading,
      isSelected,
      isNew,
      isActionable,
      isDisabled,
      variant,
      onClick,
    } = useSafeContext(TileContext);

    return (
      variant !== 'folder' && (
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
                {children}
              </LinkAction>
            ) : (
              children
            )}
          </span>
        </Element>
      )
    );
  },
) as PolymorphicForwardRefComponent<'div', TileNameOwnProps>;
TileName.displayName = 'TileNew.Name';

type TileNameOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

// ----------------------------------------------------------------------------
// Tile.ContentArea component

const TileContentArea = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, children, ...rest } = props;
  return (
    <Element className={cx('iui-tile-content', className)} ref={ref} {...rest}>
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TileContentAreaOwnProps>;
TileContentArea.displayName = 'TileNew.ContentArea';

type TileContentAreaOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

// ----------------------------------------------------------------------------
// Tile.Description component

const TileDescription = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, description, ...rest } = props;
  return (
    <Element
      className={cx('iui-tile-description', className)}
      ref={ref}
      {...rest}
    >
      {description !== undefined && description}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TileDescriptionOwnProps>;
TileDescription.displayName = 'TileNew.Description';

type TileDescriptionOwnProps = {
  /**
   * Description text of the tile.
   * Gets truncated if it can't fit in the tile.
   */
  description?: React.ReactNode;
};

// ----------------------------------------------------------------------------
// Tile.Metadata component

const TileMetadata = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, children, ...rest } = props;
  return (
    <Element className={cx('iui-tile-metadata', className)} ref={ref} {...rest}>
      {children !== undefined && children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TileMetadataOwnProps>;
TileMetadata.displayName = 'TileNew.Metadata';

type TileMetadataOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

// ----------------------------------------------------------------------------
// Tile.MoreOptions component

const TileMoreOptions = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, children, ...rest } = props;
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const showMenu = React.useCallback(() => setIsMenuVisible(true), []);
  const hideMenu = React.useCallback(() => setIsMenuVisible(false), []);

  return (
    children && (
      <DropdownMenu
        onShow={showMenu}
        onHide={hideMenu}
        menuItems={(close) =>
          children.map((option) =>
            React.cloneElement(option, {
              onClick: (value) => {
                close();
                option.props.onClick?.(value);
              },
            }),
          )
        }
      >
        <Element
          className={cx(
            'iui-tile-more-options',
            {
              'iui-visible': isMenuVisible,
            },
            className,
          )}
          ref={ref}
          {...rest}
        >
          <IconButton
            styleType='borderless'
            size='small'
            aria-label='More options'
          >
            <SvgMore />
          </IconButton>
        </Element>
      </DropdownMenu>
    )
  );
}) as PolymorphicForwardRefComponent<'div', TileMoreOptionsOwnProps>;
TileMoreOptions.displayName = 'TileNew.MoreOptions';

type TileMoreOptionsOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

// ----------------------------------------------------------------------------
// Tile.Buttons component

const TileButtons = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, children, ...rest } = props;
  return (
    <Element className={cx('iui-tile-buttons', className)} ref={ref} {...rest}>
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TileButtonsOwnProps>;
TileButtons.displayName = 'TileNew.Buttons';

type TileButtonsOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

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

  /**
   * Tile content area that contains `description`, `metadata` and `moreOptions`
   */

  ContentArea: TileContentArea,
  /**
   * Description text of the tile.
   * Gets truncated if it can't fit in the tile.
   */
  Description: TileDescription,
  /**
   * Metadata section located below description.
   * @example
   * <Tile
   *  // ...
   *  metadata='basic metadata'
   *  // or
   *  metadata={<span><SvgClock /> 2021-01-01, 04:30 AM</span>}
   *  // or
   *  metadata={<>
   *    <SvgTag2 />
   *    <TagContainer><Tag variant='basic'>Tag 1</Tag><Tag variant='basic'>Tag 2</Tag></TagContainer>
   *  </>}
   * />
   */
  Metadata: TileMetadata,
  /**
   * Dropdown menu containing `MenuItem`s.
   */
  MoreOptions: TileMoreOptions,
  /**
   * Upto two buttons shown at the bottom of the tile.
   */
  Buttons: TileButtons,
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
export type TileContentAreaProps = PolymorphicComponentProps<
  'div',
  TileContentAreaOwnProps
>;
export type TileDescriptionProps = PolymorphicComponentProps<
  'div',
  TileDescriptionOwnProps
>;
export type TileMetadataProps = PolymorphicComponentProps<
  'div',
  TileMetadataOwnProps
>;
export type TileMoreOptionsProps = PolymorphicComponentProps<
  'div',
  TileMoreOptionsOwnProps
>;
export type TileButtonsProps = PolymorphicComponentProps<
  'div',
  TileButtonsOwnProps
>;

export default TileNew;
