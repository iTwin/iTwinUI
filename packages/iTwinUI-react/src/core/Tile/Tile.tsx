/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  StatusIconMap,
  useTheme,
  SvgMore,
  SvgNew,
  SvgCheckmark,
} from '../utils';
import '@itwin/itwinui-css/css/tile.css';
import { DropdownMenu } from '../DropdownMenu';
import { IconButton } from '../Buttons';
import { ProgressRadial } from '../ProgressIndicators';

export type TileProps = {
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
} & React.ComponentPropsWithoutRef<'div'>;

/**
 * Tile component that displays content and actions in a card-like format.
 * @example
 * <Tile
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
export const Tile = (props: TileProps) => {
  const {
    className,
    name,
    description,
    metadata,
    thumbnail,
    buttons,
    leftIcon,
    rightIcon,
    badge,
    isNew,
    isSelected,
    moreOptions,
    variant = 'default',
    children,
    isActionable,
    status,
    isLoading = false,
    isDisabled = false,
    ...rest
  } = props;

  useTheme();

  const [isMenuVisible, setIsMenuVisible] = React.useState(false);
  const showMenu = React.useCallback(() => setIsMenuVisible(true), []);
  const hideMenu = React.useCallback(() => setIsMenuVisible(false), []);

  return (
    <div
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
      tabIndex={isActionable && !isDisabled ? 0 : undefined}
      {...rest}
    >
      {thumbnail && (
        <div className='iui-tile-thumbnail'>
          {typeof thumbnail === 'string' ? (
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
        </div>
      )}

      <div className='iui-tile-content'>
        <div className='iui-tile-name'>
          <TitleIcon
            isLoading={isLoading}
            isSelected={isSelected}
            isNew={isNew}
            status={status}
          />

          <span className='iui-tile-name-label'>{name}</span>
        </div>

        {description != undefined && (
          <div className='iui-tile-description'>{description}</div>
        )}

        {metadata != undefined && (
          <div className='iui-tile-metadata'>{metadata}</div>
        )}

        {moreOptions && (
          <DropdownMenu
            onShow={showMenu}
            onHide={hideMenu}
            menuItems={(close) =>
              moreOptions.map((option: React.ReactElement) =>
                React.cloneElement(option, {
                  onClick: (value: unknown) => {
                    close();
                    option.props.onClick?.(value);
                  },
                }),
              )
            }
          >
            <div
              className={cx('iui-tile-more-options', {
                'iui-visible': isMenuVisible,
              })}
            >
              <IconButton
                styleType='borderless'
                size='small'
                aria-label='More options'
              >
                <SvgMore />
              </IconButton>
            </div>
          </DropdownMenu>
        )}

        {children}
      </div>

      {buttons && <div className='iui-tile-buttons'>{buttons}</div>}
    </div>
  );
};

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

export default Tile;
