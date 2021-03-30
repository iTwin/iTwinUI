/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SvgAway from '@bentley/icons-generic-react/cjs/icons/Away';
import SvgCheckmark from '@bentley/icons-generic-react/cjs/icons/Checkmark';
import SvgClose2 from '@bentley/icons-generic-react/cjs/icons/Close2';
import cx from 'classnames';
import React from 'react';
import { CommonProps } from '../utils/props';
import { useTheme } from '../utils/hooks/useTheme';
import '@bentley/itwinui/css/user-icons.css';

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
   * Color of the icon. You can use `@bentley/get-user-color` package to generate color from user email.
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
    away: <SvgAway className='iui-user-icons-status-symbol' />,
    offline: <SvgClose2 className='iui-user-icons-status-symbol' />,
    online: <SvgCheckmark className='iui-user-icons-status-symbol' />,
    busy: <></>,
  };

  return (
    <span
      className={cx(`iui-user-icons-${size}`, className)}
      title={title}
      style={style}
      {...rest}
    >
      {status && (
        <span
          title={statusTitles[status]}
          className={cx('iui-user-icons-status', {
            [`iui-${status}`]: !!status,
          })}
        >
          {iconMap[status]}
        </span>
      )}
      <span className='iui-user-icons-stroke' />
      {image ?? (
        <abbr className='iui-user-icons-initials' style={{ backgroundColor }}>
          {abbreviation?.substring(0, 2)}
        </abbr>
      )}
    </span>
  );
};

export default UserIcon;
