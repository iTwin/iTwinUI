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
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  type ReferenceType,
  type UseHoverProps,
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
};

/**
 * @private
 *
 * Can be used for select or dropdown components.
 *
 * This handles lots of the setup for a menu component:
 * - the portaling: use the optional `portal` prop for more customization
 * - conditional rendering based on the popover's open state
 * - spreading the popover props (`getFloatingProps`, `getReferenceProps`, `getItemProps`)
 * - setting the refs: use the optional`positionReference` prop to set the position reference
 * - keyboard navigation: use the `interactions.listNavigation` prop for more customization
 * - registering a `FloatingNode` in the `FloatingTree` if an ancestral `FloatingTree` is found
 * - focus management: if *not* in a `FloatingTree`, focus moves to the trigger when the menu is closed. If in a `FloatingTree`, focus does not move back to the trigger since `MenuItem`s handle the focus.
 * - setting `aria-expanded` accordingly depending on the menu open state
 *
 * All `Menu` popover interactions are identical to `usePopover`'s interactions. Exception:
 * - `hover`: When the `Menu` is within a `FloatingTree`, if a submenu has focus, the hover interaction is automatically
 * disabled. This helps to keep the last hovered/focused submenu open even upon hovering out.
 * - `click`: The default behavior is slightly modified to overcome a FloatingUI behavior where two clicks are needed
 * to close the Menu for the first time (@see: [floating-ui/floating-ui#1893 (comment)](https://github.com/floating-ui/floating-ui/issues/1893#issuecomment-1250161220).
 * With that modification, only one click is sufficient to close the Menu.
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

  const listNavigationProps = useListNavigationProps(listNavigationPropsProp);

  const [visible, setVisible] = useControlledState(
    false,
    visibleProp,
    onVisibleChangeProp,
  );

  const [hasFocusedNodeInSubmenu, setHasFocusedNodeInSubmenu] =
    React.useState(false);

  const popover = usePopover({
    nodeId,
    visible,
    onVisibleChange: (open) => (open ? setVisible(true) : close()),
    interactions: {
      hover: {
        // Hover interaction is allowed if all conditions are met:
        // - Hover interaction is enabled
        // - Submenu does not have focus
        // TODO: Should being inside a FloatingTree also be a requirement?
        enabled: !!hoverProp && !hasFocusedNodeInSubmenu,
        ...(hoverProp as UseHoverProps<ReferenceType>),
      },
      listNavigation: listNavigationProps,
      ...restInteractionsProps,
    },
    // TODO: Confirm what defaults to set and see which components need to override them
    ...restPopoverProps,
  });

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

    // If not in a FloatingTree, focus the trigger when the menu is closed
    // If in a `FloatingTree`, focus should not move back to the trigger since `MenuItem`s handle the focus.
    if (tree == null) {
      triggerRef.current?.focus({ preventScroll: true });
    }
  }, [setVisible, tree]);

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
  }, [getFocusableNodes, listNavigationProps, popover.open]);

  useSyncExternalStore(
    React.useCallback(() => {
      const navigateToItemFunctions = Array.from(
        { length: listNavigationProps.listRef.current.length },
        (_, index) => {
          return () => {
            listNavigationProps.onNavigate?.(index);
          };
        },
      );

      listNavigationProps.listRef.current.forEach((el, index) => {
        el?.addEventListener('mouseenter', navigateToItemFunctions[index]);
      });

      return () => {
        listNavigationProps.listRef.current.forEach((el, index) => {
          el?.removeEventListener('mouseenter', navigateToItemFunctions[index]);
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
    return React.Children.map(children, (child) => {
      return cloneElementWithRef(
        child,
        (child) =>
          ({
            onFocus: (e) => {
              child.props.onFocus?.(e);

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
          }) satisfies React.HTMLProps<HTMLElement>,
      );
    });
  }, [children, nodeId, parentId, tree?.events]);

  const reference = cloneElementWithRef(
    trigger,
    (triggerChild) =>
      ({
        ...popover.getReferenceProps({
          ...popover.getItemProps({
            ...triggerChild.props,
            'aria-expanded': popover.open,
            ref: mergeRefs(triggerRef, popover.refs.setReference),
            onClick: (e) => {
              triggerChild.props.onClick?.(e);
              // If the click interaction is disabled, do nothing
              if (!popover.interactionsEnabledStates.click) {
                return;
              }

              // This is needed because FloatingUI's useClick does not close the floating content on the first click.
              // @see: https://redirect.github.com/floating-ui/floating-ui/issues/1893#issuecomment-1250161220
              if (visible) {
                close();
              }
            },
          }),
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
        {menuContent}
      </Box>
    </Portal>
  );

  return (
    <>
      {reference}
      {tree != null ? (
        <FloatingNode id={nodeId}>{floating}</FloatingNode>
      ) : (
        floating
      )}
    </>
  );
}) as PolymorphicForwardRefComponent<'div', MenuProps>;

// ----------------------------------------------------------------------------

export type TreeEvent = {
  nodeId: string;
  parentId: string | null;
};
