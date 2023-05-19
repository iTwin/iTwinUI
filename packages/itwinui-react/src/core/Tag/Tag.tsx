/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { useGlobals, SvgCloseSmall, Box } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import '@itwin/itwinui-css/css/tag.css';
import { IconButton } from '../Buttons/index.js';

type TagProps = {
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
};

/**
 * Tag for showing categories, filters etc.
 * @example
 * <Tag onRemove={() => alert('Closed a tag!')}>I'm a tag</Tag>
 * <Tag variant='basic'>Basic tag</Tag>
 */
export const Tag = React.forwardRef((props, forwardedRef) => {
  const { className, variant = 'default', children, onRemove, ...rest } = props;
  useGlobals();

  return (
    <Box
      as='span'
      className={cx(
        {
          'iui-tag-basic': variant === 'basic',
          'iui-tag': variant === 'default',
        },
        className,
      )}
      ref={forwardedRef}
      {...rest}
    >
      {variant === 'default' ? (
        <Box as='span' className='iui-tag-label'>
          {children}
        </Box>
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
    </Box>
  );
}) as PolymorphicForwardRefComponent<'span', TagProps>;

export default Tag;
