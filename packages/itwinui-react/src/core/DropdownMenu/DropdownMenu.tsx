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
  SvgChevronLeft,
} from '../../utils/index.js';
import type {
  PolymorphicForwardRefComponent,
  PortalProps,
} from '../../utils/index.js';
// import { Menu } from '../Menu/Menu.js';
import { usePopover } from '../Popover/Popover.js';
import {
  FloatingNode,
  FloatingTree,
  useFloatingNodeId,
} from '@floating-ui/react';
import { MenuItemContext } from '../Menu/MenuItem.js';

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
  /**
   * Whether the DropdownMenu is layered.
   *
   * @default false
   */
  layered?: boolean;
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
  return (
    <FloatingTree>
      <DropdownMenuContent ref={forwardedRef} {...props} />
    </FloatingTree>
  );
}) as PolymorphicForwardRefComponent<'div', DropdownMenuProps>;

// ----------------------------------------------------------------------------

const DropdownMenuContent = React.forwardRef((props, forwardedRef) => {
  const {
    menuItems,
    children,
    role = 'menu',
    visible: visibleProp,
    placement = 'bottom-start',
    matchWidth = false,
    onVisibleChange,
    portal = true,
    layered = false,
    ...rest
  } = props;

  const [visible, setVisible] = useControlledState(
    false,
    visibleProp,
    onVisibleChange,
  );

  const triggerRef = React.useRef<HTMLElement>(null);

  const close = React.useCallback(() => {
    // console.log('close');
    setVisible(false);
    setCurrentMenuHierarchyItem(undefined);
    triggerRef.current?.focus({ preventScroll: true });
  }, [setVisible]);

  const menuContent = React.useMemo(() => {
    if (typeof menuItems === 'function') {
      // console.log(menuItems(close));

      // menuItems(close).forEach((item) => {
      //   // console.log(item.type.displayName);

      //   console.log(item);
      // });

      return menuItems(close);
    }
    return menuItems;
  }, [menuItems, close]);

  const [currentFocusedNodeIndex, setCurrentFocusedNodeIndex] = React.useState<
    number | null
  >(null);
  const focusableNodes = React.useRef<Array<HTMLElement | null>>([]);

  const nodeId = useFloatingNodeId();

  const popover = usePopover({
    nodeId,
    visible,
    onVisibleChange: (open) => {
      // Always start from the beginning of the menu hierarchy
      if (open) {
        setCurrentMenuHierarchyItem(undefined);
      }

      open ? setVisible(true) : close();
    },
    placement,
    matchWidth,
    interactions: {
      listNavigation: {
        activeIndex: currentFocusedNodeIndex,
        onNavigate: setCurrentFocusedNodeIndex,
        listRef: focusableNodes,
        focusItemOnOpen: true,
      },
    },
  });

  const popoverRef = useMergedRefs(forwardedRef, popover.refs.setFloating);

  const backButtonOnClick = React.useCallback(() => {
    if (currentMenuHierarchyItem == undefined) {
      return undefined;
    }

    flushSync(() => {
      setCurrentMenuHierarchyItem((prev) => {
        if (prev == undefined) {
          return undefined;
        }
        return menuHierarchy[prev].parent;
      });
    });

    // if (menuHierarchy[currentMenuHierarchyItem].parent != null) {
    itemRefs.current[currentMenuHierarchyItem]?.focus();
    // }
  }, [
    menuHierarchy,
    // itemRefs,
    currentMenuHierarchyItem,
  ]);

  const menuChildOnClick = React.useCallback(
    (index: number) => {
      // console.log('menuChildOnClick', index);
      if (popover.open) {
        setCurrentMenuHierarchyItem(index);

        // flush and reset state so we are ready to focus again next time
        flushSync(() => setFocusOnMenu(false));
        setFocusOnMenu(true);
      }
    },
    [
      popover.open,
      setCurrentMenuHierarchyItem,
      // menuHierarchy,
    ],
  );

  // React.useEffect(() => {
  //   console.log(
  //     'filteredMenuHierarchy',
  //     menuHierarchy.filter((item) => item.parent === currentMenuHierarchyItem),
  //   );
  // }, [currentMenuHierarchyItem, menuHierarchy]);

  const itemRefs = React.useRef<HTMLElement[]>([]);

  return (
    <>
      {cloneElementWithRef(children, (children) => ({
        ...popover.getReferenceProps(children.props),
        'aria-expanded': popover.open,
        ref: mergeRefs(triggerRef, popover.refs.setReference),
      }))}
      <FloatingNode id={nodeId}>
        {popover.open && (
          <Portal portal={portal}>
            <MenuItemContext.Provider
              value={{
                setCurrentFocusedNodeIndex,
                focusableNodes,
              }}
            >
              <Menu
                setFocus={false}
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
                {menuContent}
              </Menu>
            </MenuItemContext.Provider>
          </Portal>
        )}
      </FloatingNode>
    </>
  );
}) as PolymorphicForwardRefComponent<'div', DropdownMenuProps>;

// ----------------------------------------------------------------------------

export const DropdownMenuContext = React.createContext<{
  layered: DropdownMenuProps['layered'];
  menuChildOnClick: (index: number) => void;
  backButtonOnClick: () => void;
}>({
  layered: false,
  menuChildOnClick: () => {},
  backButtonOnClick: () => {},
});

type MenuHierarchyItem = {
  item: JSX.Element;
  parent: number | undefined;
};
