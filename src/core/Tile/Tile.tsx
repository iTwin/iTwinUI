/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import SvgCheckmark from '@itwin/itwinui-icons-react/cjs/icons/Checkmark';
import SvgMore from '@itwin/itwinui-icons-react/cjs/icons/More';
import SvgNew from '@itwin/itwinui-icons-react/cjs/icons/New';
import { useTheme, CommonProps } from '../utils';
import '@itwin/itwinui-css/css/tile.css';
import { DropdownMenu } from '../DropdownMenu';
import { IconButton } from '../Buttons';

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
   *  thumbnail={<UserIcon image={<img src='icon.png' />} />}
   *  // or
   *  thumbnail={<SvgImodelHollow />}
   * />
   */
  thumbnail: string | React.ReactNode;
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
} & Omit<CommonProps, 'title'>;

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
        { 'iui-folder': variant === 'folder' },
        { 'iui-new': isNew },
        { 'iui-selected': isSelected },
        className,
      )}
      {...rest}
    >
      <div className='iui-thumbnail'>
        {typeof thumbnail === 'string' ? (
          <div
            className='iui-picture'
            style={{ backgroundImage: `url(${thumbnail})` }}
          />
        ) : thumbnail && (thumbnail as JSX.Element).type === 'img' ? (
          React.cloneElement(thumbnail as JSX.Element, {
            className: 'iui-picture',
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
            className: 'iui-small iui-type-indicator',
          })}

        {rightIcon &&
          React.cloneElement(rightIcon as React.ReactElement, {
            className: 'iui-small iui-quick-action',
          })}

        {badge && <div className='iui-badge-container'>{badge}</div>}
      </div>

      <div className='iui-content'>
        <div className='iui-name'>
          {isSelected && (
            <SvgCheckmark
              className={cx('iui-tile-status-icon', 'iui-informational')}
              aria-hidden
            />
          )}
          {isNew && (
            <SvgNew
              className={cx('iui-tile-status-icon', 'iui-positive')}
              aria-hidden
            />
          )}
          <span className='iui-name-label'>{name}</span>
        </div>

        {description != undefined && (
          <div className='iui-description'>{description}</div>
        )}

        {metadata != undefined && (
          <div className='iui-metadata'>{metadata}</div>
        )}

        {moreOptions && (
          <DropdownMenu
            onShow={showMenu}
            onHide={hideMenu}
            menuItems={(close) =>
              moreOptions.map((option: React.ReactElement) =>
                React.cloneElement(option, {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onClick: (value: any) => {
                    close();
                    option.props.onClick?.(value);
                  },
                }),
              )
            }
          >
            <IconButton
              styleType='borderless'
              size='small'
              className={cx('iui-more-options', {
                'iui-visible': isMenuVisible,
              })}
              aria-label='More options'
            >
              <SvgMore />
            </IconButton>
          </DropdownMenu>
        )}

        {children}
      </div>

      {buttons && (
        <div className='iui-tile-buttons'>
          {buttons.map((button: React.ReactElement) =>
            React.cloneElement(button, {
              className: cx('iui-tile-button', button.props.className),
            }),
          )}
        </div>
      )}
    </div>
  );
};

export default Tile;
