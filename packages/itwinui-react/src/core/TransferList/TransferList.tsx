/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  getFocusableElements,
  useMergedRefs,
  useId,
  useSafeContext,
  useGlobals,
} from '../utils/index.js';
import type {
  PolymorphicComponentProps,
  PolymorphicForwardRefComponent,
} from '../utils/index.js';

import '@itwin/itwinui-css/css/transfer-list.css';
import { List, ListItem } from '../List/index.js';
import type { ListItemProps, ListProps } from '../List/index.js';

// ----------------------------------------------------------------------------
// TransferListComponent

type TransferListOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const TransferListComponent = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, children, ...rest } = props;

  useGlobals();

  return (
    <Element
      className={cx('iui-transfer-list-wrapper', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TransferListOwnProps>;
TransferListComponent.displayName = 'TransferList';

// ----------------------------------------------------------------------------
// TransferList.ListboxWrapper component

type TransferListListboxWrapperOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const TransferListListboxWrapper = React.forwardRef((props, ref) => {
  const { as: Element = 'div', className, children, ...rest } = props;

  const uid = useId();
  const [labelId, setLabelId] = React.useState(uid);

  return (
    <Element
      className={cx('iui-transfer-list-listbox-wrapper', className)}
      ref={ref}
      {...rest}
    >
      <TransferListContext.Provider value={{ labelId, setLabelId }}>
        {children}
      </TransferListContext.Provider>
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TransferListListboxWrapperOwnProps>;
TransferListListboxWrapper.displayName = 'TransferList.ListboxWrapper';

// ----------------------------------------------------------------------------
// TransferList.Listbox component

type TransferListListboxOwnProps = ListProps; // eslint-disable-line @typescript-eslint/ban-types

const TransferListListbox = React.forwardRef((props, ref) => {
  const { as: Element = 'ul', children, className, ...rest } = props;

  const { labelId } = useSafeContext(TransferListContext);

  const [focusedIndex, setFocusedIndex] = React.useState<number | null>();
  const listRef = React.useRef<HTMLUListElement>(null);
  const refs = useMergedRefs(listRef, ref);

  const getFocusableNodes = React.useCallback(() => {
    const focusableItems = getFocusableElements(listRef.current);
    // Filter out focusable elements that are inside each list item, e.g. checkbox, anchor
    return focusableItems.filter(
      (i) => !focusableItems.some((p) => p.contains(i.parentElement)),
    ) as HTMLElement[];
  }, []);

  React.useEffect(() => {
    const items = getFocusableNodes();
    if (focusedIndex != null) {
      (items?.[focusedIndex] as HTMLLIElement)?.focus();
      return;
    }
  }, [focusedIndex, getFocusableNodes]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.altKey) {
      return;
    }

    const items = getFocusableNodes();
    if (!items?.length) {
      return;
    }

    const currentIndex = focusedIndex ?? 0;

    switch (event.key) {
      case 'ArrowDown': {
        setFocusedIndex(Math.min(currentIndex + 1, items.length - 1));
        event.preventDefault();
        event.stopPropagation();
        break;
      }
      case 'ArrowUp': {
        setFocusedIndex(Math.max(currentIndex - 1, 0));
        event.preventDefault();
        event.stopPropagation();
        break;
      }
      default:
        break;
    }
  };

  return (
    <List
      as={Element}
      className={cx('iui-transfer-list-listbox', className)}
      onKeyDown={onKeyDown}
      role={'listbox'}
      aria-labelledby={labelId}
      ref={refs}
      {...rest}
    >
      {children}
    </List>
  );
}) as PolymorphicForwardRefComponent<'ul', TransferListListboxOwnProps>;
TransferListListbox.displayName = 'TransferList.Listbox';

// ----------------------------------------------------------------------------
// TransferList.Item component

type TransferListItemOwnProps = {
  /**
   * Callback fired when the the active state changes.
   */
  onActiveChange?: (value: boolean) => void;
} & ListItemProps;

const TransferListItem = React.forwardRef((props, ref) => {
  const {
    actionable = true,
    disabled,
    onActiveChange,
    children,
    active,
    ...rest
  } = props;

  const onClickEvents = () =>
    actionable && onActiveChange && onActiveChange(!active);

  const onKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.altKey) {
      return;
    }

    if (
      event.key === 'Enter' ||
      event.key === ' ' ||
      event.key === 'Spacebar'
    ) {
      !disabled && onClickEvents();
      event.preventDefault();
    }
  };

  return (
    <ListItem
      ref={ref}
      onClick={onClickEvents}
      onKeyDown={onKeyDown}
      active={active}
      actionable={actionable}
      tabIndex={-1}
      role={'option'}
      aria-disabled={disabled ? 'true' : undefined}
      aria-selected={active ? 'true' : undefined}
      disabled={disabled}
      {...rest}
    >
      {children}
    </ListItem>
  );
}) as PolymorphicForwardRefComponent<'li', TransferListItemOwnProps>;
TransferListItem.displayName = 'TransferList.Item';

// ----------------------------------------------------------------------------
// TransferList.ListboxLabel component

type TransferListListboxLabelOwnProps = {
  /**
   * Text label that is wrapped by `TransferList.ListboxLabel`
   */
  children?: string;
};

const TransferListListboxLabel = React.forwardRef((props, ref) => {
  const { as: Element = 'div', children, className, id, ...rest } = props;

  const { labelId, setLabelId } = useSafeContext(TransferListContext);

  React.useEffect(() => {
    if (id && id !== labelId) {
      setLabelId(id);
    }
  }, [id, labelId, setLabelId]);

  return (
    <Element
      className={cx('iui-transfer-list-listbox-label', className)}
      id={labelId}
      ref={ref}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TransferListListboxLabelOwnProps>;
TransferListListboxLabel.displayName = 'TransferList.ListboxLabel';

// ----------------------------------------------------------------------------
// TransferList.Toolbar component

type TransferListToolbarOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const TransferListToolbar = React.forwardRef((props, ref) => {
  const { as: Element = 'div', children, className, ...rest } = props;

  return (
    <Element
      className={cx('iui-transfer-list-toolbar', className)}
      role={'toolbar'}
      ref={ref}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TransferListToolbarOwnProps>;
TransferListToolbar.displayName = 'TransferList.Toolbar';

/**
 * The TransferList component is used to display a list within a box
 * @example
 * <TransferList>
 *   <TransferList.ListboxWrapper>
 *     <TransferList.Listbox>
 *       <TransferList.Item>Item 1</TransferList.Item>
 *       <TransferList.Item>Item 2</TransferList.Item>
 *       <TransferList.Item>Item 3</TransferList.Item>
 *       <TransferList.Item>Item 4</TransferList.Item>
 *       <TransferList.Item>Item 5</TransferList.Item>
 *       <TransferList.Item>Item 6</TransferList.Item>
 *     </TransferList.Listbox>
 *   </TransferList.ListboxWrapper>
 * </TransferList>
 */
export const TransferList = Object.assign(TransferListComponent, {
  /**
   * 	TransferList listbox wrapper subcomponent
   */
  ListboxWrapper: TransferListListboxWrapper,
  /**
   * 	TransferList listbox subcomponent
   */
  Listbox: TransferListListbox,
  /**
   * 	TransferList item subcomponent
   */
  Item: TransferListItem,
  /**
   * 	TransferList listbox label subcomponent
   */
  ListboxLabel: TransferListListboxLabel,
  /**
   * 	TransferList toolbar subcomponent
   */
  Toolbar: TransferListToolbar,
});

export const TransferListContext = React.createContext<
  | {
      /**
       * Id to set to label and set 'aria-labelledby' prop of the listbox
       */
      labelId?: string;
      /**
       * Callback that's fired when labelId is changed
       */
      setLabelId: (labelId: string) => void;
    }
  | undefined
>(undefined);

export type TransferListProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, TransferListOwnProps>;

export type TransferListListboxWrapperProps<
  T extends React.ElementType = 'div',
> = PolymorphicComponentProps<T, TransferListListboxWrapperOwnProps>;

export type TransferListListboxProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, TransferListListboxOwnProps>;

export type TransferListItemProps<T extends React.ElementType = 'li'> =
  PolymorphicComponentProps<T, TransferListItemOwnProps>;

export type TransferListListboxLabelProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, TransferListListboxLabelOwnProps>;

export type TransferListToolbarProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, TransferListToolbarOwnProps>;

export default TransferList;
