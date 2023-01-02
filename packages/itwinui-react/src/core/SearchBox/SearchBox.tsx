/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { IconButton } from '../Buttons';
import { InputProps } from '../Input';
import { SvgCaretDownSmall, useTheme } from '../utils';

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
      <IconButton>
        <SvgCaretDownSmall />
      </IconButton>
      <input className='iui-invisible-borders' type='search' {...rest} />
      <IconButton styleType='borderless' className='iui-end-icon'>
        <SvgCaretDownSmall />
      </IconButton>
    </div>
  );
};

export default SearchBox;
