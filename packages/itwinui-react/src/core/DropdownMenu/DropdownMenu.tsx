/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Popover,
  useLatestRef,
  useMergedRefs,
  usePopover,
  Portal,
  cloneElementWithRef,
} from '../utils/index.js';
import type {
  PolymorphicForwardRefComponent,
  PortalProps,
} from '../utils/index.js';
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
} & Pick<
  React.ComponentProps<typeof Popover>,
  'visible' | 'onVisibleChange' | 'placement' | 'matchWidth'
> &
  React.ComponentPropsWithoutRef<'ul'> &
  Pick<PortalProps, 'portal'>;

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
    children,
    role = 'menu',
    visible: visibleProp,
    placement = 'bottom-start',
    matchWidth = false,
    onVisibleChange: onVisibleChange,
    portal = true,
    ...rest
  } = props;

  const [visible, setVisible] = React.useState(visibleProp);
  const onVisibleChangeRef = useLatestRef(onVisibleChange);
  const close = React.useCallback(() => {
    setVisible(false);
    onVisibleChangeRef.current?.(false);
  }, [onVisibleChangeRef]);

  const menuContent = React.useMemo(() => {
    if (typeof menuItems === 'function') {
      return menuItems(close);
    }
    return menuItems;
  }, [menuItems, close]);

  const popover = usePopover({
    visible: visibleProp ?? visible,
    onVisibleChange: onVisibleChange ?? setVisible,
    placement,
    matchWidth,
  });

  const popoverRef = useMergedRefs(forwardedRef, popover.refs.setFloating);

  return (
    <>
      {cloneElementWithRef(children, (children) => ({
        ...popover.getReferenceProps(children.props),
        ref: popover.refs.setReference,
      }))}
      {popover.open && (
        <Portal portal={portal}>
          <Menu
            {...popover.getFloatingProps({ role, ...rest })}
            ref={popoverRef}
          >
            {menuContent}
          </Menu>
        </Portal>
      )}
    </>
  );
}) as PolymorphicForwardRefComponent<'div', DropdownMenuProps>;

export default DropdownMenu;
