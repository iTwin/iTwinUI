/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { useCallback } from 'react';
import { Table, InputGroup, Checkbox } from '@itwin/itwinui-react';

export default () => {
  const tableInstance = React.useRef(undefined);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [expandedRows, setExpandedRows] = React.useState([]);

  const columns = React.useMemo(
    () => [
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
      },
      {
        id: 'description',
        Header: 'Description',
        accessor: 'description',
      },
    ],
    [],
  );

  const data = React.useMemo(
    () => [
      {
        id: '1',
        name: 'Row 1',
        description: 'Description 1',
        subRows: [
          {
            id: '1.1',
            name: 'Row 1.1',
            description: 'Description 1.1',
            subRows: [],
          },
          {
            id: '1.2',
            name: 'Row 1.2',
            description: 'Description 1.2',
            subRows: [
              {
                id: '1.2.1',
                name: 'Row 1.2.1',
                description: 'Description 1.2.1',
                subRows: [],
              },
              {
                id: '1.2.2',
                name: 'Row 1.2.2',
                description: 'Description 1.2.2',
                subRows: [],
              },
              {
                id: '1.2.3',
                name: 'Row 1.2.3',
                description: 'Description 1.2.3',
                subRows: [],
              },
              {
                id: '1.2.4',
                name: 'Row 1.2.4',
                description: 'Description 1.2.4',
                subRows: [],
              },
            ],
          },
          {
            id: '1.3',
            name: 'Row 1.3',
            description: 'Description 1.3',
            subRows: [],
          },
          {
            id: '1.4',
            name: 'Row 1.4',
            description: 'Description 1.4',
            subRows: [],
          },
        ],
      },
      {
        id: '2',
        name: 'Row 2',
        description: 'Description 2',
        subRows: [
          {
            id: '2.1',
            name: 'Row 2.1',
            description: 'Description 2.1',
            subRows: [],
          },
          {
            id: '2.2',
            name: 'Row 2.2',
            description: 'Description 2.2',
            subRows: [],
          },
          {
            id: '2.3',
            name: 'Row 2.3',
            description: 'Description 2.3',
            subRows: [],
          },
        ],
      },
      { id: '3', name: 'Row 3', description: 'Description 3', subRows: [] },
    ],
    [],
  );

  return (
    <>
      <InputGroup label='Control selected rows' style={{ marginBottom: 11 }}>
        {data.map((data, index) => (
          <Checkbox
            key={index}
            label={data.name}
            checked={selectedRows.some((row) => row.name === data.name)}
            onChange={(e) => {
              tableInstance.current?.toggleRowSelected(
                data.id,
                e.target.checked,
              );
            }}
          />
        ))}
      </InputGroup>
      <InputGroup label='Control expanded rows' style={{ marginBottom: 11 }}>
        {data.map((data, index) => (
          <Checkbox
            key={index}
            label={data.name}
            checked={expandedRows.some((row) => row.name === data.name)}
            onChange={(e) => {
              tableInstance.current?.toggleRowExpanded(
                [data.id],
                e.target.checked,
              );
            }}
          />
        ))}
      </InputGroup>
      <Table
        caption='Demo'
        columns={columns}
        emptyTableContent='No data.'
        stateReducer={useCallback((newState, action, prevState, instance) => {
          tableInstance.current = instance;
          return newState;
        }, [])}
        isSelectable
        onSelect={useCallback((selected) => {
          setSelectedRows(selected ?? []);
        }, [])}
        onExpand={useCallback((expanded) => {
          setExpandedRows(expanded ?? []);
        }, [])}
        getRowId={useCallback((rowData) => rowData.id, [])}
        data={data}
      />
    </>
  );
};
