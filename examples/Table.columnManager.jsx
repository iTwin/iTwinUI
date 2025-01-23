/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  ActionColumn,
  DropdownMenu,
  MenuItem,
  IconButton,
  Table,
} from '@itwin/itwinui-react';
import { SvgMore } from '@itwin/itwinui-icons-react';

export default () => {
  const generateItem = React.useCallback((index, parentRow = '') => {
    const keyValue = parentRow ? `${parentRow}.${index + 1}` : `${index + 1}`;
    return {
      product: `Product ${keyValue}`,
      price: ((index % 10) + 1) * 15,
    };
  }, []);

  const menuItems = React.useCallback((close) => {
    return [
      <MenuItem key={1} onClick={() => close()}>
        Edit
      </MenuItem>,
      <MenuItem key={2} onClick={() => close()}>
        Delete
      </MenuItem>,
    ];
  }, []);

  const data = React.useMemo(
    () =>
      Array(3)
        .fill(null)
        .map((_, index) => generateItem(index)),
    [generateItem],
  );

  const columns = React.useMemo(
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
      {
        ...ActionColumn({ columnManager: true }),
        Cell: () => (
          <DropdownMenu
            menuItems={menuItems}
            onClick={(e) => e.stopPropagation()}
          >
            <IconButton
              styleType='borderless'
              onClick={(e) => e.stopPropagation()}
            >
              <SvgMore />
            </IconButton>
          </DropdownMenu>
        ),
        sticky: 'right',
      },
    ],
    [],
  );

  return (
    <div className='demo-container'>
      <Table columns={columns} emptyTableContent='No data.' data={data} />
    </div>
  );
};
