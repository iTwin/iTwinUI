/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import {
  getFocusableElements,
  useMergedRefs,
  useId,
  useSafeContext,
  Box,
  polymorphic,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { List } from '../List/List.js';
import { ListItem } from '../List/ListItem.js';
import { Label } from '../Label/Label.js';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup.js';

// ----------------------------------------------------------------------------
// TransferListComponent

const TransferListComponent = polymorphic.div('iui-transfer-list-wrapper');
if (process.env.NODE_ENV === 'development') {
  TransferListComponent.displayName = 'TransferList';
}

// ----------------------------------------------------------------------------
// TransferList.ListboxWrapper component

type TransferListListboxWrapperOwnProps = {}; // eslint-disable-line @typescript-eslint/ban-types

const TransferListListboxWrapper = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;

  const uid = useId();
  const [labelId, setLabelId] = React.useState(uid);

  return (
    <Box
      as='div'
      className={cx('iui-transfer-list-listbox-wrapper', className)}
      ref={ref}
      {...rest}
    >
      <TransferListContext.Provider value={{ labelId, setLabelId }}>
        {children}
      </TransferListContext.Provider>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', TransferListListboxWrapperOwnProps>;
if (process.env.NODE_ENV === 'development') {
  TransferListListboxWrapper.displayName = 'TransferList.ListboxWrapper';
}

// ----------------------------------------------------------------------------
// TransferList.Listbox component

type TransferListListboxOwnProps = React.ComponentProps<typeof List>; // eslint-disable-line @typescript-eslint/ban-types

const TransferListListbox = React.forwardRef((props, ref) => {
  const { children, className, ...rest } = props;

  const { labelId } = useSafeContext(TransferListContext);

  const [focusedIndex, setFocusedIndex] = React.useState<number | null>();
  const listRef = React.useRef<HTMLElement>(null);
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

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
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
      className={cx('iui-transfer-list-listbox', className)}
      onKeyDown={onKeyDown}
      role={'listbox'}
      aria-multiselectable={true}
      aria-labelledby={labelId}
      tabIndex={0}
      ref={refs}
      {...rest}
    >
      {children}
    </List>
  );
}) as PolymorphicForwardRefComponent<'ul', TransferListListboxOwnProps>;
if (process.env.NODE_ENV === 'development') {
  TransferListListbox.displayName = 'TransferList.Listbox';
}

// ----------------------------------------------------------------------------
// TransferList.Item component

type TransferListItemOwnProps = {
  /**
   * Callback fired when the the active state changes.
   */
  onActiveChange?: (value: boolean) => void;
} & React.ComponentProps<typeof ListItem>;

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

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
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
if (process.env.NODE_ENV === 'development') {
  TransferListItem.displayName = 'TransferList.Item';
}

// ----------------------------------------------------------------------------
// TransferList.ListboxLabel component

type TransferListListboxLabelOwnProps = {
  /**
   * Text label that is wrapped by `TransferList.ListboxLabel`
   */
  children?: string;
};

const TransferListListboxLabel = React.forwardRef((props, ref) => {
  const { children, id, ...rest } = props;

  const { labelId, setLabelId } = useSafeContext(TransferListContext);

  React.useEffect(() => {
    if (id && id !== labelId) {
      setLabelId(id);
    }
  }, [id, labelId, setLabelId]);

  return (
    <Label as='div' id={labelId} ref={ref} {...rest}>
      {children}
    </Label>
  );
}) as PolymorphicForwardRefComponent<'div', TransferListListboxLabelOwnProps>;
if (process.env.NODE_ENV === 'development') {
  TransferListListboxLabel.displayName = 'TransferList.ListboxLabel';
}

// ----------------------------------------------------------------------------
// TransferList.Toolbar component

const TransferListToolbar = React.forwardRef((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <ButtonGroup
      role='toolbar'
      ref={ref}
      {...rest}
      orientation='vertical'
      className={cx('iui-transfer-list-toolbar', className)}
    >
      {children}
    </ButtonGroup>
  );
}) as PolymorphicForwardRefComponent<'div', object>;
if (process.env.NODE_ENV === 'development') {
  TransferListToolbar.displayName = 'TransferList.Toolbar';
}

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
   * TransferList listbox wrapper subcomponent
   */
  ListboxWrapper: TransferListListboxWrapper,
  /**
   * TransferList listbox subcomponent
   */
  Listbox: TransferListListbox,
  /**
   * TransferList item subcomponent.
   *
   * Renders a `ListItem` and is compatible with `ListItem`'s [subcomponents](https://itwinui.bentley.com/docs/list#with-subcomponents).
   */
  Item: TransferListItem,
  /**
   * TransferList listbox label subcomponent
   */
  ListboxLabel: TransferListListboxLabel,
  /**
   * TransferList toolbar subcomponent
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
if (process.env.NODE_ENV === 'development') {
  TransferListContext.displayName = 'TransferListContext';
}
