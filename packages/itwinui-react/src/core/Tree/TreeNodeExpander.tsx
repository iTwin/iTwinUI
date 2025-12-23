/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { SvgChevronRightSmall } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { IconButton } from '../Buttons/IconButton.js';
import type { IconButtonProps } from '../Buttons/IconButton.js';

type TreeNodeExpanderProps = {
  isExpanded?: boolean;
  expanderIconProps?: React.ComponentProps<'svg'>;
} & IconButtonProps;

export const TreeNodeExpander = React.forwardRef((props, ref) => {
  const { isExpanded, expanderIconProps = {}, ...rest } = props;

  return (
    <IconButton
      styleType='borderless'
      size='small'
      aria-label={isExpanded ? 'Collapse' : 'Expand'}
      ref={ref}
      {...rest}
    >
      <SvgChevronRightSmall
        {...expanderIconProps}
        className={cx(
          'iui-tree-node-content-expander-icon',
          expanderIconProps?.className,
          {
            'iui-tree-node-content-expander-icon-expanded': isExpanded,
          },
        )}
      />
    </IconButton>
  );
}) as PolymorphicForwardRefComponent<'button', TreeNodeExpanderProps>;
if (process.env.NODE_ENV === 'development') {
  TreeNodeExpander.displayName = 'TreeNode.Expander';
}
