/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { InputFlexContainer, useTheme, SvgSearch, Icon } from '../utils';
import type {
  IconProps,
  PolymorphicForwardRefComponent,
  PolymorphicComponentProps,
} from '../utils';
import { IconButton } from '../Buttons/IconButton';
import type { IconButtonProps } from '../Buttons/IconButton';

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
  /**
   * Modify size of the input.
   */
  size?: 'small' | 'large';
};

const SearchBoxComponent = React.forwardRef((props, ref) => {
  useTheme();

  const {
    size,
    expandable = false,
    onToggle,
    onFocus: onFocusProp,
    isExpanded,
    children,
    inputProps,
    ...rest
  } = props;

  return (
    <InputFlexContainer
      ref={ref}
      className={cx({
        'iui-expandable-searchbox': expandable,
      })}
      data-iui-size={size}
      onFocus={(e) => {
        onFocusProp?.(e);
        onToggle?.(true);
      }}
      onBlur={() => {
        onToggle?.(false);
      }}
      data-iui-expanded={isExpanded}
      {...rest}
    >
      {children ?? (
        <>
          <SearchBoxInput {...inputProps} />
          <SearchBoxIcon />
        </>
      )}
    </InputFlexContainer>
  );
}) as PolymorphicForwardRefComponent<'div', SearchBoxOwnProps>;

export type SearchBoxProps = PolymorphicComponentProps<
  'div',
  SearchBoxOwnProps
>;

// ----------------------------------------------------------------------------

const SearchBoxIcon = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <Icon
      aria-hidden
      className={cx('iui-search-icon', className)}
      ref={ref}
      {...rest}
    >
      {children ?? <SvgSearch />}
    </Icon>
  );
}) as PolymorphicForwardRefComponent<'span', IconProps>;

// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------

const SearchBoxButton = (props: IconButtonProps) => {
  const { children, title = 'Search button', ...rest } = props;
  return (
    <IconButton title={title} styleType='borderless' {...rest}>
      {children ?? <SvgSearch />}
    </IconButton>
  );
};

// ----------------------------------------------------------------------------

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
export const SearchBox = Object.assign(SearchBoxComponent, {
  Icon: SearchBoxIcon,
  Input: SearchBoxInput,
  Button: SearchBoxButton,
});

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
