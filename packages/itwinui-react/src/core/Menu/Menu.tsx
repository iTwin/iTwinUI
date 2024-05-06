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
  mergeEventHandlers,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { MenuItemContext } from './MenuItem.js';

type MenuProps = {
  /**
   * Menu items. Recommended to use `MenuItem` components.
   *
   * If you have custom actionable items, they should have `tabIndex={-1}` for better keyboard navigation support
   * and selected item should have `aria-selected={true}`.
   */
  children: React.ReactNode;
  /**
   * If true, the first selected or enabled menu item will be focused automatically.
   * @default true
   */
  setFocus?: boolean;
};

/**
 * Basic menu component. Can be used for select or dropdown components.
 */
export const Menu = React.forwardRef((props, ref) => {
  const { setFocus = true, className, ...rest } = props;

  const [focusedIndex, setFocusedIndex] = React.useState<number | null>();
  const menuRef = React.useRef<HTMLElement>(null);
  const refs = useMergedRefs(menuRef, ref);

  const menuItemContext = React.useContext(MenuItemContext);

  const getFocusableNodes = React.useCallback(() => {
    const focusableItems = getFocusableElements(menuRef.current);
    // Filter out focusable elements that are inside each menu item, e.g. checkbox, anchor
    return focusableItems.filter(
      (i) => !focusableItems.some((p) => p.contains(i.parentElement)),
    ) as HTMLElement[];
  }, []);

  React.useEffect(() => {
    const focusableNodes = getFocusableNodes();
    if (
      menuItemContext != null &&
      menuItemContext.focusableNodes.current !== focusableNodes
    ) {
      menuItemContext.focusableNodes.current = focusableNodes;
    }
  }, [getFocusableNodes, menuItemContext]);

  React.useEffect(() => {
    const items = getFocusableNodes();
    if (focusedIndex != null) {
      (items?.[focusedIndex] as HTMLElement)?.focus();
      return;
    }

    const selectedIndex = items.findIndex(
      (el) => el.getAttribute('aria-selected') === 'true',
    );
    if (setFocus) {
      setFocusedIndex(selectedIndex > -1 ? selectedIndex : 0);
    }
  }, [setFocus, focusedIndex, getFocusableNodes]);

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
    <Box
      as='div'
      className={cx('iui-menu', className)}
      role='menu'
      ref={refs}
      {...rest}
      onKeyDown={mergeEventHandlers(props.onKeyDown, onKeyDown)}
    />
  );
}) as PolymorphicForwardRefComponent<'div', MenuProps>;
