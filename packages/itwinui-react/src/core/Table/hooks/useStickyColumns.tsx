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
    let remainUnsticky = true;
    if (!header.sticky && header.originalSticky !== 'none') {
      const nextResizingColId = state.columnResizing.nextHeaderIdWidths
        ? state.columnResizing.nextHeaderIdWidths[0][0]
        : '';
      if (
        (header.originalSticky === 'right' &&
          header.id === nextResizingColId) ||
        (header.originalSticky === 'left' &&
          header.id === state.columnResizing.headerIdWidths?.[0][0])
      ) {
        if (
          currentStickyColsWidth + getHeaderWidth(header) <
          tableWidth * 0.8
        ) {
          remainUnsticky = false;
        }
      }
    }

    // header.sticky =
    //   header.originalSticky === 'none' ||
    //   (remainUnsticky &&
    //     !header.sticky &&
    //     (header.originalSticky === 'left' || header.originalSticky === 'right'))
    //     ? undefined
    //     : header.originalSticky;

    if (header.originalSticky === 'none') {
      header.sticky = undefined;
    } else if (!header.sticky) {
      if (remainUnsticky) {
        header.sticky = undefined;
      } else {
        if (
          (instance.scrolledLeft && header.originalSticky === 'left') ||
          (instance.scrolledRight && header.originalSticky === 'right')
        ) {
          header.sticky = header.originalSticky;
        } else {
          header.sticky = undefined;
        }
      }
    } else {
      header.sticky = header.originalSticky;
    }

    console.log(
      header.id,
      header.sticky,
      header.originalSticky,
      'in useStickyColumns, SCROLL VALS',
      instance.scrolledLeft,
      instance.scrolledRight,
    );
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
