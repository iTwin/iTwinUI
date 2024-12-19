/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Flex, LabeledSelect, Table } from '@itwin/itwinui-react';

export default () => {
  const [density, setDensity] = React.useState('default');
  const generateItem = React.useCallback((index, parentRow = '', depth = 0) => {
    const keyValue = parentRow ? `${parentRow}.${index + 1}` : `${index + 1}`;
    return {
      product: `Product ${keyValue}`,
      price: ((index % 10) + 1) * 15,
    };
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
    ],
    [],
  );

  return (
    <div className='demo-container'>
      <LabeledSelect
        label='Density'
        options={[
          { value: 'default', label: 'Default' },
          { value: 'condensed', label: 'Condensed' },
          { value: 'extra-condensed', label: 'Extra-condensed' },
        ]}
        onChange={(value) => setDensity(value)}
      />
      <Table
        columns={columns}
        emptyTableContent='No data.'
        data={data}
        density={density}
      />
    </div>
  );
};
