/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import {
  StatusIconMap,
  SvgMore,
  SvgNew,
  SvgCheckmark,
  LinkAction,
  useSafeContext,
  supportsHas,
  polymorphic,
  Box,
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { DropdownMenu } from '../DropdownMenu/index.js';
import { IconButton } from '../Buttons/index.js';
import { ProgressRadial } from '../ProgressIndicators/index.js';

const TileContext = React.createContext<
  | {
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
       * @deprecated since v3. Use `<Tile.Action>` subcomponent for actionable tile.
       * Whether the tile is expected to be interactive (i.e. `onClick`).
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
    }
  | undefined
>(undefined);
TileContext.displayName = 'TileContext';

// ----------------------------------------------------------------------------
// Main Tile component

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
   * Whether the tile is expected to be interactive (i.e. `onClick`).
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
  setActionable?: React.Dispatch<React.SetStateAction<boolean>>;
};

const TileComponent = React.forwardRef((props, forwardedRef) => {
  const {
    className,
    status,
    variant,
    isNew,
    isSelected,
    isLoading,
    isActionable: isActionableProp,
    isDisabled,
    ...rest
  } = props;
  const [localActionable, setLocalActionable] =
    React.useState(isActionableProp);
  const isActionable = isActionableProp ?? localActionable;

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
        setActionable: setLocalActionable,
      }}
    >
      <Box
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
        ref={forwardedRef}
        {...rest}
      />
    </TileContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', TileOwnProps>;
TileComponent.displayName = 'Tile';

// ----------------------------------------------------------------------------
// Tile.Action component

const TileAction = React.forwardRef((props, forwardedRef) => {
  const { onClick, children, href, ...rest } = props;
  const { setActionable, isDisabled } = useSafeContext(TileContext);
  React.useEffect(() => {
    if (!supportsHas()) {
      setActionable(true);
    }
  }, [setActionable]);

  return (
    <LinkAction
      as={(!!props.href ? 'a' : 'button') as 'a'}
      href={href}
      onClick={!isDisabled ? onClick : undefined}
      aria-disabled={isDisabled}
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </LinkAction>
  );
}) as PolymorphicForwardRefComponent<'a'>;
TileAction.displayName = 'Tile.Action';

// ----------------------------------------------------------------------------
// Tile.ThumbnailArea component

const TileThumbnailArea = polymorphic('iui-tile-thumbnail');
TileThumbnailArea.displayName = 'Tile.ThumbnailArea';

// ----------------------------------------------------------------------------
// Tile.ThumbnailPicture component

type TileThumbnailPictureOwnProps =
  | { url?: string }
  | {
      url?: never; //no url for custom children component but needed to extract from props
      children?: React.ReactNode;
    };

const TileThumbnailPicture = React.forwardRef((props, forwardedRef) => {
  const { className, url, children, ...rest } = props;
  if (url) {
    return (
      <Box
        className={cx('iui-tile-thumbnail-picture', className)}
        style={{
          backgroundImage: typeof url === 'string' ? `url(${url})` : undefined,
        }}
        ref={forwardedRef}
        {...rest}
      />
    );
  }

  return (
    <Box
      className={cx('iui-thumbnail-icon', className)}
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', TileThumbnailPictureOwnProps>;

TileThumbnailPicture.displayName = 'Tile.TileThumbnailPicture';

// ----------------------------------------------------------------------------
// Tile.QuickAction component

const TileQuickAction = polymorphic('iui-tile-thumbnail-quick-action');
TileQuickAction.displayName = 'Tile.QuickAction';

// ----------------------------------------------------------------------------
// Tile.TypeIndicator component

const TileTypeIndicator = polymorphic('iui-tile-thumbnail-type-indicator');
TileTypeIndicator.displayName = 'Tile.TypeIndicator';

// ----------------------------------------------------------------------------
// Tile.IconButton component

const TileIconButton = React.forwardRef((props, forwardedRef) => {
  const { className, children, ...rest } = props;
  return (
    <IconButton
      className={className}
      styleType='borderless'
      size='small'
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </IconButton>
  );
}) as PolymorphicForwardRefComponent<
  'button',
  React.ComponentPropsWithoutRef<typeof IconButton>
>;
TileIconButton.displayName = 'Tile.IconButton';

// ----------------------------------------------------------------------------
// Tile.BadgeContainer component

const TileBadgeContainer = polymorphic('iui-tile-thumbnail-badge-container');
TileBadgeContainer.displayName = 'Tile.BadgeContainer';

// ----------------------------------------------------------------------------
// Tile.Name component
type TileNameOwnProps = {
  name?: React.ReactNode;
};

const TileName = React.forwardRef((props, forwardedRef) => {
  const { className, children, name, ...rest } = props;
  return (
    <Box
      className={cx('iui-tile-name', className)}
      ref={forwardedRef}
      {...rest}
    >
      {children ?? name}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', TileNameOwnProps>;
TileBadgeContainer.displayName = 'Tile.Name';

// ----------------------------------------------------------------------------
// Tile.NameIcon component

const TileNameIcon = React.forwardRef((props, forwardedRef) => {
  const { children, className, ...rest } = props;
  const { status, isLoading, isSelected, isNew } = useSafeContext(TileContext);

  const StatusIcon = !!status && StatusIconMap[status];
  let icon;

  if (StatusIcon) {
    icon = <StatusIcon aria-hidden />;
  }
  if (isLoading) {
    icon = (
      <ProgressRadial style={{ height: '100%' }} aria-hidden indeterminate />
    );
  }
  if (isSelected) {
    icon = <SvgCheckmark aria-hidden />;
  }
  if (isNew) {
    icon = <SvgNew aria-hidden />;
  }

  return children || icon ? (
    <Box
      className={cx('iui-tile-status-icon', className)}
      ref={forwardedRef}
      {...rest}
    >
      {children ?? icon}
    </Box>
  ) : null;
}) as PolymorphicForwardRefComponent<'div'>;
TileNameIcon.displayName = 'Tile.NameIcon';

// ----------------------------------------------------------------------------
// Tile.NameLabel component

const TileNameLabel = polymorphic.span('iui-tile-name-label');
TileNameLabel.displayName = 'Tile.NameLabel';

// ----------------------------------------------------------------------------
// Tile.ContentArea component

const TileContentArea = polymorphic('iui-tile-content');
TileContentArea.displayName = 'Tile.ContentArea';

// ----------------------------------------------------------------------------
// Tile.Description component

const TileDescription = polymorphic('iui-tile-description');
TileDescription.displayName = 'Tile.Description';

// ----------------------------------------------------------------------------
// Tile.Metadata component

const TileMetadata = polymorphic('iui-tile-metadata');
TileMetadata.displayName = 'Tile.Metadata';

// ----------------------------------------------------------------------------
// Tile.MoreOptions component
type TileMoreOptionsOwnProps = {
  onButtonClick?: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactElement[];
};

const TileMoreOptions = React.forwardRef((props, forwardedRef) => {
  const { className, children = [], onButtonClick, ...rest } = props;
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  return (
    <DropdownMenu
      onShow={React.useCallback(() => setIsMenuVisible(true), [])}
      onHide={React.useCallback(() => setIsMenuVisible(false), [])}
      menuItems={(close) =>
        children?.map((option: React.ReactElement) =>
          React.cloneElement(option, {
            onClick: (value: unknown) => {
              close();
              option.props.onClick?.(value);
            },
          }),
        )
      }
    >
      <Box
        className={cx(
          'iui-tile-more-options',
          {
            'iui-visible': isMenuVisible,
          },
          className,
        )}
        ref={forwardedRef}
        {...rest}
      >
        <IconButton
          styleType='borderless'
          size='small'
          aria-label='More options'
          onClick={onButtonClick}
        >
          <SvgMore />
        </IconButton>
      </Box>
    </DropdownMenu>
  );
}) as PolymorphicForwardRefComponent<'div', TileMoreOptionsOwnProps>;
TileMoreOptions.displayName = 'Tile.MoreOptions';

// ----------------------------------------------------------------------------
// Tile.Buttons component

const TileButtons = polymorphic('iui-tile-buttons');
TileButtons.displayName = 'Tile.Buttons';

/**
 * Tile with customizable Thumbnail, Name, Content and Buttons subcomponents
 * @example
 * <Tile>
 *    <Tile.ThumbnailArea>
 *      <Tile.ThumbnailPicture/>
 *      <Tile.Badge/>
 *      <Tile.TypeIndicator/>
 *      <Tile.QuickAction/>
 *    </Tile.ThumbnailArea>
 *    <Tile.Name>
 *      <Tile.NameIcon/>
 *      <Tile.NameLabel/>
 *    <Tile.Name/>
 *    <Tile.ContentArea>
 *      <Tile.Description />
 *      <Tile.Metadata/>
 *      <Tile.MoreOptions/>
 *    </Tile.ContentArea>
 *    <Tile.Buttons/>
 * </Tile>
 */
export const Tile = Object.assign(TileComponent, {
  /**
   *ThumbnailArea subcomponent that contains `ThumbnailPicture`, `QuickAction`, `TypeIndicator` or `BadgeContainer`
   * @example
   * <Tile.ThumbnailArea>
   *    <Tile.ThumbnailPicture/>
   *    // or
   *    <Tile.ThumbnailAvatar/>
   *    <Tile.QuickAction/>
   *    <Tile.TypeIndicator/>
   *    <Tile.BadgeContainer/>
   * </Tile.ThumbnailArea>
   */
  ThumbnailArea: TileThumbnailArea,
  /**
   * Thumbnail image url, a custom component or an svg for thumbnail avatar.
   * @example
   * <Tile>
   *  // ...
   *  <Tile.ThumbnailArea>
   *    <Tile.ThumbnailPicture url = '/url/to/image.jpg'/>
   *  </Tile.ThumbnailArea>
   * </Tile>
   * or
   * <Tile>
   *  // ...
   *  <Tile.ThumbnailArea>
   *    <Tile.ThumbnailPicture>
   *      {<Avatar image={<img src='icon.png' />} />}
   *      // or
   *      {<SvgImodelHollow />}
   *    </Tile.ThumbnailPicture>
   *   </Tile.ThumbnailArea>
   * /Tile>
   */
  ThumbnailPicture: TileThumbnailPicture,
  /**
   * `QuickAction` subcomponent shown on top left of the tile.
   * Recommended to use an invisible `IconButton`.
   */
  QuickAction: TileQuickAction,
  /**
   * `TypeIndicator` subcomponent shown on top left of the tile.
   * Recommended to use an invisible `IconButton`.
   */
  TypeIndicator: TileTypeIndicator,
  /**
   * `BadgeContainer` subcomponent shown on the bottom right of thumbnail.
   */
  BadgeContainer: TileBadgeContainer,
  /**
   * `IconButton` subcomponent: custom icon for `QuickAction` and `TypeIndicator` buttons.
   */
  IconButton: TileIconButton,
  /**
   * `Name` subcomponent under thumbnail or top of the Tile if no thumbnail present.
   */
  Name: TileName,
  /**
   * `NameIcon` next to name of the tile. Goes under <Tile.Name>
   * @example
   * <Tile>
   *  <Tile.Name>
   *    <Tile.NameIcon/>
   *  </Tile.Name>
   * <Tile/>
   */
  NameIcon: TileNameIcon,
  /*
   * `NameLabel` of the tile
   * @example
   * <Tile>
   *  <Tile.Name>
   *    <Tile.NameLabel> Tile Name <Tile.NameLabel/>
   *  </Tile.Name/>
   * <Tile/>
   */
  NameLabel: TileNameLabel,
  /**
   * Polymorphic Tile action component. Recommended to be used in `Tile.NameLabel` subcomponent.
   * Renders `a` element by default.
   * @example
   * <Tile.Name>
   *  <Tile.NameLabel>
   *   {<Tile.Action href='/new-page'>Tile Name<Tile.Action/>}
   *  <Tile.NameLabel/>
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

export default Tile;
