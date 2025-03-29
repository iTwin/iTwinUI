/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import type { PolymorphicForwardRefComponent } from '../props.js';
import { Box } from './Box.js';
import { ShadowRoot } from './ShadowRoot.js';

/** @private */
export const LineClamp = React.forwardRef((props, forwardedRef) => {
  const { lines, children, ...rest } = props;
  return (
    <Box
      ref={forwardedRef}
      {...rest}
      className={cx('iui-line-clamp', props.className)}
      style={
        { '--_iui-line-clamp': lines, ...props.style } as React.CSSProperties
      }
    >
      <ShadowRoot css={css} flush={false}>
        <slot />
      </ShadowRoot>
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', { lines?: number }>;

const css = /* css */ `
  :host {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: var(--_iui-line-clamp, 3);
    -webkit-box-orient: vertical;
  }
`;
