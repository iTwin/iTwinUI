/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  SvgCaretRightSmall,
  useMergedRefs,
  useId,
  createWarningLogger,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { Menu, MenuContext } from './Menu.js';
import { ListItem } from '../List/ListItem.js';
import type { ListItemOwnProps } from '../List/ListItem.js';

const logWarningInDev = createWarningLogger();

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

  if (onClickProp != null && subMenuItems.length > 0) {
    logWarningInDev(
      'Passing a non-empty submenuItems array and onClick to MenuItem at the same time is not supported. This is because when a non empty submenuItems array is passed, clicking the MenuItem toggles the submenu visibility.',
    );
  }

  const parentMenu = React.useContext(MenuContext);

  const menuItemRef = React.useRef<HTMLElement>(null);
  const submenuId = useId();

  const popoverProps = React.useMemo(() => {
    return {
      placement: 'right-start',
      interactions: {
        click: true,
        hover: true,
        listNavigation: {
          nested: subMenuItems.length > 0,
          openOnArrowKeyDown: true,
        },
      },
    } satisfies Parameters<typeof Menu>[0]['popoverProps'];
  }, [subMenuItems.length]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.altKey) {
      return;
    }

    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'Spacebar': {
        onClick();
        event.preventDefault();
        break;
      }
      default:
        break;
    }
  };

  const onClick = () => {
    console.log('onClick called', value);
    onClickProp?.(value);
  };

  const handlers = !disabled
    ? {
        onClick,
        onKeyDown,
      }
    : {};

  const trigger = (
    <ListItem
      as='div'
      actionable
      size={size}
      active={isSelected}
      disabled={disabled}
      ref={useMergedRefs(menuItemRef, forwardedRef)}
      role={role}
      tabIndex={disabled || role === 'presentation' ? undefined : -1}
      aria-selected={isSelected}
      aria-haspopup={subMenuItems.length > 0 ? 'true' : undefined}
      aria-controls={subMenuItems.length > 0 ? submenuId : undefined}
      aria-disabled={disabled}
      {...parentMenu?.popoverGetItemProps(handlers)}
      {...rest}
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
  );

  return (
    <>
      {subMenuItems.length > 0 && !disabled ? (
        <Menu id={submenuId} trigger={trigger} popoverProps={popoverProps}>
          {subMenuItems}
        </Menu>
      ) : (
        trigger
      )}
    </>
  );
}) as PolymorphicForwardRefComponent<'div', MenuItemProps>;

// ----------------------------------------------------------------------------

export type TreeEvent = {
  nodeId: string;
  parentId: string | null;
};
