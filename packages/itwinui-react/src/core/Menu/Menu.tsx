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
  Portal,
} from '../../utils/index.js';
import type {
  PolymorphicForwardRefComponent,
  PortalProps,
} from '../../utils/index.js';
// import { MenuItemContext } from './MenuItem.js';
import { usePopover } from '../Popover/Popover.js';

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
  menuProps: ReturnType<typeof getMenuProps>;
};

/**
 * Basic menu component. Can be used for select or dropdown components.
 */
const MenuComponent = React.forwardRef((props, ref) => {
  const { setFocus = true, className, menuProps, ...rest } = props;

  const [focusedIndex, setFocusedIndex] = React.useState<number | null>();
  const menuRef = React.useRef<HTMLElement>(null);
  const refs = useMergedRefs(menuRef, ref, menuProps.popover.refs.setFloating);

  // const menuItemContext = React.useContext(MenuItemContext);

  const getFocusableNodes = React.useCallback(() => {
    const focusableItems = getFocusableElements(menuRef.current);
    // Filter out focusable elements that are inside each menu item, e.g. checkbox, anchor
    return focusableItems.filter(
      (i) => !focusableItems.some((p) => p.contains(i.parentElement)),
    ) as HTMLElement[];
  }, []);

  React.useEffect(() => {
    const focusableNodes = getFocusableNodes();

    console.log('focusableNodes', focusableNodes);

    if (menuProps.focusableNodes.current !== focusableNodes) {
      menuProps.focusableNodes.current = focusableNodes;
    }
  }, [menuProps.focusableNodes.current, getFocusableNodes]);

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
    console.log('onKeyDown', event);

    // if (event.altKey) {
    //   return;
    // }

    // const items = getFocusableNodes();
    // if (!items?.length) {
    //   return;
    // }

    // const currentIndex = focusedIndex ?? 0;
    // switch (event.key) {
    //   case 'ArrowDown': {
    //     setFocusedIndex(Math.min(currentIndex + 1, items.length - 1));
    //     event.preventDefault();
    //     event.stopPropagation();
    //     break;
    //   }
    //   case 'ArrowUp': {
    //     setFocusedIndex(Math.max(currentIndex - 1, 0));
    //     event.preventDefault();
    //     event.stopPropagation();
    //     break;
    //   }
    //   default:
    //     break;
    // }
  };

  return (
    menuProps.popover.open && (
      <Portal portal={menuProps.portal}>
        <Box
          as='div'
          className={cx('iui-menu', className)}
          // role='menu'
          ref={refs}
          {...menuProps.popover.getFloatingProps({
            role: 'menu',
            ...rest,
            onKeyDown: mergeEventHandlers(props.onKeyDown, onKeyDown),
          })}
          // {...rest}
          // onKeyDown={mergeEventHandlers(props.onKeyDown, onKeyDown)}
          // onKeyDown={mergeEventHandlers(onKeyDown)}
        />
      </Portal>
    )
  );
}) as PolymorphicForwardRefComponent<'div', MenuProps>;

// ----------------------------------------------------------------------------

const getMenuProps = ({
  popoverProps,
  ...rest
}: {
  popoverProps: Parameters<typeof usePopover>[0];
  portal: PortalProps['portal'];
}) => {
  const [currentFocusedNodeIndex, setCurrentFocusedNodeIndex] = React.useState<
    number | null
  >(null);
  const focusableNodes = React.useRef<Array<HTMLElement | null>>([]);

  return {
    popover: usePopover({
      interactions: {
        listNavigation: {
          activeIndex: currentFocusedNodeIndex,
          onNavigate: setCurrentFocusedNodeIndex,
          listRef: focusableNodes,
          focusItemOnOpen: true,
          ...popoverProps.interactions?.listNavigation,
        },
        ...popoverProps.interactions,
      },
      ...popoverProps,
    }),
    ...rest,
    currentFocusedNodeIndex,
    setCurrentFocusedNodeIndex,
    focusableNodes,
  };
};

// ----------------------------------------------------------------------------

export const Menu = Object.assign(MenuComponent, {
  getMenuProps,
});
