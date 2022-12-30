/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { InputProps } from '../Input';
import { useTheme } from '../utils';

export type SearchBoxProps = InputProps;

/**
 * Describe me here!
 * @example
 * Example usages go here!
 */
export const SearchBox = (props: SearchBoxProps) => {
  const { size, ...rest } = props;
  useTheme();
  return (
    <div className='iui-input-flex-container' data-iui-size={size}>
      <input className='iui-invisible-borders' type='search' {...rest} />
    </div>
  );
};

export default SearchBox;
