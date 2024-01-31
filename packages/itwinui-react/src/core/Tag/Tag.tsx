/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { SvgCloseSmall, Box, ButtonBase } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { IconButton } from '../Buttons/IconButton.js';

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
  labelProps?: React.ComponentPropsWithoutRef<'span'>;
  closeButtonProps?: React.ComponentPropsWithoutRef<'button'>;
};

/**
 * Tag for showing categories, filters etc.
 * @example
 * <Tag onRemove={() => alert('Closed a tag!')}>I'm a tag</Tag>
 * <Tag variant='basic'>Basic tag</Tag>
 */
export const Tag = React.forwardRef((props, forwardedRef) => {
  const {
    className,
    variant = 'default',
    children,
    onRemove,
    labelProps,
    closeButtonProps,
    ...rest
  } = props;

  return (
    <Box
      as={!!props.onClick ? ButtonBase : 'span'}
      className={cx(
        {
          'iui-tag-basic': variant === 'basic',
          'iui-tag': variant === 'default',
        },
        className,
      )}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- ref's type doesn't matter internally
      ref={forwardedRef as any}
      {...rest}
    >
      {variant === 'default' ? (
        <Box
          as='span'
          {...labelProps}
          className={cx('iui-tag-label', labelProps?.className)}
        >
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
          {...closeButtonProps}
          className={cx('iui-tag-button', closeButtonProps?.className)}
        >
          <SvgCloseSmall aria-hidden />
        </IconButton>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'span', TagProps>;

export default Tag;
