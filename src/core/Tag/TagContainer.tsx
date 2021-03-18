// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import cx from 'classnames';
import { useTheme } from '../utils/hooks/useTheme';
import '@bentley/itwinui/css/tags.css';
import { CommonProps } from '../utils/props';

export type TagContainerProps = {
  /**
   * Tags inside the container.
   */
  children: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * TagContainer for grouping tags.
 * @example
 * <TagContainer><Tag>Tag 1</Tag><Tag>Tag 2</Tag></TagContainer>
 * <TagContainer><Tag variant='basic'>Basic tag</Tag><Tag variant='basic'>Basic tag 2</Tag></TagContainer>
 */
export const TagContainer = (props: TagContainerProps) => {
  const { className, children, ...rest } = props;
  useTheme();

  return (
    <div className={cx('iui-tag-container', className)} {...rest}>
      {children}
    </div>
  );
};

export default TagContainer;
