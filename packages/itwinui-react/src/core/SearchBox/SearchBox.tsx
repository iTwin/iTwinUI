/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { IconButton } from '../Buttons/IconButton';
import { InputProps } from '../Input';
import { InputFlexContainer, SvgSortDown, useTheme } from '../utils';

export type SearchBoxProps = {
  /**
   *
   */
  expandable?: boolean;
} & InputProps;

/**
 * // TODO:
 * Searchbox component.
 * Used for searches :)
 * @example
 * Example usages go here!
 */
export const SearchBox = (props: SearchBoxProps) => {
  const { size, expandable = true, ...rest } = props;
  const [isExpanded, setIsExpanded] = React.useState(false);
  useTheme();

  return (
    <InputFlexContainer
      className={cx({
        'iui-searchbox': expandable,
      })}
      aria-expanded={isExpanded}
      data-iui-size={size}
      {...rest}
    >
      <IconButton
        styleType='borderless'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <SvgSortDown />
      </IconButton>
      <input type='search' {...rest} />
    </InputFlexContainer>
  );
};

export default SearchBox;
