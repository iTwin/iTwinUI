/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Menu } from '../Menu/Menu.js';
import {
  useSafeContext,
  useMergedRefs,
  Portal,
  Box,
  useVirtualScroll,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { ComboBoxStateContext, ComboBoxRefsContext } from './helpers.js';
import { List } from '../List/List.js';
import { type VirtualItem } from '@tanstack/react-virtual';

type ComboBoxMenuProps = Omit<
  React.ComponentPropsWithoutRef<typeof Menu>,
  'onClick'
> &
  React.ComponentPropsWithoutRef<'div'>;

const VirtualizedComboBoxMenu = (props: React.ComponentProps<'div'>) => {
  const { children, ...rest } = props;
  const { filteredOptions, getMenuItem, focusedIndex } =
    useSafeContext(ComboBoxStateContext);
  const { menuRef } = useSafeContext(ComboBoxRefsContext);

  //Checks the first five (or all, if there are less than 5) filtered options. If at least three (or all, if there are less than 3 options) have sub labels, sets estimate to 48 instead of 36.
  const mostlySubLabeled = React.useMemo(() => {
    let numberOfSubLabels = 0;
    for (let i = 0; i < Math.min(5, filteredOptions.length); i++) {
      if (filteredOptions[i].sublabel) {
        numberOfSubLabels++;
      }
    }
    return numberOfSubLabels >= Math.min(3, filteredOptions.length);
  }, [filteredOptions]);

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

  const virtualizer = useVirtualScroll({
    // 'Fool' VirtualScroll by passing length 1
    // whenever there is no elements, to show empty state message
    count: filteredOptions.length || 1,
    getScrollElement: () => menuRef.current,
    estimateSize: () => (mostlySubLabeled ? 48 : 36),
    scrollToIndex: focusedVisibleIndex,
    gap: -1,
  });

  const virtualItemRenderer = React.useCallback(
    (virtualItem: VirtualItem) => {
      const menuItem =
        filteredOptions.length > 0
          ? getMenuItem(filteredOptions[virtualItem.index], virtualItem.index)
          : (children as JSX.Element); // Here is expected empty state content
      return React.cloneElement(menuItem, {
        key: virtualItem.key,
        ref: virtualizer.measureElement,
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          transform: `translateY(${virtualItem.start}px)`,
        },
      });
    },
    [filteredOptions, getMenuItem, children, virtualizer.measureElement],
  );

  return (
    <Box
      as='div'
      {...rest}
      style={{
        minBlockSize: virtualizer.getTotalSize(),
        minInlineSize: '100%',
        ...props.style,
      }}
    >
      {virtualizer.getVirtualItems().map((virtualItem) => {
        return virtualItemRenderer(virtualItem);
      })}
    </Box>
  );
};

export const ComboBoxMenu = React.forwardRef((props, forwardedRef) => {
  const { className, children, style, ...rest } = props;
  const { id, enableVirtualization, popover } =
    useSafeContext(ComboBoxStateContext);
  const { menuRef } = useSafeContext(ComboBoxRefsContext);

  const refs = useMergedRefs(popover.refs.setFloating, forwardedRef, menuRef);

  return (
    popover.open && (
      <Portal portal>
        <List
          as='div'
          className={cx('iui-menu', className)}
          id={`${id}-list`}
          role='listbox'
          ref={refs}
          {...popover.getFloatingProps({
            style: !enableVirtualization
              ? style
              : ({
                  // set as constant because we don't want it shifting when items are unmounted
                  maxInlineSize: 0,

                  ...style,
                } as React.CSSProperties),
            ...rest,
          })}
        >
          {!enableVirtualization ? (
            children
          ) : (
            <VirtualizedComboBoxMenu>{children}</VirtualizedComboBoxMenu>
          )}
        </List>
      </Portal>
    )
  );
}) as PolymorphicForwardRefComponent<'div', ComboBoxMenuProps>;
ComboBoxMenu.displayName = 'ComboBoxMenu';
