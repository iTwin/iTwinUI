/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

/**
 * Some predefined strings for common keyboard keys.
 */
export const KbdKeys = {
  Command: '\u2318 Cmd',
  Shift: '\u21e7 Shift',
  Backspace: '\u232b Backspace',
  Enter: '\u21b5 Enter',
  Eject: '\u23cf Eject',
  Control: 'Ctrl',
  Windows: '\u229e Win',
  Apple: '\uf8ff',
  Option: '\u2325 Option',
  Left: '\u2190',
  Up: '\u2191',
  Right: '\u2192',
  Down: '\u2193',
} as const;

type KbdProps = {
  /**
   * Content of the key to be passed as children. Must be a string or one of the `KbdKeys`.
   */
  children: string;
};

/**
 * A keyboard key element.
 * @example
 * <Kbd>A</Kbd>
 * <Kbd title='Enter'>{KbdKeys.Enter}</Kbd>
 */
export const Kbd = React.forwardRef((props, forwardedRef) => {
  const { className, children, ...rest } = props;

  return (
    <Box
      as='kbd'
      className={cx('iui-keyboard', className)}
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'kbd', KbdProps>;
