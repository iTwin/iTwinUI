/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { actions } from 'react-table';
import type {
  ActionType,
  Hooks,
  TableInstance,
  TableState,
} from '../../../react-table/react-table.js';
import { calculateCurrentStickyColsWidth, getHeaderWidth } from '../utils.js';

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

const useInstance = <T extends Record<string, unknown>>(
  instance: TableInstance<T>,
) => {
  const { flatHeaders, tableWidth, state } = instance;
  const currentStickyColsWidth = calculateCurrentStickyColsWidth(flatHeaders);
  // Edge case. Saving original sticky state in case sticky columns are reordered.
  flatHeaders.forEach((header) => {
    if (!header.originalSticky) {
      header.originalSticky = header.sticky ?? 'none';
    }
    // determine if un-sticky columns should remain un-sticky or made sticky again
    let remainUnsticky = true;
    // Only need to check for currently un-sticky columns (current .sticky is undefined, but .originalSticky is defined)
    // In other words, the column's .sticky has been currently assigned to be undefined so it is no longer visibly sticky, but
    // the column was originally assigned to be sticky so should be made sticky whenever there is enough width.
    if (!header.sticky && header.originalSticky !== 'none') {
      // get the column id of the next (adjacent) column to the resizing column
      const nextResizingColId = state.columnResizing.nextHeaderIdWidths
        ? state.columnResizing.nextHeaderIdWidths[0][0]
        : '';

      // Handle only if a particular column is being resized (not table resize).
      // This is done by checking if isResizingColumn is defined.

      // For the case of if the current un-sticky column was originally 'right' sticky,
      // only proceed if the current header id matches next column id.
      const rightSticky =
        header.originalSticky === 'right' && header.id === nextResizingColId;

      // Otherwise, if the current un-sticky column was 'left' sticky, proceed only if
      // the current header id matches the current resizing column id.
      const leftSticky =
        header.originalSticky === 'left' &&
        header.id === state.columnResizing.headerIdWidths?.[0][0];

      if (
        state.columnResizing.isResizingColumn &&
        (rightSticky || leftSticky)
      ) {
        // If the sum of the total width of the currently sticky columns and the
        // current header is less than the max table width that the sticky columns
        // can take up, then the un-sticky header should be made sticky again.
        if (
          currentStickyColsWidth + getHeaderWidth(header) <
          tableWidth * 0.8
        ) {
          remainUnsticky = false;
        }
      }
    }

    // Determine what the header.sticky value should be
    if (header.originalSticky === 'none') {
      header.sticky = undefined;
    } else if (!header.sticky) {
      // Case for when the header is un-sticky
      if (remainUnsticky) {
        // Case for when the un-sticky column has been determined to remain un-sticky above
        header.sticky = undefined;
      } else if (
        (instance.scrolledLeft && header.originalSticky === 'left') ||
        (instance.scrolledRight && header.originalSticky === 'right')
      ) {
        // Only make the un-sticky column sticky again if scrolled all the way to the left or right.
        // Otherwise, there is a visual disruption/jump when resizing an un-sticky column that
        // becomes sticky again.
        header.sticky = header.originalSticky;
      } else {
        header.sticky = undefined;
      }
    } else {
      header.sticky = header.originalSticky;
    }
  });

  // If there is a column that is sticked to the left, make every column prior to that sticky too.
  let hasLeftStickyColumn = false;
  [...flatHeaders].reverse().forEach((header) => {
    if (header.sticky === 'left') {
      hasLeftStickyColumn = true;
    }
    if (hasLeftStickyColumn) {
      header.sticky = 'left';
      if (header.originalSticky === 'none') {
        header.originalSticky = header.sticky;
      }
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
      if (header.originalSticky === 'none') {
        header.originalSticky = header.sticky;
      }
    }
  });
};
