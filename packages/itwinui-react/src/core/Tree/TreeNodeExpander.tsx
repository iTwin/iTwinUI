/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { SvgChevronRight } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { IconButton } from '../Buttons/IconButton/index.js';
import type { IconButtonProps } from '../Buttons/IconButton/IconButton.js';

type TreeNodeExpanderProps = {
  isExpanded?: boolean;
} & IconButtonProps;

export const TreeNodeExpander = React.forwardRef((props, ref) => {
  const { isExpanded, ...rest } = props;
  return (
    <IconButton
      styleType='borderless'
      size='small'
      aria-label={isExpanded ? 'Collapse' : 'Expand'}
      ref={ref}
      {...rest}
    >
      <SvgChevronRight
        className={cx('iui-tree-node-content-expander-icon', {
          'iui-tree-node-content-expander-icon-expanded': isExpanded,
        })}
      />
    </IconButton>
  );
}) as PolymorphicForwardRefComponent<'button', TreeNodeExpanderProps>;

export default TreeNodeExpander;
