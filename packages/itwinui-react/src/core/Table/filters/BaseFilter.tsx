/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box, mergeEventHandlers } from '../../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../../utils/index.js';

/**
 * Filter wrapper that should be used when creating custom filters.
 * @example
 * <BaseFilter>
 *   <Input
 *     value={text}
 *     onChange={(e) => setText(e.target.value)}
 *   />
 *   <FilterButtonBar
 *     setFilter={() => setFilter(text)}
 *     clearFilter={clearFilter}
 *   />
 * </BaseFilter>
 */
export const BaseFilter = React.forwardRef((props, forwardedRef) => {
  return (
    <Box
      as='form'
      {...props}
      ref={forwardedRef}
      className={cx('iui-table-column-filter', props.className)}
      onSubmit={(e) => {
        e.preventDefault(); // prevent default browser form submission
        props.onSubmit?.(e);
      }}
      onClick={mergeEventHandlers(props.onClick, (e) => {
        // Prevents from triggering sort
        e.stopPropagation();
      })}
    />
  );
}) as PolymorphicForwardRefComponent<'form'>;
