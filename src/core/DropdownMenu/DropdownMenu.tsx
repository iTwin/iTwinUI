/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import {
  useTheme,
  CommonProps,
  Popover,
  PopoverProps,
  PopoverInstance,
  mergeRefs,
} from '../utils';
import { Menu } from '../Menu';

export type DropdownMenuProps = {
  /**
   * List of menu items. Recommended to use MenuItem component.
   * You can pass function that takes argument `close` that closes the dropdown menu.
   */
  menuItems: (close: () => void) => JSX.Element[];
  /**
   * ARIA role. Role of menu. For menu use 'menu', for select use 'listbox'.
   * @default 'menu'
   */
  role?: string;
  /**
   * Child element to wrap dropdown with.
   */
  children: React.ReactNode;
} & PopoverProps &
  Omit<CommonProps, 'title'>;

/**
 * Dropdown menu component.
 * Uses the {@link Popover} component, which is a wrapper around [tippy.js](https://atomiks.github.io/tippyjs).
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
export const DropdownMenu = (props: DropdownMenuProps) => {
  const {
    menuItems,
    children,
    className,
    style,
    role = 'menu',
    visible,
    placement = 'bottom-start',
    onShow,
    onHide,
    trigger,
    id,
    ...rest
  } = props;

  const [isVisible, setIsVisible] = React.useState(visible ?? false);
  React.useEffect(() => {
    setIsVisible(visible ?? false);
  }, [visible]);

  const open = React.useCallback(() => setIsVisible(true), []);
  const close = React.useCallback(() => setIsVisible(false), []);

  const targetRef = React.useRef<HTMLElement>(null);

  const onShowHandler = React.useCallback(
    (instance: PopoverInstance) => {
      setIsVisible(true);
      onShow?.(instance);
    },
    [onShow],
  );

  const onHideHandler = React.useCallback(
    (instance: PopoverInstance) => {
      setIsVisible(false);
      targetRef.current?.focus();
      onHide?.(instance);
    },
    [onHide],
  );

  useTheme();

  return (
    <Popover
      content={
        <Menu className={className} style={style} role={role} id={id}>
          {React.useMemo(() => menuItems(close), [menuItems, close])}
        </Menu>
      }
      visible={trigger === undefined ? isVisible : undefined}
      onClickOutside={close}
      placement={placement}
      onShow={onShowHandler}
      onHide={onHideHandler}
      trigger={visible === undefined ? trigger : undefined}
      {...rest}
    >
      {React.cloneElement(children as JSX.Element, {
        ref: mergeRefs(
          targetRef,
          (props.children as React.FunctionComponentElement<HTMLElement>).ref,
        ),
        onClick: (args: unknown) => {
          trigger === undefined && (isVisible ? close() : open());
          (children as JSX.Element).props.onClick?.(args);
        },
      })}
    </Popover>
  );
};

export default DropdownMenu;
