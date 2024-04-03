/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  useMergedRefs,
  Portal,
  cloneElementWithRef,
  useControlledState,
  mergeRefs,
  mergeEventHandlers,
} from '../utils/index.js';
import type {
  PolymorphicForwardRefComponent,
  PortalProps,
} from '../utils/index.js';
import { Menu } from '../Menu/Menu.js';
import { usePopover } from '../Popover/Popover.js';
import {
  FloatingList,
  FloatingNode,
  FloatingTree,
  useClick,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useInteractions,
  useListNavigation,
} from '@floating-ui/react';

export type DropdownMenuProps = {
  /**
   * List of menu items. Recommended to use MenuItem component.
   * You can pass function that takes argument `close` that closes the dropdown menu, or a list of MenuItems.
   */
  menuItems:
    | ((close: () => void) => JSX.Element[])
    | JSX.Element[]
    | JSX.Element;
  /**
   * ARIA role. Role of menu. For menu use 'menu', for select use 'listbox'.
   * @default 'menu'
   */
  role?: string;
  /**
   * Child element to wrap dropdown with.
   */
  children: React.ReactNode;
} & Pick<
  Parameters<typeof usePopover>[0],
  'visible' | 'onVisibleChange' | 'placement' | 'matchWidth'
> &
  React.ComponentPropsWithoutRef<'ul'> &
  Pick<PortalProps, 'portal'>;

/**
 * Dropdown menu component.
 * Built on top of the {@link Popover} component.
 * @example
 * const menuItems = (close: () => void) => [
 *   <MenuItem key={1} onClick={onClick(1, close)}>
 *     Item #1
 *   </MenuItem>,
 *   <MenuItem key={2} onClick={onClick(2, close)}>
 *     Item #2
 *   </MenuItem>,
 *   <MenuItem key={3} onClick={onClick(3, close)}>
 *     Item #3
 *   </MenuItem>,
 * ];
 * <DropdownMenu menuItems={menuItems}>
 *   <Button>Menu</Button>
 * </DropdownMenu>
 */
export const DropdownMenu = React.forwardRef((props, forwardedRef) => {
  const {
    menuItems,
    children,
    role = 'menu',
    visible: visibleProp,
    placement = 'bottom-start',
    matchWidth = false,
    onVisibleChange,
    portal = true,
    ...rest
  } = props;

  const [visible, setVisible] = useControlledState(
    false,
    visibleProp,
    onVisibleChange,
  );

  const triggerRef = React.useRef<HTMLElement>(null);

  const close = React.useCallback(() => {
    console.log('close() called');

    setVisible(false);
    triggerRef.current?.focus({ preventScroll: true });
  }, [setVisible]);

  const menuContent = React.useMemo(() => {
    if (typeof menuItems === 'function') {
      return menuItems(close);
    }
    return menuItems;
  }, [menuItems, close]);

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const listRef = React.useRef<any[]>([]);
  console.log('activeIndex', activeIndex, listRef.current);

  const interactions = React.useRef<ReturnType<typeof useInteractions> | null>(
    null,
  );
  const getItemProps = interactions.current?.getItemProps;

  const popover = usePopover({
    visible,
    onVisibleChange: (open) => (open ? setVisible(true) : close()),
    placement,
    matchWidth,
    interactions: (context) => {
      const interactionsValue = useInteractions([
        useClick(context),
        useListNavigation(context, {
          listRef,
          activeIndex,
          onNavigate: setActiveIndex,
        }),
      ]);

      interactions.current = interactionsValue;

      // console.log('interactions', interactions);

      console.log(
        'interactions',
        interactions.current.getFloatingProps(),
        interactions.current.getItemProps(),
        interactions.current.getReferenceProps(),
      );

      return interactions.current;
    },
  });

  const popoverRef = useMergedRefs(forwardedRef, popover.refs.setFloating);

  const selectContext = React.useMemo(
    () => ({
      activeIndex,
      // selectedIndex,
      getItemProps,
      // handleSelect,
    }),
    [activeIndex, getItemProps],
  );

  // Subscribe this component to the <FloatingTree> wrapper:
  const nodeId = useFloatingNodeId();
  const tree = useFloatingTree();
  const parentId = useFloatingParentNodeId();

  // Event emitter allows you to communicate across tree components.
  // This effect closes all menus when an item gets clicked anywhere
  // in the tree.
  React.useEffect(() => {
    if (!tree) return;

    function handleTreeClick() {
      setVisible(false);
    }

    function onSubMenuOpen(event: { nodeId: string; parentId: string }) {
      if (event.nodeId !== nodeId && event.parentId === parentId) {
        setVisible(false);
      }
    }

    tree.events.on('click', handleTreeClick);
    tree.events.on('menuopen', onSubMenuOpen);

    return () => {
      tree.events.off('click', handleTreeClick);
      tree.events.off('menuopen', onSubMenuOpen);
    };
  }, [tree, nodeId, parentId]);

  React.useEffect(() => {
    if (visible && tree) {
      tree.events.emit('menuopen', { parentId, nodeId });
    }
  }, [tree, visible, nodeId, parentId]);

  return (
    <FloatingTreeWrapper>
      {cloneElementWithRef(children, (children) => ({
        ...popover.getReferenceProps(children.props),
        'aria-expanded': popover.open,
        ref: mergeRefs(triggerRef, popover.refs.setReference),
      }))}
      {popover.open && (
        <Portal portal={portal}>
          <SelectContext.Provider value={selectContext}>
            <FloatingNode id={nodeId}>
              <Menu
                {...popover.getFloatingProps({
                  role,
                  ...rest,
                  onKeyDown: mergeEventHandlers(props.onKeyDown, (e) => {
                    if (e.defaultPrevented) {
                      return;
                    }
                    if (e.key === 'Tab') {
                      close();
                    }
                  }),
                })}
                ref={popoverRef}
              >
                {/* {menuContent} */}
                <FloatingList elementsRef={listRef}>{menuContent}</FloatingList>
                {/* <FloatingList elementsRef={listRef}>{menuContent}</FloatingList> */}
                {/* <FloatingList elementsRef={listRef}>
              {(menuContent as JSX.Element[]).map((item, index) =>
                React.cloneElement(item, {
                  ...(interactions.current != null
                    ? interactions.current.getItemProps({
                      'data-testing-1': 'testing-123',
                    })
                    : {}),
                  }),
                  )}
                </FloatingList> */}
                {/* {(menuContent as JSX.Element[]).map((item, index) =>
              React.cloneElement(item, {
                ref: (el: any) => {
                  console.log('HERE');
                  listRef.current[index] = el;
                },
                // Make these elements focusable using a roving tabIndex.
                tabIndex: activeIndex === index ? 0 : -1,
                'data-testing': 'testing-123',
                ...(interactions.current != null
                  ? interactions.current.getItemProps({
                    'data-testing-1': 'testing-123',
                  })
                  : {}),
                }),
              )} */}
              </Menu>
            </FloatingNode>
          </SelectContext.Provider>
        </Portal>
      )}
    </FloatingTreeWrapper>
  );
}) as PolymorphicForwardRefComponent<'div', DropdownMenuProps>;

export const DropdownMenuContext = React.createContext<
  | {
      activeIndex: number | null;
    }
  | undefined
>(undefined);

interface SelectContextValue {
  activeIndex: number | null;
  // selectedIndex: number | null;
  getItemProps: ReturnType<typeof useInteractions>['getItemProps'] | undefined;
  // handleSelect: (index: number | null) => void;
}

export const SelectContext = React.createContext<SelectContextValue>(
  {} as SelectContextValue,
);

const FloatingTreeWrapper = (props: { children: React.ReactNode }) => {
  return <FloatingTree>{props.children}</FloatingTree>;
};
