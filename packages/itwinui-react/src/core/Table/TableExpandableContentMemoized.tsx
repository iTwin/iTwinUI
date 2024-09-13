/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type TableExpandableContentProps = {
  children: React.ReactNode;
  isDisabled?: boolean;
};

const TableExpandableContent = React.forwardRef((props, ref) => {
  const { children, className, style, isDisabled, ...rest } = props;
  return (
    <Box
      className={cx('iui-table-row', 'iui-table-expanded-content', className)}
      style={{
        flex: '0 0 auto',
        minWidth: '100%',
        ...style,
      }}
      aria-disabled={isDisabled}
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
