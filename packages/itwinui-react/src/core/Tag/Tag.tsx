/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { SvgCloseSmall, Box, ButtonBase } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { IconButton } from '../Buttons/IconButton.js';
import { LinkAction, LinkBox } from '../LinkAction/LinkAction.js';

type TagProps = {
  /**
   * Text inside the tag.
   */
  children: React.ReactNode;
  /**
   * Callback invoked when the tag is clicked.
   *
   * When this prop is passed, the tag will be rendered as a button.
   */
  onClick?: React.MouseEventHandler;
  /**
   * Callback function that handles click on the remove ("❌") button.
   * If not passed, the remove button will not be shown.
   *
   * If both `onClick` and `onRemove` are passed, then the tag label (rather than the tag itself)
   * will be rendered as a button, to avoid invalid markup (nested buttons).
   */
  onRemove?: React.MouseEventHandler;
  /**
   * Props for customizing the remove ("❌") button.
   */
  removeButtonProps?: React.ComponentPropsWithRef<'button'>;
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
      labelProps?: React.ComponentPropsWithRef<'span'>;
    }
  | {
      variant?: 'basic';
      labelProps?: never;
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
    onClick,
    labelProps,
    removeButtonProps,
    ...rest
  } = props;

  // If both onClick and onRemove are passed, we want to render the label as a button
  // to avoid invalid markup (nested buttons). LinkAction ensures that clicking anywhere outside
  // the remove button (including padding) will still trigger the main onClick callback.
  const shouldUseLinkAction = !!onClick && !!onRemove;

  return (
    <Box
      as={shouldUseLinkAction ? LinkBox : !!onClick ? ButtonBase : 'span'}
      className={cx(
        {
          'iui-tag-basic': variant === 'basic',
          'iui-tag': variant === 'default',
        },
        className,
      )}
      ref={forwardedRef as any}
      onClick={!shouldUseLinkAction ? onClick : undefined}
      {...rest}
    >
      {variant === 'default' ? (
        <Box
          as={(shouldUseLinkAction ? LinkAction : 'span') as 'span'}
          onClick={shouldUseLinkAction ? onClick : undefined}
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
if (process.env.NODE_ENV === 'development') {
  Tag.displayName = 'Tag';
}
