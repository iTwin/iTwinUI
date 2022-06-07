/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  actions,
  ActionType,
  Hooks,
  TableInstance,
  TableState,
} from 'react-table';

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
  const { flatHeaders } = instance;

  // Edge case. Saving original sticky state in case sticky columns are reordered.
  flatHeaders.forEach((header) => {
    if (!header.originalSticky) {
      header.originalSticky = header.sticky ?? 'none';
    }
    header.sticky =
      header.originalSticky === 'none' ? undefined : header.originalSticky;
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
