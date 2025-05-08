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
        maxWidth: 200,
      },
    ],
    [],
  );

  return (
    <Table
      caption='Products'
      columns={columns}
      data={[]}
      isLoading={true}
      emptyTableContent='No data.'
    />
  );
};
