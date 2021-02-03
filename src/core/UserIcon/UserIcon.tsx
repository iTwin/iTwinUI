import '@bentley/itwinui/css/user-icons.css';
import { SvgAway, SvgClose2, SvgCheckmark } from '@bentley/icons-generic-react';
import cx from 'classnames';
import React from 'react';
import { CommonProps } from '../utils/props';

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
} & CommonProps;

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
 * <UserIcon size='small' title='Greg Bentley' abbreviation='GB' backgroundColor='green'/>
 * @example
 * <caption>Medium icon with image</caption>
 * <UserIcon size='medium' title='Greg Bentley' abbreviation='GB' backgroundColor='green' image={<img src="https://cdn.example.com/user/profile/pic.png" />}/>
 * @example
 * <caption>Large icon with status</caption>
 * <UserIcon size='large' title='Greg Bentley' abbreviation='GB' backgroundColor='green' status='online' />
 * @example
 * <caption>X-large icon with image</caption>
 * <UserIcon size='x-large' title='Greg Bentley' abbreviation='GB' backgroundColor='green' image={<img src="https://cdn.example.com/user/profile/pic.png" />}/>
 */
export const UserIcon: React.FC<UserIconProps> = (props) => {
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
  } = props;

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
