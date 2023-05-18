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
  const [labelId, setLabelId] = React.useState<string>();

  return (
    <Element
      className={cx('iui-transfer-list-wrapper', className)}
      ref={ref}
      {...rest}
    >
      <TransferListContext.Provider value={{ labelId, setLabelId }}>
        {children}
      </TransferListContext.Provider>
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TransferListOwnProps>;

// ----------------------------------------------------------------------------
// TransferList.Area component

type TransferListAreaOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const TransferListArea = React.forwardRef((props, ref) => {
  const { as: Element = 'div', children, className, ...rest } = props;

  return (
    <Element
      className={cx('iui-transfer-list-area', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TransferListAreaOwnProps>;

// ----------------------------------------------------------------------------
// TransferList.List component

type TransferListListOwnProps = ListProps; // eslint-disable-line @typescript-eslint/ban-types

const TransferListList = React.forwardRef((props, ref) => {
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
}) as PolymorphicForwardRefComponent<'ul', TransferListListOwnProps>;

// ----------------------------------------------------------------------------
// TransferList.ListItem component

type TransferListListItemOwnProps = {
  /**
   * Callback fired when the the active state changes.
   */
  onActiveChange?: (value: boolean) => void;
} & ListItemProps;

const TransferListListItem = React.forwardRef((props, ref) => {
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
}) as PolymorphicForwardRefComponent<'li', TransferListListItemOwnProps>;

// ----------------------------------------------------------------------------
// TransferList.Label component

type TransferListLabelOwnProps = {
  /**
   * Text label that is wrapped by `TransferList.Label`
   */
  children?: string;
};

const TransferListLabel = React.forwardRef((props, ref) => {
  const { as: Element = 'div', children, className, id, ...rest } = props;

  const { labelId, setLabelId } = useSafeContext(TransferListContext);
  const uid = useId();
  setLabelId(id ?? uid);

  return (
    <Element
      className={cx('iui-transfer-list-label', className)}
      id={labelId}
      ref={ref}
      {...rest}
    >
      {children}
    </Element>
  );
}) as PolymorphicForwardRefComponent<'div', TransferListLabelOwnProps>;

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

/**
 * The TransferList component is used to display a list within a box
 * @example
 * <TransferList>
 *   <TransferList.Area>
 *     <TransferList.List>
 *       <TransferList.ListItem>Item 1</TransferList.ListItem>
 *       <TransferList.ListItem>Item 2</TransferList.ListItem>
 *       <TransferList.ListItem>Item 3</TransferList.ListItem>
 *       <TransferList.ListItem>Item 4</TransferList.ListItem>
 *       <TransferList.ListItem>Item 5</TransferList.ListItem>
 *       <TransferList.ListItem>Item 6</TransferList.ListItem>
 *     </TransferList.List>
 *   </TransferList.Area>
 * </TransferList>
 */
export const TransferList = Object.assign(TransferListComponent, {
  /**
   * 	TransferList area subcomponent
   */
  Area: TransferListArea,
  /**
   * 	TransferList list subcomponent
   */
  List: TransferListList,
  /**
   * 	TransferList list item subcomponent
   */
  ListItem: TransferListListItem,
  /**
   * 	TransferList label subcomponent
   */
  Label: TransferListLabel,
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

export type TransferListAreaProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, TransferListAreaOwnProps>;

export type TransferListListProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, TransferListListOwnProps>;

export type TransferListListItemProps<T extends React.ElementType = 'li'> =
  PolymorphicComponentProps<T, TransferListListItemOwnProps>;

export type TransferListLabelProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, TransferListLabelOwnProps>;

export type TransferListToolbarProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, TransferListToolbarOwnProps>;

export default TransferList;
