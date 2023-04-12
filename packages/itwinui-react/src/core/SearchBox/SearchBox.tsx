/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { InputProps } from '../Input';
import { InputFlexContainer, useTheme, SvgSearch, Icon } from '../utils';
import { IconButton } from '../Buttons/IconButton';
import type { IconButtonProps } from '../Buttons/IconButton';
import type { IconProps } from '../utils';

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

const SearchBoxIcon = (props: IconProps) => {
  const { className, children, ...rest } = props;
  return (
    <Icon aria-hidden className={cx('iui-search-icon', className)} {...rest}>
      {children ?? <SvgSearch />}
    </Icon>
  );
};

const SearchBoxInput = (props: React.ComponentProps<'input'>) => {
  const { className, ...rest } = props;

  return (
    <input
      type='search'
      className={cx('iui-search-input', className)}
      {...rest}
    />
  );
};

const SearchBoxButton = (props: IconButtonProps) => {
  const { children, title = 'Search button', ...rest } = props;
  return (
    <IconButton title={title} styleType='borderless' {...rest}>
      {children ?? <SvgSearch />}
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
      children,
      inputProps,
      ...rest
    } = props;

    const searchBoxRef = React.useRef(null);

    return (
      <InputFlexContainer
        ref={searchBoxRef}
        className={cx({
          'iui-expandable-searchbox': expandable,
        })}
        data-iui-size={size}
        onFocus={() => {
          props.onFocus;
          onToggle?.(true);
        }}
        onBlur={() => {
          onToggle?.(false);
        }}
        data-iui-expanded={isExpanded}
        {...rest}
      >
        {!expandable &&
          (children ?? (
            <>
              <SearchBoxInput {...inputProps} />
              <SearchBoxIcon />
            </>
          ))}
        {expandable && <SearchBoxInput />}
        {/* {expandable &&
          isSearchExpanded() &&
          (children ?? (
            <>
              <SearchBoxInput {...inputProps} />
              <SearchBoxIcon />
            </>
          ))} */}
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

export const SearchBoxContext = React.createContext<
  | {
      size?: 'small' | 'large';
      /**
       * Id to pass to input
       */
      inputId?: string;

      setInputId: (inputId: string) => void;
    }
  | undefined
>(undefined);

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
//     <SearchBox.Icon><SvgSearch /></SearchBox.Icon>
//     <SearchBox.Input />
//     <SearchBox.Button></SearchBox.Button>
//     <Divider />
//     <SearchBox.Button></SearchBox.Button>
//     <SearchBox.Button></SearchBox.Button>
//   </SearchBox.Expanded>
// </SearchBox>
