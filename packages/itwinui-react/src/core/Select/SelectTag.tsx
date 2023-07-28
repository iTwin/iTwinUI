/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { useTheme } from '../utils/index.js';
import type { CommonProps } from '../utils/index.js';

export type SelectTagProps = {
  /**
   * Text inside the tag.
   */
  label: string;
} & CommonProps;

/**
 * Tag for showing selected value in `Select`.
 * @private
 */
export const SelectTag = (props: SelectTagProps) => {
  const { className, label, ...rest } = props;
  useTheme();

  return (
    <span className={cx('iui-select-tag', className)} {...rest}>
      <span className='iui-select-tag-label'>{label}</span>
    </span>
  );
};

export default SelectTag;
