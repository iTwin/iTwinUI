/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Popover, mergeRefs, useLatestRef } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { Menu } from '../Menu/index.js';

export type DropdownMenuProps = {
  /**
   * List of menu items. Recommended to use MenuItem component.
   * You can pass function that takes argument `close` that closes the dropdown menu, or a list of MenuItems.
   */
  menuItems: (close: () => void) => JSX.Element[] | JSX.Element[] | JSX.Element;
  /**
   * ARIA role. Role of menu. For menu use 'menu', for select use 'listbox'.
   * @default 'menu'
   */
  role?: string;
  /**
   * Child element to wrap dropdown with.
   */
  children: React.ReactNode;
  /**
   * Whether the dropdown should match the width of the trigger.
   */
  matchWidth?: boolean;
} & Omit<React.ComponentProps<typeof Popover>, 'content'>;

/**
 * Dropdown menu component.
 * Built on top of the {@link Popover} component.
 * @example
 * const menuItems = (close: () => void) => [
 *   <MenuItem key={1} onClick={onClick(1, close)}>
 *     Item #1
 *   </MenuItem>,
 *   <MenuItem key={2} onClick={onClick(2, close)}>
 *     Item #2
 *   </MenuItem>,
 *   <MenuItem key={3} onClick={onClick(3, close)}>
 *     Item #3
 *   </MenuItem>,
 * ];
 * <DropdownMenu menuItems={menuItems}>
 *   <Button>Menu</Button>
 * </DropdownMenu>
 */
export const DropdownMenu = React.forwardRef((props, forwardedRef) => {
  const {
    menuItems,
    className,
    style,
    role = 'menu',
    visible: visibleProp,
    placement = 'bottom-start',
    onToggleVisible,
    id,
    children,
    matchWidth,
    ...rest
  } = props;

  const [visible, setVisible] = React.useState(visibleProp);
  const onToggleVisibleRef = useLatestRef(onToggleVisible);
  const close = React.useCallback(() => {
    setVisible(false);
    onToggleVisibleRef.current?.(false);
  }, [onToggleVisibleRef]);

  const menuContent = React.useMemo(() => {
    if (typeof menuItems === 'function') {
      return menuItems(close);
    }
    return menuItems;
  }, [menuItems, close]);

  const [triggerWidth, triggerRef] = useTriggerWidth();

  return (
    <Popover
      content={
        <Menu
          className={className}
          style={
            matchWidth
              ? {
                  minInlineSize: triggerWidth,
                  maxInlineSize: `min(${triggerWidth * 2}px, 90vw)`,
                  ...style,
                }
              : style
          }
          role={role}
          id={id}
        >
          {menuContent}
        </Menu>
      }
      visible={visibleProp ?? visible}
      onToggleVisible={onToggleVisible ?? setVisible}
      placement={placement}
      ref={forwardedRef}
      {...rest}
    >
      {!matchWidth
        ? children
        : React.isValidElement(children)
        ? React.cloneElement(children as JSX.Element, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref: mergeRefs((children as any).ref, triggerRef),
          })
        : null}
    </Popover>
  );
}) as PolymorphicForwardRefComponent<'div', DropdownMenuProps>;

export default DropdownMenu;

// ----------------------------------------------------------------------------

/** Returns a callback ref and a state variable that contains the width. */
const useTriggerWidth = () => {
  const [width, setWidth] = React.useState(0);
  const triggerRef = React.useCallback((element: HTMLElement | null) => {
    if (element) {
      setWidth(element.offsetWidth);
    }
  }, []);

  return [width, triggerRef] as const;
};
