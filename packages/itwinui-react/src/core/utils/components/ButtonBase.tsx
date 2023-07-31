/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Box } from './Box.js';
import type { PolymorphicForwardRefComponent } from '../props.js';

export const ButtonBase = React.forwardRef((props, forwardedRef) => {
  const { onClick: onClickProp, ...rest } = props;

  return (
    <Box
      as='button'
      type={props.as === 'button' ? 'button' : undefined}
      ref={forwardedRef}
      onClick={(e) => {
        if (!props.disabled) {
          onClickProp?.(e);
        }
      }}
      aria-disabled={
        props.as === 'button' && props.disabled ? 'true' : undefined
      }
      disabled={props.htmlDisabled || undefined}
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
