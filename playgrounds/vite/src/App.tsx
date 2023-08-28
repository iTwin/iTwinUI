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
  TableTypes,
  // ReactTableTypes,
} from '@itwin/itwinui-react';
import { TableFilterProps } from '@itwin/itwinui-react/cjs/core/Table/index.js';
import { useCallback, useMemo, useState } from 'react';
// import type {
//   CellProps,
//   // CellRendererProps,
//   Column,
//   Row,
//   TableInstance,
//   TableState,
//   Renderer,
// } from '@itwin/itwinui-react';

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
          Cell: (props) => <div></div>,
        },
      ] satisfies Array<TableTypes.Column<TableStoryDataType>>,
    [isRowDisabled, menuItems],
  );

  // const rowProps = useCallback((row: Row<{ status: string | undefined }>) => {
  //   return {
  //     status: row.original.status,
  //   };
  // }, []);

  const [globalFilterValue, setGlobalFilterValue] = useState('');

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
