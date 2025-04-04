/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box } from './Box.js';
import type { PolymorphicForwardRefComponent } from '../props.js';
import { useIsClient } from '../hooks/useIsClient.js';

export const ButtonBase = React.forwardRef((props, forwardedRef) => {
  const {
    as: asProp = 'button',
    disabled: disabledProp,
    htmlDisabled,
    type: typeProp = asProp === 'button' ? 'button' : undefined,
    ...rest
  } = props;

  const isClient = useIsClient();

  const ariaDisabled =
    disabledProp &&
    !htmlDisabled && // htmlDisabled prop takes preference
    isClient && // progressively enhance after first render
    asProp === 'button'; // ignore if not button, e.g. links

  const handleIfEnabled =
    <T,>(handler?: (e: T) => void) =>
    (e: T) => {
      if (disabledProp) {
        return;
      }
      handler?.(e);
    };

  // Set the type to 'button' for disabled button, to prevent form submission
  const type = asProp === 'button' && disabledProp ? 'button' : typeProp;

  return (
    <Box
      as={asProp}
      type={type}
      ref={forwardedRef}
      aria-disabled={ariaDisabled ? 'true' : undefined}
      data-iui-disabled={disabledProp ? 'true' : undefined}
      disabled={htmlDisabled ?? (!isClient && disabledProp) ? true : undefined}
      {...rest}
      className={cx('iui-button-base', props.className)}
      onClick={handleIfEnabled(props.onClick)}
      onPointerDown={handleIfEnabled(props.onPointerDown)}
      onPointerUp={handleIfEnabled(props.onPointerUp)}
    />
  );
}) as PolymorphicForwardRefComponent<'button', ButtonBaseProps>;
if (process.env.NODE_ENV === 'development') {
  ButtonBase.displayName = 'ButtonBase';
}

type ButtonBaseProps = {
  /**
   * Custom `disabled` prop that keeps the button focusable, prevents
   * clicks, applied disabled styling, and adds `aria-disabled`.
   */
  disabled?: boolean;
  /**
   * Built-in html `disabled` attribute
   */
  htmlDisabled?: boolean;
};
