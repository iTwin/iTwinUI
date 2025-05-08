/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Table } from '@itwin/itwinui-react';

export default () => {
  const pageSizeList = React.useMemo(() => [50, 100, 150], []);
  const maxRowsCount = React.useMemo(() => 60000, []);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [currentPageSize, setCurrentPageSize] = React.useState(pageSizeList[0]);
  const [filter, setFilter] = React.useState({
    name: '',
    description: '',
  });
  const [filteredData, setFilteredData] = React.useState(undefined);
  const [totalRowsCount, setTotalRowsCount] = React.useState(maxRowsCount);

  const generateData = (start, end) => {
    return Array(end - start)
      .fill(null)
      .map((_, index) => {
        if (
          filteredData !== undefined &&
          !(filter.name === '' && filter.description === '')
        ) {
          return filteredData[index];
        } else {
          return {
            name: `Name${start + index}`,
            description: `Description${start + index}`,
          };
        }
      });
  };

  const [data, setData] = React.useState(() => generateData(0, 25));

  const isPassFilter = React.useCallback((dataRow, filter) => {
    let isPassName = false;
    let isPassDescription = false;
    // check that the name passes a filter, if there is one
    if (!filter.name || (filter.name && dataRow.name.includes(filter.name))) {
      isPassName = true;
    }
    // check that the description passes a filter, if there is one
    if (
      !filter.description ||
      (filter.description && dataRow.description.includes(filter.description))
    ) {
      isPassDescription = true;
    }
    return isPassName && isPassDescription;
  }, []);

  const generateFilteredData = React.useCallback(
    (filter) => {
      let dataNumber = 0;
      const dataArray = [];
      let newData = { name: '', description: '' };
      do {
        do {
          newData = {
            name: `Name${dataNumber}`,
            description: `Description${dataNumber}`,
          };
          dataNumber++;
        } while (!isPassFilter(newData, filter) && dataNumber < maxRowsCount);
        if (isPassFilter(newData, filter)) {
          dataArray.push(newData);
        }
      } while (dataNumber < maxRowsCount);

      setFilteredData(dataArray);
      return dataArray;
    },
    [isPassFilter, maxRowsCount],
  );

  const onFilter = React.useCallback(
    (filters) => {
      setFilter({
        name: filters.find((f) => f.id == 'name')?.value ?? '',
        description: filters.find((f) => f.id == 'description')?.value ?? '',
      });
      setIsLoading(true);
      setData([]);
      setCurrentPage(0);
      // simulate a filtered request
      setTimeout(() => {
        setIsLoading(false);
        const filteredData = generateFilteredData({
          name: filters.find((f) => f.id === 'name')?.value ?? '',
          description: filters.find((f) => f.id === 'description')?.value ?? '',
        });
        setData(filteredData.slice(0, currentPageSize));
        setTotalRowsCount(filteredData.length);
      }, 500);
    },
    [currentPageSize, generateFilteredData],
  );

  const columns = [
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
  ];

  const paginator = useCallback(
    (props) => (
      <TablePaginator
        {...props}
        onPageChange={(page) => {
          setIsLoading(true);
          setData([]);
          setCurrentPage(page);
          // Simulating a request
          setTimeout(() => {
            setIsLoading(false);
            if (
              filteredData !== undefined &&
              !(filter.name === '' && filter.description === '')
            ) {
              setData(
                filteredData.slice(
                  page * props.pageSize,
                  (page + 1) * props.pageSize,
                ),
              );
            } else {
              setData(
                generateData(
                  page * props.pageSize,
                  (page + 1) * props.pageSize,
                ),
              );
            }
          }, 500);
        }}
        onPageSizeChange={(size) => {
          if (
            filteredData !== undefined &&
            !(filter.name === '' && filter.description === '')
          ) {
            setData(
              filteredData.slice(currentPage * size, (currentPage + 1) * size),
            );
          } else {
            setData(generateData(currentPage * size, (currentPage + 1) * size));
          }
          setCurrentPageSize(size);
          props.onPageSizeChange(size);
        }}
        pageSizeList={pageSizeList}
        currentPage={currentPage}
        isLoading={false}
        // Imagining we know the total count of data items
        totalRowsCount={totalRowsCount}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentPage, pageSizeList, totalRowsCount],
  );

  return (
    <div style={{ height: '90vh' }}>
      <Table
        caption='Products'
        emptyTableContent='No data.'
        isLoading={isLoading}
        columns={columns}
        data={data}
        pageSize={25}
        paginatorRenderer={paginator}
        style={{ height: '100%' }}
        manualPagination
        onFilter={onFilter}
        manualFilters={true}
      />
    </div>
  );
};
