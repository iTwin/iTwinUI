/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Table } from '@itwin/itwinui-react';

export default () => {
  const columns = React.useMemo(
    () => [
      {
        id: 'index',
        Header: '#',
        accessor: 'index',
        width: 80,
        disableResizing: true,
      },
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
      },
      {
        id: 'description',
        Header: 'Description',
        accessor: 'description',
        fieldType: 'text',
        minWidth: 100,
      },
      {
        id: 'id',
        Header: 'ID',
        accessor: 'id',
        width: 100,
        disableResizing: true,
      },
      {
        id: 'startDate',
        Header: 'Start date',
        accessor: 'startDate',
        Cell: (props) => {
          return (
            <>{props.row.original.startDate.toLocaleDateString('en-US')}</>
          );
        },
        width: 100,
        disableResizing: true,
      },
      {
        id: 'endDate',
        Header: 'End date',
        Cell: (props) => {
          return <>{props.row.original.endDate.toLocaleDateString('en-US')}</>;
        },
        maxWidth: 200,
      },
    ],
    [],
  );

  const data = React.useMemo(
    () => [
      {
        index: 1,
        name: 'Name1',
        description: 'Description1',
        id: '111',
        startDate: new Date('May 1, 2021'),
        endDate: new Date('Jun 1, 2021'),
      },
      {
        index: 2,
        name: 'Name2',
        description: 'Description2',
        id: '222',
        startDate: new Date('May 2, 2021'),
        endDate: new Date('Jun 2, 2021'),
      },
      {
        index: 3,
        name: 'Name3',
        description: 'Description3',
        id: '333',
        startDate: new Date('May 3, 2021'),
        endDate: new Date('Jun 3, 2021'),
      },
    ],
    [],
  );

  const [columnResizeMode, setColumnResizeMode] =
    React.useState <
    TableProps <
    TableStoryDataType >
    ['columnResizeMode'] >
    'fit';

  return (
    <>
      <InputGroup label='Resize mode' displayStyle='inline'>
        <Radio
          name='choice'
          value='fit'
          onChange={() => setColumnResizeMode('fit')}
          label='fit'
          checked={columnResizeMode === 'fit'}
        />
        <Radio
          name='choice'
          value='expand'
          onChange={() => setColumnResizeMode('expand')}
          label='expand'
          checked={columnResizeMode === 'expand'}
        />
      </InputGroup>
      <Table
        columns={columns}
        data={data}
        emptyTableContent='No data.'
        isResizable
        isSortable
        columnResizeMode={columnResizeMode}
      />
    </>
  );
};
