/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Menu } from '../Menu/index.js';
import { Surface } from '../Surface/index.js';
import {
  useSafeContext,
  useMergedRefs,
  useVirtualization,
  mergeRefs,
  getWindow,
  Portal,
} from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';
import { ComboBoxStateContext, ComboBoxRefsContext } from './helpers.js';

type ComboBoxMenuProps = Omit<
  React.ComponentPropsWithoutRef<typeof Menu>,
  'onClick'
> &
  React.ComponentPropsWithoutRef<'div'>;

const isOverflowOverlaySupported = () =>
  getWindow()?.CSS?.supports?.('overflow: overlay');

const VirtualizedComboBoxMenu = React.forwardRef(
  (props: ComboBoxMenuProps, forwardedRef: React.Ref<HTMLElement>) => {
    const { children, className, style, ...rest } = props;
    const { id, filteredOptions, getMenuItem, focusedIndex } =
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

    const surfaceStyles = {
      // set as constant because we don't want it shifting when items are unmounted
      maxInlineSize: 0,

      // max-height must be on the outermost element for virtual scroll
      maxBlockSize: 'calc((var(--iui-component-height) - 1px) * 8.5)',
      overflowY: isOverflowOverlaySupported() ? 'overlay' : 'auto',
      ...style,
    } as React.CSSProperties;

    return (
      <Surface style={surfaceStyles} {...outerProps}>
        <Menu
          id={`${id}-list`}
          setFocus={false}
          role='listbox'
          ref={mergeRefs(menuRef, innerProps.ref, forwardedRef)}
          className={className}
          style={innerProps.style}
          {...rest}
        >
          {visibleChildren}
        </Menu>
      </Surface>
    );
  },
);

export const ComboBoxMenu = React.forwardRef((props, forwardedRef) => {
  const { className, children, ...rest } = props;
  const { id, enableVirtualization, popover } =
    useSafeContext(ComboBoxStateContext);
  const { menuRef } = useSafeContext(ComboBoxRefsContext);

  const refs = useMergedRefs(
    popover.refs.setFloating,
    forwardedRef,
    enableVirtualization ? menuRef : null,
  );

  return (
    popover.open && (
      <Portal portal>
        {!enableVirtualization ? (
          <Menu
            id={`${id}-list`}
            setFocus={false}
            role='listbox'
            ref={refs}
            className={cx('iui-scroll', className)}
            {...popover.getFloatingProps(rest)}
          >
            {children}
          </Menu>
        ) : (
          <VirtualizedComboBoxMenu
            as='div'
            ref={refs}
            {...popover.getFloatingProps(props)}
          >
            {children}
          </VirtualizedComboBoxMenu>
        )}
      </Portal>
    )
  );
}) as PolymorphicForwardRefComponent<'div', ComboBoxMenuProps>;
ComboBoxMenu.displayName = 'ComboBoxMenu';
