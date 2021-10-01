/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { useTheme, CommonProps } from '../../utils';
import '@itwin/itwinui-css/css/keyboard.css';

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

export type KbdProps = {
  /**
   * Content of the key to be passed as children. Must be a string or one of the `KbdKeys`.
   */
  children: string;
} & CommonProps;

/**
 * A keyboard key element.
 * @example
 * <Kbd>A</Kbd>
 * <Kbd title='Enter'>{KbdKeys.Enter}</Kbd>
 */
export const Kbd = (props: KbdProps) => {
  const { className, children, ...rest } = props;

  useTheme();

  return (
    <kbd className={cx('iui-keyboard', className)} {...rest}>
      {children}
    </kbd>
  );
};

export default Kbd;
