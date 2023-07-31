/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Box } from './Box.js';
import type { PolymorphicForwardRefComponent } from '../props.js';
import { useIsClient } from '../hooks/useIsClient.js';

export const ButtonBase = React.forwardRef((props, forwardedRef) => {
  const {
    as: asProp = 'button',
    onClick: onClickProp,
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

  return (
    <Box
      as={asProp}
      type={asProp === 'button' ? 'button' : undefined}
      ref={forwardedRef}
      onClick={(e) => {
        if (disabledProp) {
          return;
        }
        onClickProp?.(e);
      }}
      aria-disabled={ariaDisabled ? 'true' : undefined}
      data-iui-disabled={disabledProp ? 'true' : undefined}
      disabled={htmlDisabled ?? (!isClient && disabledProp) ? true : undefined}
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
