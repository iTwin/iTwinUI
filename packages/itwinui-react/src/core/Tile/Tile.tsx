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
      onClick?: React.MouseEventHandler<HTMLElement>;
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
  onClick?: React.MouseEventHandler<HTMLElement>;
};

const TileComponent = React.forwardRef((props, ref) => {
  const {
    className,
    status,
    variant,
    isNew,
    isSelected,
    isLoading,
    isActionable: isActionableProp,
    isDisabled,
    onClick,
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
        onClick,
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
        ref={ref}
        {...rest}
      />
    </TileContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', TileOwnProps>;
TileComponent.displayName = 'Tile';

// ----------------------------------------------------------------------------
// Tile.Action component

const TileAction = React.forwardRef((props, forwardedRef) => {
  const { setActionable } = useSafeContext(TileContext);
  React.useEffect(() => {
    if (!supportsHas()) {
      setActionable(true);
    }
  }, [setActionable]);

  return <LinkAction ref={forwardedRef} {...props} />;
}) as PolymorphicForwardRefComponent<'a'>;
TileAction.displayName = 'Tile.Action';

// ----------------------------------------------------------------------------
// Tile.ThumbnailArea component

const TileThumbnailArea = polymorphic.div('iui-tile-thumbnail');
TileThumbnailArea.displayName = 'Tile.ThumbnailArea';

// ----------------------------------------------------------------------------
// Tile.ThumbnailPicture component

type TileThumbnailPictureOwnProps =
  | { url?: string }
  | {
      url?: never; //no url for custom children component but needed to extract from props
      children?: React.ReactNode;
    };

const TileThumbnailPicture = React.forwardRef((props, ref) => {
  const { className, url, children, ...rest } = props;
  if (url) {
    return (
      <Box
        className={cx('iui-tile-thumbnail-picture', className)}
        style={{
          backgroundImage:
            url && typeof url === 'string' ? `url(${url})` : undefined,
        }}
        ref={ref}
        {...rest}
      />
    );
  }

  return (
    <Box className={cx('iui-thumbnail-icon', className)} ref={ref} {...rest}>
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', TileThumbnailPictureOwnProps>;

TileThumbnailPicture.displayName = 'Tile.TileThumbnailPicture';

// ----------------------------------------------------------------------------
// Tile.QuickAction component

const TileQuickAction = polymorphic.div('iui-tile-thumbnail-quick-action');
TileQuickAction.displayName = 'Tile.QuickAction';

// ----------------------------------------------------------------------------
// Tile.TypeIndicator component

const TileTypeIndicator = polymorphic.div('iui-tile-thumbnail-type-indicator');
TileTypeIndicator.displayName = 'Tile.TypeIndicator';

// ----------------------------------------------------------------------------
// Tile.IconButton component

const TileIconButton = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <IconButton
      className={className}
      styleType='borderless'
      size='small'
      ref={ref}
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

const TileBadgeContainer = polymorphic.div(
  'iui-tile-thumbnail-badge-container',
);
TileBadgeContainer.displayName = 'Tile.BadgeContainer';

// ----------------------------------------------------------------------------
// Tile.Name component
type TileNameOwnProps = {
  name?: string;
};

const TileName = React.forwardRef((props, ref) => {
  const { className, children, name, ...rest } = props;
  return (
    <Box className={cx('iui-tile-name', className)} ref={ref} {...rest}>
      {children ?? name}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', TileNameOwnProps>;
TileBadgeContainer.displayName = 'Tile.Name';

// ----------------------------------------------------------------------------
// Tile.NameIcon component

const TileNameIcon = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
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
    <Box className='iui-tile-status-icon' ref={ref} {...rest}>
      {children ?? icon}
    </Box>
  ) : null;
}) as PolymorphicForwardRefComponent<'div'>;
TileNameIcon.displayName = 'Tile.NameIcon';

// ----------------------------------------------------------------------------
// Tile.NameLabel component

const TileNameLabel = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  const { isActionable, isDisabled, onClick } = useSafeContext(TileContext);

  return (
    <Box as='span' className='iui-tile-name-label' ref={ref} {...rest}>
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
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div'>;
TileNameLabel.displayName = 'Tile.NameLabel';

// ----------------------------------------------------------------------------
// Tile.ContentArea component

const TileContentArea = polymorphic.div('iui-tile-content');
TileContentArea.displayName = 'Tile.ContentArea';

// ----------------------------------------------------------------------------
// Tile.Description component

const TileDescription = polymorphic.div('iui-tile-description');
TileDescription.displayName = 'Tile.Description';

// ----------------------------------------------------------------------------
// Tile.Metadata component

const TileMetadata = polymorphic.div('iui-tile-metadata');
TileMetadata.displayName = 'Tile.Metadata';

// ----------------------------------------------------------------------------
// Tile.MoreOptions component
type TileMoreOptionsOwnProps = {
  onButtonClick?: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactElement[];
};

const TileMoreOptions = React.forwardRef((props, ref) => {
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
        ref={ref}
        {...rest}
      >
        <IconButton
          as='button'
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

const TileButtons = polymorphic.div('iui-tile-buttons');
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
   * <Tile.Name>
   *  <Tile.NameIcon/>
   * </Tile.Name>
   * <Tile/>
   */
  NameIcon: TileNameIcon,
  /*
   * `NameLabel` of the tile
   * @example
   * <Tile>
   * <Tile.Name>
   *  <Tile.NameLabel> Tile Name <Tile.NameLabel/>
   * </Tile.Name/>
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
