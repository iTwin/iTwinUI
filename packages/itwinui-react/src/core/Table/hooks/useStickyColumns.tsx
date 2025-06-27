/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { actions } from 'react-table';
import type {
  ActionType,
  ColumnInstance,
  Hooks,
  TableInstance,
  TableState,
} from '../../../react-table/react-table.js';

actions.setScrolledLeft = 'setScrolledLeft';
actions.setScrolledRight = 'setScrolledRight';

export const useStickyColumns = <T extends Record<string, unknown>>(
  hooks: Hooks<T>,
) => {
  hooks.stateReducers.push(reducer);
  hooks.useInstance.push(useInstance);
};

const reducer = <T extends Record<string, unknown>>(
  newState: TableState<T>,
  action: ActionType,
): TableState<T> => {
  if (action.type === actions.init) {
    return {
      ...newState,
      sticky: {},
    };
  }

  if (
    action.type === actions.setScrolledLeft &&
    newState.sticky?.isScrolledToLeft !== action.value // Prevents unnecessary re-render
  ) {
    return {
      ...newState,
      sticky: {
        ...newState.sticky,
        isScrolledToLeft: action.value,
      },
    };
  }

  if (
    action.type === actions.setScrolledRight &&
    newState.sticky?.isScrolledToRight !== action.value // Prevents unnecessary re-render
  ) {
    return {
      ...newState,
      sticky: {
        ...newState.sticky,
        isScrolledToRight: action.value,
      },
    };
  }

  return newState;
};

const getHeaderWidth = <T extends Record<string, unknown>>(
  header: ColumnInstance<T>,
) => {
  if (!header) {
    return 0;
  }

  // `header.width` can be a string if the user specifies it in the column definition,
  // but then becomes a number (pixels) when the user resizes the column, or when the table is resized, etc.
  // So if `header.width` is ever a string that cannot be converted to a number, we shouldn't use `header.width`.
  return typeof header.width === 'string' && Number.isNaN(Number(header.width))
    ? Number(header.resizeWidth || 0)
    : Number(header.width || header.resizeWidth || 0);
};

const calculateStickyColsWidth = <T extends Record<string, unknown>>(
  headers: ColumnInstance<T>[],
) => {
  let stickyColsWidth = 0;
  for (const header of headers) {
    stickyColsWidth +=
      header.originalSticky !== 'none' ? getHeaderWidth(header) : 0;
  }
  return stickyColsWidth;
};

const useInstance = <T extends Record<string, unknown>>(
  instance: TableInstance<T>,
) => {
  const { flatHeaders, tableWidth } = instance;
  const stickyColsWidth = calculateStickyColsWidth(flatHeaders);
  // Edge case. Saving original sticky state in case sticky columns are reordered.
  flatHeaders.forEach((header) => {
    if (!header.originalSticky) {
      header.originalSticky = header.sticky ?? 'none';
    }
    header.sticky =
      header.originalSticky === 'none' ||
      (stickyColsWidth >= tableWidth && !header.sticky)
        ? undefined
        : header.originalSticky;
    console.log(header.id, 'new header.sticky', header.sticky);
  });

  // If there is a column that is sticked to the left, make every column prior to that sticky too.
  let hasLeftStickyColumn = false;
  [...flatHeaders].reverse().forEach((header) => {
    if (header.sticky === 'left') {
      hasLeftStickyColumn = true;
    }
    if (hasLeftStickyColumn) {
      header.sticky = 'left';
    }
  });

  // If there is a column that is sticked to the right, make every column after to that sticky too.
  let hasRightStickyColumn = false;
  flatHeaders.forEach((header) => {
    if (header.sticky === 'right') {
      hasRightStickyColumn = true;
    }
    if (hasRightStickyColumn) {
      header.sticky = 'right';
    }
  });
};
