/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type * as React from 'react';
import { actions, makePropGetter, useGetLatest } from 'react-table';
import type {
  ActionType,
  HeaderGroup,
  Hooks,
  IdType,
  TableInstance,
  TableKeyedProps,
  TableState,
} from '../../../react-table/react-table.js';
import styles from '../../../styles.js';

const REORDER_ACTIONS = {
  columnDragStart: 'columnDragStart',
  columnDragEnd: 'columnDragEnd',
};

export const useColumnDragAndDrop =
  <T extends Record<string, unknown>>(isEnabled: boolean) =>
  (hooks: Hooks<T>) => {
    hooks.getDragAndDropProps = [defaultGetDragAndDropProps(isEnabled)];
    hooks.stateReducers.push(reducer);
    hooks.useInstance.push(useInstance);
  };

const defaultGetDragAndDropProps =
  <T extends Record<string, unknown>>(isEnabled: boolean) =>
  (
    props: TableKeyedProps,
    {
      instance,
      header,
    }: {
      instance: TableInstance<T>;
      header: HeaderGroup<T>;
    },
  ) => {
    let interval: NodeJS.Timeout | undefined;

    if (!isEnabled || header.disableReordering) {
      return props;
    }

    const onDragStart = () => {
      instance.dispatch({
        type: REORDER_ACTIONS.columnDragStart,
        columnIndex: instance.flatHeaders.indexOf(header),
      });
    };

    const setOnDragColumnStyle = (
      event: React.DragEvent<HTMLDivElement>,
      position?: 'left' | 'right',
    ) => {
      const columnElement = event.currentTarget as HTMLElement;
      columnElement.classList.remove(styles['iui-table-reorder-column-right']);
      columnElement.classList.remove(styles['iui-table-reorder-column-left']);
      if (position === 'left') {
        columnElement.classList.add(styles['iui-table-reorder-column-left']);
      } else if (position === 'right') {
        columnElement.classList.add(styles['iui-table-reorder-column-right']);
      }
    };

    const reorderColumns = (
      tableColumns: IdType<T>[],
      srcIndex: number,
      dstIndex: number,
    ) => {
      const newTableColumns = [...tableColumns];
      const [removed] = newTableColumns.splice(srcIndex, 1);
      newTableColumns.splice(dstIndex, 0, removed);
      return newTableColumns;
    };

    const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const tableHeaderWrapper = (event.target as any).parentElement
        .parentElement.parentElement as HTMLDivElement;
      const tableHeaderWrapperRect = tableHeaderWrapper.getBoundingClientRect();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const eventTarget = event.target as any;
      const tableBody =
        eventTarget.parentElement.parentElement.parentElement.parentElement.querySelector(
          '._iui3-table-body',
        ) as HTMLDivElement;

      const scrollRegionWidth = 100;
      const scrollBy = 10;

      const draggingNearEdge =
        event.clientX > tableHeaderWrapperRect.right - scrollRegionWidth ||
        event.clientX < tableHeaderWrapperRect.left + scrollRegionWidth;
      const reachedEdge =
        event.clientX >= tableHeaderWrapperRect.right ||
        event.clientX <= tableHeaderWrapperRect.left;

      const direction =
        event.clientX < tableHeaderWrapperRect.left + scrollRegionWidth
          ? 'left'
          : 'right';

      if (draggingNearEdge && !reachedEdge) {
        if (interval) {
          return;
        }

        interval = setInterval(() => {
          scrollHorizontally({
            event,
            wrapper: tableHeaderWrapper,
            scrollRegionWidth,
            scrollBy,
            draggingNearEdge,
            reachedEdge,
            tableHeaderWrapper,
            tableBody,
            direction,
          });
        }, 40);
      } else {
        clearInterval(interval);
        interval = undefined;
      }

      event.preventDefault();
      const headerIndex = instance.flatHeaders.indexOf(header);
      if (instance.state.columnReorderStartIndex !== headerIndex) {
        setOnDragColumnStyle(
          event,
          instance.state.columnReorderStartIndex > headerIndex
            ? 'left'
            : 'right',
        );
      }
    };

    const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
      setOnDragColumnStyle(event);

      if (interval) {
        clearInterval(interval);
        interval = undefined;
      }
    };

    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setOnDragColumnStyle(event);

      const columnIds = instance.allColumns.map((x) => x.id);
      const srcIndex = instance.state.columnReorderStartIndex;
      const dstIndex = columnIds.findIndex((x) => x === header.id);

      if (srcIndex === dstIndex || srcIndex === -1 || dstIndex === -1) {
        return;
      }

      instance.setColumnOrder(reorderColumns(columnIds, srcIndex, dstIndex));
      instance.dispatch({
        type: REORDER_ACTIONS.columnDragEnd,
        columnIndex: -1,
      });
    };

    return [
      props,
      {
        draggable: true,
        onDragStart,
        onDragOver,
        onDragLeave,
        onDrop,
      },
    ];
  };

const reducer = <T extends Record<string, unknown>>(
  newState: TableState<T>,
  action: ActionType,
) => {
  switch (action.type) {
    case actions.init:
      return {
        ...newState,
        columnReorderStartIndex: -1,
      };
    case REORDER_ACTIONS.columnDragStart:
      return {
        ...newState,
        columnReorderStartIndex: action.columnIndex,
      };
    case REORDER_ACTIONS.columnDragEnd:
      return {
        ...newState,
        columnReorderStartIndex: -1,
      };

    default:
      return newState;
  }
};

const useInstance = <T extends Record<string, unknown>>(
  instance: TableInstance<T>,
) => {
  const { flatHeaders, getHooks } = instance;

  const getInstance = useGetLatest(instance);

  flatHeaders.forEach((header) => {
    header.getDragAndDropProps = makePropGetter(
      getHooks().getDragAndDropProps,
      {
        instance: getInstance(),
        header,
      },
    );
  });
};

const scrollHorizontally = ({
  event,
  wrapper,
  scrollRegionWidth,
  scrollBy,
  draggingNearEdge,
  reachedEdge,
  tableHeaderWrapper,
  tableBody,
  direction,
}: {
  event: React.DragEvent<HTMLDivElement>;
  wrapper: HTMLDivElement;
  scrollRegionWidth: number;
  scrollBy: number;
  draggingNearEdge: boolean;
  reachedEdge: boolean;
  tableHeaderWrapper: HTMLDivElement;
  tableBody: HTMLDivElement;
  direction: 'left' | 'right';
}) => {
  tableBody;

  const weightedScrollByMultiplier =
    1 -
    (wrapper.getBoundingClientRect().right - event.clientX) / scrollRegionWidth;
  // const weightedScrollBy = weightedScrollByMultiplier * scrollBy;
  const weightedScrollBy = 1 * scrollBy;

  console.log('weightedScrollByMultiplier', weightedScrollByMultiplier);

  if (draggingNearEdge && !reachedEdge) {
    console.log('scrolling');
    tableHeaderWrapper.scrollBy(
      // tableBody.scrollBy(
      // 1,
      // 0,
      {
        left: direction === 'right' ? weightedScrollBy : -weightedScrollBy,
        top: 0,
        behavior: 'instant',
        // behavior: 'smooth',
      },
    );
  }
};
