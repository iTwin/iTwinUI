// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import '@bentley/itwinui/css/tags.css';
import { SvgClose } from '@bentley/icons-generic-react';
import React from 'react';

export type TagProps = {
  /**
   * Callback function that handles click on close icon.
   * Close icon is shown only when this function is passed.
   */
  onRemove?: React.MouseEventHandler;
};

/**
 * Tag for showing categories, filters etc.
 * @example
 * <Tag onRemove={() => alert('Closed a tag!')}>I'm a tag</Tag>
 */
export const Tag: React.FC<TagProps> = (props) => {
  return (
    <span className='iui-tag'>
      <span className='iui-tag-text'>{props.children}</span>
      {props.onRemove && (
        <SvgClose onClick={props.onRemove} className='iui-tag-close-icon' />
      )}
    </span>
  );
};

export default Tag;
