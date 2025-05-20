/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Table } from '@itwin/itwinui-react';

export default () => {
  const onClickHandler = React.useCallback(
    (props) => console.log(props.row.original.name),
    [],
  );

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
        Filter: tableFilters.TextFilter(),
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
    [onClickHandler],
  );

  const data = React.useMemo(() => {
    const size = 100000;
    const arr = new Array(size);
    for (let i = 0; i < size; ++i) {
      arr[i] = {
        id: i.toString(),
        name: `Name${i}${i === 12345 ? ' - Scrolled to me!' : ''}`,
        description: `Description${i}${
          i === 12345 ? ' - Scrolled to me!' : ''
        }`,
      };
    }
    return arr;
  }, []);

  return (
    <Table
      caption='Products'
      enableVirtualization
      columns={columns}
      emptyTableContent='No data.'
      isSortable
      style={{ maxHeight: '90vh' }}
      data={data}
      scrollToRow={React.useCallback(
        (rows, data) =>
          rows.findIndex((row) => row.original.id === data[12345].id),
        [],
      )}
    />
  );
};
