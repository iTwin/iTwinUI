/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import SvgClose from '@bentley/icons-generic-react/cjs/icons/Close';
import { useTheme } from '../utils/hooks/useTheme';
import '@bentley/itwinui/css/tag.css';
import { CommonProps } from '../utils/props';

export type TagProps = {
  /**
   * Callback function that handles click on close icon.
   * Close icon is shown only when this function is passed.
   */
  onRemove?: React.MouseEventHandler;
  /**
   * Text inside the tag.
   */
  children: React.ReactNode;
  /**
   * Variant of tag.
   * Basic tags don't have an outline.
   * @default 'default'
   */
  variant?: 'default' | 'basic';
} & CommonProps;

/**
 * Tag for showing categories, filters etc.
 * @example
 * <Tag onRemove={() => alert('Closed a tag!')}>I'm a tag</Tag>
 * <Tag variant='basic'>Basic tag</Tag>
 */
export const Tag = (props: TagProps) => {
  const { className, variant = 'default', children, onRemove, ...rest } = props;
  useTheme();

  return (
    <span
      className={cx('iui-tag', { 'iui-basic': variant === 'basic' }, className)}
      {...rest}
    >
      <span className='iui-tag-text'>{children}</span>
      {onRemove && (
        <SvgClose onClick={onRemove} className='iui-tag-close-icon' />
      )}
    </span>
  );
};

export default Tag;
