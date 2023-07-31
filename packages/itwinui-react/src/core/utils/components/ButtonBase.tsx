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

  return (
    <Box
      as={asProp}
      type={asProp === 'button' ? 'button' : undefined}
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
}) as PolymorphicForwardRefComponent<
  'button',
  {
    /* native `disabled` attribute */
    htmlDisabled?: boolean;
  }
>;
ButtonBase.displayName = 'ButtonBase';
