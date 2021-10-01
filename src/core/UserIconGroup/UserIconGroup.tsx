/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme, CommonProps } from '../utils';
import '@itwin/itwinui-css/css/user-icon.css';

export type UserIconGroupProps = {
  /**
   * Max number of icons unstacked.
   * @default 5
   */
  maxIcons?: number;
  /**
   * If true, group will be stacked to take less space.
   * @default true
   */
  stacked?: boolean;
  /**
   * If true, group will be animated on hover.
   * @default false
   */
  animated?: boolean;
  /**
   * Size of user and count icons.
   * @default 'small'
   */
  iconSize?: 'small' | 'medium' | 'large' | 'x-large';
  /**
   * User Icons in the group.
   */
  children: React.ReactNode;
  /**
   * User Count Icon props.
   */
  countIconProps?: React.ComponentPropsWithRef<'div'>;
} & Omit<CommonProps, 'title'>;
/**
 * Group User Icons together.
 *
 * User Icons stacking is based on `maxIcons` count. If you provide 8 User Icons and keep default 5 `maxIcons` count,
 * this component will show 5 User Icons and User Count Icon with "3" in it.
 *
 * You can add custom User Count Icon behavior by using `countIconProps`.
 *
 * @example
 * <UserIconGroup iconSize='medium'>
 *  <UserIcon
 *    abbreviation="TR"
 *    backgroundColor={getUserColor("Terry Rivers")}
 *    title="Terry Rivers"
 *  />
 *  <UserIcon
 *    abbreviation="RM"
 *    backgroundColor={getUserColor("Robin Mercer")}
 *    title="Robin Mercer"
 *  />
 *  <UserIcon
 *    abbreviation="JM"
 *    backgroundColor={getUserColor("Jean Mullins")}
 *    title="Jean Mullins"
 *  />
 * </UserIconGroup>
 */
export const UserIconGroup = (props: UserIconGroupProps) => {
  const maxLength = 99;
  const {
    children,
    animated = false,
    stacked = true,
    maxIcons = 5,
    iconSize = 'small',
    countIconProps,
    className,
    ...rest
  } = props;

  const childrenArray = React.Children.toArray(children);
  const childrenLength = childrenArray.length;

  useTheme();

  const getUserIconList = (count: number) => {
    return childrenArray.slice(0, count).map((child) =>
      React.cloneElement(child as JSX.Element, {
        status: undefined,
        size: iconSize,
      }),
    );
  };

  return (
    <>
      <div
        className={cx(
          'iui-user-icon-list',
          {
            'iui-animated': animated,
            'iui-stacked': stacked,
          },
          className,
        )}
        {...rest}
      >
        {childrenArray.length <= maxIcons + 1 && getUserIconList(maxIcons + 1)}
        {childrenArray.length > maxIcons + 1 && (
          <>
            {getUserIconList(maxIcons)}
            ​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​​
            <div
              {...countIconProps}
              className={cx(
                'iui-user-icon',
                { [`iui-${iconSize}`]: iconSize !== 'medium' },
                'iui-user-icon-count',
                countIconProps?.className,
              )}
            >
              <abbr className='iui-initials'>
                {childrenLength <= maxLength
                  ? `${childrenLength - maxIcons}`
                  : `${maxLength}+`}
              </abbr>
              <span className='iui-stroke' />
            </div>
            ​
          </>
        )}
      </div>
    </>
  );
};

export default UserIconGroup;
