/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { useMergedRefs, getFocusableElements, Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

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

  const getFocusableNodes = React.useCallback(() => {
    const focusableItems = getFocusableElements(menuRef.current);
    // Filter out focusable elements that are inside each menu item, e.g. checkbox, anchor
    return focusableItems.filter(
      (i) => !focusableItems.some((p) => p.contains(i.parentElement)),
    ) as HTMLElement[];
  }, []);

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

  return (
    <Box
      as='div'
      className={cx('iui-menu', className)}
      role='menu'
      ref={refs}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', MenuProps>;
