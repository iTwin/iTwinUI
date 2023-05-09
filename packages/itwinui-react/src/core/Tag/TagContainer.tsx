/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { useItwinui } from '../utils/index.js';
import type { CommonProps } from '../utils/index.js';
import '@itwin/itwinui-css/css/tag.css';

export type TagContainerProps = {
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
} & Omit<CommonProps, 'title'>;

/**
 * TagContainer for grouping tags.
 * @example
 * <TagContainer><Tag>Tag 1</Tag><Tag>Tag 2</Tag></TagContainer>
 * <TagContainer><Tag variant='basic'>Basic tag</Tag><Tag variant='basic'>Basic tag 2</Tag></TagContainer>
 */
export const TagContainer = (props: TagContainerProps) => {
  const { className, children, overflow, background = 'none', ...rest } = props;
  useItwinui();

  return (
    <div
      className={cx(
        'iui-tag-container',
        {
          [`iui-${overflow}`]: !!overflow,
          'iui-visible': background !== 'none',
        },
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default TagContainer;
