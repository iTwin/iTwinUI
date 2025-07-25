/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  SvgCaretRightSmall,
  useMergedRefs,
  useId,
  useWarningLogger,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { Menu, MenuContext } from './Menu.js';
import { ListItem } from '../List/ListItem.js';
import type { ListItemOwnProps } from '../List/ListItem.js';
import cx from 'classnames';
import {
  DropdownMenuCloseOnClickContext,
  DropdownMenuContext,
} from '../DropdownMenu/DropdownMenu.js';

export type MenuItemProps = {
  /**
   * Item is selected.
   */
  isSelected?: boolean;
  /**
   * Item is disabled.
   */
  disabled?: boolean;
} & (
  | {
      /**
       * Value of the item.
       * @deprecated
       */
      value: unknown;
      /**
       * Callback function that handles click and keyboard submit actions.
       */
      onClick?: (value?: unknown) => void;
    }
  | {
      /** @deprecated */ value?: never;
      onClick?: (event?: React.MouseEvent) => void;
    }
) & {
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
    startIcon?: React.JSX.Element;
    /**
     * @deprecated Use startIcon.
     * SVG icon component shown on the left.
     */
    icon?: React.JSX.Element;
    /**
     * SVG icon component shown on the right.
     */
    endIcon?: React.JSX.Element;
    /**
     * @deprecated Use endIcon.
     * SVG icon component shown on the right.
     */
    badge?: React.JSX.Element;
    /**
     * ARIA role. For menu item use 'menuitem', for select item use 'option'.
     * @default 'menuitem'
     */
    role?: string;
    /**
     * Items to be shown in the submenu when hovered over the item.
     */
    subMenuItems?: React.JSX.Element[];
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
    className,
    children,
    isSelected,
    disabled,
    value,
    onClick: onClickProp,
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

  const logWarning = useWarningLogger();

  const hasSubMenu = React.useMemo(
    () => subMenuItems.length > 0,
    [subMenuItems.length],
  );

  if (
    process.env.NODE_ENV === 'development' &&
    onClickProp != null &&
    hasSubMenu
  ) {
    logWarning(
      'Passing a non-empty submenuItems array and onClick to MenuItem at the same time is not supported. This is because when a non empty submenuItems array is passed, clicking the MenuItem toggles the submenu visibility.',
    );
  }

  const parentMenu = React.useContext(MenuContext);
  const dropdownMenu = React.useContext(DropdownMenuContext);

  // When submenu is present, clicking on item should show submenu instead of closing main menu. (https://github.com/iTwin/iTwinUI/issues/2504)
  // Thus, also including `!hasSubMenu`.
  const shouldCloseMenuOnClick =
    React.useContext(DropdownMenuCloseOnClickContext) && !hasSubMenu;

  const menuItemRef = React.useRef<HTMLElement>(null);
  const submenuId = useId();

  const popoverProps = React.useMemo(() => {
    return {
      placement: 'right-start',
      interactions: {
        click: true,
        hover: true,
        listNavigation: {
          nested: hasSubMenu,
          openOnArrowKeyDown: true,
        },
      },
    } satisfies Parameters<typeof Menu>[0]['popoverProps'];
  }, [hasSubMenu]);

  const onClick = (event: React.MouseEvent) => {
    if (disabled) {
      return;
    }

    if (shouldCloseMenuOnClick) {
      dropdownMenu?.close();
    }

    onClickProp?.((value ?? event) as any);
  };

  /** Index of this item out of all the focusable items in the parent `Menu` */
  const focusableItemIndex = parentMenu?.focusableElements.findIndex(
    (el) => el === menuItemRef.current,
  );

  const trigger = (
    <ListItem
      as='button'
      type='button'
      className={cx('iui-button-base', className)}
      actionable
      size={size}
      active={isSelected}
      disabled={disabled}
      ref={useMergedRefs(menuItemRef, forwardedRef)}
      role={role}
      tabIndex={isSelected ? 0 : -1}
      aria-selected={isSelected}
      aria-haspopup={hasSubMenu ? 'true' : undefined}
      aria-controls={hasSubMenu ? submenuId : undefined}
      aria-disabled={disabled}
      {...(parentMenu?.popoverGetItemProps != null
        ? parentMenu.popoverGetItemProps({
            focusableItemIndex,
            userProps: { onClick },
          })
        : { onClick })}
      {...(rest as React.DOMAttributes<HTMLButtonElement>)}
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
      {!endIcon && hasSubMenu && (
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
  );

  return (
    <>
      {hasSubMenu && !disabled ? (
        <Menu id={submenuId} trigger={trigger} popoverProps={popoverProps}>
          {subMenuItems}
        </Menu>
      ) : (
        trigger
      )}
    </>
  );
}) as PolymorphicForwardRefComponent<'div', MenuItemProps>;
if (process.env.NODE_ENV === 'development') {
  MenuItem.displayName = 'MenuItem';
}

// ----------------------------------------------------------------------------

export type TreeEvent = {
  nodeId: string;
  parentId: string | null;
};
