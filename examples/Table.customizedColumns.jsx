/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Table } from '@itwin/itwinui-react';

export default () => {
  const onExpand = useCallback(
    (rows, state) =>
      console.log(
        `Expanded rows: ${JSON.stringify(rows)}. Table state: ${JSON.stringify(
          state,
        )}`,
      ),
    [],
  );

  const data = React.useMemo(
    () => [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name2', description: 'Description2' },
      { name: 'Name3', description: 'Description3' },
      { name: 'Name4', description: 'Description4' },
    ],
    [],
  );

  const isCheckboxDisabled = useCallback((rowData) => {
    return rowData.name === 'Name1';
  }, []);
  const isExpanderDisabled = useCallback((rowData) => {
    return rowData.name === 'Name2';
  }, []);
  const isCellDisabled = useCallback((rowData) => {
    return rowData.name === 'Name3';
  }, []);
  const isRowDisabled = useCallback((rowData) => {
    return rowData.name === 'Name4';
  }, []);

  const subComponent = useCallback(
    (row) => (
      <div style={{ padding: 16 }}>
        <Text variant='leading'>Extra information</Text>
        <pre>
          <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
        </pre>
      </div>
    ),
    [],
  );

  const columns = React.useMemo(
    () => [
      SelectionColumn({
        isDisabled: isCheckboxDisabled,
      }),
      ExpanderColumn({ subComponent, isDisabled: isExpanderDisabled }),
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
        cellRenderer: (props) => (
          <DefaultCell
            {...props}
            isDisabled={(rowData) =>
              isCellDisabled(rowData) || isRowDisabled(rowData)
            }
          />
        ),
      },
      {
        id: 'description',
        Header: 'Description',
        accessor: 'description',
        maxWidth: 200,
      },
    ],
    [
      isCheckboxDisabled,
      subComponent,
      isExpanderDisabled,
      isCellDisabled,
      isRowDisabled,
    ],
  );

  return (
    <Table
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      subComponent={subComponent}
      onExpand={onExpand}
      isSelectable
      isRowDisabled={isRowDisabled}
      rowProps={({ index }) => ({
        onClick: (e) => index === 0 && e.preventDefault(),
      })}
    />
  );
};
