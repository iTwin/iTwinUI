/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Box } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';

export type AvatarStatus = 'online' | 'busy' | 'away' | 'offline';

type StatusTitles = { [key in Exclude<AvatarStatus, ''>]: string };

type AvatarProps = {
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
   * User image to be displayed. Can be `<img>` or `<svg>` or anything else.
   */
  image?: JSX.Element;
  /**
   * Color of the icon. You can use `getUserColor` function to generate color from user name or email. If not provided, default background color from CSS styling will be used (hsl(72, 51%, 56%) / olive green).
   */
  backgroundColor?: string;
  /**
   * Translated status messages shown on hover.
   */
  translatedStatusTitles?: StatusTitles;
};

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
export const Avatar = React.forwardRef((props, ref) => {
  const {
    size = 'small',
    status,
    abbreviation,
    image,
    backgroundColor,
    title,
    translatedStatusTitles,
    className,
    style,
    ...rest
  } = props;

  const statusTitles = { ...defaultStatusTitles, ...translatedStatusTitles };

  return (
    <Box
      as='span'
      className={cx(
        'iui-avatar',
        { [`iui-${size}`]: size !== 'medium' },
        className,
      )}
      title={title}
      style={{ backgroundColor, ...style }}
      ref={ref}
      {...rest}
    >
      {!image && (
        <Box as='abbr' className='iui-initials'>
          {abbreviation?.substring(0, 2)}
        </Box>
      )}
      {image}
      <Box as='span' className='iui-stroke' />
      {status && (
        <Box
          as='span'
          title={statusTitles[status]}
          className={cx('iui-status', {
            [`iui-${status}`]: !!status,
          })}
          aria-label={statusTitles[status]}
        />
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'span', AvatarProps>;

/**
 * @deprecated Since v2, this has been renamed to `Avatar`
 */
export const UserIcon = Avatar;

export default Avatar;
