/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { StatusIconMap, useSafeContext } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { Icon } from '../Icon/Icon.js';
import { ExpandableBlockContext } from './ExpandableBlockContext.js';

export const ExpandableBlockEndIcon = React.forwardRef(
  (props, forwardedRef) => {
    const { children, ...rest } = props;
    const { status } = useSafeContext(ExpandableBlockContext);

    const icon = children ?? (status && StatusIconMap[status]());
    return (
      <Icon fill={status} ref={forwardedRef} {...rest}>
        {icon}
      </Icon>
    );
  },
) as PolymorphicForwardRefComponent<
  'span',
  React.ComponentPropsWithoutRef<typeof Icon>
>;
if (process.env.NODE_ENV === 'development') {
  ExpandableBlockEndIcon.displayName = 'ExpandableBlock.EndIcon';
}
