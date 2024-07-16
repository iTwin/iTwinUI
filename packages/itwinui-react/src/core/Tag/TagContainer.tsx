/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type TagContainerProps = {
  /**
   * Tags inside the container.
   */
  children: React.ReactNode;
  /**
   * Overflow solution to the tag container.
   * Set max-width to have scroll or truncated tags.
   */
  overflow?: 'truncate' | 'scroll';
  /**
   * Use background to have tags standout in your layout.
   * Container gets colored background and some spacing applied.
   * @default 'none'
   */
  background?: 'none' | 'filled';
};

/**
 * TagContainer for grouping tags.
 * @example
 * <TagContainer><Tag>Tag 1</Tag><Tag>Tag 2</Tag></TagContainer>
 * <TagContainer><Tag variant='basic'>Basic tag</Tag><Tag variant='basic'>Basic tag 2</Tag></TagContainer>
 */
export const TagContainer = React.forwardRef((props, forwardedRef) => {
  const { className, children, overflow, background = 'none', ...rest } = props;

  return (
    <Box
      className={cx(
        'iui-tag-container',
        {
          [`iui-${overflow}`]: !!overflow,
          'iui-visible': background !== 'none',
        },
        className,
      )}
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', TagContainerProps>;
if (process.env.NODE_ENV === 'development') {
  TagContainer.displayName = 'TagContainer';
}
