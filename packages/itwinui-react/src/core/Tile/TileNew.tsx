/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import cx from 'classnames';
import {
  useSafeContext,
  SvgMore,
  StatusIconMap,
  SvgCheckmark,
  SvgNew,
  LinkAction,
  supportsHas,
  polymorphic,
  Box,
} from '../utils/index.js';
import '@itwin/itwinui-css/css/tile.css';
import { ProgressRadial } from '../ProgressIndicators/index.js';
import { DropdownMenu } from '../DropdownMenu/index.js';
import { IconButton } from '../Buttons/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';

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
  setActionable: React.Dispatch<React.SetStateAction<boolean>>;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

//<Tile>
//  <Tile.Thumbnail>
//  <Tile.Name>
//  <Tile.Content>  //has meta data
//  <Tile.Buttons>
//</Tile>

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

// ----------------------------------------------------------------------------
// Tile.Action component

type TileActionOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

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
  const { setActionable } = useSafeContext(TileContext);
  React.useEffect(() => {
    if (!supportsHas()) {
      setActionable(true);
    }
  }, [setActionable]);

  return <LinkAction {...props} />;
};

// ----------------------------------------------------------------------------
// Tile.ThumbnailArea component

type TileThumbnailAreaOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const TileThumbnailArea = polymorphic.div('iui-tile-thumbnail');
TileThumbnailArea.displayName = 'TileNew.ThumbnailArea';

// ----------------------------------------------------------------------------
// Tile.ThumbnailPicture component

type TileThumbnailPictureOwnProps =
  | { url?: string }
  | {
      url?: never; //no url for custom children component but needed to extract from props
      children?: React.ReactNode;
    };

const TileThumbnailPicture = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, url, children, ...rest } = props;
  if (url) {
    return (
      <Element
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
    <Element
      className={cx('iui-thumbnail-icon', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TileThumbnailPictureOwnProps>;

TileThumbnailPicture.displayName = 'TileNew.TileThumbnailPicture';

// ----------------------------------------------------------------------------
// Tile.QuickAction component

type TileQuickActionOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const TileQuickAction = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, children, ...rest } = props;
  return (
    //todo: styling is all off, need to fix after
    <Element
      className={cx('iui-tile-thumbnail-quick-action', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TileQuickActionOwnProps>;
TileQuickAction.displayName = 'Tile.QuickAction';

// ----------------------------------------------------------------------------
// Tile.TypeIndicator component

type TileTypeIndicatorOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const TileTypeIndicator = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, children, ...rest } = props;
  return (
    //todo: styling is all off, need to fix after
    <Element
      className={cx('iui-tile-thumbnail-type-indicator', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TileTypeIndicatorOwnProps>;
TileTypeIndicator.displayName = 'Tile.TypeIndicator';

// ----------------------------------------------------------------------------
// Tile.Badge component
type TileBadgeContainerOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const TileBadgeContainer = polymorphic.div(
  'iui-tile-thumbnail-badge-container',
);
TileBadgeContainer.displayName = 'Tile.BadgeContainer';

// ----------------------------------------------------------------------------
// Tile.NameIcon component
type TileNameIconOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const TileNameIcon = React.forwardRef((props, ref) => {
  const { as: Element = 'div', children, ...rest } = props;
  const {
    status,
    isLoading,
    isSelected,
    isNew,
    // isActionable,
    // isDisabled,
    // onClick,
  } = useSafeContext(TileContext);

  return (
    <Element className='iui-tile-name' ref={ref} {...rest}>
      <TitleIcon
        isLoading={isLoading}
        isSelected={isSelected}
        isNew={isNew}
        status={status}
      />
      {!(isLoading || isSelected || isNew) && children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TileNameIconOwnProps>;
TileNameIcon.displayName = 'TileNew.NameIcon';

// ----------------------------------------------------------------------------
// Tile.NameLabel component
type TileNameLabelOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const TileNameLabel = React.forwardRef((props, ref) => {
  const { as: Element = 'div', ...rest } = props;
  const {
    status,
    isLoading,
    isSelected,
    isNew,
    // isActionable,
    // isDisabled,
    // onClick,
  } = useSafeContext(TileContext);

  return (
    <Element className='iui-tile-name' ref={ref} {...rest}>
      <TitleIcon
        isLoading={isLoading}
        isSelected={isSelected}
        isNew={isNew}
        status={status}
      />
      {/* <span className='iui-tile-name-label'>
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
      </span> */}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TileNameLabelOwnProps>;
TileNameLabel.displayName = 'TileNew.NameLabel';

// ----------------------------------------------------------------------------
// Tile.ContentArea component
type TileContentAreaOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const TileContentArea = polymorphic.div('iui-tile-content');
TileContentArea.displayName = 'TileNew.ContentArea';

// ----------------------------------------------------------------------------
// Tile.Description component
type TileDescriptionOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const TileDescription = polymorphic.div('iui-tile-description');
TileDescription.displayName = 'TileNew.Description';

// ----------------------------------------------------------------------------
// Tile.Metadata component
type TileMetadataOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const TileMetadata = polymorphic.div('iui-tile-metadata');
TileMetadata.displayName = 'TileNew.Metadata';

// ----------------------------------------------------------------------------
// Tile.MoreOptions component
type TileMoreOptionsOwnProps = {
  children: React.ReactNode[];
};

const TileMoreOptions = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, children, ...rest } = props;
  const [isMenuVisible, setIsMenuVisible] = React.useState(false);

  return (
    <DropdownMenu
      onShow={React.useCallback(() => setIsMenuVisible(true), [])}
      onHide={React.useCallback(() => setIsMenuVisible(false), [])}
      menuItems={(close) =>
        children.map((option: React.ReactElement) =>
          React.cloneElement(option, {
            onClick: (value: unknown) => {
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
  );
}) as PolymorphicForwardRefComponent<'div', TileMoreOptionsOwnProps>;
TileMoreOptions.displayName = 'TileNew.MoreOptions';

// ----------------------------------------------------------------------------
// Tile.Buttons component
type TileButtonsOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const TileButtons = polymorphic.div('iui-tile-buttons');
TileButtons.displayName = 'TileNew.Buttons';

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

  let icon = null;

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
  if (StatusIcon) {
    icon = <StatusIcon />;
  }
  return icon ? (
    <Box as='div' className='iui-tile-status-icon'>
      {icon}
    </Box>
  ) : null;
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
   * Thumbnail image url, a custom component or an svg for thumbnail avatar.
   * @example
   * <Tile>
   *  // ...
   *  <Tile.ThumbnailArea>
   *    <Tile.ThumbnailPicture>
   *    '/url/to/image.jpg'
   *    </Tile.ThumbnailPicture>
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
  BadgeContainer: TileBadgeContainer,
  /**
   * Icon next to name of the tile. Goes under <Tile.ContentArea> for `folder` variant
   * @example `default` variant
   * <Tile>
   *  <Tile.NameIcon/>
   * </Tile>
   * @example `folder` variant
   * <Tile>
   *  <Tile.ContentArea>
   *    <Tile.NameIcon/>
   *  <Tile.ContentArea>
   * <Tile>
   */
  NameIcon: TileNameIcon,
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
export type TileNewQuickActionProps = PolymorphicComponentProps<
  'button',
  TileQuickActionOwnProps
>;
export type TileNewTypeIndicatorProps = PolymorphicComponentProps<
  'button',
  TileTypeIndicatorOwnProps
>;
export type TileNewBadgeContainerProps = PolymorphicComponentProps<
  'button',
  TileBadgeContainerOwnProps
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
export type TileNameIconProps = PolymorphicComponentProps<
  'div',
  TileNameIconOwnProps
>;

export default TileNew;
