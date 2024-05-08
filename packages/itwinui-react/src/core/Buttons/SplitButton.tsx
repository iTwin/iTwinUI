/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Button } from './Button.js';
import type { ButtonProps } from './Button.js';
import { IconButton } from './IconButton.js';
import {
  Box,
  SvgCaretDownSmall,
  SvgCaretUpSmall,
  useId,
  useMergedRefs,
} from '../../utils/index.js';
import type {
  PolymorphicForwardRefComponent,
  PortalProps,
} from '../../utils/index.js';
import { useFloatingNodeId, type Placement } from '@floating-ui/react';
import { Menu } from '../Menu/Menu.js';

export type SplitButtonProps = ButtonProps & {
  /**
   * Items in the dropdown menu.
   * Pass a function that takes the `close` argument (to close the menu),
   * and returns a list of `MenuItem` components.
   */
  menuItems: (close: () => void) => JSX.Element[];
  /**
   * Placement of the dropdown menu.
   * @default 'bottom-end'
   */
  menuPlacement?: Placement;
  /**
   * Content of primary button.
   */
  children: React.ReactNode;
  /**
   * Passes props to SplitButton wrapper.
   */
  wrapperProps?: React.ComponentProps<'div'>;
  /**
   * Passes props to SplitButton menu button.
   */
  menuButtonProps?: Omit<
    React.ComponentProps<typeof IconButton>,
    'label' | 'size'
  >;
} & Pick<PortalProps, 'portal'>;

/**
 * Split button component with a DropdownMenu.
 *
 * The delegated props and forwarded ref are passed onto the primary button.
 * It also supports using the `as` prop to change which element is rendered.
 *
 * @example
 * const menuItems = (close: () => void) => [
 *   <MenuItem key={1} onClick={onClick(1, close)}>Item #1</MenuItem>,
 *   <MenuItem key={2} onClick={onClick(2, close)}>Item #2</MenuItem>,
 * ];
 * <SplitButton onClick={onClick} menuItems={menuItems}>Default</SplitButton>
 * <SplitButton onClick={onClick} menuItems={menuItems} styleType='high-visibility'>High visibility</SplitButton>
 */
export const SplitButton = React.forwardRef((props, forwardedRef) => {
  const {
    onClick,
    menuItems,
    className,
    menuPlacement = 'bottom-end',
    styleType = 'default',
    size,
    children,
    wrapperProps,
    menuButtonProps,
    portal = true,
    ...rest
  } = props;

  const buttonRef = React.useRef<HTMLElement>(null);

  const [visible, setVisible] = React.useState(false);
  const close = React.useCallback(() => {
    setVisible(false);
    buttonRef.current?.focus({ preventScroll: true });
  }, []);

  const menuContent = React.useMemo(() => {
    if (typeof menuItems === 'function') {
      return menuItems(close);
    }
    return menuItems;
  }, [menuItems, close]);

  const popoverProps = {
    visible,
    onVisibleChange: (open) => (open ? setVisible(true) : close()),
    placement: menuPlacement,
    matchWidth: true,
  } satisfies Parameters<typeof Menu>[0]['popoverProps'];

  const labelId = useId();
  const nodeId = useFloatingNodeId();

  const trigger = (
    <IconButton
      styleType={styleType}
      size={size}
      disabled={props.disabled}
      aria-labelledby={props.labelProps?.id || labelId}
      {...menuButtonProps}
    >
      {visible ? <SvgCaretUpSmall /> : <SvgCaretDownSmall />}
    </IconButton>
  );

  const [positionReference, setPositionReference] =
    React.useState<HTMLDivElement | null>(null);

  return (
    <Box
      as='div'
      {...wrapperProps}
      ref={setPositionReference}
      className={cx(
        'iui-button-split',
        {
          'iui-disabled': props.disabled,
        },
        wrapperProps?.className,
      )}
    >
      <Button
        className={className}
        styleType={styleType}
        size={size}
        onClick={onClick}
        ref={useMergedRefs(buttonRef, forwardedRef)}
        {...rest}
        labelProps={{ id: labelId, ...props.labelProps }}
      >
        {children}
      </Button>
      <Menu
        nodeId={nodeId}
        popoverProps={popoverProps}
        trigger={trigger}
        portal={portal}
        positionReference={positionReference}
        onKeyDown={({ key }) => {
          if (key === 'Tab') {
            close();
          }
        }}
      >
        {menuContent}
      </Menu>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'button', SplitButtonProps>;
