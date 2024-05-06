/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type AvatarGroupProps = {
  /**
   * Max number of avatars unstacked.
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
   * Size of avatars and count avatars.
   * @default 'small'
   */
  iconSize?: 'small' | 'medium' | 'large' | 'x-large';
  /**
   * Avatars in the group.
   */
  children: React.ReactNode;
  /**
   * Count Avatar props.
   */
  countIconProps?: React.ComponentPropsWithRef<'div'>;
};

/**
 * Group Avatars together.
 *
 * Avatars stacking is based on `maxAvatars` count. If you provide 8 Avatars and keep default 5 `maxAvatars` count,
 * this component will show 5 Avatars and Count Avatar with "3" in it.
 *
 * You can add custom Count Avatar behavior by using `countAvatarProps`.
 *
 * @example
 * <AvatarGroup iconSize='medium'>
 *  <Avatar
 *    abbreviation="TR"
 *    backgroundColor={getUserColor("Terry Rivers")}
 *    title="Terry Rivers"
 *  />
 *  <Avatar
 *    abbreviation="RM"
 *    backgroundColor={getUserColor("Robin Mercer")}
 *    title="Robin Mercer"
 *  />
 *  <Avatar
 *    abbreviation="JM"
 *    backgroundColor={getUserColor("Jean Mullins")}
 *    title="Jean Mullins"
 *  />
 * </AvatarGroup>
 */
export const AvatarGroup = React.forwardRef((props, ref) => {
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

  const getAvatarList = (count: number) => {
    return childrenArray.slice(0, count).map((child) =>
      React.cloneElement(child as JSX.Element, {
        status: undefined,
        size: iconSize,
      }),
    );
  };

  return (
    <Box
      className={cx(
        'iui-avatar-list',
        {
          'iui-animated': animated,
          'iui-stacked': stacked,
        },
        className,
      )}
      ref={ref}
      {...rest}
    >
      {childrenArray.length <= maxIcons + 1 && getAvatarList(maxIcons + 1)}
      {childrenArray.length > maxIcons + 1 && (
        <>
          {getAvatarList(maxIcons)}
          <Box
            {...countIconProps}
            className={cx(
              'iui-avatar',
              'iui-avatar-count',
              countIconProps?.className,
            )}
            data-iui-size={iconSize !== 'medium' ? iconSize : undefined}
          >
            {childrenLength <= maxLength
              ? `${childrenLength - maxIcons}`
              : `${maxLength}+`}
          </Box>
        </>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', AvatarGroupProps>;
