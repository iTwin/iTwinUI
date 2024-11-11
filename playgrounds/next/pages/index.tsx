/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Table } from '@itwin/itwinui-react';
import { Row } from '@itwin/itwinui-react/react-table';

export default () => {
  const columns: any = React.useMemo(
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
  const data = React.useMemo(() => {
    const size = 50;
    const arr = new Array(size);
    for (let i = 0; i < size; ++i) {
      arr[i] = {
        name: `Name${i}`,
        description: `Description${i}`,
      };
    }
    return arr;
  }, []);

  const subComponent = React.useCallback(
    (row: Row<{ name: string; description: string }>) => {
      return <div>{row.original.name}</div>;
    },
    [],
  );
  return (
    <Table
      emptyTableContent='No data.'
      isSelectable
      isSortable
      data={data}
      subComponent={subComponent}
      columns={columns}
    />
  );
};
