import { SvgMore } from '@itwin/itwinui-icons-react';
import {
  ActionColumn,
  Button,
  DefaultCell,
  DropdownMenu,
  IconButton,
  Input,
  MenuItem,
  Table,
  tableFilters,
} from '@itwin/itwinui-react';
import { TableFilterProps } from '@itwin/itwinui-react/cjs/core/Table/index.js';
import { useCallback, useMemo, useState } from 'react';
import type {
  CellProps,
  // CellRendererProps,
  Column,
  Row,
  TableInstance,
  TableState,
  Renderer,
} from 'react-table';

type ValueOf<T> = T[keyof T];

const App = () => {
  // type TableStoryDataType = Record<string, any>;
  // interface TableStoryDataType extends Record<string, any> {
  interface TableStoryDataType extends Record<string, any> {
    1: string;
    // price: number;
    // // [K in string]: any;
    // quantity: number;
    // rating: number;
    // deliveryTime: number;
    // status: 'positive' | 'negative' | 'warning' | undefined;
    // subRows: TableStoryDataType[];
    // 1?: number;
  }

  // type MyType = {
  // "a_key": string,
  // "b_key": number,
  // "c_key": boolean,
  // };
  //   type q = ValueOf<{
  //     [K in keyof TableStoryDataType]: {
  //       accessor: K;
  //     }
  //   }>;

  const generateItem = useCallback(
    (index: number, parentRow = '', depth = 0): TableStoryDataType => {
      const keyValue = parentRow ? `${parentRow}.${index + 1}` : `${index + 1}`;
      const rating = (index % 4) + 1;
      return {
        1: `Product ${keyValue}`,
        // price: ((index % 10) + 1) * 15,
        // quantity: ((index % 10) + 1) * 150,
        // rating: rating,
        // deliveryTime: (index % 15) + 1,
        // status:
        //   rating >= 4 ? 'positive' : rating === 3 ? 'warning' : 'negative',
        // subRows:
        //   depth < 2
        //     ? Array(Math.round(index % 5))
        //         .fill(null)
        //         .map((_, index) => generateItem(index, keyValue, depth + 1))
        //     : [],
      };
    },
    [],
  );

  const data = useMemo(
    () =>
      Array(100)
        .fill(null)
        .map((_, index) => generateItem(index)),
    [generateItem],
  );

  const isRowDisabled = useCallback((rowData: TableStoryDataType) => {
    return rowData.product.endsWith('3');
  }, []);

  const menuItems = useCallback((close: () => void) => {
    return [
      <MenuItem key={1} onClick={() => close()}>
        Edit
      </MenuItem>,
      <MenuItem key={2} onClick={() => close()}>
        Delete
      </MenuItem>,
    ];
  }, []);

  const columns = useMemo(
    // (): Column<TableStoryDataType>[] => [
    () =>
      [
        {
          id: 'product',
          Header: 'Product',
          accessor: 'product',
          Filter: tableFilters.TextFilter(),
          // Filter: () => <div></div>,
          // disableToggleVisibility: true,
          // disableReordering: true,
          // width: 200,
          // testing1: (props: CellProps<TableStoryDataType>) => (
          // testing1: (props) => <div>{`${props}`}</div>,

          // sticky: 'left',
          // testing1: '',
          // testig
          // col
          Cell: (props) => <div></div>,
        },
        // {},
        // {
        //   id: 'price',
        //   Header: 'Price',
        //   // accessor: 'price',
        //   width: 200,
        //   Filter: tableFilters.NumberRangeFilter(),
        //   filter: 'between',
        //   disableReordering: true,
        //   sortType: 'number',
        //   // Cell1: (props) => {
        //   //   return <div></div>
        //   // },
        //   // Cell: (props: CellProps<Record<string, any>, number>) => {
        //   // cell
        //   // Cell: (props) => {
        //   //   return <div></div>;
        //   //   // return <>${props.value}</>;
        //   // },
        //   // Cell: (props) => {
        //   //   return <>${props.value}</>;
        //   // },
        //   sticky: 'left',
        // },
        // {
        //   id: 'quantity',
        //   Header: 'Quantity',
        //   // accessor: 'quantity',
        //   Filter: tableFilters.NumberRangeFilter(),
        //   filter: 'between',
        //   sortType: 'number',
        //   width: 400,
        // },
        // {
        //   id: 'rating',
        //   Header: 'Rating',
        //   // accessor: 'rating',
        //   Filter: tableFilters.NumberRangeFilter(),
        //   filter: 'between',
        //   sortType: 'number',
        //   width: 400,
        //   // cellRenderer: (props: CellRendererProps<TableStoryDataType>) => {
        //   //   return (
        //   //     <DefaultCell
        //   //       {...props}
        //   //       status={props.cellProps.row.original.status}
        //   //     >
        //   //       {props.cellProps.row.original.rating}/5
        //   //     </DefaultCell>
        //   //   );
        //   // },
        // },
        // {
        //   id: 'deliveryTime',
        //   Header: 'Delivery Time',
        //   // accessor: 'deliveryTime',
        //   Filter: tableFilters.NumberRangeFilter(),
        //   filter: 'between',
        //   sortType: 'number',
        //   width: 400,
        //   // Cell: (props: CellProps<TableStoryDataType>) => {
        //   //   return <>{props.value} day(s)</>;
        //   // },
        // },
        // {
        //   // accessor: 'actions',
        //   // ...ActionColumn({ columnManager: true }),
        //   // Cell: (props: CellProps<TableStoryDataType>) => (
        //   //   <DropdownMenu menuItems={menuItems}>
        //   //     <IconButton
        //   //       styleType='borderless'
        //   //       onClick={(e) => e.stopPropagation()}
        //   //       disabled={isRowDisabled(props.row.original)}
        //   //     >
        //   //       <SvgMore />
        //   //     </IconButton>
        //   //   </DropdownMenu>
        //   // ),
        //   accessor: 'deliveryTime',
        //   sticky: 'right',
        // },
        // ] satisfies Array<Column<Record<string, any>>>,
      ] satisfies Array<Column<TableStoryDataType>>,
    // ] as Column<TableStoryDataType>[],
    // ] as Column<TableStoryDataType>[],
    [isRowDisabled, menuItems],
  );

  // const rowProps = useCallback((row: Row<{ status: string | undefined }>) => {
  //   return {
  //     status: row.original.status,
  //   };
  // }, []);

  const [globalFilterValue, setGlobalFilterValue] = useState('');

  let testing0: TableStoryDataType = { 1: 'q' };
  let testing1: Record<string, any> = testing0;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '1000px',
        gap: '8px',
      }}
    >
      <Input
        placeholder='Search...'
        value={globalFilterValue}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
          setGlobalFilterValue(e.target.value)
        }
      />
      <div
        style={{
          height: '375px',
          maxHeight: '90vh',
        }}
      >
        <Table
          // columns={columns satisfies Array<Column<Record<string, any>>>}
          columns={columns}
          // columnsq={columns}
          emptyTableContent='No data.'
          // isRowDisabled={isRowDisabled}
          isSelectable
          isSortable
          isResizable
          enableColumnReordering
          data={data}
          style={{ height: '100%' }}
          enableVirtualization
          // rowProps={rowProps}
          globalFilterValue={globalFilterValue}
        />
      </div>
    </div>
  );
};

export default App;
