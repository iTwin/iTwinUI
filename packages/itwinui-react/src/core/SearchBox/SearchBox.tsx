/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { InputProps } from '../Input';
import {
  Icon,
  InputFlexContainer,
  useTheme,
  SvgSearch,
  SvgCloseSmall,
} from '../utils';
import { IconButton } from '../Buttons';
type SearchBoxOwnProps =
  | {
      expandable?: false;
      isExpanded?: undefined;
      onToggle?: undefined;
      animateTo?: undefined;
      searchIcon?: React.ReactNode;
    }
  | {
      /**
       * Whether the searchbox is animated to expand.
       * @default false
       */
      expandable: true;
      /**
       * Animation direction.
       * @default 'right'
       */
      animateTo?: 'left' | 'right';
      /**
       * Whether or not to show the search input.
       * @default false
       */
      isExpanded?: boolean;
      /**
       * Callback function for toggling an expansion state.
       */
      onToggle?: (isExpanding: boolean) => void;
      /**
       * Initial icon for searchbox.
       * default: `search` when searchbox is closed, `close` when searchbox is expanded.
       */
      searchIcon?: React.ReactNode;
    };

export type SearchBoxProps = SearchBoxOwnProps & InputProps;

const defaultSearchIcon = (isExpanded: boolean) => {
  return isExpanded ? <SvgCloseSmall /> : <SvgSearch />;
};

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

  const [localIsExpanded, setLocalIsExpanded] = React.useState(false);

  const {
    size,
    expandable = false,
    animateTo = 'right',
    isExpanded = localIsExpanded,
    onToggle = setLocalIsExpanded,
    searchIcon = defaultSearchIcon(isExpanded),
    children,
    ...rest
  } = props;

  const animatedVersion = () => {
    return (
      <>
        {animateTo === 'right' && (
          <IconButton
            styleType='borderless'
            onClick={() => onToggle(!isExpanded)}
          >
            {searchIcon}
          </IconButton>
        )}
        {isExpanded && children}
        {animateTo === 'left' && (
          <IconButton
            styleType='borderless'
            onClick={() => onToggle(!isExpanded)}
          >
            {searchIcon}
          </IconButton>
        )}
      </>
    );
  };

  const staticVersion = () => {
    return (
      <>
        <Icon>{searchIcon ?? <SvgSearch />}</Icon>
        {children}
      </>
    );
  };

  return (
    <InputFlexContainer
      className={cx({
        'iui-expandable-searchbox': expandable,
        'iui-animate-left': expandable && animateTo === 'left',
      })}
      aria-expanded={isExpanded}
      data-iui-size={size}
      {...rest}
    >
      {expandable ? animatedVersion() : staticVersion()}
    </InputFlexContainer>
  );
};

export default SearchBox;
