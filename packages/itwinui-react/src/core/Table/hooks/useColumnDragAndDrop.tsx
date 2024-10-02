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
import { styles } from '../../../styles.js';

const leftClassName = styles['iui-table-reorder-column-left'];
const rightClassName = styles['iui-table-reorder-column-right'];

actions.columnDragStart = 'columnDragStart';
actions.columnDragEnd = 'columnDragEnd';

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
    if (!isEnabled || header.disableReordering) {
      return props;
    }

    const onDragStart = () => {
      instance.dispatch({
        type: actions.columnDragStart,
        columnIndex: instance.flatHeaders.indexOf(header),
      });
    };

    const setOnDragColumnStyle = (
      event: React.DragEvent<HTMLDivElement>,
      position?: 'left' | 'right',
    ) => {
      const columnElement = event.currentTarget as HTMLElement;
      if (position === 'left') {
        columnElement.classList.remove(rightClassName);
        columnElement.classList.add(leftClassName);
      } else if (position === 'right') {
        columnElement.classList.remove(leftClassName);
        columnElement.classList.add(rightClassName);
      } else {
        columnElement.classList.remove(leftClassName);
        columnElement.classList.remove(rightClassName);
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
        type: actions.columnDragEnd,
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
    case actions.columnDragStart:
      return {
        ...newState,
        columnReorderStartIndex: action.columnIndex,
      };
    case actions.columnDragEnd:
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
