/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { InputProps } from '../Input';
import { useTheme } from '../utils';

export type SearchBoxProps = {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
} & InputProps;

/**
 * // TODO:
 * Searchbox component.
 * Used for searches :)
 * @example
 * Example usages go here!
 */
export const SearchBox = (props: SearchBoxProps) => {
  const { size, startAdornment, endAdornment, ...rest } = props;
  useTheme();
  return (
    <div className='iui-input-flex-container' data-iui-size={size}>
      {startAdornment}
      <input className='iui-invisible-borders' type='search' {...rest} />
      {endAdornment}
    </div>
  );
};

export default SearchBox;
