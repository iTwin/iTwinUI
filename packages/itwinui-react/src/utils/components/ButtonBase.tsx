/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box } from './Box.js';
import type { PolymorphicForwardRefComponent } from '../props.js';
import { useIsClient } from '../hooks/useIsClient.js';
import { ProgressRadial } from '../../core/ProgressIndicators/ProgressRadial.js';

export const ButtonBase = React.forwardRef((props, forwardedRef) => {
  const {
    as: asProp = 'button',
    disabled: disabledProp,
    htmlDisabled,
    children,
    loading,
    size,
    ...rest
  } = props;

  const isClient = useIsClient();

  const shouldBeDisabled = disabledProp || loading;

  const ariaDisabled =
    shouldBeDisabled &&
    !htmlDisabled && // htmlDisabled prop takes preference
    isClient && // progressively enhance after first render
    asProp === 'button'; // ignore if not button, e.g. links

  const handleIfEnabled =
    <T,>(handler?: (e: T) => void) =>
    (e: T) => {
      if (shouldBeDisabled) {
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
      data-iui-size={size}
      data-iui-disabled={shouldBeDisabled ? 'true' : undefined}
      data-iui-loading={loading ? 'true' : undefined}
      disabled={htmlDisabled ?? (!isClient && disabledProp) ? true : undefined}
      {...rest}
      className={cx('iui-button-base', props.className)}
      onClick={handleIfEnabled(props.onClick)}
      onPointerDown={handleIfEnabled(props.onPointerDown)}
      onPointerUp={handleIfEnabled(props.onPointerUp)}
    >
      {children}

      {loading && (
        <ProgressRadial
          size={size === 'small' ? 'x-small' : 'small'}
          className='iui-button-spinner'
          aria-hidden
        />
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'button', ButtonBaseProps>;
ButtonBase.displayName = 'ButtonBase';

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
  /**
   * Specify a loading state for the button.
   */
  loading?: boolean;
  /**
   * Modify size of the button.
   */
  size?: 'small' | 'large';
};
