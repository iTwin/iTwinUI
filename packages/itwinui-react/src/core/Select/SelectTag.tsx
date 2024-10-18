/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Tag } from '../Tag/Tag.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type SelectTagProps = {
  /**
   * Text inside the tag.
   */
  label: string;
} & Pick<React.ComponentProps<typeof Tag>, 'onClick' | 'onRemove'>;

/**
 * Tag for showing selected value in `Select`.
 * @private
 */
export const SelectTag = React.forwardRef((props, forwardedRef) => {
  const { className, label, ...rest } = props;

  return (
    <Tag
      className={cx('iui-select-tag', className)}
      labelProps={{ className: 'iui-select-tag-label' }}
      removeButtonProps={{ className: 'iui-select-tag-button' }}
      ref={forwardedRef}
      {...rest}
    >
      {label}
    </Tag>
  );
}) as PolymorphicForwardRefComponent<'span', SelectTagProps>;
