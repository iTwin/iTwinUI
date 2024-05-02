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

  const menuContext = React.useContext(MenuContext);

  const [focusedIndex, setFocusedIndex] = React.useState<number | null>();
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

  // TODO: Try to remove this useEffect
  React.useEffect(() => {
    const newFocusableNodes = getFocusableNodes();

    if (
      menuContext?.listNavigationProps?.listRef != null &&
      menuContext.listNavigationProps.listRef.current !== newFocusableNodes
    ) {
      menuContext.listNavigationProps.listRef.current = newFocusableNodes;
    }
  }, [menuContext, getFocusableNodes]);

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
          {...rest}
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

/**
 * @private
 * Helper hook to generate the necessary props for the listNavigation interaction in `usePopover`.
 *
 * This automatically takes care of providing `listRef` and `activeIndex`.
 * It also updates the `activeIndex` when the user navigates through the list using the `listNavigation` interaction.
 *
 * @param props Will be merged with the generated props.
 * @returns The props to spread on the `usePopover.interactions.listNavigation`.
 */
export const useListNavigationProps = (
  props?: Partial<Omit<UseListNavigationProps, 'activeIndex' | 'listRef'>>,
): UseListNavigationProps => {
  const [currentFocusedNodeIndex, setCurrentFocusedNodeIndex] = React.useState<
    number | null
  >(null);
  const focusableNodes = React.useRef<Array<HTMLElement | null>>([]);

  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    activeIndex: activeIndexProp,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listRef: listRefProp,
    onNavigate: onNavigateProp,
    ...rest
  } = (props ?? {}) as UseListNavigationProps;

  return {
    activeIndex: currentFocusedNodeIndex,
    onNavigate: (index) => {
      setCurrentFocusedNodeIndex(index);
      onNavigateProp?.(index);
    },
    listRef: focusableNodes,
    ...rest,
  };
};
