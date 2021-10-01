/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SvgAway from '@itwin/itwinui-icons-react/cjs/icons/Away';
import SvgCheckmark from '@itwin/itwinui-icons-react/cjs/icons/Checkmark';
import SvgCloseSmall from '@itwin/itwinui-icons-react/cjs/icons/CloseSmall';
import cx from 'classnames';
import React from 'react';
import { CommonProps, useTheme } from '../utils';
import '@itwin/itwinui-css/css/user-icon.css';

export type UserIconStatus = 'online' | 'busy' | 'away' | 'offline';

export type StatusTitles = { [key in Exclude<UserIconStatus, ''>]: string };

export type UserIconProps = {
  /**
   * Size of a user icon.
   * @default 'small'
   */
  size?: 'small' | 'medium' | 'large' | 'x-large';
  /**
   * Status/Availability of a user.
   */
  status?: UserIconStatus;
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

export const defaultStatusTitles: StatusTitles = {
  away: 'Away',
  busy: 'Busy',
  offline: 'Offline',
  online: 'Online',
};

/**
 * Basic user icon component
 * @example
 * <caption>Small icon with abbreviation</caption>
 * <UserIcon size='small' title='Terry Rivers' abbreviation='TR' backgroundColor='green'/>
 * @example
 * <caption>Medium icon with image</caption>
 * <UserIcon size='medium' title='Terry Rivers' abbreviation='TR' backgroundColor='green' image={<img src="https://cdn.example.com/user/profile/pic.png" />}/>
 * @example
 * <caption>Large icon with status</caption>
 * <UserIcon size='large' title='Terry Rivers' abbreviation='TR' backgroundColor='green' status='online' />
 * @example
 * <caption>X-large icon with image</caption>
 * <UserIcon size='x-large' title='Terry Rivers' abbreviation='TR' backgroundColor='green' image={<img src="https://cdn.example.com/user/profile/pic.png" />}/>
 */
export const UserIcon = (props: UserIconProps) => {
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

  const iconMap: { [key in UserIconStatus]: JSX.Element } = {
    away: <SvgAway className='iui-status-symbol' aria-hidden />,
    offline: <SvgCloseSmall className='iui-status-symbol' aria-hidden />,
    online: <SvgCheckmark className='iui-status-symbol' aria-hidden />,
    busy: <></>,
  };

  return (
    <span
      className={cx(
        'iui-user-icon',
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
        >
          {iconMap[status]}
        </span>
      )}
    </span>
  );
};

export default UserIcon;
