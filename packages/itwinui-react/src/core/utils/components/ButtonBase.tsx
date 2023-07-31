/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Box } from './Box.js';
import type { PolymorphicForwardRefComponent } from '../props.js';

export const ButtonBase = React.forwardRef((props, forwardedRef) => {
  const {
    as: asProp = 'button',
    onClick: onClickProp,
    disabled: disabledProp,
    htmlDisabled,
    ...rest
  } = props;

  return (
    <Box
      as={asProp}
      type={asProp === 'button' ? 'button' : undefined}
      ref={forwardedRef}
      onClick={(e) => {
        if (!disabledProp) {
          onClickProp?.(e);
        }
      }}
      aria-disabled={
        !htmlDisabled && disabledProp && asProp === 'button'
          ? 'true'
          : undefined
      }
      disabled={htmlDisabled || undefined}
      {...rest}
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
