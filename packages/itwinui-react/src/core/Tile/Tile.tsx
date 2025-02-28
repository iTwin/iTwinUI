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
  useSafeContext,
  supportsHas,
  polymorphic,
  Box,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { DropdownMenu } from '../DropdownMenu/DropdownMenu.js';
import { IconButton } from '../Buttons/IconButton.js';
import { ProgressRadial } from '../ProgressIndicators/ProgressRadial.js';
import { LinkAction } from '../LinkAction/LinkAction.js';
import { MenuCloseOnClickContext } from '../Menu/Menu.js';

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
if (process.env.NODE_ENV === 'development') {
  TileContext.displayName = 'TileContext';
}

// ----------------------------------------------------------------------------
// Main Tile component

type TileWrapperOwnProps = {
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
};

const TileWrapper = React.forwardRef((props, forwardedRef) => {
  const {
    className,
    status,
    variant,
    isNew,
    isSelected,
    isLoading,
    isDisabled,
    ...rest
  } = props;
  const [localActionable, setLocalActionable] = React.useState(false);
  const isActionable = localActionable;

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
}) as PolymorphicForwardRefComponent<'div', TileWrapperOwnProps>;
if (process.env.NODE_ENV === 'development') {
  TileWrapper.displayName = 'Tile.Wrapper';
}

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
if (process.env.NODE_ENV === 'development') {
  TileAction.displayName = 'Tile.Action';
}

// ----------------------------------------------------------------------------
// Tile.ThumbnailArea component

const TileThumbnailArea = polymorphic.div('iui-tile-thumbnail');
if (process.env.NODE_ENV === 'development') {
  TileThumbnailArea.displayName = 'Tile.ThumbnailArea';
}

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

if (process.env.NODE_ENV === 'development') {
  TileThumbnailPicture.displayName = 'Tile.TileThumbnailPicture';
}

// ----------------------------------------------------------------------------
// Tile.QuickAction component

const TileQuickAction = polymorphic.div('iui-tile-thumbnail-quick-action');
if (process.env.NODE_ENV === 'development') {
  TileQuickAction.displayName = 'Tile.QuickAction';
}

// ----------------------------------------------------------------------------
// Tile.TypeIndicator component

const TileTypeIndicator = polymorphic.div('iui-tile-thumbnail-type-indicator');
if (process.env.NODE_ENV === 'development') {
  TileTypeIndicator.displayName = 'Tile.TypeIndicator';
}

// ----------------------------------------------------------------------------
// Tile.IconButton component

const TileIconButton = React.forwardRef((props, forwardedRef) => {
  const { className, children, ...rest } = props;
  return (
    <IconButton
      className={cx('iui-tile-thumbnail-button', className)}
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
if (process.env.NODE_ENV === 'development') {
  TileIconButton.displayName = 'Tile.IconButton';
}

// ----------------------------------------------------------------------------
// Tile.BadgeContainer component

const TileBadgeContainer = polymorphic.div(
  'iui-tile-thumbnail-badge-container',
);
if (process.env.NODE_ENV === 'development') {
  TileBadgeContainer.displayName = 'Tile.BadgeContainer';
}

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
if (process.env.NODE_ENV === 'development') {
  TileBadgeContainer.displayName = 'Tile.Name';
}

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
    icon = <ProgressRadial size='x-small' aria-hidden indeterminate />;
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
if (process.env.NODE_ENV === 'development') {
  TileNameIcon.displayName = 'Tile.NameIcon';
}

// ----------------------------------------------------------------------------
// Tile.NameLabel component

const TileNameLabel = polymorphic.span('iui-tile-name-label');
if (process.env.NODE_ENV === 'development') {
  TileNameLabel.displayName = 'Tile.NameLabel';
}

// ----------------------------------------------------------------------------
// Tile.ContentArea component

const TileContentArea = polymorphic.div('iui-tile-content');
if (process.env.NODE_ENV === 'development') {
  TileContentArea.displayName = 'Tile.ContentArea';
}

// ----------------------------------------------------------------------------
// Tile.Description component

const TileDescription = polymorphic.div('iui-tile-description');
if (process.env.NODE_ENV === 'development') {
  TileDescription.displayName = 'Tile.Description';
}

// ----------------------------------------------------------------------------
// Tile.Metadata component

const TileMetadata = polymorphic.div('iui-tile-metadata');
if (process.env.NODE_ENV === 'development') {
  TileMetadata.displayName = 'Tile.Metadata';
}

// ----------------------------------------------------------------------------
// Tile.MoreOptions component
type TileMoreOptionsOwnProps = {
  buttonProps?: React.ComponentPropsWithoutRef<typeof IconButton>;
  children?: React.ReactNode[];
};

const TileMoreOptions = React.forwardRef((props, forwardedRef) => {
  const { className, children = [], buttonProps, ...rest } = props;
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  return (
    <MenuCloseOnClickContext.Provider value={true}>
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
        <DropdownMenu
          onVisibleChange={setIsMenuVisible}
          menuItems={children as React.ReactElement<any>[]}
        >
          <IconButton
            styleType='borderless'
            size='small'
            aria-label='More options'
            {...buttonProps}
          >
            <SvgMore />
          </IconButton>
        </DropdownMenu>
      </Box>
    </MenuCloseOnClickContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', TileMoreOptionsOwnProps>;
if (process.env.NODE_ENV === 'development') {
  TileMoreOptions.displayName = 'Tile.MoreOptions';
}

// ----------------------------------------------------------------------------
// Tile.Buttons component

const TileButtons = polymorphic.div('iui-tile-buttons');
if (process.env.NODE_ENV === 'development') {
  TileButtons.displayName = 'Tile.Buttons';
}

// ----------------------------------------------------------------------------
type TileLegacyProps = {
  /**
   * Name or title of the tile.
   */
  name: React.ReactNode;
  /**
   * Description text of the tile.
   * Gets truncated if it can't fit in the tile.
   */
  description?: React.ReactNode;
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
  metadata?: React.ReactNode;
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
  /**
   * `Badge` shown on the bottom right of thumbnail.
   */
  badge?: React.ReactNode;
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
   * Upto two buttons shown at the bottom of the tile.
   */
  buttons?: [React.ReactNode?, React.ReactNode?];
  /**
   * Dropdown menu containing `MenuItem`s.
   */
  moreOptions?: React.ReactNode[];
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
   * Any custom nodes that will be appended to the tile's main content.
   */
  children?: React.ReactNode;
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
  /**
   * Adds onClick to the TileAction component.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
};

const TileComponent = React.forwardRef((props, forwardedRef) => {
  const {
    name,
    description,
    status,
    isNew,
    isLoading,
    isSelected,
    thumbnail,
    badge,
    leftIcon,
    rightIcon,
    buttons,
    metadata,
    moreOptions,
    children,
    isActionable,
    isDisabled,
    onClick,
    ...rest
  } = props;
  return (
    <TileWrapper
      ref={forwardedRef}
      isNew={isNew}
      isSelected={isSelected}
      isLoading={isLoading}
      status={status}
      isDisabled={isDisabled}
      {...rest}
    >
      <TileName>
        {(status || isNew || isLoading || isSelected) && <TileNameIcon />}
        <TileNameLabel>
          {isActionable ? (
            <TileAction
              onClick={!isDisabled ? onClick : undefined}
              aria-disabled={isDisabled}
            >
              {name}
            </TileAction>
          ) : (
            name
          )}
        </TileNameLabel>
      </TileName>

      {thumbnail && (
        <TileThumbnailArea>
          {typeof thumbnail !== 'string' ? (
            <TileThumbnailPicture>{thumbnail}</TileThumbnailPicture>
          ) : (
            <TileThumbnailPicture url={thumbnail} />
          )}
          {badge && <TileBadgeContainer>{badge}</TileBadgeContainer>}
          {leftIcon && <TileTypeIndicator>{leftIcon}</TileTypeIndicator>}
          {rightIcon && <TileQuickAction>{rightIcon}</TileQuickAction>}
        </TileThumbnailArea>
      )}

      <TileContentArea>
        {description && <TileDescription>{description}</TileDescription>}
        {moreOptions && <TileMoreOptions>{moreOptions}</TileMoreOptions>}
        {metadata && <TileMetadata>{metadata}</TileMetadata>}
        {children}
      </TileContentArea>

      {buttons && <TileButtons>{buttons}</TileButtons>}
    </TileWrapper>
  );
}) as PolymorphicForwardRefComponent<'div', TileLegacyProps>;
if (process.env.NODE_ENV === 'development') {
  TileComponent.displayName = 'Tile';
}

/**
 * Tile with customizable Thumbnail, Name, Content and Buttons subcomponents
 * @example
 * <Tile.Wrapper>
 *    <Tile.ThumbnailArea>
 *      <Tile.ThumbnailPicture/>
 *      <Tile.Badge/>
 *      <Tile.TypeIndicator/>
 *      <Tile.QuickAction/>
 *    </Tile.ThumbnailArea>
 *    <Tile.Name>
 *      <Tile.NameIcon/>
 *      <Tile.NameLabel/>
 *    </Tile.Name>
 *    <Tile.ContentArea>
 *      <Tile.Description />
 *      <Tile.Metadata/>
 *      <Tile.MoreOptions/>
 *    </Tile.ContentArea>
 *    <Tile.Buttons/>
 * </Tile.Wrapper>
 *
 * @example
 *  <Tile
 *  name='Tile name'
 *  description='Tile description that takes upto 3 lines'
 *  metadata={<TagContainer><Tag variant='basic'>Tag 1</Tag></TagContainer>}
 *  thumbnail='/url/to/image.jpg'
 *  badge={<Badge backgroundColor='blue'>Badge label</Badge>}
 *  buttons={[<Button>Button 1</Button>, <Button>Button 2</Button>]}
 *  moreOptions={[<MenuItem>Item 1</MenuItem>, <MenuItem>Item 2</MenuItem>]}
 *  leftIcon={<IconButton><SvgInfo /></IconButton>}
 *  rightIcon={<IconButton><SvgStar /></IconButton>}
 *  isSelected={true}
 *  isNew={false}
 * />
 */
export const Tile = Object.assign(TileComponent, {
  /**
   * Wrapper subcomponent for fully customisable Tile.
   */
  Wrapper: TileWrapper,
  /**
   * ThumbnailArea subcomponent that contains `ThumbnailPicture`, `QuickAction`, `TypeIndicator` or `BadgeContainer`
   * @example
   * <Tile.ThumbnailArea>
   *    <Tile.ThumbnailPicture/>
   *    <Tile.QuickAction/>
   *    <Tile.TypeIndicator/>
   *    <Tile.BadgeContainer/>
   * </Tile.ThumbnailArea>
   */
  ThumbnailArea: TileThumbnailArea,
  /**
   * Thumbnail image url, a custom component or an svg for thumbnail avatar.
   * @example
   * <Tile.Wrapper>
   *  // ...
   *  <Tile.ThumbnailArea>
   *    <Tile.ThumbnailPicture url = '/url/to/image.jpg'/>
   *  </Tile.ThumbnailArea>
   * </Tile.Wrapper>
   * or
   * <Tile.Wrapper>
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
   * <Tile.Wrapper>
   *  <Tile.Name>
   *    <Tile.NameIcon/>
   *  </Tile.Name>
   * </Tile.Wrapper>
   */
  NameIcon: TileNameIcon,
  /*
   * `NameLabel` of the tile
   * @example
   * <Tile.Wrapper>
   *  <Tile.Name>
   *    <Tile.NameLabel> Tile Name <Tile.NameLabel/>
   *  </Tile.Name/>
   * </Tile.Wrapper>
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
   * <Tile.Wrapper>
   *  <Tile.ContentArea>
   *    <Tile.Description/>
   *    <Tile.Metadata/>
   *    <Tile.MoreOptions/>
   *  </Tile.ContentArea>
   * </Tile.Wrapper>
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
