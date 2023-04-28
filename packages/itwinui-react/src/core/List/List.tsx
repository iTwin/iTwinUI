/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { getFocusableElements, useMergedRefs, useTheme } from '../utils';
import type {
  PolymorphicForwardRefComponent,
  PolymorphicComponentProps,
} from '../utils';
import '@itwin/itwinui-css/css/menu.css';

export const List = React.forwardRef((props, ref) => {
  const { as: Element = 'ul', className, role = 'list', ...rest } = props;

  useTheme();

  const [focusedIndex, setFocusedIndex] = React.useState<number | null>();
  const listRef = React.useRef<HTMLUListElement>(null);
  const refs = useMergedRefs(listRef, ref);

  const getFocusableNodes = React.useCallback(() => {
    const focusableItems = getFocusableElements(listRef.current);
    // Filter out focusable elements that are inside each list item, e.g. checkbox, anchor
    return focusableItems.filter(
      (i) => !focusableItems.some((p) => p.contains(i.parentElement)),
    ) as HTMLElement[];
  }, []);

  React.useEffect(() => {
    const items = getFocusableNodes();
    if (focusedIndex != null) {
      (items?.[focusedIndex] as HTMLLIElement)?.focus();
      return;
    }
  }, [focusedIndex, getFocusableNodes]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
    if (event.altKey) {
      return;
    }

    const items = getFocusableNodes();
    if (!items?.length) {
      return;
    }

    const currentIndex = focusedIndex ?? 0;

    switch (event.key) {
      case 'ArrowDown': {
        setFocusedIndex(Math.min(currentIndex + 1, items.length - 1));
        event.preventDefault();
        event.stopPropagation();
        break;
      }
      case 'ArrowUp': {
        setFocusedIndex(Math.max(currentIndex - 1, 0));
        event.preventDefault();
        event.stopPropagation();
        break;
      }
      default:
        break;
    }
  };

  return (
    <Element
      className={cx('iui-list', className)}
      ref={refs}
      role={role}
      onKeyDown={onKeyDown}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'ul', ListOwnProps>;

type ListOwnProps = {
  /**
   * Sets the role of the list component
   * @default 'list'
   */
  role?: 'list' | 'listbox';
};

export type ListProps = PolymorphicComponentProps<'ul', ListOwnProps>;
