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
import { FloatingNode, type UseListNavigationProps } from '@floating-ui/react';

type MenuProps = {
  /**
   * Menu items. Recommended to use `MenuItem` components.
   *
   * If you have custom actionable items, they should have `tabIndex={-1}` for better keyboard navigation support
   * and selected item should have `aria-selected={true}`.
   */
  children: React.ReactNode;

  trigger: React.ReactNode;
  portal?: PortalProps['portal'];
  popoverProps?: Parameters<typeof usePopover>[0];
  nodeId: string;
};

/**
 * Basic menu component. Can be used for select or dropdown components.
 *
 * This *must* be wrapped in a `MenuContext`.
 *
 * This handles the portaling, conditional rendering based on the popover's open state,
 * spreading the `popover.getFloatingProps`, and setting the ref to the floating element (all other refs need to be
 * handled by the uses of `Menu`).
 *
 * It can also handle keyboard/list navigation if `listNavigationProps` is passed in `MenuContext`.
 */
export const Menu = React.forwardRef((props, ref) => {
  const {
    className,
    trigger,
    portal = true,
    popoverProps: popoverPropsProp,
    nodeId,
    ...rest
  } = props;

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

  const popoverProps = {
    nodeId,
    visible,
    onVisibleChange: (open) => (open ? setVisible(true) : close()),
    interactions: {
      listNavigation: listNavigationProps,
      ...restInteractionsProps,
    },
    // TODO: Confirm what defaults to set and see which components need to override them
    ...restPopoverProps,
  } satisfies Parameters<typeof usePopover>[0];

  const popover = usePopover(popoverProps);

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
            listNavigationProps.onNavigate?.(index);
          };
        },
      );

      listNavigationProps.listRef.current.forEach((el, index) => {
        el?.addEventListener('focus', navigateToItemFunctions[index]);
      });

      return () => {
        listNavigationProps.listRef.current.forEach((el, index) => {
          el?.removeEventListener('focus', navigateToItemFunctions[index]);
        });
      };
    }, [listNavigationProps]),
    () => undefined,
    () => undefined,
  );

  return (
    <>
      {cloneElementWithRef(trigger, (triggerChild) => ({
        ...popover.getReferenceProps(triggerChild.props),
        'aria-expanded': popover.open,
        ref: mergeRefs(triggerRef, popover.refs.setReference),
      }))}
      <FloatingNode id={nodeId}>
        {popover.open && (
          <Portal portal={portal}>
            <Box
              as='div'
              className={cx('iui-menu', className)}
              ref={refs}
              {...popover.getFloatingProps({
                role: 'menu',
                ...rest,
              })}
            />
          </Portal>
        )}
      </FloatingNode>
    </>
  );
}) as PolymorphicForwardRefComponent<'div', MenuProps>;

// ----------------------------------------------------------------------------

/**
 * Must wrap all uses of `Menu` with this context.
 *
 * @private
 */
export const MenuContext = React.createContext<
  | {
      popover: ReturnType<typeof usePopover>;
      portal?: PortalProps['portal'];
      listNavigationProps?: UseListNavigationProps;
    }
  | undefined
>(undefined);
