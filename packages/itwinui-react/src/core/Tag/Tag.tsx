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
   * Text inside the tag.
   */
  children: React.ReactNode;
} & (
  | {
      /**
       * Variant of tag.
       * Basic tags don't have an outline.
       * @default 'default'
       */
      variant?: 'default';
      /**
       * Props for customizing the label.
       *
       * Only relevant for the 'default' Tag.
       */
      labelProps?: React.ComponentPropsWithoutRef<'span'>;
    }
  | {
      variant?: 'basic';
      labelProps?: never;
    }
) &
  (
    | {
        /**
         * Callback invoked when the tag is clicked.
         *
         * When this prop is passed, the tag will be rendered as a button.
         *
         * This prop is mutually exclusive with `onRemove`.
         */
        onClick?: React.MouseEventHandler;
        onRemove?: never;
        removeButtonProps?: never;
      }
    | {
        onClick?: never;
        /**
         * Callback function that handles click on the remove ("❌") button.
         * If not passed, the remove button will not be shown.
         *
         * This prop is mutually exclusive with the `onClick` prop, because
         * the tag will be rendered as a button when `onClick` is passed.
         */
        onRemove?: React.MouseEventHandler;
        /**
         * Props for customizing the remove ("❌") button.
         */
        removeButtonProps?: React.ComponentPropsWithoutRef<'button'>;
      }
  );

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
    removeButtonProps,
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
          {...removeButtonProps}
          className={cx('iui-tag-button', removeButtonProps?.className)}
        >
          <SvgCloseSmall aria-hidden />
        </IconButton>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'span', TagProps>;

export default Tag;
