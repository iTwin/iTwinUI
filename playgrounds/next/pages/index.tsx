import { Button, Table, tableFilters } from '@itwin/itwinui-react';
import { useMemo } from 'react';
import makeData from '../helper/makedata';
import React from 'react';

export default function Home() {
  const columns = useMemo(
    () => [
      // {
      //   Header: 'Header',
      //   columns: [
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
      // ],
      // },
    ],
    [],
  );

  const generateItem = React.useCallback(
    (index: number, parentRow = '', depth = 0): TableStoryDataType => {
      const keyValue = parentRow ? `${parentRow}.${index + 1}` : `${index + 1}`;
      const rating = Math.round(Math.random() * 5);
      return {
        product: `Product ${keyValue}`,
        price: ((index % 10) + 1) * 15,
        quantity: ((index % 10) + 1) * 150,
        rating: rating,
        status:
          rating >= 4 ? 'positive' : rating === 3 ? 'warning' : 'negative',
        subRows:
          depth < 1
            ? Array(Math.round(index % 2))
                .fill(null)
                .map((_, index) => generateItem(index, keyValue, depth + 1))
            : [],
      };
    },
    [],
  );

  // const data: TableStoryDataType[] = React.useMemo(() => makeData(100), []);
  const data = React.useMemo(
    () =>
      Array(3)
        .fill(null)
        .map((_, index) => generateItem(index)),
    [generateItem],
  );

  // const data = useMemo(
  //   () => [
  //     {
  //       name: 'Row 1',
  //       description: 'Description 1',
  //       // Filter: tableFilters.TextFilter(),
  //       // subRows: [
  //       //   { name: 'Row 1.1', description: 'Description 1.1', subRows: [] },
  //       //   {
  //       //     name: 'Row 1.2',
  //       //     description: 'Description 1.2',
  //       //     subRows: [
  //       //       {
  //       //         name: 'Row 1.2.1',
  //       //         description: 'Description 1.2.1',
  //       //         subRows: [],
  //       //       },
  //       //       {
  //       //         name: 'Row 1.2.2',
  //       //         description: 'Description 1.2.2',
  //       //         subRows: [],
  //       //       },
  //       //       {
  //       //         name: 'Row 1.2.3',
  //       //         description: 'Description 1.2.3',
  //       //         subRows: [],
  //       //       },
  //       //       {
  //       //         name: 'Row 1.2.4',
  //       //         description: 'Description 1.2.4',
  //       //         subRows: [],
  //       //       },
  //       //     ],
  //       //   },
  //       //   { name: 'Row 1.3', description: 'Description 1.3', subRows: [] },
  //       //   { name: 'Row 1.4', description: 'Description 1.4', subRows: [] },
  //       // ],
  //     },
  //     {
  //       name: 'Row 2',
  //       description: 'Description 2',
  //       // subRows: [
  //       //   { name: 'Row 2.1', description: 'Description 2.1', subRows: [] },
  //       //   { name: 'Row 2.2', description: 'Description 2.2', subRows: [] },
  //       //   { name: 'Row 2.3', description: 'Description 2.3', subRows: [] },
  //       // ],
  //     },
  //     {
  //       name: 'Row 3',
  //       description: 'Description 3',
  //       // , subRows: []
  //     },
  //   ],
  //   [],
  // );

  type TableStoryDataType = {
    product: string;
    price: number;
    quantity: number;
    rating: number;
    status: 'positive' | 'negative' | 'warning' | undefined;
    subRows: TableStoryDataType[];
  };

  return (
    <>
      <Table
        columns={[
          {
            id: 'name',
            Header: 'Name',
            accessor: 'name',
            // Filter: tableFilters.TextFilter(),
          },
        ]}
        // columns={[
        //   // {
        //   //   Header: 'Header',
        //   //   columns: [
        //   {
        //     id: 'name',
        //     Header: 'Name',
        //     accessor: 'name',
        //     columns: [],
        //     q: '',
        //     // columns: [],
        //   },
        //   {
        //     id: 'description',
        //     Header: 'Description',
        //     accessor: 'description',
        //   },
        //   // ],
        //   // },
        // ]}
        // columns={useMemo(
        //   () => [
        //     // {
        //     //   Header: 'Header',
        //     //   columns: [
        //     {
        //       id: 'name',
        //       Header: 'Name',
        //       accessor: 'name',
        //     },
        //     {
        //       id: 'description',
        //       Header: 'Description',
        //       accessor: 'description',
        //     },
        //     // ],
        //     // },
        //   ],
        //   [],
        // )}
        // columns={columns}
        // columnsL={[]}
        // columnsL={[]}
        // columns={[
        //   {
        //     Header: 'Name',
        //     // columns: [
        //     //   {
        //     //     Header: 'First Name',
        //     //     accessor: 'firstName',
        //     //     // // Use a two-stage aggregator here to first
        //     //     // // count the total rows being aggregated,
        //     //     // // then sum any of those counts if they are
        //     //     // // aggregated further
        //     //     // aggregate: 'count',
        //     //     // Aggregated: ({ value }) => `${value} Names`,
        //     //   },
        //     //   {
        //     //     Header: 'Last Name',
        //     //     accessor: 'lastName',
        //     //     // // Use another two-stage aggregator here to
        //     //     // // first count the UNIQUE values from the rows
        //     //     // // being aggregated, then sum those counts if
        //     //     // // they are aggregated further
        //     //     // aggregate: 'uniqueCount',
        //     //     // Aggregated: ({ value }) => `${value} Unique Names`,
        //     //   },
        //     // ],
        //   },
        //   {
        //     Header: 'Info',
        //     // columns: [
        //     //   {
        //     //     Header: 'Age',
        //     //     accessor: 'age',
        //     //     // Aggregate the average age of visitors
        //     //     // aggregate: 'average',
        //     //     // Aggregated: ({ value }) => `${value} (avg)`,
        //     //   },
        //     //   {
        //     //     Header: 'Visits',
        //     //     accessor: 'visits',
        //     //     // // Aggregate the sum of all visits
        //     //     // aggregate: 'sum',
        //     //     // Aggregated: ({ value }) => `${value} (total)`,
        //     //   },
        //     //   {
        //     //     Header: 'Status',
        //     //     accessor: 'status',
        //     //   },
        //     //   {
        //     //     Header: 'Profile Progress',
        //     //     accessor: 'progress',
        //     //     // // Use our custom roundedMedian aggregator
        //     //     // aggregate: roundedMedian,
        //     //     // Aggregated: ({ value }) => `${value} (med)`,
        //     //   },
        //     // ],
        //   },
        // ]}
        // columns={useMemo(
        //   () => [
        //     // {
        //     //   Header: 'Header',
        //     //   columns: [
        //     // {
        //     //   id: 'name',
        //     //   Header: 'Name',
        //     //   accessor: 'name',
        //     // },
        //     // {
        //     //   id: 'description',
        //     //   Header: 'Description',
        //     //   accessor: 'description',
        //     //   f: 1,
        //     // },
        //     // { Header: '', name: 'name', description: 'description', f: 1 },
        //     // ],
        //     // },
        //   ],
        //   [],
        // )}
        // columns={columns as Column[]}
        // columns={[
        //   // {
        //   //   Header: 'Header',
        //   //   columns: [
        //   {
        //     id: 'name',
        //     Header: 'Name',
        //     accessor: 'name',
        //   },
        //   {
        //     id: 'description',
        //     Header: 'Description',
        //     accessor: 'description',
        //   },
        //   //   ],
        //   // },
        // ]}

        emptyTableContent='No data.'
        isSelectable
        data={data}
      />
    </>
  );
}
