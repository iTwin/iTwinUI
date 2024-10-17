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
        name: 'name0',
        description: 'description0',
        subRows: [{ name: 'sub-name0', description: 'sub-description0' }],
      },
      {
        name: 'name1',
        description: 'description1',
        subRows: [{ name: 'sub-name1', description: 'sub-description1' }],
      },
    ],
    [],
  );
  return (
    <Table
      emptyTableContent='No data.'
      isSelectable
      isSortable
      data={data}
      columns={columns}
    />
  );
};
