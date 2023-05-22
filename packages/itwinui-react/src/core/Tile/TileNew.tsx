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
  polymorphic,
} from '../utils/index.js';
import '@itwin/itwinui-css/css/tile.css';
import { ProgressRadial } from '../ProgressIndicators/index.js';
import { DropdownMenu } from '../DropdownMenu/index.js';
import { IconButton } from '../Buttons/index.js';
// import { ProgressRadial } from '../ProgressIndicators';
// import Tile from '.';

const TileContext = React.createContext<
  | {
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

const TileThumbnailArea = polymorphic.div('iui-tile-thumbnail');
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

const TileBadge = polymorphic.div('iui-tile-thumbnail-badge-container');
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
      onClick,
    } = useSafeContext(TileContext);

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
              {children}
            </LinkAction>
          ) : (
            children
          )}
        </span>
      </Element>
    );
  },
) as PolymorphicForwardRefComponent<'div', TileNameOwnProps>;
TileName.displayName = 'TileNew.Name';

type TileNameOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

// ----------------------------------------------------------------------------
// Tile.ContentArea component

const TileContentArea = polymorphic.div('iui-tile-content');
TileContentArea.displayName = 'TileNew.ContentArea';

type TileContentAreaOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

// ----------------------------------------------------------------------------
// Tile.Description component

const TileDescription = polymorphic.div('iui-tile-description');
TileDescription.displayName = 'TileNew.Description';

type TileDescriptionOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

// ----------------------------------------------------------------------------
// Tile.Metadata component

const TileMetadata = polymorphic.div('iui-tile-metadata');
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

const TileButtons = polymorphic.div('iui-tile-buttons');
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
   * @example
   * <Tile.ThumbnailArea>
   *    <Tile.ThumbnailPicture/>
   *    // or
   *    <Tile.ThumbnailAvatar/>
   *    <Tile.QuickAction/>
   *    <Tile.TypeIndicator/>
   *    <Tile.Badge/>
   * </Tile.ThumbnailArea>
   */
  ThumbnailArea: TileThumbnailArea,
  /**
   * Thumbnail image url
   * @example
   * <Tile>
   *  // ...
   *  <Tile.ThumbnailArea>
   *    <Tile.ThumbnailPicture>
   *    '/url/to/image.jpg'
   *    </Tile.ThumbnailPicture>
   *  </Tile.ThumbnailArea>
   * </Tile>
   */
  ThumbnailPicture: TileThumbnailPicture,
  /**
   * a custom component or an svg for thumbnail avatar.
   * @example
   * <Tile>
   *  // ...
   *  <Tile.ThumbnailArea>
   *    <Tile.ThumbnailAvatar>
   *      {<Avatar image={<img src='icon.png' />} />}
   *      // or
   *      {<SvgImodelHollow />}
   *    </Tile.ThumbnailAvatar>
   *   </Tile.ThumbnailArea>
   * /Tile>
   */
  ThumbnailAvatar: TileThumbnailAvatar,
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
   * Name or title of the tile. Goes under <Tile.ContentArea> for `folder` variant
   * @example `default` variant
   * <Tile>
   *  <Tile.Name/>
   * </Tile>
   * @example `folder` variant
   * <Tile>
   *  <Tile.ContentArea>
   *    <Tile.Name/>
   *  <Tile.ContentArea>
   * <Tile>
   */
  Name: TileName,
  /**
   * Polymorphic Tile action component. Recommended to be used in `Tile.Name` subcomponent.
   * Renders `a` element by default.
   * @example
   * <Tile.Name>
   *   {<Tile.Action href='/new-page'>Tile name<Tile.Action/>}
   * </Tile.Name>
   */
  Action: TileAction,
  /**
   * Tile content area that contains `Description`, `Metadata` and `MoreOptions` Tile subcomponents
   * @example
   * <Tile>
   *  <Tile.ContentArea>
   *    <Tile.Description/>
   *    <Tile.Metadata/>
   *    <Tile.MoreOptions/>
   *  </Tile.ContentArea>
   * </Tile>
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
   * <Tile.Metadata>
   *  // ...
   *  'basic metadata'
   *  // or
   *  {<span><SvgClock /> 2021-01-01, 04:30 AM</span>}
   *  // or
   *  {<>
   *    <SvgTag2 />
   *    <TagContainer><Tag variant='basic'>Tag 1</Tag><Tag variant='basic'>Tag 2</Tag></TagContainer>
   *  </>}
   * </Tile.Metadata>
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
