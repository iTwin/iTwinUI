/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import {
  InputFlexContainer,
  SvgSearch,
  SvgCloseSmall,
  useSafeContext,
  useId,
  useMergedRefs,
  mergeEventHandlers,
  Box,
  InputFlexContainerIcon,
  InputFlexContainerButton,
} from '../../utils/index.js';
import type {
  PolymorphicForwardRefComponent,
  InputFlexContainerProps,
} from '../../utils/index.js';
import type { IconButtonProps } from '../Buttons/IconButton.js';
import type { IconProps } from '../Icon/Icon.js';

type SearchBoxOwnProps = {
  /**
   * Whether the searchbox is expandable.
   * @default false
   */
  expandable?: boolean;
  /**
   * SearchBox state toggle.
   */
  isExpanded?: boolean;
  /**
   * Function that is called on expanding searchbox.
   */
  onExpand?: () => void;
  /**
   * Function that is called on collapsing searchbox.
   */
  onCollapse?: () => void;
  /**
   * Input props when using default searchbox.
   */
  inputProps?: React.ComponentPropsWithoutRef<'input'>;
  /**
   * Modify size of the searchbox and it's subcomponents.
   */
  size?: 'small' | 'large';
};

// ----------------------------------------------------------------------------

const SearchBoxContext = React.createContext<
  | ({
      /**
       * Context prop for disabling subcomponents
       */
      isDisabled?: boolean;
      /**
       * Id to pass to input
       */
      inputId: string;
      /**
       * Callback to set inputID
       */
      setInputId: (inputId: string) => void;
      /**
       * Ref for input subcomponent
       */
      inputRef: React.RefObject<HTMLInputElement>;
      /**
       * Ref for open button subcomponent
       */
      openButtonRef: React.RefObject<HTMLButtonElement>;
    } & Pick<
      SearchBoxOwnProps,
      'size' | 'onCollapse' | 'expandable' | 'isExpanded' | 'onExpand'
    >)
  | undefined
>(undefined);

// ----------------------------------------------------------------------------

const SearchBoxComponent = React.forwardRef((props, ref) => {
  const {
    size,
    expandable = false,
    isDisabled = false,
    onCollapse: onCollapseProp,
    onExpand: onExpandProp,
    isExpanded: isExpandedProp,
    children,
    inputProps,
    className,
    ...rest
  } = props;

  const uid = useId();
  const [inputId, setInputId] = React.useState(uid);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const openButtonRef = React.useRef<HTMLButtonElement>(null);

  const [localExpanded, setLocalExpanded] = React.useState(isExpandedProp);

  const isExpanded = isExpandedProp ?? localExpanded;

  const onCollapse = () => {
    setLocalExpanded(false);
    onCollapseProp?.();
    queueMicrotask(() => openButtonRef.current?.focus({ preventScroll: true }));
  };

  const onExpand = () => {
    setLocalExpanded(true);
    onExpandProp?.();
    queueMicrotask(() => inputRef.current?.focus({ preventScroll: true }));
  };

  return (
    <SearchBoxContext.Provider
      value={{
        size,
        isDisabled,
        onCollapse,
        onExpand,
        inputRef,
        inputId,
        setInputId,
        openButtonRef,
        isExpanded,
        expandable,
      }}
    >
      <InputFlexContainer
        ref={ref}
        className={cx(
          'iui-searchbox',
          { 'iui-expandable-searchbox': expandable },
          className,
        )}
        size={size}
        isDisabled={isDisabled}
        data-iui-expanded={isExpanded}
        {...rest}
      >
        {children ?? (
          <>
            <SearchBoxCollapsedState>
              <SearchBoxExpandButton />
            </SearchBoxCollapsedState>

            <SearchBoxExpandedState>
              <SearchBoxIcon />
              <SearchBoxInput {...inputProps} />

              {expandable ? <SearchBoxCollapseButton /> : null}
            </SearchBoxExpandedState>
          </>
        )}
      </InputFlexContainer>
    </SearchBoxContext.Provider>
  );
}) as PolymorphicForwardRefComponent<
  'div',
  SearchBoxOwnProps & InputFlexContainerProps
>;

// ----------------------------------------------------------------------------

type SearchBoxCollapsedStateProps = {
  children?: React.ReactNode;
};

const SearchBoxCollapsedState = (props: SearchBoxCollapsedStateProps) => {
  const { children } = props;
  const { isExpanded, expandable } = useSafeContext(SearchBoxContext);

  if (!expandable || isExpanded) {
    return null;
  }

  return <>{children ?? <SearchBoxExpandButton />}</>;
};
if (process.env.NODE_ENV === 'development') {
  SearchBoxCollapsedState.displayName = 'SearchBox.CollapsedState';
}

// ----------------------------------------------------------------------------

type SearchBoxExpandedStateProps = {
  children: React.ReactNode;
};

const SearchBoxExpandedState = (props: SearchBoxExpandedStateProps) => {
  const { children } = props;
  const { isExpanded, expandable } = useSafeContext(SearchBoxContext);

  if (expandable && !isExpanded) {
    return null;
  }

  return <>{children}</>;
};
if (process.env.NODE_ENV === 'development') {
  SearchBoxExpandedState.displayName = 'SearchBox.ExpandedState';
}

// ----------------------------------------------------------------------------

const SearchBoxIcon = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;

  return (
    <InputFlexContainerIcon
      aria-hidden
      className={cx('iui-search-icon', className)}
      ref={ref}
      {...rest}
    >
      {children ?? <SvgSearch />}
    </InputFlexContainerIcon>
  );
}) as PolymorphicForwardRefComponent<'span', IconProps>;
if (process.env.NODE_ENV === 'development') {
  SearchBoxIcon.displayName = 'SearchBox.Icon';
}

// ----------------------------------------------------------------------------

const SearchBoxInput = React.forwardRef((props, ref) => {
  const { className, id: idProp, ...rest } = props;

  const { inputId, setInputId, isDisabled, inputRef } =
    useSafeContext(SearchBoxContext);

  React.useEffect(() => {
    if (idProp && idProp !== inputId) {
      setInputId(idProp);
    }
  }, [idProp, inputId, setInputId]);

  return (
    <Box
      as='input'
      id={idProp ?? inputId}
      ref={useMergedRefs(ref, inputRef)}
      role='searchbox'
      type='text'
      className={cx('iui-search-input', className)}
      disabled={isDisabled}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'input'>;
if (process.env.NODE_ENV === 'development') {
  SearchBoxInput.displayName = 'SearchBox.Input';
}

// ----------------------------------------------------------------------------

const SearchBoxButton = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  const { size: sizeContext, isDisabled } = useSafeContext(SearchBoxContext);

  return (
    <InputFlexContainerButton
      size={sizeContext}
      ref={ref}
      disabled={isDisabled}
      {...rest}
    >
      {children ?? <SvgSearch />}
    </InputFlexContainerButton>
  );
}) as PolymorphicForwardRefComponent<'button', IconButtonProps>;
if (process.env.NODE_ENV === 'development') {
  SearchBoxButton.displayName = 'SearchBox.Button';
}

// ----------------------------------------------------------------------------

const SearchBoxCollapseButton = React.forwardRef((props, ref) => {
  const { children, onClick: onClickProp, ...rest } = props;

  const {
    onCollapse,
    size: sizeContext,
    isDisabled,
  } = useSafeContext(SearchBoxContext);

  return (
    <SearchBoxButton
      ref={ref}
      aria-label='Close searchbox'
      size={sizeContext}
      disabled={isDisabled}
      onClick={mergeEventHandlers(onClickProp, onCollapse)}
      {...rest}
    >
      {children ?? <SvgCloseSmall />}
    </SearchBoxButton>
  );
}) as PolymorphicForwardRefComponent<'button', IconButtonProps>;
if (process.env.NODE_ENV === 'development') {
  SearchBoxCollapseButton.displayName = 'SearchBox.CollapseButton';
}

// ----------------------------------------------------------------------------

const SearchBoxExpandButton = React.forwardRef((props, ref) => {
  const { children, onClick: onClickProp, ...rest } = props;

  const {
    onExpand,
    size: sizeContext,
    isDisabled,
    openButtonRef,
  } = useSafeContext(SearchBoxContext);

  return (
    <SearchBoxButton
      ref={useMergedRefs(ref, openButtonRef)}
      aria-label='Expand searchbox'
      size={sizeContext}
      disabled={isDisabled}
      onClick={mergeEventHandlers(onClickProp, onExpand)}
      styleType='default'
      {...rest}
    >
      {children ?? <SvgSearch />}
    </SearchBoxButton>
  );
}) as PolymorphicForwardRefComponent<'button', IconButtonProps>;
if (process.env.NODE_ENV === 'development') {
  SearchBoxExpandButton.displayName = 'SearchBox.ExpandButton';
}

// ----------------------------------------------------------------------------

/**
 * SearchBox component.
 * Can be used to implement search functionality for pages, tables and more.
 * @example
 *  <SearchBox inputProps={{ placeholder: 'Basic search' }}/>
 *
 * @example
 * <SearchBox expandable inputProps={{ placeholder: 'Expandable search' }}/>
 *
 * @example
 * <SearchBox>
 *   <SearchBox.CollapsedState />
 *   <SearchBox.ExpandedState>
 *     <SearchBox.Icon />
 *     <SearchBox.Input />
 *     <SearchBox.CollapseButton />
 *   </SearchBox.ExpandedState>
 * </SearchBox>
 */
export const SearchBox = Object.assign(SearchBoxComponent, {
  /**
   * Icon to be placed within SearchBox.
   * @default Looking glass icon
   */
  Icon: SearchBoxIcon,
  /**
   * Input to be placed within SearchBox
   */
  Input: SearchBoxInput,
  /**
   * Button to be placed within SearchBox. Default has looking glass icon.
   */
  Button: SearchBoxButton,
  /**
   * Collapse button for expandable SearchBox. Clicking on this button will collapse SearchBox.
   */
  CollapseButton: SearchBoxCollapseButton,
  /**
   * Expand button for expandable SearchBox. Clicking on this will expand SearchBox.
   */
  ExpandButton: SearchBoxExpandButton,
  /**
   * Subcomponent to customise expanded state of the SearchBox
   */
  ExpandedState: SearchBoxExpandedState,
  /**
   * Subcomponent to customise collapsed state.
   */
  CollapsedState: SearchBoxCollapsedState,
});

if (process.env.NODE_ENV === 'development') {
  SearchBox.displayName = 'SearchBox';
}
