/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { InputProps } from '../Input';
import { InputFlexContainer, useTheme } from '../utils';

export type SearchBoxProps = {
  /**
   *
   */
  isExpanded?: boolean;
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
  const {
    size,
    isExpanded = false,
    expandable = false,
    children,
    ...rest
  } = props;

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
      {children}
    </InputFlexContainer>
  );
};

export default SearchBox;
