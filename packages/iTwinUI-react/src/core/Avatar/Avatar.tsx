/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { CommonProps, useTheme } from '../utils';
import '@itwin/itwinui-css/css/avatar.css';

export type AvatarStatus = 'online' | 'busy' | 'away' | 'offline';

/**
 * @deprecated Since v2, this has been renamed to `AvatarStatus` (Use with `Avatar`)
 */
export type UserIconStatus = AvatarStatus;

export type StatusTitles = { [key in Exclude<AvatarStatus, ''>]: string };

export type AvatarProps = {
  /**
   * Size of an avatar.
   * @default 'small'
   */
  size?: 'small' | 'medium' | 'large' | 'x-large';
  /**
   * Status/Availability of a user.
   */
  status?: AvatarStatus;
  /**
   * Text which will appear when hovering over the icon.
   */
  title?: string;
  /**
   * Abbreviation to be displayed.
   */
  abbreviation?: string;
  /**
   * User image to be displayed. MUST be an <img> element!
   */
  image?: JSX.Element;
  /**
   * Color of the icon. You can use `getUserColor` function to generate color from user name or email.
   * @default 'white'
   */
  backgroundColor?: string;
  /**
   * Translated status messages shown on hover.
   */
  translatedStatusTitles?: StatusTitles;
} & Omit<CommonProps, 'title'>;

/**
 * @deprecated Since v2, this has been renamed to `AvatarProps` (Use with `Avatar`)
 */
export type UserIconProps = AvatarProps;

export const defaultStatusTitles: StatusTitles = {
  away: 'Away',
  busy: 'Busy',
  offline: 'Offline',
  online: 'Online',
};

/**
 * Basic avatar component
 * @example
 * <caption>Small icon with abbreviation</caption>
 * <Avatar size='small' title='Terry Rivers' abbreviation='TR' backgroundColor='green'/>
 * @example
 * <caption>Medium icon with image</caption>
 * <Avatar size='medium' title='Terry Rivers' abbreviation='TR' backgroundColor='green' image={<img src="https://cdn.example.com/user/profile/pic.png" />}/>
 * @example
 * <caption>Large icon with status</caption>
 * <Avatar size='large' title='Terry Rivers' abbreviation='TR' backgroundColor='green' status='online' />
 * @example
 * <caption>X-large icon with image</caption>
 * <Avatar size='x-large' title='Terry Rivers' abbreviation='TR' backgroundColor='green' image={<img src="https://cdn.example.com/user/profile/pic.png" />}/>
 */
export const Avatar = (props: AvatarProps) => {
  const {
    size = 'small',
    status,
    abbreviation,
    image,
    backgroundColor = 'white',
    title,
    translatedStatusTitles,
    className,
    style,
    ...rest
  } = props;

  useTheme();

  const statusTitles = { ...defaultStatusTitles, ...translatedStatusTitles };

  return (
    <span
      className={cx(
        'iui-avatar',
        { [`iui-${size}`]: size !== 'medium' },
        className,
      )}
      title={title}
      style={style}
      {...rest}
    >
      {image ?? (
        <abbr className='iui-initials' style={{ backgroundColor }}>
          {abbreviation?.substring(0, 2)}
        </abbr>
      )}
      <span className='iui-stroke' />
      {status && (
        <span
          title={statusTitles[status]}
          className={cx('iui-status', {
            [`iui-${status}`]: !!status,
          })}
          aria-label={statusTitles[status]}
        />
      )}
    </span>
  );
};

/**
 * @deprecated Since v2, this has been renamed to `Avatar`
 */
export const UserIcon = Avatar;

export default Avatar;
