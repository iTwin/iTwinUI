/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type ExpandableBlockContentOwnProps = {
  innerProps?: React.ComponentPropsWithoutRef<'div'>;
};

export const ExpandableBlockContent = React.forwardRef(
  (props, forwardedRef) => {
    const { className, children, innerProps, ...rest } = props;

    return (
      <Box
        className={cx('iui-expandable-content', className)}
        ref={forwardedRef}
        {...rest}
      >
        <Box {...innerProps}>{children}</Box>
      </Box>
    );
  },
) as PolymorphicForwardRefComponent<'div', ExpandableBlockContentOwnProps>;
if (process.env.NODE_ENV === 'development') {
  ExpandableBlockContent.displayName = 'ExpandableBlock.Content';
}
