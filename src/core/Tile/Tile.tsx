/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import SvgCheckmark from '@bentley/icons-generic-react/cjs/icons/Checkmark';
import SvgMore2 from '@bentley/icons-generic-react/cjs/icons/More2';
import SvgNew from '@bentley/icons-generic-react/cjs/icons/New';
import { useTheme } from '../utils/hooks/useTheme';
import '@bentley/itwinui/css/tile.css';
import { DropdownMenu } from '../DropdownMenu';
import { CommonProps } from '../utils/props';
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
   *  thumbnail={<SvgImodel2 />}
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
 *  leftIcon={<IconButton><SvgInfo2 /></IconButton>}
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
          {isSelected && <SvgCheckmark className='iui-informational' />}
          {isNew && <SvgNew className='iui-positive' />}
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
            onOpen={() => setIsMenuVisible(true)}
            onClose={() => setIsMenuVisible(false)}
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
            >
              <SvgMore2 />
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
