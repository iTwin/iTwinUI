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
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { Menu } from './Menu.js';
import { ListItem } from '../List/ListItem.js';
import type { ListItemOwnProps } from '../List/ListItem.js';
import { flushSync } from 'react-dom';
import { usePopover } from '../Popover/Popover.js';
import {
  FloatingNode,
  useFloatingNodeId,
  useFloatingParentNodeId,
  useFloatingTree,
} from '@floating-ui/react';

/**
 * Context used to provide menu item ref to sub-menu items.
 */
const MenuItemContext = React.createContext<{
  ref: React.RefObject<HTMLElement> | undefined;
  setIsNestedSubmenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
}>({ ref: undefined, setIsNestedSubmenuVisible: () => {} });

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

  const menuItemRef = React.useRef<HTMLElement>(null);
  const [focusOnSubmenu, setFocusOnSubmenu] = React.useState(false);
  const submenuId = useId();

  const [isSubmenuVisible, setIsSubmenuVisible] = React.useState(false);
  const [isNestedSubmenuVisible, setIsNestedSubmenuVisible] =
    React.useState(false);
  const parent = React.useContext(MenuItemContext);

  const nodeId = useFloatingNodeId();
  const tree = useFloatingTree();
  const parentId = useFloatingParentNodeId();

  // console.log(tree?.nodesRef.current);

  const onVisibleChange = (open: boolean) => {
    if (open) {
      tree?.events.emit('submenuOpened', {
        nodeId,
        parentId,
      } satisfies TreeEvent);
    }

    setIsSubmenuVisible(open || isNestedSubmenuVisible);

    // we don't want parent to close when mouse goes into a nested submenu,
    // so we need to let the parent know whether the submenu is still open.
    parent.setIsNestedSubmenuVisible(open);
  };

  React.useEffect(() => {
    const handleSubmenuOpened = (event: TreeEvent) => {
      // If a sibling's submenu is opened, close this submenu
      // i.e. only one submenu in each meny can be open at a time
      if (event.parentId === parentId && event.nodeId !== nodeId) {
        setIsSubmenuVisible(false);
      }
    };

    const handleLeftArrowPressed = (event: TreeEvent) => {
      // if left arrow is pressed from a submenu,
      // the submenu should close and focus should move back to parent
      if (event.parentId === nodeId) {
        menuItemRef.current?.focus();
        setIsSubmenuVisible(false);
      }
    };

    // const handleRightArrowPressed = (event: TreeEvent) => {
    //   // if right arrow is pressed from a parent menu item,
    //   // the submenu should open
    //   // if (event.nodeId === parentId) {
    //   //   setIsSubmenuVisible(true);
    //   //   menuItemRef.current?.focus();
    //   // }
    //   if (event.nodeId === nodeId) {
    //     // TODO: Maybe need to flushSync, confirm
    //     setIsSubmenuVisible(true);

    //     const firstSubmenuNode = tree?.nodesRef.current.find(
    //       (node) => node.parentId === nodeId,
    //     );
    //     tree?.events.emit('attemptFocus', {
    //       nodeId: firstSubmenuNode!.id,
    //       parentId: nodeId,
    //     } satisfies TreeEvent);
    //     // menuItemRef.current?.focus();
    //   }

    //   // console.log(tree?.nodesRef.current);
    // };

    // const handleRightArrowPressed = (event: TreeEvent) => {
    //   const firstSubmenuNode = tree?.nodesRef.current.find(
    //     (node) => node.parentId === event.nodeId,
    //   );
    //   const isCurrentNodeTheFirstSubmenuNode = nodeId === firstSubmenuNode?.id;

    //   // console.log('isFirstSubmenuNode', firstSubmenuNode, event);

    //   if (event.nodeId === parentId && isCurrentNodeTheFirstSubmenuNode) {
    //     menuItemRef.current?.focus();
    //   }
    // };

    // const handleAttemptFocus = (event: TreeEvent) => {
    //   if (event.nodeId === nodeId) {
    //     menuItemRef.current?.focus();
    //   }
    // };

    tree?.events.on('submenuOpened', handleSubmenuOpened);
    tree?.events.on('leftArrowPressed', handleLeftArrowPressed);
    // tree?.events.on('rightArrowPressed', handleRightArrowPressed);
    // tree?.events.on('attemptFocus', handleAttemptFocus);

    return () => {
      tree?.events.off('submenuOpened', handleSubmenuOpened);
      tree?.events.off('leftArrowPressed', handleLeftArrowPressed);
      // tree?.events.off('rightArrowPressed', handleRightArrowPressed);
      // tree?.events.off('attemptFocus', handleAttemptFocus);
    };
  }, [nodeId, parentId, tree?.events]);

  const popover = usePopover({
    nodeId,
    visible: isSubmenuVisible || isNestedSubmenuVisible,
    onVisibleChange,
    placement: 'right-start',
    trigger: { hover: true, focus: true },
  });

  const onKeyDown = async (event: React.KeyboardEvent<HTMLElement>) => {
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
      case 'ArrowRight': {
        if (subMenuItems.length > 0) {
          setIsSubmenuVisible(true);

          // // flush and reset state so we are ready to focus again next time
          // flushSync(() => setFocusOnSubmenu(true));
          // setFocusOnSubmenu(false);

          // tree?.events.emit('rightArrowPressed', {
          //   nodeId,
          //   parentId,
          // } satisfies TreeEvent);

          flushSync(() => setFocusOnSubmenu(true));
          setFocusOnSubmenu(false);
          // flushSync(() => setIsSubmenuVisible(true));
          // setIsSubmenuVisible(true);
          // flushSync(() => setFocusOnSubmenu(false));

          // await new Promise((resolve) => setTimeout(resolve, 1000));

          // const firstSubmenuNode = tree?.nodesRef.current.find(
          //   (node) => node.parentId === nodeId,
          // );

          // console.log('firstSubmenuNode', firstSubmenuNode);

          // // flush and reset state so we are ready to focus again next time
          // flushSync(() => setFocusOnSubmenu(true));
          // setFocusOnSubmenu(false);

          // tree?.events.emit('rightArrowPressed', {
          //   nodeId,
          //   parentId,
          // } satisfies TreeEvent);

          // if (firstSubmenuNode) {
          //   tree?.events.emit('attemptFocus', {
          //     nodeId: firstSubmenuNode.id,
          //     parentId: nodeId,
          //   } satisfies TreeEvent);
          // }

          event.preventDefault();
          event.stopPropagation();
        }
        break;
      }
      case 'ArrowLeft': {
        // if (parent.ref) {
        //   parent.ref.current?.focus();
        //   parent.setIsNestedSubmenuVisible(false);
        // }

        tree?.events.emit('leftArrowPressed', {
          nodeId,
          parentId,
        } satisfies TreeEvent);

        event.stopPropagation();
        event.preventDefault();
        break;
      }
      case 'Escape': {
        // focus might get lost if submenu closes so move it back to parent
        parent.ref?.current?.focus();
        break;
      }
      default:
        break;
    }
  };

  // React.useEffect(() => {
  //   if (popover.open && focusOnSubmenu) {
  //     console.log('reset focus on submenu', children, nodeId);
  //     // menuItemRef.current?.focus();
  //     setFocusOnSubmenu(false);
  //   }
  // }, [popover.open, focusOnSubmenu]);

  const handlers = {
    onClick: () => !disabled && onClick?.(value),
    onKeyDown,
  };

  return (
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
        <div>
          {children},{nodeId},{parentId}
        </div>
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

      <FloatingNode id={nodeId}>
        {subMenuItems.length > 0 && popover.open && (
          <Portal>
            <MenuItemContext.Provider
              value={{ ref: menuItemRef, setIsNestedSubmenuVisible }}
            >
              <Menu
                setFocus={focusOnSubmenu}
                ref={popover.refs.setFloating}
                {...popover.getFloatingProps({
                  id: submenuId,
                  onPointerMove: () => {
                    // pointer might move into a nested submenu and set isSubmenuVisible to false,
                    // so we need to flip it back to true when pointer re-enters this submenu.
                    setIsSubmenuVisible(true);
                  },
                })}
              >
                {subMenuItems}
              </Menu>
            </MenuItemContext.Provider>
          </Portal>
        )}
      </FloatingNode>
    </ListItem>
  );
}) as PolymorphicForwardRefComponent<'div', MenuItemProps>;

// ----------------------------------------------------------------------------

type TreeEvent = {
  nodeId: string;
  parentId: string | null;
};
