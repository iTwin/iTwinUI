/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  useMergedRefs,
  Portal,
  cloneElementWithRef,
  useControlledState,
  mergeRefs,
  mergeEventHandlers,
  SvgChevronLeft,
} from '../../utils/index.js';
import type {
  PolymorphicForwardRefComponent,
  PortalProps,
} from '../../utils/index.js';
// import { Menu } from '../Menu/Menu.js';
import { usePopover } from '../Popover/Popover.js';
import { Surface } from '../Surface/Surface.js';
import { IconButton } from '../Buttons/IconButton.js';
// import { Button } from '../Buttons/Button.js';
import { Flex } from '../Flex/Flex.js';
import { Menu } from '../Menu/Menu.js';
import { flushSync } from 'react-dom';

export type DropdownMenuProps = {
  /**
   * List of menu items. Recommended to use MenuItem component.
   * You can pass function that takes argument `close` that closes the dropdown menu, or a list of MenuItems.
   */
  menuItems:
    | ((close: () => void) => JSX.Element[])
    | JSX.Element[]
    | JSX.Element;
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
   * Whether the DropdownMenu is layered.
   *
   * @default false
   */
  layered?: boolean;
} & Pick<
  Parameters<typeof usePopover>[0],
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
    onVisibleChange,
    portal = true,
    layered = false,
    ...rest
  } = props;

  const [visible, setVisible] = useControlledState(
    false,
    visibleProp,
    onVisibleChange,
  );

  const triggerRef = React.useRef<HTMLElement>(null);

  const close = React.useCallback(() => {
    // console.log('close');
    setVisible(false);
    setCurrentMenuHierarchyItem(undefined);
    triggerRef.current?.focus({ preventScroll: true });
  }, [setVisible]);

  const menuContent = React.useMemo(() => {
    if (typeof menuItems === 'function') {
      // console.log(menuItems(close));

      // menuItems(close).forEach((item) => {
      //   // console.log(item.type.displayName);

      //   console.log(item);
      // });

      return menuItems(close);
    }
    return menuItems;
  }, [menuItems, close]);

  const menuHierarchy = React.useMemo(() => {
    const hierarchyItems: Array<MenuHierarchyItem> = [];

    const populateMenuHierarchy = (
      menuItems: JSX.Element[],
      parent?: number,
    ) => {
      menuItems.forEach((item) => {
        hierarchyItems.push({
          item: item,
          parent: parent,
        } satisfies MenuHierarchyItem);

        if (item.props.subMenuItems) {
          populateMenuHierarchy(
            item.props.subMenuItems,
            hierarchyItems.length - 1,
          );
        }
      });

      return hierarchyItems;
    };

    // menuContent === JSX.Element[]
    if (Array.isArray(menuContent)) {
      const result = populateMenuHierarchy(menuContent);
      // console.log(result);
      return result;
    }

    // menuContent === JSX.Element
    return [
      {
        item: menuContent as JSX.Element,
        parent: undefined,
      },
    ];
  }, [menuContent]);

  const [currentMenuHierarchyItem, setCurrentMenuHierarchyItem] =
    React.useState<number | undefined>(undefined);

  const [focusOnMenu, setFocusOnMenu] = React.useState(true);

  const popover = usePopover({
    visible,
    onVisibleChange: (open) => {
      // Always start from the beginning of the menu hierarchy
      if (open) {
        setCurrentMenuHierarchyItem(undefined);
      }

      open ? setVisible(true) : close();
    },
    placement,
    matchWidth,
  });

  const popoverRef = useMergedRefs(forwardedRef, popover.refs.setFloating);

  const backButtonOnClick = React.useCallback(() => {
    if (currentMenuHierarchyItem == undefined) {
      return undefined;
    }

    flushSync(() => {
      setCurrentMenuHierarchyItem((prev) => {
        if (prev == undefined) {
          return undefined;
        }
        return menuHierarchy[prev].parent;
      });
    });

    // if (menuHierarchy[currentMenuHierarchyItem].parent != null) {
    itemRefs.current[currentMenuHierarchyItem]?.focus();
    // }
  }, [
    menuHierarchy,
    // itemRefs,
    currentMenuHierarchyItem,
  ]);

  const menuChildOnClick = React.useCallback(
    (index: number) => {
      // console.log('menuChildOnClick', index);
      if (popover.open) {
        setCurrentMenuHierarchyItem(index);

        // flush and reset state so we are ready to focus again next time
        flushSync(() => setFocusOnMenu(false));
        setFocusOnMenu(true);
      }
    },
    [
      popover.open,
      setCurrentMenuHierarchyItem,
      // menuHierarchy,
    ],
  );

  // React.useEffect(() => {
  //   console.log(
  //     'filteredMenuHierarchy',
  //     menuHierarchy.filter((item) => item.parent === currentMenuHierarchyItem),
  //   );
  // }, [currentMenuHierarchyItem, menuHierarchy]);

  const itemRefs = React.useRef<HTMLElement[]>([]);

  return (
    <>
      <DropdownMenuContext.Provider
        value={{
          layered: layered,
          menuChildOnClick,
          backButtonOnClick,
        }}
      >
        <p>{`${currentMenuHierarchyItem}`}</p>

        {cloneElementWithRef(children, (children) => ({
          ...popover.getReferenceProps(children.props),
          'aria-expanded': popover.open,
          ref: mergeRefs(triggerRef, popover.refs.setReference),
        }))}

        {popover.open && (
          <Portal portal={portal}>
            {
              <Surface
                as={Menu}
                setFocus={focusOnMenu}
                {...popover.getFloatingProps({
                  role,
                  ...rest,
                  onKeyDown: mergeEventHandlers(props.onKeyDown, (e) => {
                    console.log('onKeyDown HERE 123', e.key);
                    if (e.defaultPrevented) {
                      return;
                    }
                    if (e.key === 'Tab') {
                      close();
                    }

                    if (e.key === 'Escape') {
                      backButtonOnClick();

                      e.preventDefault();
                      e.stopPropagation();
                    }
                  }),
                })}
                ref={popoverRef}
              >
                {currentMenuHierarchyItem != null && (
                  <Surface.Header as={Flex}>
                    {/* <Button
                    styleType='borderless'
                    onClick={backButtonOnClick}
                    startIcon={<SvgChevronLeft />}
                    >
                    Back
                  </Button> */}
                    <IconButton
                      label='Back'
                      styleType='borderless'
                      data-iui-shift='left'
                      onClick={backButtonOnClick}
                    >
                      <SvgChevronLeft />
                    </IconButton>
                    {
                      menuHierarchy[currentMenuHierarchyItem]?.item?.props
                        ?.children
                    }
                  </Surface.Header>
                )}
                <Surface.Body>
                  {menuHierarchy
                    .map((item, index) => {
                      return {
                        ...item,
                        menuHierarchyIndex: index,
                      };
                    })
                    .filter((item) => item.parent === currentMenuHierarchyItem)
                    .map((item, index) => {
                      return React.cloneElement(item.item, {
                        ref: (el: HTMLElement) => {
                          itemRefs.current[item.menuHierarchyIndex] = el;
                        },
                        ['data-menu-child-index']: index,
                        ['data-menu-hierarchy-index']: item.menuHierarchyIndex,
                      });
                    })}
                  {/* {menuHierarchy
                    .filter((item) => item.parent === currentMenuHierarchyItem)
                    .map((item) => {
                      console.log('ITEM', item);
                      return React.cloneElement(item.item, {
                        onClick: () => {
                          console.log('Clicked');
                        },
                      });
                    })} */}
                </Surface.Body>
              </Surface>
            }
            {/* <Menu
              {...popover.getFloatingProps({
                role,
                ...rest,
                onKeyDown: mergeEventHandlers(props.onKeyDown, (e) => {
                  if (e.defaultPrevented) {
                    return;
                  }
                  if (e.key === 'Tab') {
                    close();
                  }
                }),
              })}
              ref={popoverRef}
            >
              {menuContent}
            </Menu> */}
          </Portal>
        )}
      </DropdownMenuContext.Provider>
    </>
  );
}) as PolymorphicForwardRefComponent<'div', DropdownMenuProps>;

// ----------------------------------------------------------------------------

export const DropdownMenuContext = React.createContext<{
  layered: DropdownMenuProps['layered'];
  menuChildOnClick: (index: number) => void;
  backButtonOnClick: () => void;
}>({
  layered: false,
  menuChildOnClick: () => {},
  backButtonOnClick: () => {},
});

type MenuHierarchyItem = {
  item: JSX.Element;
  parent: number | undefined;
};
