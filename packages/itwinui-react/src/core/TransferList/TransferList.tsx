/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  CommonProps,
  PolymorphicComponentProps,
  PolymorphicForwardRefComponent,
  getFocusableElements,
  useMergedRefs,
  useTheme,
} from '../utils';
import '@itwin/itwinui-css/css/transfer-list.css';
import { List, ListItem, ListItemProps, ListProps } from '../List';

// ----------------------------------------------------------------------------
// TransferList.Area component

type TransferListAreaOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

export type TransferListAreaProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, TransferListAreaOwnProps>;

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

export type TransferListListProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, TransferListListOwnProps>;

const TransferListList = React.forwardRef((props, ref) => {
  const { as: Element = 'ul', children, ...rest } = props;

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
      onKeyDown={onKeyDown}
      role='listbox'
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
   * Callback function that handles click and keyboard actions.
   */
  onClick?: (value?: unknown) => void;
} & ListItemProps;

export type TransferListListItemProps<T extends React.ElementType = 'li'> =
  PolymorphicComponentProps<T, TransferListListItemOwnProps>;

const TransferListListItem = React.forwardRef((props, ref) => {
  const { actionable, disabled, onClick, children, active, ...rest } = props;

  const [isActive, setIsActive] = React.useState(active);

  const onClickEvents = (
    e:
      | React.MouseEvent<HTMLLIElement, MouseEvent>
      | React.KeyboardEvent<HTMLLIElement>,
  ) => {
    if (actionable) {
      onClick?.(e);
      setIsActive(!isActive);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.altKey) {
      return;
    }

    if (
      event.key === 'Enter' ||
      event.key === ' ' ||
      event.key === 'Spacebar'
    ) {
      !disabled && onClickEvents(event);
      event.preventDefault();
    }
  };

  return (
    <ListItem
      ref={ref}
      onClick={onClickEvents}
      onKeyDown={onKeyDown}
      active={isActive}
      {...rest}
    >
      {children}
    </ListItem>
  );
}) as PolymorphicForwardRefComponent<'li', TransferListListItemOwnProps>;

// ----------------------------------------------------------------------------
// TransferList.Label component

type TransferListLabelOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

export type TransferListLabelProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, TransferListLabelOwnProps>;

const TransferListLabel = React.forwardRef((props, ref) => {
  const { as: Element = 'div', children, className, ...rest } = props;

  return (
    <Element
      className={cx('iui-transfer-list-label', className)}
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

export type TransferListToolbarProps<T extends React.ElementType = 'div'> =
  PolymorphicComponentProps<T, TransferListToolbarOwnProps>;

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

export type TransferListProps = {
  /**
   * Content in the transfer list.
   */
  children: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * The TransferList component is used to display a list within a box
 * @example
 * <TransferList>
 *   <TransferList.Area>
 *     <TransferList.List role={'listbox'}>
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
export const TransferList = Object.assign(
  React.forwardRef(
    (props: TransferListProps, ref: React.RefObject<HTMLDivElement>) => {
      const { className, children, ...rest } = props;
      useTheme();

      return (
        <div
          className={cx('iui-transfer-list-wrapper', className)}
          ref={ref}
          {...rest}
        >
          {children}
        </div>
      );
    },
  ),
  {
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
  },
);

export default TransferList;
