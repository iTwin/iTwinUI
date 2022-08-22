/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import {
  CommonProps,
  useTheme,
  useMergedRefs,
  getFocusableElements,
} from '../utils';
import '@itwin/itwinui-css/css/menu.css';

export type MenuProps = {
  /**
   * ARIA role. For menu use 'menu', for select use 'listbox'.
   * @default 'menu'
   */
  role?: string;
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
} & Omit<CommonProps, 'title'>;

/**
 * Basic menu component. Can be used for select or dropdown components.
 */
export const Menu = React.forwardRef<HTMLUListElement, MenuProps>(
  (props, ref) => {
    const {
      children,
      role = 'menu',
      setFocus = true,
      className,
      style,
      ...rest
    } = props;

    useTheme();

    const [focusedIndex, setFocusedIndex] = React.useState<number | null>();
    const menuRef = React.useRef<HTMLUListElement>(null);
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
        (items?.[focusedIndex] as HTMLLIElement)?.focus();
        return;
      }

      const selectedIndex = items.findIndex(
        (el) => el.getAttribute('aria-selected') === 'true',
      );
      if (setFocus) {
        setFocusedIndex(selectedIndex > -1 ? selectedIndex : 0);
      }
    }, [setFocus, focusedIndex, getFocusableNodes]);

    const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
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
      <ul
        className={cx('iui-menu', className)}
        style={style}
        role={role}
        onKeyDown={onKeyDown}
        ref={refs}
        {...rest}
      >
        {children}
      </ul>
    );
  },
);

export default Menu;
