/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import {
  useMergedRefs,
  getFocusableElements,
  Box,
  Portal,
  useControlledState,
  cloneElementWithRef,
  mergeRefs,
  useSyncExternalStore,
} from '../../utils/index.js';
import type {
  PolymorphicForwardRefComponent,
  PortalProps,
} from '../../utils/index.js';
import { useListNavigationProps, usePopover } from '../Popover/Popover.js';
import {
  FloatingNode,
  useFloatingParentNodeId,
  useFloatingTree,
} from '@floating-ui/react';

type MenuProps = {
  /**
   * Menu items. Recommended to use `MenuItem` components.
   *
   * If you have custom actionable items, they should have `tabIndex={-1}` for better keyboard navigation support
   * and selected item should have `aria-selected={true}`.
   */
  children: React.ReactNode;

  trigger: React.ReactNode;
  positionReference?: Parameters<
    ReturnType<typeof usePopover>['refs']['setPositionReference']
  >[0];

  portal?: PortalProps['portal'];

  // Since Menu handles the required listNavigation props, it only needs to accept the optional ones.
  popoverProps?: Omit<Parameters<typeof usePopover>[0], 'interactions'> & {
    interactions?: Omit<
      NonNullable<Parameters<typeof usePopover>[0]['interactions']>,
      'listNavigation'
    > & {
      listNavigation?: Parameters<typeof useListNavigationProps>[0];
    };
  };
  nodeId?: Parameters<typeof usePopover>[0]['nodeId'];
};

/**
 * @private
 *
 * Can be used for select or dropdown components.
 *
 * This handles lots of the setup for a menu component:
 * - the portaling: use the optional `portal` prop for more customization
 * - conditional rendering based on the popover's open state
 * - spreading the popover props (`getFloatingProps`, `getReferenceProps`)
 * - setting the refs: use the optional`positionReference` prop to set the position reference
 * - keyboard navigation: use the `interactions.listNavigation` prop for more customization
 * - register a `FloatingNode` in the `FloatingTree` if `nodeId` is provided
 *
 * @example
 * const trigger = <Button>Menu</Button>;
 * const [positionReference, setPositionReference] = React.useState<HTMLDivElement | null>(null);
 * const popoverProps = { matchWidth: true };
 * const nodeId = useFloatingNodeId();
 *
 * return (
 *   <Box ref={setPositionReference}>
 *     <Menu
 *       trigger={trigger}
 *       positionReference={positionReference}
 *       nodeId={nodeId}
 *       popoverProps={popoverProps}
 *     >
 *       <MenuItem>Item 1</MenuItem>
 *       <MenuItem>Item 2</MenuItem>
 *     </Menu>
 *   </Box>
 * );
 */
export const Menu = React.forwardRef((props, ref) => {
  const {
    className,
    trigger,
    positionReference,
    portal = true,
    popoverProps: popoverPropsProp,
    nodeId,
    children,
    ...rest
  } = props;

  const parent = React.useContext(MenuContext);

  const tree = useFloatingTree();
  const parentId = useFloatingParentNodeId();

  const {
    interactions: interactionsProp,
    visible: visibleProp,
    onVisibleChange: onVisibleChangeProp,
    ...restPopoverProps
  } = popoverPropsProp ?? {};
  const { listNavigation: listNavigationPropsProp, ...restInteractionsProps } =
    interactionsProp ?? {};

  const listNavigationProps = useListNavigationProps(listNavigationPropsProp);

  const [visible, setVisible] = useControlledState(
    false,
    visibleProp,
    onVisibleChangeProp,
  );

  const [hasFocusedNodeInSubmenu, setHasFocusedNodeInSubmenu] =
    React.useState(false);

  const isHoverEnabled = !hasFocusedNodeInSubmenu && !!parent;

  const popoverProps = {
    nodeId,
    visible,
    onVisibleChange: (open) => (open ? setVisible(true) : close()),
    interactions: {
      hover: {
        enabled: isHoverEnabled,
      },
      listNavigation: listNavigationProps,
      ...restInteractionsProps,
    },
    // TODO: Confirm what defaults to set and see which components need to override them
    ...restPopoverProps,
  } satisfies Parameters<typeof usePopover>[0];

  const popover = usePopover(popoverProps);

  React.useEffect(() => {
    if (positionReference !== undefined) {
      popover.refs.setPositionReference(positionReference);
    }
  }, [popover.refs, positionReference]);

  const menuRef = React.useRef<HTMLElement>(null);
  const refs = useMergedRefs(menuRef, ref, popover.refs.setFloating);

  const triggerRef = React.useRef<HTMLElement>(null);
  const close = React.useCallback(() => {
    setVisible(false);
    triggerRef.current?.focus({ preventScroll: true });
  }, [setVisible]);

  const getFocusableNodes = React.useCallback(() => {
    const focusableItems = getFocusableElements(menuRef.current);
    // Filter out focusable elements that are inside each menu item, e.g. checkbox, anchor
    return focusableItems.filter(
      (i) => !focusableItems.some((p) => p.contains(i.parentElement)),
    ) as HTMLElement[];
  }, []);

  React.useEffect(() => {
    const newFocusableNodes = getFocusableNodes();
    if (
      listNavigationProps?.listRef != null &&
      listNavigationProps.listRef.current !== newFocusableNodes
    ) {
      listNavigationProps.listRef.current = newFocusableNodes;
    }

    // If the menu is not open or there are no focusable nodes, nothing to focus
    if (newFocusableNodes.length === 0 || !popover.open) {
      return;
    }

    // Handle focus, but only when no other item is already focused
    if (
      listNavigationProps?.activeIndex == null ||
      listNavigationProps.activeIndex < 0
    ) {
      const selectedIndex = newFocusableNodes.findIndex(
        (el) => el.getAttribute('aria-selected') === 'true',
      );

      // If an item is selected, focus it
      if (selectedIndex >= 0) {
        listNavigationProps?.onNavigate?.(selectedIndex);
      }
      // Else, focus the first item
      // else {
      //   listNavigationProps?.onNavigate?.(0);
      // }
    }
  }, [getFocusableNodes, listNavigationProps, popover.open]);

  useSyncExternalStore(
    React.useCallback(() => {
      const navigateToItemFunctions = Array.from(
        { length: listNavigationProps.listRef.current.length },
        (_, index) => {
          return () => {
            console.log('navigateToItemFunctions', index);
            listNavigationProps.onNavigate?.(index);
          };
        },
      );

      listNavigationProps.listRef.current.forEach((el, index) => {
        el?.addEventListener('hover', navigateToItemFunctions[index]);
      });

      return () => {
        listNavigationProps.listRef.current.forEach((el, index) => {
          el?.removeEventListener('hover', navigateToItemFunctions[index]);
        });
      };
    }, [listNavigationProps]),
    () => undefined,
    () => undefined,
  );

  useSyncExternalStore(
    React.useCallback(() => {
      const closeUnrelatedMenus = (event: TreeEvent) => {
        if (
          // When a node "X" is focused, close "X"'s siblings' submenus
          // i.e. only one submenu in each menu can be open at a time
          (parentId === event.parentId && nodeId !== event.nodeId) ||
          // Consider a node "X" with its submenu "Y".
          // Focusing "X" should close all submenus of "Y".
          parentId === event.nodeId
        ) {
          setVisible(false);
          setHasFocusedNodeInSubmenu(false);
        }
      };

      tree?.events.on('onNodeFocused', closeUnrelatedMenus);

      return () => {
        tree?.events.off('onNodeFocused', closeUnrelatedMenus);
      };
    }, [nodeId, parentId, tree?.events, setVisible]),
    () => undefined,
    () => undefined,
  );

  const menuContent = React.useMemo(() => {
    // Clone each child in children and add onFocus
    return React.Children.map(children, (child) => {
      return cloneElementWithRef(
        child,
        (child) =>
          ({
            onFocus: (e) => {
              child.props.onFocus?.(e);
              console.log('onFocus', e);

              // Set hasFocusedNodeInSubmenu in a microtask to ensure the submenu stays open reliably.
              // E.g. Even when hovering into it rapidly.
              queueMicrotask(() => {
                setHasFocusedNodeInSubmenu(true);
              });

              tree?.events.emit('onNodeFocused', {
                nodeId: nodeId,
                parentId: parentId,
              });
            },
            // onBlur: (e) => {
            //   child.props.onBlur?.(e);
            //   console.log('onBlur', e);
            //   parent?.setHasFocusedNodeInSubmenu(false);
            // },
          }) satisfies React.HTMLProps<HTMLElement>,
      );
    });
  }, [children, nodeId, parentId, tree?.events]);

  const reference = cloneElementWithRef(trigger, (triggerChild) => ({
    ...popover.getReferenceProps(triggerChild.props),
    'aria-expanded': popover.open,
    ref: mergeRefs(triggerRef, popover.refs.setReference),
  }));

  const floating = popover.open && (
    <Portal portal={portal}>
      <Box
        as='div'
        className={cx('iui-menu', className)}
        ref={refs}
        {...popover.getFloatingProps({
          role: 'menu',
          ...rest,
        })}
      >
        {menuContent}
      </Box>
    </Portal>
  );

  return (
    <MenuContext.Provider
      value={{
        hasFocusedNodeInSubmenu,
        setHasFocusedNodeInSubmenu,
      }}
    >
      <p>{`${hasFocusedNodeInSubmenu},${isHoverEnabled},${nodeId},${parentId}`}</p>
      {reference}
      {nodeId != null ? (
        <FloatingNode id={nodeId}>{floating}</FloatingNode>
      ) : (
        floating
      )}
    </MenuContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', MenuProps>;

// ----------------------------------------------------------------------------

/**
 *
 */
const MenuContext = React.createContext<
  | {
      hasFocusedNodeInSubmenu: boolean;
      setHasFocusedNodeInSubmenu: (value: boolean) => void;
    }
  | undefined
>(undefined);

export type TreeEvent = {
  nodeId: string;
  parentId: string | null;
};
