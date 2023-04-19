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
  useId,
  Icon,
} from '../utils';
import type {
  IconProps,
  PolymorphicForwardRefComponent,
  PolymorphicComponentProps,
} from '../utils';
import { IconButton } from '../Buttons/IconButton';
import type { IconButtonProps } from '../Buttons/IconButton';
import '@itwin/itwinui-css/css/input.css';

const SearchBoxContext = React.createContext<
  | {
      size?: 'small' | 'large';
      /**
       * Id to pass to input
       */
      inputId: string;
      setInputId: (inputId: string) => void;
      onClose?: () => void;
    }
  | undefined
>(undefined);

// ----------------------------------------------------------------------------

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
  /**
   *
   * @param isExpanding
   * @returns
   */
  onToggle?: (isExpanding: boolean) => void;
  /**
   *
   */
  inputProps?: React.ComponentPropsWithoutRef<'input'>;
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

  const [inputId, setInputId] = React.useState(useId());

  const onClose = () => {
    onToggle?.(false);
  };

  return (
    <SearchBoxContext.Provider value={{ size, onClose, inputId, setInputId }}>
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
export type SearchBoxIconProps = PolymorphicComponentProps<'span', IconProps>;

const SearchBoxIcon = React.forwardRef((props, ref) => {
  const { size, className, children, ...rest } = props;
  const { size: sizeContext } = useSafeContext(SearchBoxContext);

  return (
    <Icon
      aria-hidden
      className={cx('iui-svg-icon', 'iui-search-icon', className)}
      size={size ?? sizeContext}
      ref={ref}
      {...rest}
    >
      {children ?? <SvgSearch />}
    </Icon>
  );
}) as PolymorphicForwardRefComponent<'span', IconProps>;

// ----------------------------------------------------------------------------

export type SearchBoxInputProps = {
  label?: string;
} & React.ComponentProps<'input'>;

const SearchBoxInput = React.forwardRef(
  (props: SearchBoxInputProps, ref: React.Ref<HTMLInputElement>) => {
    const { className, label = 'Search input', id: idProp, ...rest } = props;

    const { inputId, setInputId } = useSafeContext(SearchBoxContext);

    if (idProp && idProp !== inputId) {
      setInputId(idProp);
    }

    return (
      <input
        id={idProp ?? inputId}
        aria-label={label}
        ref={ref}
        type='search'
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
export type SearchBoxButtonProps = PolymorphicComponentProps<
  'button',
  IconButtonProps
>;

const SearchBoxButton = React.forwardRef((props, ref) => {
  const { children, size, ...rest } = props;
  const { size: sizeContext } = useSafeContext(SearchBoxContext);

  return (
    <IconButton
      styleType='borderless'
      size={size ?? sizeContext}
      ref={ref}
      {...rest}
    >
      {children ?? <SvgSearch />}
    </IconButton>
  );
}) as PolymorphicForwardRefComponent<'button', IconButtonProps>;

// ----------------------------------------------------------------------------

/**
 * SearchBox.Button component to add to your SearchBox.
 */
export type SearchBoxCloseButtonProps = PolymorphicComponentProps<
  'button',
  IconButtonProps
>;

const SearchBoxCloseButton = React.forwardRef((props, ref) => {
  const { children, onClick: onClickProp, size, ...rest } = props;

  const { onClose, size: sizeContext } = useSafeContext(SearchBoxContext);

  return (
    <SearchBoxButton
      ref={ref}
      aria-label='Close'
      size={size ?? sizeContext}
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
