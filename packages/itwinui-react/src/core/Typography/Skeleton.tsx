/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box, ShadowRoot } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden.js';

// ----------------------------------------------------------------------------

const SkeletonContext = React.createContext<boolean | undefined>(undefined);

// ----------------------------------------------------------------------------

const SkeletonComponent = React.forwardRef((props, forwardedRef) => {
  const isGrouped = React.useContext(SkeletonContext);

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
        <slot name='visually-hidden' />
      </ShadowRoot>

      {props.children}
      {!isGrouped && (
        <VisuallyHidden slot='visually-hidden'>Loading</VisuallyHidden>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div'>;

// ----------------------------------------------------------------------------

const SkeletonGroup = ({ children }: { children: React.ReactNode }) => {
  return (
    <SkeletonContext.Provider value={true}>
      {children}
      <VisuallyHidden>Loading</VisuallyHidden>
    </SkeletonContext.Provider>
  );
};
SkeletonGroup.displayName = 'Skeleton.Group';

// ----------------------------------------------------------------------------

/**
 * A placeholder displayed while the content is loading.
 */
export const Skeleton = Object.assign(SkeletonComponent, {
  Group: SkeletonGroup,
});
Skeleton.displayName = 'Skeleton';
