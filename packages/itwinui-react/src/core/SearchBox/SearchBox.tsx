/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { IconButton } from '../Buttons/IconButton';
import { InputProps } from '../Input';
import { SvgSortDown, useTheme } from '../utils';

export type SearchBoxProps = {
  /**
   *
   */
  startAdornment?: React.ReactNode | React.ReactNode[];
  /**
   *
   */
  endAdornment?: React.ReactNode | React.ReactNode[];
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
  const [isExpanded, setIsExpanded] = React.useState(false);
  useTheme();
  return (
    <div
      className='iui-input-flex-container iui-searchbox'
      data-iui-expanded={isExpanded}
      data-iui-size={size}
    >
      {startAdornment}
      <input className='iui-invisible-borders' type='search' {...rest} />
      {endAdornment}
      <IconButton
        styleType='borderless'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <SvgSortDown />
      </IconButton>
    </div>
  );
};

export default SearchBox;
