/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { useTheme, CommonProps, SvgCloseSmall } from '../utils';
import '@itwin/itwinui-css/css/tag.css';
import { IconButton } from '../Buttons';

export type TagProps = {
  /**
   * Callback function that handles click on close icon.
   * Close icon is shown only when this function is passed.
   * Use only with 'default' Tag.
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
      className={cx(
        {
          'iui-tag-basic': variant === 'basic',
          'iui-tag': variant === 'default',
        },
        className,
      )}
      {...rest}
    >
      {variant === 'default' ? (
        <span className='iui-tag-label'>{children}</span>
      ) : (
        children
      )}
      {onRemove && (
        <IconButton
          styleType='borderless'
          size='small'
          onClick={onRemove}
          aria-label='Delete tag'
          className='iui-tag-button'
        >
          <SvgCloseSmall aria-hidden />
        </IconButton>
      )}
    </span>
  );
};

export default Tag;
