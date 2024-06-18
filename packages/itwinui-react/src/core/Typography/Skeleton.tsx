/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box, ShadowRoot } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden.js';

/**
 * A placeholder to be displayed while the content is loading.
 */
export const Skeleton = React.forwardRef((props, forwardedRef) => {
  return (
    <Box
      as='div'
      ref={forwardedRef}
      {...props}
      className={cx('iui-skeleton', props?.className)}
    >
      <ShadowRoot>
        <div aria-hidden {...{ inert: '' }}>
          <slot />
        </div>
        <VisuallyHidden>Loading.</VisuallyHidden>
      </ShadowRoot>

      {props.children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div'>;
