/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/**
 * Copied from react-table as useResizeColumns and made some changes:
 *  - Added TS typings
 *  - Added sibling/next column resize when resizing
 *  - Favoring min/max widths when resizing
 *  - Added owner document support
 * @link https://github.com/tannerlinsley/react-table/blob/master/src/plugin-hooks/useResizeColumns.js
 */
/**
 * MIT License
 *
 * Copyright (c) 2016 Tanner Linsley
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React from 'react';
import {
  actions,
  ActionType,
  ColumnInstance,
  HeaderGroup,
  Hooks,
  makePropGetter,
  TableInstance,
  TableKeyedProps,
  TableState,
  useGetLatest,
} from 'react-table';

export const useResizeColumns =
  <T extends Record<string, unknown>>(
    ownerDocument: React.RefObject<Document | undefined>,
  ) =>
  (hooks: Hooks<T>) => {
    hooks.getResizerProps = [defaultGetResizerProps(ownerDocument)];
    hooks.stateReducers.push(reducer);
    hooks.useInstanceBeforeDimensions.push(useInstanceBeforeDimensions);
  };

const isTouchEvent = (
  event: React.MouseEvent | React.TouchEvent,
): event is React.TouchEvent => {
  return event.type === 'touchstart';
};

const defaultGetResizerProps =
  (ownerDocument: React.RefObject<Document | undefined>) =>
  (
    props: TableKeyedProps,
    {
      instance,
      header,
      nextHeader,
    }: {
      instance: TableInstance;
      header: HeaderGroup;
      nextHeader: HeaderGroup;
    },
  ) => {
    const { dispatch } = instance;

    const onResizeStart = (
      e: React.TouchEvent | React.MouseEvent,
      header: HeaderGroup,
    ) => {
      // lets not respond to multiple touches (e.g. 2 or 3 fingers)
      if (isTouchEvent(e) && e.touches && e.touches.length > 1) {
        return;
      }

      const headerIdWidths = getLeafHeaders(header).map((d) => [
        d.id,
        getHeaderWidth(d),
      ]);
      const nextHeaderIdWidths = nextHeader
        ? getLeafHeaders(nextHeader).map((d) => [d.id, getHeaderWidth(d)])
        : [];

      const clientX = isTouchEvent(e)
        ? Math.round(e.touches[0].clientX)
        : e.clientX;

      const dispatchMove = (clientXPos: number) =>
        dispatch({ type: actions.columnResizing, clientX: clientXPos });
      const dispatchEnd = () =>
        dispatch({
          type: actions.columnDoneResizing,
        });

      const handlersAndEvents = {
        mouse: {
          moveEvent: 'mousemove',
          moveHandler: (e: MouseEvent) => dispatchMove(e.clientX),
          upEvent: 'mouseup',
          upHandler: () => {
            ownerDocument.current?.removeEventListener(
              'mousemove',
              handlersAndEvents.mouse.moveHandler,
            );
            ownerDocument.current?.removeEventListener(
              'mouseup',
              handlersAndEvents.mouse.upHandler,
            );
            ownerDocument.current?.removeEventListener(
              'mouseleave',
              handlersAndEvents.mouse.upHandler,
            );
            dispatchEnd();
          },
        },
        touch: {
          moveEvent: 'touchmove',
          moveHandler: (e: TouchEvent) => {
            if (e.cancelable) {
              e.preventDefault();
              e.stopPropagation();
            }
            dispatchMove(e.touches[0].clientX);
          },
          upEvent: 'touchend',
          upHandler: () => {
            ownerDocument.current?.removeEventListener(
              handlersAndEvents.touch.moveEvent,
              handlersAndEvents.touch.moveHandler,
            );
            ownerDocument.current?.removeEventListener(
              handlersAndEvents.touch.upEvent,
              handlersAndEvents.touch.moveHandler,
            );
            dispatchEnd();
          },
        },
      };

      const events = isTouchEvent(e)
        ? handlersAndEvents.touch
        : handlersAndEvents.mouse;
      const passiveIfSupported = passiveEventSupported()
        ? { passive: false }
        : false;
      ownerDocument.current?.addEventListener(
        events.moveEvent,
        events.moveHandler,
        passiveIfSupported,
      );
      ownerDocument.current?.addEventListener(
        events.upEvent,
        events.upHandler,
        passiveIfSupported,
      );
      if (!isTouchEvent(e)) {
        ownerDocument.current?.addEventListener(
          'mouseleave',
          handlersAndEvents.mouse.upHandler,
          passiveIfSupported,
        );
      }

      dispatch({
        type: actions.columnStartResizing,
        columnId: header.id,
        columnWidth: getHeaderWidth(header),
        nextColumnWidth: getHeaderWidth(nextHeader),
        headerIdWidths,
        nextHeaderIdWidths,
        clientX,
      });
    };

    return [
      props,
      {
        onClick: (e: React.MouseEvent) => {
          // Prevents from triggering sort
          e.stopPropagation();
        },
        onMouseDown: (e: React.MouseEvent) => {
          e.persist();
          // Prevents from triggering drag'n'drop
          e.preventDefault();
          // Prevents from triggering sort
          e.stopPropagation();
          onResizeStart(e, header);
        },
        onTouchStart: (e: React.TouchEvent) => {
          e.persist();
          // Prevents from triggering drag'n'drop
          e.preventDefault();
          onResizeStart(e, header);
        },
        style: {
          cursor: 'col-resize',
        },
        draggable: false,
        role: 'separator',
      },
    ];
  };

useResizeColumns.pluginName = 'useResizeColumns';

const reducer = <T extends Record<string, unknown>>(
  newState: TableState<T>,
  action: ActionType,
  previousState: TableState<T>,
  instance?: TableInstance<T>,
) => {
  if (action.type === actions.init) {
    return {
      ...newState,
      columnResizing: {
        columnWidths: {},
      },
    };
  }

  if (action.type === actions.resetResize) {
    return {
      ...newState,
      columnResizing: {
        columnWidths: {},
      },
    };
  }

  if (action.type === actions.columnStartResizing) {
    const {
      clientX,
      columnId,
      columnWidth,
      nextColumnWidth,
      headerIdWidths,
      nextHeaderIdWidths,
    } = action;

    return {
      ...newState,
      columnResizing: {
        ...newState.columnResizing,
        startX: clientX,
        columnWidth,
        nextColumnWidth,
        headerIdWidths,
        nextHeaderIdWidths,
        isResizingColumn: columnId,
      },
    };
  }

  if (action.type === actions.columnResizing) {
    const { clientX } = action;
    const {
      startX = 0,
      columnWidth = 1,
      nextColumnWidth = 1,
      headerIdWidths = [],
      nextHeaderIdWidths = [],
    } = newState.columnResizing;

    if (!instance) {
      return newState;
    }

    const deltaX = clientX - startX;

    const newColumnWidths = getColumnWidths(
      headerIdWidths,
      deltaX / columnWidth,
    );

    const isTableWidthDecreasing =
      calculateTableWidth(newColumnWidths, instance.flatHeaders) <
      instance.tableWidth;
    const newNextColumnWidths =
      instance?.columnResizeMode === 'fit' ||
      (instance?.columnResizeMode === 'expand' && isTableWidthDecreasing)
        ? getColumnWidths(nextHeaderIdWidths, -deltaX / nextColumnWidth)
        : {};

    if (
      !isNewColumnWidthsValid(newColumnWidths, instance.flatHeaders) ||
      !isNewColumnWidthsValid(newNextColumnWidths, instance.flatHeaders) ||
      !isNewTableWidthValid(
        { ...newColumnWidths, ...newNextColumnWidths },
        instance,
      )
    ) {
      return newState;
    }

    // Setting `width` here because it might take several rerenders until actual column width is set.
    // Also setting after the actual resize happened.
    instance?.flatHeaders.forEach((h) => {
      if (!h.width) {
        h.width = h.resizeWidth;
      }
    });

    return {
      ...newState,
      columnResizing: {
        ...newState.columnResizing,
        columnWidths: {
          ...newState.columnResizing.columnWidths,
          ...newColumnWidths,
          ...newNextColumnWidths,
        },
      },
    };
  }

  if (action.type === actions.columnDoneResizing) {
    return {
      ...newState,
      columnResizing: {
        ...newState.columnResizing,
        startX: undefined,
        isResizingColumn: undefined,
      },
    };
  }
  return newState;
};

const getColumnWidths = (
  headerIdWidths: [string, number][],
  deltaPercentage: number,
) => {
  const columnWidths: Record<string, number> = {};
  headerIdWidths.forEach(([headerId, headerWidth]) => {
    columnWidths[headerId] = Math.max(
      headerWidth + headerWidth * deltaPercentage,
      0,
    );
  });
  return columnWidths;
};

const isNewColumnWidthsValid = <T extends Record<string, unknown>>(
  columnWidths: Record<string, number>,
  headers: ColumnInstance<T>[] | undefined,
) => {
  // Prevents from going outside the column bounds
  if (Object.values(columnWidths).some((width) => width <= 1)) {
    return false;
  }

  for (const [headerId, width] of Object.entries(columnWidths)) {
    const header = headers?.find((h) => h.id === headerId);
    if (!header) {
      continue;
    }

    const minWidth = header.minWidth || 0;
    const maxWidth = header.maxWidth || Infinity;
    if (width < minWidth || width > maxWidth) {
      return false;
    }
  }

  return true;
};

const isNewTableWidthValid = <T extends Record<string, unknown>>(
  columnWidths: Record<string, number>,
  instance: TableInstance<T>,
) => {
  if (instance.columnResizeMode === 'fit') {
    return true;
  }

  let newTableWidth = 0;
  for (const header of instance.flatHeaders) {
    newTableWidth += columnWidths[header.id]
      ? columnWidths[header.id]
      : getHeaderWidth(header);
  }
  // `tableWidth` is whole number therefore we need to round the `newTableWidth`
  if (Math.round(newTableWidth) < instance.tableWidth) {
    return false;
  }

  return true;
};

const useInstanceBeforeDimensions = <T extends Record<string, unknown>>(
  instance: TableInstance<T>,
) => {
  const {
    flatHeaders,
    getHooks,
    state: { columnResizing },
    columnResizeMode,
  } = instance;

  const getInstance = useGetLatest(instance);

  flatHeaders.forEach((header, index) => {
    const resizeWidth = columnResizing.columnWidths[header.id];
    header.width = resizeWidth || header.width || header.originalWidth;
    header.isResizing = columnResizing.isResizingColumn === header.id;

    const headerToResize =
      header.disableResizing && columnResizeMode === 'fit'
        ? getPreviousResizableHeader(header, instance)
        : header;

    // When `columnResizeMode` is `expand` and it is a last column,
    // then try to find some column on the left side to resize
    // when table width is decreasing.
    const nextResizableHeader =
      columnResizeMode === 'expand' && index === flatHeaders.length - 1
        ? getPreviousResizableHeader(header, instance)
        : getNextResizableHeader(header, instance);

    header.canResize =
      header.disableResizing != null ? !header.disableResizing : true;
    // Show resizer when header is resizable or when next header is resizable
    // and there is resizable columns on the left side of the resizer.
    if (columnResizeMode === 'fit') {
      header.isResizerVisible =
        (header.canResize && !!nextResizableHeader) ||
        (headerToResize && !!instance.flatHeaders[index + 1]?.canResize);
      // When resize mode is `expand` show resizer on the current resizable column.
    } else {
      header.isResizerVisible = header.canResize && !!headerToResize;
    }

    header.getResizerProps = makePropGetter(getHooks().getResizerProps, {
      instance: getInstance(),
      header: headerToResize,
      nextHeader: nextResizableHeader,
    });
  });
};

const getPreviousResizableHeader = <T extends Record<string, unknown>>(
  headerColumn: ColumnInstance<T>,
  instance: TableInstance<T>,
) => {
  const headersList = (
    headerColumn.parent?.columns || instance.flatHeaders
  ).filter(({ isVisible }) => isVisible);
  const headerIndex = headersList.findIndex((h) => h.id === headerColumn.id);
  return [...headersList]
    .slice(0, headerIndex)
    .reverse()
    .find((h) => !h.disableResizing);
};

const getNextResizableHeader = <T extends Record<string, unknown>>(
  headerColumn: ColumnInstance<T>,
  instance: TableInstance<T>,
) => {
  const headersList = (
    headerColumn.parent?.columns || instance.flatHeaders
  ).filter(({ isVisible }) => isVisible);
  const headerIndex = headersList.findIndex((h) => h.id === headerColumn.id);
  return [...headersList]
    .slice(headerIndex + 1)
    .find((h) => !h.disableResizing);
};

function getLeafHeaders(header: HeaderGroup) {
  const leafHeaders: HeaderGroup[] = [];
  const recurseHeader = (header: HeaderGroup) => {
    if (header.columns && header.columns.length) {
      header.columns.map(recurseHeader);
    }
    leafHeaders.push(header);
  };
  recurseHeader(header);
  return leafHeaders;
}

const getHeaderWidth = <T extends Record<string, unknown>>(
  header: ColumnInstance<T>,
) => {
  return Number(header.width || header.resizeWidth || 0);
};

const calculateTableWidth = <T extends Record<string, unknown>>(
  columnWidths: Record<string, number>,
  headers: ColumnInstance<T>[],
) => {
  let newTableWidth = 0;
  for (const header of headers) {
    newTableWidth += columnWidths[header.id]
      ? columnWidths[header.id]
      : getHeaderWidth(header);
  }
  return newTableWidth;
};

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#safely_detecting_option_support
let passiveSupported: boolean | null = null;
const passiveEventSupported = () => {
  // memoize support to avoid adding multiple test events
  if (passiveSupported != null) {
    return passiveSupported;
  }
  try {
    const options = {
      once: true,
      get passive() {
        passiveSupported = true;
        return false;
      },
    };

    window.addEventListener(
      'test' as keyof WindowEventHandlersEventMap,
      () => {},
      options,
    );
  } catch {
    passiveSupported = false;
  }
  return passiveSupported;
};
