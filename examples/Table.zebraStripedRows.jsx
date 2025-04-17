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
        Filter: tableFilters.TextFilter(),
      },
      {
        id: 'description',
        Header: 'Description',
        accessor: 'description',
        maxWidth: 200,
        Filter: tableFilters.TextFilter(),
      },
    ],
    [],
  );

  const generateItem = useCallback((index, parentRow = '', depth = 0) => {
    const keyValue = parentRow ? `${parentRow}.${index}` : `${index}`;
    return {
      name: `Name ${keyValue}`,
      description: `Description ${keyValue}`,
      subRows:
        depth < 2
          ? Array(Math.round(index % 5))
              .fill(null)
              .map((_, index) => generateItem(index, keyValue, depth + 1))
          : [],
    };
  }, []);

  const data = React.useMemo(
    () =>
      Array(10)
        .fill(null)
        .map((_, index) => generateItem(index)),
    [generateItem],
  );

  return (
    <>
      <Table
        emptyTableContent='No data.'
        isSelectable
        isSortable
        styleType='zebra-rows'
        columns={columns}
        data={data}
        style={{ height: '100%' }}
      />
    </>
  );
};
