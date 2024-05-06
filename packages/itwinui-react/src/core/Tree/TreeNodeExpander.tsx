/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { SvgChevronRight, SvgChevronRightSmall } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { IconButton } from '../Buttons/IconButton.js';
import type { IconButtonProps } from '../Buttons/IconButton.js';
import { TreeContext } from './TreeContext.js';

type TreeNodeExpanderProps = {
  isExpanded?: boolean;
  expanderIconProps?: React.ComponentProps<'svg'>;
} & IconButtonProps;

export const TreeNodeExpander = React.forwardRef((props, ref) => {
  const { isExpanded, expanderIconProps = {}, ...rest } = props;

  const size = React.useContext(TreeContext)?.size ?? 'default';
  const ChevronIcon = size === 'small' ? SvgChevronRightSmall : SvgChevronRight;

  return (
    <IconButton
      styleType='borderless'
      size='small'
      aria-label={isExpanded ? 'Collapse' : 'Expand'}
      ref={ref}
      {...rest}
    >
      <ChevronIcon
        className={cx(
          'iui-tree-node-content-expander-icon',
          expanderIconProps?.className,
          {
            'iui-tree-node-content-expander-icon-expanded': isExpanded,
          },
        )}
        {...expanderIconProps}
      />
    </IconButton>
  );
}) as PolymorphicForwardRefComponent<'button', TreeNodeExpanderProps>;
