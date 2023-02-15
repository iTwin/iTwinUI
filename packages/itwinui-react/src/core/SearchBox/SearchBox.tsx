/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { InputProps } from '../Input';
import { InputFlexContainer, useTheme } from '../utils';

type SearchBoxOwnProps = {
  /**
   * Whether the searchbox is animated to expand.
   * @default false
   */
  expandable: true;
  /**
   * Whether or not to show the search input.
   * @default false
   */
  isExpanded?: boolean;
  onToggle?: (isExpanding: boolean) => void;
};

export type SearchBoxProps = SearchBoxOwnProps & InputProps;

/**
 * Searchbox component.
 * Used for searches :)
 * @example
 *  <SearchBox>
 *    <input type='search' placeholder='Search...' />
 *  </SearchBox>
 *
 *  <SearchBox>
 *    <input type='search' placeholder='Search...' />
 *    <IconButton styleType='borderless'>
 *     <SvgCaretUpSmall />
 *   </IconButton>
 *   <IconButton styleType='borderless'>
 *      <SvgCaretDownSmall />
 *     </IconButton>
 *  </SearchBox>
 */
export const SearchBox = (props: SearchBoxProps) => {
  useTheme();

  const {
    size,
    expandable = false,
    onToggle,
    isExpanded,
    children,
    ...rest
  } = props;

  return (
    <InputFlexContainer
      className={cx({
        'iui-expandable-searchbox': expandable,
      })}
      data-iui-size={size}
      data-iui-expanded={isExpanded}
      onClick={() => onToggle?.(!isExpanded)}
      {...rest}
    >
      {children}
    </InputFlexContainer>
  );
};

export default SearchBox;
