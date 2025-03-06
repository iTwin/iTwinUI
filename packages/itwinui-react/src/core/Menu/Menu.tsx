/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import {
  useMergedRefs,
  Box,
  Portal,
  useControlledState,
  cloneElementWithRef,
  mergeRefs,
  useSyncExternalStore,
  mergeEventHandlers,
  useFocusableElements,
} from '../../utils/index.js';
import type {
  PolymorphicForwardRefComponent,
  PortalProps,
} from '../../utils/index.js';
import { PopoverOpenContext, usePopover } from '../Popover/Popover.js';
import {
  FloatingNode,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  type UseHoverProps,
  useListNavigation,
  useInteractions,
  type UseListNavigationProps,
} from '@floating-ui/react';

type UsePopoverProps = Parameters<typeof usePopover>[0];

type MenuProps = {
  /**
   * Menu items. Recommended to use `MenuItem` components.
   *
   * If you have custom actionable items, they should have `tabIndex={-1}` for better keyboard navigation support
   * and selected item should have `aria-selected={true}`.
   */
  children: React.ReactNode;
  /**
   * The trigger that opens the menu.
   */
  trigger: React.ReactNode;
  /**
   * You can use this optional prop when the position reference is not the trigger.
   * (Equivalent to using FloatingUI's `floating.refs.setPositionReference`)
   */
  positionReference?: Parameters<
    ReturnType<typeof usePopover>['refs']['setPositionReference']
  >[0];
  /**
   * Use this prop to override the default props passed to `usePopover` and `useListNavigation`.
   */
  popoverProps?: Omit<UsePopoverProps, 'interactions'> & {
    interactions?: UsePopoverProps['interactions'] & {
      listNavigation?: Partial<UseListNavigationProps>;
    };
  };
  /**
   * If not passed, uses the `portal` from its parent `Menu`.
   * @see {@link PortalProps.portal} for docs on the prop.
   */
  portal?: PortalProps['portal'];
};

/**
 * @private
 *
 * Used for dropdown components. E.g. `DropdownMenu`, `SplitButton`.
 *
 * What needs to be handled **manually**:
 * - Menu items need to spread `MenuContext.popover.getItemProps()`.
 * - Menu items need to focus itself on hover.
 *
 * What is handled automatically:
 * - the portaling: use the optional `portal` prop for more customization
 * - conditional rendering based on the popover's open state
 * - spreading the popover props `getFloatingProps` and `getReferenceProps`.
 *   - As mentioned above, `getItemProps` need to be spread **manually** in the menu item.
 * - setting the refs: use the optional`positionReference` prop to set the position reference
 * - keyboard navigation: use the `interactions.listNavigation` prop for more customization
 * - registering a `FloatingNode` in the `FloatingTree` if an ancestral `FloatingTree` is found
 * - focus management:
 *   - focuses items on hover.
 *   - if *not* in a `FloatingTree`, focus moves to the trigger when the menu is closed.
 *     If in a `FloatingTree`, focus does not move back to the trigger since menu items handle the focus.
 * - setting `aria-expanded` accordingly depending on the menu open state
 *
 * All `Menu` popover interactions are identical to `usePopover`'s interactions. Exception:
 * - `hover`: When the `Menu` is within a `FloatingTree`, if a submenu has focus, the hover interaction is automatically
 * disabled. This helps to keep the last hovered/focused submenu open even upon hovering out.
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
    portal: portalProp,
    popoverProps: popoverPropsProp,
    children,
    ...rest
  } = props;

  const menuPortalContext = React.useContext(MenuPortalContext);
  const portal = portalProp ?? menuPortalContext;

  const tree = useFloatingTree();
  const nodeId = useFloatingNodeId();
  const parentId = useFloatingParentNodeId();

  const {
    interactions: interactionsProp,
    visible: visibleProp,
    onVisibleChange: onVisibleChangeProp,
    ...restPopoverProps
  } = popoverPropsProp ?? {};

  const {
    listNavigation: listNavigationPropsProp,
    hover: hoverProp,
    ...restInteractionsProps
  } = interactionsProp ?? {};

  const [visible, setVisible] = useControlledState(
    false,
    visibleProp,
    onVisibleChangeProp,
  );

  const [hasFocusedNodeInSubmenu, setHasFocusedNodeInSubmenu] =
    React.useState(false);

  const [menuElement, setMenuElement] = React.useState<HTMLElement | null>(
    null,
  );

  const { focusableElementsRef, focusableElements } = useFocusableElements(
    menuElement,
    {
      // Filter out focusable elements that are inside each menu item, e.g. checkbox, anchor
      filter: (allElements) =>
        allElements.filter(
          (i) => !allElements?.some((p) => p.contains(i.parentElement)),
        ),
    },
  );

  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const popover = usePopover({
    nodeId,
    visible,
    onVisibleChange: (open) => (open ? setVisible(true) : close()),
    interactions: {
      hover:
        tree == null
          ? hoverProp
          : {
              // If in a FloatingTree, the hover interaction is automatically disabled if a submenu has focus.
              enabled: !!hoverProp && !hasFocusedNodeInSubmenu,
              ...(hoverProp as UseHoverProps),
            },
      ...restInteractionsProps,
    },
    ...restPopoverProps,
    middleware: {
      size: { maxHeight: 'var(--iui-menu-max-height)' },
      ...restPopoverProps.middleware,
    },
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [
      useListNavigation(popover.context, {
        activeIndex,
        // Items should focus themselves on hover since FloatingUI's focusItemOnHover is not working for us.
        focusItemOnHover: false,
        listRef: focusableElementsRef,
        onNavigate: setActiveIndex,
        ...listNavigationPropsProp,
      }),
    ],
  );

  React.useEffect(() => {
    if (positionReference !== undefined) {
      popover.refs.setPositionReference(positionReference);
    }
  }, [popover.refs, positionReference]);

  const refs = useMergedRefs(setMenuElement, ref, popover.refs.setFloating);

  const triggerRef = React.useRef<HTMLElement>(null);
  const close = React.useCallback(() => {
    setVisible(false);

    // Focus back the trigger when not in a FloatingTree submenu
    // Since focusing the trigger when in a submenu causes abrupt focus jumps when moving between siblings with submenus
    if (parentId == null) {
      triggerRef.current?.focus({ preventScroll: true });
    }
  }, [parentId, setVisible]);

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

  const popoverGetItemProps: PopoverGetItemProps = ({
    focusableItemIndex,
    userProps,
  }) => {
    return getItemProps({
      ...userProps,
      // Roving tabIndex
      tabIndex:
        activeIndex != null &&
        activeIndex >= 0 &&
        focusableItemIndex != null &&
        focusableItemIndex >= 0 &&
        activeIndex === focusableItemIndex
          ? 0
          : -1,
      onFocus: mergeEventHandlers(userProps?.onFocus, () => {
        // Set hasFocusedNodeInSubmenu in a microtask to ensure the submenu stays open reliably.
        // E.g. Even when hovering into it rapidly.
        queueMicrotask(() => {
          setHasFocusedNodeInSubmenu(true);
        });
        tree?.events.emit('onNodeFocused', {
          nodeId: nodeId,
          parentId: parentId,
        });
      }),

      // useListNavigation sets focusItemOnHover to false, since it doesn't work for us.
      // Thus, we need to manually emulate the "focus on hover" behavior.
      onMouseEnter: mergeEventHandlers(userProps?.onMouseEnter, (event) => {
        // Updating the activeIndex will result in useListNavigation focusing the item.
        if (focusableItemIndex != null && focusableItemIndex >= 0) {
          setActiveIndex(focusableItemIndex);
        }

        // However, useListNavigation only focuses the item when the activeIndex changes.
        // So, if we re-hover the parent MenuItem of an open submenu, the activeIndex won't change,
        // and thus the hovered MenuItem won't be focused.
        // As a result, we need to explicitly focus the item manually.
        if (event.target === event.currentTarget) {
          event.currentTarget.focus();
        }
      }),
    });
  };

  const reference = cloneElementWithRef(trigger, (triggerChild) =>
    getReferenceProps(
      popover.getReferenceProps({
        ...triggerChild.props,
        'aria-expanded': popover.open,
        ref: mergeRefs(triggerRef, popover.refs.setReference),
      }),
    ),
  );

  const floating = popover.open && (
    <Portal portal={portal}>
      <Box
        as='div'
        className={cx('iui-menu', className)}
        ref={refs}
        {...getFloatingProps(
          popover.getFloatingProps({
            role: 'menu',
            ...rest,
          }),
        )}
      >
        {children}
      </Box>
    </Portal>
  );

  return (
    <>
      <MenuContext.Provider value={{ popoverGetItemProps, focusableElements }}>
        <PopoverOpenContext.Provider value={popover.open}>
          {reference}
        </PopoverOpenContext.Provider>
        {tree != null ? (
          <FloatingNode id={nodeId}>{floating}</FloatingNode>
        ) : (
          floating
        )}
      </MenuContext.Provider>
    </>
  );
}) as PolymorphicForwardRefComponent<'div', MenuProps>;

// ----------------------------------------------------------------------------

export type TreeEvent = {
  nodeId: string;
  parentId: string | null;
};

type PopoverGetItemProps = ({
  focusableItemIndex,
  userProps,
}: {
  /**
   * Index of this item out of all the focusable items in the parent `Menu`
   */
  focusableItemIndex: number | undefined;
  userProps?: Parameters<
    NonNullable<ReturnType<typeof useInteractions>['getItemProps']>
  >[0];
}) => ReturnType<ReturnType<typeof useInteractions>['getItemProps']>;

// ----------------------------------------------------------------------------

export const MenuContext = React.createContext<
  | {
      popoverGetItemProps: PopoverGetItemProps;
      focusableElements: HTMLElement[];
    }
  | undefined
>(undefined);

export const MenuPortalContext = React.createContext<
  PortalProps['portal'] | undefined
>(undefined);
