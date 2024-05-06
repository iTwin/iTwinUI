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
} from '../../utils/index.js';
import type {
  PolymorphicForwardRefComponent,
  PortalProps,
} from '../../utils/index.js';
import { usePopover } from '../Popover/Popover.js';
import type { UseListNavigationProps } from '@floating-ui/react';

type MenuProps = {
  /**
   * Menu items. Recommended to use `MenuItem` components.
   *
   * If you have custom actionable items, they should have `tabIndex={-1}` for better keyboard navigation support
   * and selected item should have `aria-selected={true}`.
   */
  children: React.ReactNode;
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
  const { className, ...rest } = props;

  const menuContext = React.useContext(MenuContext);

  const menuRef = React.useRef<HTMLElement>(null);
  const refs = useMergedRefs(
    menuRef,
    ref,
    menuContext?.popover.refs.setFloating,
  );

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
      menuContext?.listNavigationProps?.listRef != null &&
      menuContext.listNavigationProps.listRef.current !== newFocusableNodes
    ) {
      menuContext.listNavigationProps.listRef.current = newFocusableNodes;
    }

    // Focus the selected item, but only when no other item is focused
    if (
      menuContext?.listNavigationProps?.activeIndex == null ||
      menuContext.listNavigationProps.activeIndex < 0
    ) {
      const selectedIndex = newFocusableNodes.findIndex(
        (el) => el.getAttribute('aria-selected') === 'true',
      );

      if (selectedIndex >= 0) {
        menuContext?.listNavigationProps?.onNavigate?.(selectedIndex);
      }
    }
  }, [menuContext, getFocusableNodes]);

  return (
    menuContext?.popover.open && (
      <Portal portal={menuContext.portal}>
        <Box
          as='div'
          className={cx('iui-menu', className)}
          ref={refs}
          {...menuContext.popover.getFloatingProps({
            role: 'menu',
            ...rest,
          })}
        />
      </Portal>
    )
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
