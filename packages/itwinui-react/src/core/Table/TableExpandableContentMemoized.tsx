/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Box } from '../../utils/index.js';
import type { VirtualItem } from '@tanstack/react-virtual';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type TableExpandableContentProps = {
  virtualItem?: VirtualItem<Element>;
  isDisabled: boolean;
  children: React.ReactNode;
  isSelected?: boolean;
};

const TableExpandableContent = React.forwardRef((props, ref) => {
  return (
    <Box
      className={cx('iui-table-row', 'iui-table-expanded-content')}
      style={{
        flex: '0 0 auto',
        minWidth: '100%',
        ...(props.virtualItem != null
          ? { transform: `translateY(${props.virtualItem.start}px)` }
          : {}),
      }}
      aria-disabled={props.isDisabled || undefined}
      data-iui-index={props.virtualItem?.index}
      aria-selected={props.isSelected}
      {...(props.virtualItem != null && { 'data-iui-virtualizer': 'item' })}
      ref={ref}
    >
      {props.children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', TableExpandableContentProps>;

export const TableExpandableContentMemoized = React.memo(
  TableExpandableContent,
  (prevProp, nextProp) =>
    prevProp.children === nextProp.children &&
    prevProp.virtualItem === nextProp.virtualItem &&
    prevProp.isDisabled === nextProp.isDisabled &&
    prevProp.isSelected === nextProp.isSelected,
);
