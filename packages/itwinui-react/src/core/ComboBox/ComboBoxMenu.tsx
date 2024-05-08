/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Menu } from '../Menu/Menu.js';
import {
  useSafeContext,
  useMergedRefs,
  useVirtualization,
  Box,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { ComboBoxStateContext, ComboBoxRefsContext } from './helpers.js';

type ComboBoxMenuProps = Partial<
  Omit<React.ComponentPropsWithoutRef<typeof Menu>, 'onClick' | 'trigger'>
> & {
  trigger: React.ComponentPropsWithoutRef<typeof Menu>['trigger'];
} & React.ComponentPropsWithoutRef<'div'>;

const VirtualizedComboBoxMenu = (props: React.ComponentProps<'div'>) => {
  const { children, ...rest } = props;
  const { filteredOptions, getMenuItem, focusedIndex } =
    useSafeContext(ComboBoxStateContext);
  const { menuRef } = useSafeContext(ComboBoxRefsContext);

  const virtualItemRenderer = React.useCallback(
    (index: number) =>
      filteredOptions.length > 0
        ? getMenuItem(filteredOptions[index], index)
        : (children as JSX.Element), // Here is expected empty state content
    [filteredOptions, getMenuItem, children],
  );

  const focusedVisibleIndex = React.useMemo(() => {
    const currentElement = menuRef.current?.querySelector(
      `[data-iui-index="${focusedIndex}"]`,
    );
    if (!currentElement) {
      return focusedIndex;
    }

    return Number(
      currentElement.getAttribute('data-iui-filtered-index') ?? focusedIndex,
    );
  }, [focusedIndex, menuRef]);

  const { outerProps, innerProps, visibleChildren } = useVirtualization({
    // 'Fool' VirtualScroll by passing length 1
    // whenever there is no elements, to show empty state message
    itemsLength: filteredOptions.length || 1,
    itemRenderer: virtualItemRenderer,
    scrollToIndex: focusedVisibleIndex,
  });

  return (
    <Box as='div' {...outerProps} {...rest}>
      <div {...innerProps} ref={innerProps.ref}>
        {visibleChildren}
      </div>
    </Box>
  );
};

export const ComboBoxMenu = React.forwardRef((props, forwardedRef) => {
  const { children, style, ...rest } = props;
  const { id, enableVirtualization, popoverProps } =
    useSafeContext(ComboBoxStateContext);
  const { menuRef } = useSafeContext(ComboBoxRefsContext);

  const refs = useMergedRefs(forwardedRef, menuRef);

  return (
    <Menu
      id={`${id}-list`}
      popoverProps={popoverProps}
      role='listbox'
      ref={refs}
      style={
        !enableVirtualization
          ? style
          : ({
              // set as constant because we don't want it shifting when items are unmounted
              maxInlineSize: 0,

              ...style,
            } as React.CSSProperties)
      }
      {...rest}
    >
      {!enableVirtualization ? (
        children
      ) : (
        <VirtualizedComboBoxMenu>{children}</VirtualizedComboBoxMenu>
      )}
    </Menu>
  );
}) as PolymorphicForwardRefComponent<'div', ComboBoxMenuProps>;
ComboBoxMenu.displayName = 'ComboBoxMenu';
