/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Table } from '@itwin/itwinui-react';

export default () => {
  const rowsCount = React.useMemo(() => 100, []);
  const [isLoading, setIsLoading] = React.useState(false);
  const [filter, setFilter] = React.useState('');
  const [filteredData, setFilteredData] = React.useState(undefined);

  const generateData = (start, end) => {
    return Array(end - start)
      .fill(null)
      .map((_, index) => {
        if (filteredData !== undefined && !filter) {
          return filteredData[index];
        } else {
          return {
            name: `Name${start + index}`,
            description: `Description${start + index}`,
          };
        }
      });
  };

  const [data, setData] = React.useState(() => generateData(0, 100));

  const isPassFilter = React.useCallback((dataRow, filter) => {
    // check that the name passes a filter, if there is one
    if (!filter.name || (filter.name && dataRow.name.includes(filter.name))) {
      return true;
    }
    return false;
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
        } while (!isPassFilter(newData, filter) && dataNumber < rowsCount);
        if (isPassFilter(newData, filter)) {
          dataArray.push(newData);
        }
      } while (dataNumber < rowsCount);

      setFilteredData(dataArray);
      return dataArray;
    },
    [isPassFilter, rowsCount],
  );

  const CustomFilter = () => {
    const handleChange = (isChecked, filter) => {
      setFilter(isChecked ? filter : '');
      setIsLoading(true);
      setData([]);
      // simulate a filtered request
      setTimeout(() => {
        setIsLoading(false);
        const filteredData = generateFilteredData({
          name: isChecked ? filter : '',
          description: '',
        });
        setData(filteredData.slice(0, rowsCount));
      }, 500);
    };

    return (
      <BaseFilter style={{ alignItems: 'flex-start' }}>
        <Radio
          label="Contains '3'"
          onChange={({ target: { value } }) => {
            handleChange(value === 'on', '3');
          }}
          checked={filter === '3'}
          autoFocus={filter === '3'} // moving focus to checked radio button when filter dialog opens
        />
        <Radio
          label="Contains '5'"
          onChange={({ target: { value } }) => {
            handleChange(value === 'on', '5');
          }}
          checked={filter === '5'}
          autoFocus={filter === '5'}
        />
        <Radio
          label="Contains '7'"
          onChange={({ target: { value } }) => {
            handleChange(value === 'on', '7');
          }}
          checked={filter === '7'}
          autoFocus={filter === '7'}
        />
        <Radio
          label='No filter'
          onChange={({ target: { value } }) => {
            handleChange(value === 'on', '');
          }}
          checked={filter === ''}
          autoFocus={filter === ''}
        />
      </BaseFilter>
    );
  };

  const columns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      Filter: CustomFilter,
    },
    {
      id: 'description',
      Header: 'Description',
      accessor: 'description',
      maxWidth: 200,
    },
  ];

  return (
    <div style={{ height: '90vh' }}>
      <Table
        emptyTableContent='No data.'
        isLoading={isLoading}
        columns={columns}
        data={data}
        pageSize={100}
        style={{ height: '100%' }}
        manualPagination
        manualFilters={true}
      />
    </div>
  );
};
