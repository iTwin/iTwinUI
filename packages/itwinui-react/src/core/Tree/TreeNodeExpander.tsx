/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { SvgChevronRight } from '../utils';
import { IconButton, IconButtonProps } from '../Buttons/IconButton';
import '@itwin/itwinui-css/css/tree.css';

export type TreeNodeExpanderProps = {
  isExpanded?: boolean;
} & IconButtonProps;

export const TreeNodeExpander = (props: TreeNodeExpanderProps) => {
  const { isExpanded, ...rest } = props;
  return (
    <IconButton
      styleType='borderless'
      size='small'
      aria-label={isExpanded ? 'Collapse' : 'Expand'}
      {...rest}
    >
      <SvgChevronRight
        className={cx('iui-tree-node-content-expander-icon', {
          'iui-tree-node-content-expander-icon-expanded': isExpanded,
        })}
      />
    </IconButton>
  );
};

export default TreeNodeExpander;
