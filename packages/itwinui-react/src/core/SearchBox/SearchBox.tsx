/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { InputProps } from '../Input';
import { InputFlexContainer, useTheme, SvgSearch } from '../utils';
import { IconButton } from '../Buttons/IconButton';

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
  inputProps?: React.ComponentProps<'input'>;
  collapsedState?: React.ReactNode;
};

export type SearchBoxProps = SearchBoxOwnProps & InputProps;

const SearchBoxIcon = (props: React.ComponentProps<'span'>) => {
  const { className, children, ...rest } = props;
  return (
    <span aria-hidden className={cx('iui-search-icon', className)} {...rest}>
      {children ?? <SvgSearch />}
    </span>
  );
};

const SearchBoxInput = (
  props: React.ComponentProps<'input'> & { label?: string },
) => {
  const { className, /*label = 'Search', */ ...rest } = props;

  return (
    <input
      type='search'
      className={cx('iui-search-input', className)}
      aria-label='Search'
      {...rest}
    />
  );
};

// const SearchBoxButton = (props: React.ComponentProps<'button'>) => {
const SearchBoxButton = () => {
  return (
    <IconButton styleType='borderless'>
      <SvgSearch />
    </IconButton>
  );
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
export const SearchBox = Object.assign(
  (props: SearchBoxProps) => {
    useTheme();

    const {
      size,
      expandable = false,
      onToggle,
      isExpanded,
      // children,
      inputProps,
      //collapsedState = expandable ? <SearchBoxIcon /> : null,
      ...rest
    } = props;

    return (
      <InputFlexContainer
        className={cx({
          'iui-expandable-searchbox': expandable,
        })}
        data-iui-size={size}
        onFocus={() => {
          props.onFocus;
          onToggle?.(true);
        }}
        onBlur={() => onToggle?.(false)}
        data-iui-expanded={isExpanded}
        {...rest}
      >
        {/* {expandable && !isExpanded && collapsedState} */}
        {/* {!expandable || isExpanded ? (
          children
        ) : ( */}
        <>
          <SearchBoxInput {...inputProps} />
          <SearchBoxButton />
        </>
        {/* )} */}
      </InputFlexContainer>
    );
  },
  {
    Icon: SearchBoxIcon,
    Input: SearchBoxInput,
    Button: SearchBoxButton,
  },
);

export default SearchBox;

// <SearchBox />
// <SearchBox expandable />

// <SearchBox expandable isExpanded />
// <SearchBox expandable onToggle={} />

// <SearchBox>
//   <SearchBox.Icon><SvgSearch /></SearchBox.Icon>
//   <SearchBox.Input />
//   <SearchBox.Button></SearchBox.Button>
//   <Divider />
//   <SearchBox.Button></SearchBox.Button>
//   <SearchBox.Button></SearchBox.Button>
// </SearchBox>

// <SearchBox expandable>
//   <SearchBox.Collapsed>
//     <SearchBox.Icon><SvgSearch /></SearchBox.Icon>
//   </SearchBox.Collapsed>
//   <SearchBox.Expanded>
//   <SearchBox.Icon><SvgSearch /></SearchBox.Icon>
//   <SearchBox.Input />
//   <SearchBox.Button></SearchBox.Button>
//   <Divider />
//   <SearchBox.Button></SearchBox.Button>
//   <SearchBox.Button></SearchBox.Button>
//   </SearchBox.Expanded>
// </SearchBox>
