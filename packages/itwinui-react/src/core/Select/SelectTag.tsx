/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type SelectTagProps = {
  /**
   * Text inside the tag.
   */
  label: string;
};

/**
 * Tag for showing selected value in `Select`.
 * @private
 */
export const SelectTag = React.forwardRef((props, forwardedRef) => {
  const { className, label, ...rest } = props;

  return (
    <Box
      as='span'
      className={cx('iui-select-tag', className)}
      ref={forwardedRef}
      {...rest}
    >
      <Box as='span' className='iui-select-tag-label'>
        {label}
      </Box>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'span', SelectTagProps>;
