/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Table } from '@itwin/itwinui-react';

export default () => {
  const onClickHandler = (props) => console.log(props.row.original.name);

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
      },
      {
        id: 'click-me',
        Header: 'Click',
        width: 100,
        Cell: (props) => {
          const onClick = () => onClickHandler(props);
          return (
            <Anchor as='button' onClick={onClick}>
              Click me!
            </Anchor>
          );
        },
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

  const [data, setData] = React.useState(() => generateData(0, 100));

  const [isLoading, setIsLoading] = React.useState(false);

  const onBottomReached = useCallback(() => {
    console.log('Bottom reached!');
    setIsLoading(true);
    // Simulating request
    setTimeout(() => {
      setData(() => [...data, ...generateData(data.length, data.length + 100)]);
      setIsLoading(false);
    }, 1000);
  }, [data]);

  return (
    <Table
      enableVirtualization
      columns={columns}
      emptyTableContent='No data.'
      onBottomReached={onBottomReached}
      isLoading={isLoading}
      isSortable
      style={{ height: 440, maxHeight: '90vh' }}
      data={data}
      // Prevents from resetting filters and sorting when more data is loaded
      autoResetFilters={false}
      autoResetSortBy={false}
    />
  );
};
