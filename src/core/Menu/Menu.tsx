/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { CommonProps } from '../utils/props';
import { useTheme } from '../utils/hooks/useTheme';
import '@bentley/itwinui/css/menu.css';

export type MenuProps = {
  /**
   * ARIA role. For menu use 'menu', for select use 'listbox'.
   * @default 'menu'
   */
  role?: string;
  /**
   * Menu items. Recommended to use `MenuItem` components.
   */
  children: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * Basic menu component. Can be used for select or dropdown components.
 */
export const Menu = (props: MenuProps) => {
  const { children, role = 'menu', className, style, ...rest } = props;

  useTheme();

  const [focusedIndex, setFocusedIndex] = React.useState<number>();
  const menuRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const items = menuRef.current?.children;
    if (focusedIndex != null) {
      (items?.[focusedIndex] as HTMLLIElement)?.focus();
      return;
    }

    const index = React.Children.toArray(children).findIndex(
      (child: React.ReactElement) => child.props.isSelected,
    );
    setFocusedIndex(index > -1 ? index : 0);
  }, [children, focusedIndex]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const items = menuRef.current?.children;
    if (!items?.length) {
      return;
    }

    const currentIndex = focusedIndex ?? 0;
    switch (event.key) {
      case 'ArrowDown': {
        const newIndex = Math.min(currentIndex + 1, items.length - 1);
        setFocusedIndex(newIndex);
        event.preventDefault();
        break;
      }
      case 'ArrowUp': {
        const newIndex = Math.max(currentIndex - 1, 0);
        setFocusedIndex(newIndex);
        event.preventDefault();
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
      ref={menuRef}
      {...rest}
    >
      {children}
    </ul>
  );
};

export default Menu;
