/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type LabelOwnProps = {
  /**
   * Set the display style of the label.
   *   - 'block' - default, no extra spacing (label and input will be on separate lines)
   *   - 'inline' - label gets a right margin so it can be placed inline
   * @default 'block'
   */
  displayStyle?: 'block' | 'inline';
  /**
   * Set to true if the label's associated input is required.
   * This adds an asterisk next to the label text.
   */
  required?: boolean;
  /**
   * Adds disabled styling to a label.
   * @default false
   */
  disabled?: boolean;
};

/**
 * A standalone label to be used with input components (using `htmlFor`).
 * Can be rendered as any element, e.g. span, using the `as` prop.
 * @example
 * <Label htmlFor='name-input'>Name</Label>
 * <Input id='name-input' />
 */
export const Label = React.forwardRef((props, forwardedRef) => {
  const {
    displayStyle = 'block',
    required,
    disabled,
    className,
    children,
    ...rest
  } = props;

  return (
    <Box
      as='label'
      className={cx(
        'iui-input-label',
        {
          'iui-inline': displayStyle === 'inline',
          'iui-required': required,
        },
        className,
      )}
      data-iui-disabled={disabled ? true : undefined}
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'label', LabelOwnProps>;
if (process.env.NODE_ENV === 'development') {
  Label.displayName = 'Label';
}
