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
        Filter: tableFilters.TextFilter({
          filter: 'Localized filter',
          clear: 'Localized clear',
        }),
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

  const generateData = (start, end) => {
    return Array(end - start)
      .fill(null)
      .map((_, index) => ({
        name: `Name${start + index}`,
        description: `Description${start + index}`,
      }));
  };

  const pageSizeList = React.useMemo(() => [50, 100, 150], []);
  const paginator = useCallback(
    (props) => (
      <TablePaginator
        {...props}
        pageSizeList={pageSizeList}
        localization={{
          pageSizeLabel: (size) => `${size} per localized page`,
          rangeLabel: (startIndex, endIndex, totalRows, isLoading) =>
            isLoading
              ? `${startIndex}-${endIndex} localized`
              : `${startIndex}-${endIndex} of localized ${totalRows}`,
          previousPage: 'Previous localized page',
          nextPage: 'Next localized page',
          goToPageLabel: (page) => `Go to localized page ${page}`,
          rowsPerPageLabel: 'Rows per localized page',
          rowsSelectedLabel: (totalSelectedRowsCount) =>
            `${totalSelectedRowsCount} localized ${
              totalSelectedRowsCount === 1 ? 'row' : 'rows'
            } selected`,
        }}
      />
    ),
    [pageSizeList],
  );

  return (
    <div style={{ height: '90vh' }}>
      <Table
        emptyTableContent='No localized data.'
        isSelectable
        isSortable
        columns={columns}
        data={generateData(0, 100)}
        pageSize={50}
        paginatorRenderer={paginator}
        style={{ height: '100%' }}
      />
    </div>
  );
};
