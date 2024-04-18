/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  SvgCaretRightSmall,
  Portal,
  useMergedRefs,
  useId,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { Menu } from './Menu.js';
import { ListItem } from '../List/ListItem.js';
import type { ListItemOwnProps } from '../List/ListItem.js';
import { usePopover } from '../Popover/Popover.js';
import {
  // FloatingFocusManager,
  FloatingNode,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
  useListNavigation,
} from '@floating-ui/react';

/**
 * Context used to provide menu item ref to sub-menu items.
 */
const MenuItemContext = React.createContext<{
  // ref: React.RefObject<HTMLElement> | undefined;
  // setIsNestedSubmenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  listItemsRef: React.MutableRefObject<(HTMLElement | null)[]>;
}>({
  setActiveIndex: () => {},
  listItemsRef: { current: [] },
});

export type MenuItemProps = {
  /**
   * Item is selected.
   */
  isSelected?: boolean;
  /**
   * Item is disabled.
   */
  disabled?: boolean;
  /**
   * Value of the item.
   */
  value?: unknown;
  /**
   * Callback function that handles click and keyboard submit actions.
   */
  onClick?: (value?: unknown) => void;
  /**
   * Modify height of the item.
   * Use 'large' when any of the sibling items have `sublabel`.
   *
   * Defaults to 'large' if `sublabel` provided, otherwise 'default'.
   */
  size?: 'default' | 'large';
  /**
   * Sub label shown below the main content of the item.
   */
  sublabel?: React.ReactNode;
  /**
   * SVG icon component shown on the left.
   */
  startIcon?: JSX.Element;
  /**
   * @deprecated Use startIcon.
   * SVG icon component shown on the left.
   */
  icon?: JSX.Element;
  /**
   * SVG icon component shown on the right.
   */
  endIcon?: JSX.Element;
  /**
   * @deprecated Use endIcon.
   * SVG icon component shown on the right.
   */
  badge?: JSX.Element;
  /**
   * ARIA role. For menu item use 'menuitem', for select item use 'option'.
   * @default 'menuitem'
   */
  role?: string;
  /**
   * Items to be shown in the submenu when hovered over the item.
   */
  subMenuItems?: JSX.Element[];
  /**
   * Content of the menu item.
   */
  children?: React.ReactNode;
} & Pick<ListItemOwnProps, 'focused'>;

/**
 * Basic menu item component. Should be used inside `Menu` component for each item.
 */
export const MenuItem = React.forwardRef((props, forwardedRef) => {
  const {
    children,
    isSelected,
    disabled,
    value,
    onClick,
    sublabel,
    size = !!sublabel ? 'large' : 'default',
    icon,
    startIcon = icon,
    badge,
    endIcon = badge,
    role = 'menuitem',
    subMenuItems = [],
    ...rest
  } = props;

  const parent = React.useContext(MenuItemContext);

  const menuItemRef = React.useRef<HTMLElement>(null);
  // const [focusOnSubmenu, setFocusOnSubmenu] = React.useState(false);
  const submenuId = useId();

  const [isSubmenuVisible, setIsSubmenuVisible] = React.useState(false);
  // const [rightArrowPressed, setRightArrowPressed] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const [hasMouseEntered, setHasMouseEntered] = React.useState(false);
  if (!isSubmenuVisible && hasMouseEntered) {
    setHasMouseEntered(false);
  }

  const nodeId = useFloatingNodeId();
  const tree = useFloatingTree();
  const parentId = useFloatingParentNodeId();

  // TODO: Try to find a better way to get the index.
  const parentTreeIndex = React.useMemo(
    () => {
      const allSiblingNodes = tree?.nodesRef.current.filter(
        (n) => n.parentId === parentId,
      );
      // if (children === 'Item 2_1') {
      //   console.log('allSiblingNodes', allSiblingNodes, tree?.nodesRef.current);
      // }
      return allSiblingNodes?.findIndex((n) => n.id === nodeId) ?? 0;
    },
    // TODO: Try to remove the eslint-disable
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodeId, parentId, tree?.nodesRef, tree?.nodesRef.current],
  );

  // console.log('parentTreeIndex', parentTreeIndex, children);

  React.useEffect(() => {
    // const handleArrowLeftPressed = (event: TreeEvent) => {
    //   if (event.parentId === nodeId) {
    //     setIsSubmenuVisible(false);
    //     menuItemRef.current?.focus();
    //   }
    // };

    // /**
    //  * The `FloatingTree` needs to be updated with the nodes from the new submenu before calling this function.
    //  */
    // const handleArrowRightPressed = (event: TreeEvent) => {
    //   if (
    //     tree?.nodesRef.current.find((n) => n.parentId === event.nodeId)?.id ===
    //     nodeId
    //   ) {
    //     menuItemRef.current?.focus();
    //   }
    // };

    const handleNodeFocused = (event: TreeEvent) => {
      // console.log(
      //   'node focused',
      //   event.nodeId,
      //   event.parentId,
      //   nodeId,
      //   parentId,
      // );

      // Consider a node "X" with its submenu "Y".
      // Focusing "X" should close all submenus of "Y".
      if (parentId === event.nodeId) {
        setIsSubmenuVisible(false);
      }

      // When a node "X" is focused, close "X"'s siblings' submenus
      // i.e. only one submenu in each menu can be open at a time
      if (parentId === event.parentId && nodeId !== event.nodeId) {
        setIsSubmenuVisible(false);
      }
    };

    // tree?.events.on('arrowLeftPressed', handleArrowLeftPressed);
    // tree?.events.on('arrowRightPressed', handleArrowRightPressed);
    tree?.events.on('nodeFocused', handleNodeFocused);

    return () => {
      // tree?.events.off('arrowLeftPressed', handleArrowLeftPressed);
      // tree?.events.off('arrowRightPressed', handleArrowRightPressed);
      tree?.events.off('nodeFocused', handleNodeFocused);
    };
  }, [nodeId, parentId, tree?.events, tree?.nodesRef, children]);

  // // Needed to trigger arrowRightPressed only after the FloatingTree has been
  // // updated with the nodes from the new submenu.
  // React.useEffect(
  //   () => {
  //     if (
  //       rightArrowPressed &&
  //       subMenuItems.length > 0 &&
  //       !!tree?.nodesRef.current.find((n) => n.parentId === nodeId) // Tree has been updated with the new submenu
  //     ) {
  //       tree.events.emit('arrowRightPressed', {
  //         nodeId,
  //         parentId,
  //       } satisfies TreeEvent);

  //       setRightArrowPressed(false);
  //     }
  //   },
  //   // TODO: Try to not require this eslint disable
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [
  //     rightArrowPressed, // Run this whenever rightArrowPressed changes
  //     nodeId,
  //     parentId,
  //     subMenuItems.length,
  //     tree?.events,
  //     // TODO: How to handle this warning?
  //     // warning  React Hook React.useEffect has an unnecessary dependency: 'tree?.nodesRef.current'. Either exclude it or remove the dependency array. Mutable values like 'tree.nodesRef.current' aren't valid dependencies because mutating them doesn't re-render the component  react-hooks/exhaustive-deps
  //     tree?.nodesRef.current,
  //     children,
  //     tree?.nodesRef,
  //   ],
  // );

  const listItemsRef = React.useRef<Array<HTMLElement | null>>([]);

  const popover = usePopover({
    nodeId,
    visible: isSubmenuVisible,
    onVisibleChange: setIsSubmenuVisible,
    placement: 'right-start',
    trigger: {
      hover: subMenuItems.length > 0 && !hasMouseEntered,
    },
    triggers: (context) => [
      // TODO: Do a proper fix
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useListNavigation(context, {
        listRef: listItemsRef,
        activeIndex,
        nested: subMenuItems.length > 0,
        onNavigate: setActiveIndex,
      }),
    ],
  });

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.altKey) {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'Spacebar': {
        !disabled && onClick?.(value);
        event.preventDefault();
        break;
      }
      // case 'ArrowRight': {
      //   if (subMenuItems.length > 0) {
      //     setIsSubmenuVisible(true);
      //     setRightArrowPressed(true);

      //     event.preventDefault();
      //     event.stopPropagation();
      //   }
      //   break;
      // }
      // case 'ArrowLeft': {
      //   tree?.events.emit('arrowLeftPressed', {
      //     nodeId,
      //     parentId,
      //   } satisfies TreeEvent);

      //   event.stopPropagation();
      //   event.preventDefault();
      //   break;
      // }
      default:
        break;
    }
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setHasMouseEntered(true);

    if (e.target === e.currentTarget) {
      menuItemRef.current?.focus();
    }
  };

  const onFocus = (e: React.FocusEvent<HTMLElement>) => {
    // console.log('onfocus', children);
    parent.setActiveIndex(parentTreeIndex);

    if (e.target === e.currentTarget) {
      tree?.events.emit('nodeFocused', {
        nodeId,
        parentId,
      } satisfies TreeEvent);
    }
  };

  const handlers = {
    onClick: () => !disabled && onClick?.(value),
    onKeyDown,
    onMouseEnter,
    onFocus,
  };

  // console.log('ref', listItemsRef.current);

  return (
    <>
      <ListItem
        as='div'
        actionable
        size={size}
        active={isSelected}
        disabled={disabled}
        ref={useMergedRefs(
          menuItemRef,
          forwardedRef,
          subMenuItems.length > 0 ? popover.refs.setReference : null,
          (el) => {
            // console.log(
            //   'in ref',
            //   // el,
            //   parentTreeIndex,
            //   children,
            //   // parentTreeIndex,
            //   // parent.listItemsRef.current.length,
            //   // parent.listItemsRef.current[parentTreeIndex],
            // );

            // listItemsRef.current[parentTreeIndex] = e as HTMLElement;
            parent.listItemsRef.current[parentTreeIndex] = el as HTMLElement;
          },
        )}
        role={role}
        tabIndex={disabled || role === 'presentation' ? undefined : -1}
        aria-selected={isSelected}
        aria-haspopup={subMenuItems.length > 0 ? 'true' : undefined}
        aria-controls={subMenuItems.length > 0 ? submenuId : undefined}
        aria-expanded={subMenuItems.length > 0 ? popover.open : undefined}
        aria-disabled={disabled}
        {...(subMenuItems.length === 0
          ? { ...handlers, ...rest }
          : popover.getReferenceProps({ ...handlers, ...rest }))}
      >
        {startIcon && (
          <ListItem.Icon as='span' aria-hidden>
            {startIcon}
          </ListItem.Icon>
        )}
        <ListItem.Content>
          <div>{children}</div>
          {sublabel && <ListItem.Description>{sublabel}</ListItem.Description>}
        </ListItem.Content>
        {!endIcon && subMenuItems.length > 0 && (
          <ListItem.Icon as='span' aria-hidden>
            <SvgCaretRightSmall />
          </ListItem.Icon>
        )}
        {endIcon && (
          <ListItem.Icon as='span' aria-hidden>
            {endIcon}
          </ListItem.Icon>
        )}
      </ListItem>

      {subMenuItems.length > 0 && popover.open && (
        <FloatingNode id={nodeId}>
          {/* <FloatingFocusManager
            context={popover.context}
            modal={submenuId.length <= 0}
            returnFocus={submenuId.length <= 0}
            initialFocus={0}
            // Touch-based screen readers will be able to navigate back to the
            // reference and click it to dismiss the menu without clicking an item.
            // This acts as a touch-based `Esc` key. A visually-hidden dismiss button
            // is an alternative.
            order={['reference', 'content']}
          > */}
          <Portal>
            <MenuItemContext.Provider
              // value={{ ref: menuItemRef, setIsNestedSubmenuVisible }}
              value={{
                setActiveIndex,
                listItemsRef,
              }}
            >
              <Menu
                // setFocus={true}
                setFocus={false}
                ref={popover.refs.setFloating}
                {...popover.getFloatingProps({
                  id: submenuId,
                  onPointerMove: () => {
                    // pointer might move into a nested submenu and set isSubmenuVisible to false,
                    // so we need to flip it back to true when pointer re-enters this submenu.
                    setIsSubmenuVisible(true);
                  },
                  onMouseEnter: () => {
                    setHasMouseEntered(true);
                  },
                })}
              >
                {subMenuItems}
                {/* {subMenuItems.map((item, index) => {
                  return React.cloneElement(item, {
                    // key: index,
                    // ref: (el: HTMLButtonElement | null) => {
                    //   // console.log('in ref');
                    //   listItemsRef.current[index] = el;
                    // },
                    // onPointerEnter: () => {
                    //   setActiveIndex(index);
                    // },
                    // onFocus: () => {
                    //   setActiveIndex(index);
                    // },
                  });
                })} */}
              </Menu>
            </MenuItemContext.Provider>
          </Portal>
          {/* </FloatingFocusManager> */}
        </FloatingNode>
      )}
    </>
  );
}) as PolymorphicForwardRefComponent<'div', MenuItemProps>;

// ----------------------------------------------------------------------------

export type TreeEvent = {
  nodeId: string;
  parentId: string | null;
};
