/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { SvgChevronRight } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { Icon } from '../Icon/Icon.js';

export const ExpandableBlockExpandIcon = React.forwardRef(
  (props, forwardedRef) => {
    const { className, children, ...rest } = props;
    return (
      <Icon
        className={cx('iui-expandable-block-icon', className)}
        ref={forwardedRef}
        {...rest}
      >
        {children ?? <SvgChevronRight aria-hidden />}
      </Icon>
    );
  },
) as PolymorphicForwardRefComponent<'span'>;
if (process.env.NODE_ENV === 'development') {
  ExpandableBlockExpandIcon.displayName = 'ExpandableBlock.ExpandIcon';
}
