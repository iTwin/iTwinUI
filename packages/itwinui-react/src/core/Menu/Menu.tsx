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
  useFocusableElementsRef,
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
  type ReferenceType,
  type UseHoverProps,
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
   * Use this prop to override the default props passed to `usePopover`.
   */
  popoverProps?: Omit<UsePopoverProps, 'interactions'> & {
    interactions?: Omit<
      NonNullable<UsePopoverProps['interactions']>,
      'listNavigation'
    > & {
      listNavigation?: Omit<
        NonNullable<
          NonNullable<UsePopoverProps['interactions']>['listNavigation']
        >,
        'listRef'
      > & {
        // Since Menu handles the required listElements prop, it only needs to accept the optional ones.
        listRef?: NonNullable<
          NonNullable<UsePopoverProps['interactions']>['listNavigation']
        >['listRef'];
      };
    };
  };
} & Pick<PortalProps, 'portal'>;

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
    portal = true,
    popoverProps: popoverPropsProp,
    children,
    ...rest
  } = props;

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

  const focusableElementsRef = useFocusableElementsRef(menuElement, {
    // Filter out focusable elements that are inside each menu item, e.g. checkbox, anchor
    filter: (allElements) =>
      allElements.filter(
        (i) => !allElements?.some((p) => p.contains(i.parentElement)),
      ),
  });

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
              ...(hoverProp as UseHoverProps<ReferenceType>),
            },
      listNavigation: {
        listRef: focusableElementsRef,
        ...listNavigationPropsProp,
      },
      ...restInteractionsProps,
    },
    ...restPopoverProps,
  });

  React.useEffect(() => {
    if (positionReference !== undefined) {
      popover.refs.setPositionReference(positionReference);
    }
  }, [popover.refs, positionReference]);

  const refs = useMergedRefs(setMenuElement, ref, popover.refs.setFloating);

  const triggerRef = React.useRef<HTMLElement>(null);
  const close = React.useCallback(() => {
    setVisible(false);

    // If not in a FloatingTree, focus the trigger when the menu is closed
    // If in a `FloatingTree`, focus should not move back to the trigger since `MenuItem`s handle the focus.
    if (tree == null) {
      triggerRef.current?.focus({ preventScroll: true });
    }
  }, [setVisible, tree]);

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

  const popoverGetItemProps: typeof popover.getItemProps = (userProps) => {
    return popover.getItemProps({
      ...userProps,
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
    });
  };

  const reference = cloneElementWithRef(
    trigger,
    (triggerChild) =>
      ({
        ...popover.getReferenceProps({
          ...triggerChild.props,
          'aria-expanded': popover.open,
          ref: mergeRefs(triggerRef, popover.refs.setReference),
        }),
      }) satisfies React.HTMLProps<HTMLElement>,
  );

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
        {children}
      </Box>
    </Portal>
  );

  return (
    <>
      <MenuContext.Provider value={{ popoverGetItemProps }}>
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

export const MenuContext = React.createContext<
  | {
      popoverGetItemProps: ReturnType<typeof usePopover>['getItemProps'];
    }
  | undefined
>(undefined);
