/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  InputFlexContainer,
  useTheme,
  SvgSearch,
  SvgCloseSmall,
  useSafeContext,
} from '../utils';
import type {
  IconProps,
  PolymorphicForwardRefComponent,
  PolymorphicComponentProps,
} from '../utils';
import { IconButton } from '../Buttons/IconButton';
import type { IconButtonProps } from '../Buttons/IconButton';
import '@itwin/itwinui-css/css/input.css';

/* Ask UX:
manually handling close - open, keep it open - I want to close? Where close button goes?
X is for clearing.
vs code search example.

search pattern in other apps?
*/

const SearchBoxContext = React.createContext<
  | {
      size?: 'small' | 'large';
      /**
       * Id to pass to input
       */
      inputId?: string;

      setInputId?: (inputId: string) => void;
      onClose?: () => void;
    }
  | undefined
>(undefined);

type SearchBoxOwnProps = {
  /**
   * Whether the searchbox is animated to expand.
   * @default false
   */
  expandable?: boolean;
  /**
   * Whether or not to show the search input.
   * @default false
   */
  isExpanded?: boolean;
  onToggle?: (isExpanding: boolean) => void;
  inputProps?: React.ComponentPropsWithoutRef<'input'>;
  collapsedState?: React.ReactNode;
  /**
   * Modify size of the searchbox.
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
    onBlur: onBlurProp,
    isExpanded,
    children,
    inputProps,
    className,
    ...rest
  } = props;

  const onClose = () => {
    onToggle?.(false);
  };

  return (
    <SearchBoxContext.Provider value={{ onClose }}>
      <InputFlexContainer
        ref={ref}
        className={cx({ 'iui-expandable-searchbox': expandable }, className)}
        data-iui-size={size}
        onFocus={(e) => {
          // console.log('focus', e.target, e.currentTarget, e.relatedTarget);
          onFocusProp?.(e);
          if (
            e.isDefaultPrevented() ||
            e.currentTarget.contains(e.relatedTarget)
          ) {
            return;
          }
          onToggle?.(true);
        }}
        onBlur={(e) => {
          // console.log('blur', e.target, e.currentTarget, e.relatedTarget);
          onBlurProp?.(e);
          if (
            e.isDefaultPrevented() ||
            e.currentTarget.contains(e.relatedTarget)
          ) {
            return;
          }
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
    </SearchBoxContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', SearchBoxOwnProps>;

export type SearchBoxProps = PolymorphicComponentProps<
  'div',
  SearchBoxOwnProps
>;

// ----------------------------------------------------------------------------

const SearchBoxIcon = React.forwardRef((props, ref) => {
  const { as: Element = 'span', className, children, ...rest } = props;
  return (
    <Element
      aria-hidden
      className={cx('iui-svg-icon', 'iui-search-icon', className)}
      ref={ref}
      {...rest}
    >
      {children ?? <SvgSearch />}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'span', IconProps>;

// ----------------------------------------------------------------------------

const SearchBoxInput = React.forwardRef(
  (props: React.ComponentProps<'input'>, ref: React.Ref<HTMLInputElement>) => {
    const { className, ...rest } = props;

    return (
      <input
        ref={ref}
        type='search'
        aria-label='Search'
        className={cx('iui-search-input', className)}
        {...rest}
      />
    );
  },
);

// ----------------------------------------------------------------------------

/**
 * SearchBox.Button component to add to your SearchBox.
 */
const SearchBoxButton = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  return (
    <IconButton styleType='borderless' ref={ref} {...rest}>
      {children ?? <SvgSearch />}
    </IconButton>
  );
}) as PolymorphicForwardRefComponent<'button', IconButtonProps>;

// ----------------------------------------------------------------------------

/**
 * SearchBox.Button component to add to your SearchBox.
 */
const SearchBoxCloseButton = React.forwardRef((props, ref) => {
  const { children, onClick: onClickProp, ...rest } = props;

  const { onClose } = useSafeContext(SearchBoxContext);

  return (
    <SearchBoxButton
      ref={ref}
      aria-label='Close'
      onClick={(e) => {
        onClickProp?.(e);
        onClose?.();
      }}
      {...rest}
    >
      {children ?? <SvgCloseSmall />}
    </SearchBoxButton>
  );
}) as PolymorphicForwardRefComponent<'button', IconButtonProps>;

// ----------------------------------------------------------------------------

/**
 * Searchbox component.
 * Used for searches :)
 * @example
 *  </SearchBox>
 */
export const SearchBox = Object.assign(SearchBoxComponent, {
  Icon: SearchBoxIcon,
  Input: SearchBoxInput,
  Button: SearchBoxButton,
  CloseButton: SearchBoxCloseButton,
});

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
//     <SearchBox.Icon><SvgSearch /></SearchBox.Icon>
//     <SearchBox.Input />
//     <SearchBox.Button></SearchBox.Button>
//     <Divider />
//     <SearchBox.Button></SearchBox.Button>
//     <SearchBox.Button></SearchBox.Button>
//   </SearchBox.Expanded>
// </SearchBox>
