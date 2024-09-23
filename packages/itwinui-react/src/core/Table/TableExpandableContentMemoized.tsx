/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import type { VirtualItem } from '@tanstack/react-virtual';

type TableExpandableContentProps = {
  children: React.ReactNode;
  virtualItem?: VirtualItem<Element>;
  isDisabled?: boolean;
};

const TableExpandableContent = React.forwardRef((props, ref) => {
  const { children, className, style, isDisabled, virtualItem, ...rest } =
    props;
  return (
    <Box
      className={cx('iui-table-row', 'iui-table-expanded-content', className)}
      style={{
        flex: '0 0 auto',
        minWidth: '100%',
        ...(virtualItem != null
          ? { transform: `translateY(${virtualItem.start}px)` }
          : {}),
        ...style,
      }}
      aria-disabled={isDisabled}
      data-iui-index={virtualItem?.index}
      {...(virtualItem != null && { 'data-iui-virtualizer': 'item' })}
      ref={ref}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', TableExpandableContentProps>;

export const TableExpandableContentMemoized = React.memo(
  TableExpandableContent,
);
