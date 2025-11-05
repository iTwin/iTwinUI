import { Table } from '@itwin/itwinui-react';
import * as React from 'react';

export default function App() {
  const generateItem = React.useCallback((index: any, parentRow = '') => {
    const keyValue = parentRow ? `${parentRow}.${index + 1}` : `${index + 1}`;
    return {
      product: `Product ${keyValue}`,
      price: ((index % 10) + 1) * 15,
      subRows: [
        {
          product: `Sub Product ${keyValue}`,
          price: (((index % 10) + 1) * 15) / 2,
        },
      ],
    };
  }, []);

  const data = React.useMemo(
    () =>
      Array(3)
        .fill(null)
        .map((_, index) => generateItem(index)),
    [generateItem],
  );

  const columns: any = React.useMemo(
    () => [
      {
        id: 'product',
        Header: 'Product',
        accessor: 'product',
      },
      {
        id: 'price',
        Header: 'Price',
        accessor: 'price',
      },
    ],
    [],
  );

  return (
    <div className='demo-container'>
      <Table
        columns={columns}
        emptyTableContent='No data.'
        data={data}
        isSelectable={true}
        selectionMode='multi'
        selectSubRows={false}
        selectRowOnAllSubRows={false}
      />
    </div>
  );
}
