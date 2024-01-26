// import "./App.scss";
import { Flex, Table } from '@itwin/itwinui-react';
import { Column } from '@itwin/itwinui-react/react-table';
import { useState, useMemo } from 'react';

export default function App() {
  const columns = useMemo(
    () => [
      {
        Header: 'Header',
        columns: [
          {
            id: 'id1',
            accessor: 'id1',
            Header: 'id1',
            width: '20%',
          },
          {
            id: 'id2',
            accessor: 'id2',
            Header: 'id2',
            width: '20%',
          },
          {
            id: 'id3',
            accessor: 'id3',
            Header: 'id3',
            width: '60%',
          },
        ],
      },
    ],
    [],
  );

  const data = [
    { name: 'Name1', description: 'Description1' },
    { name: 'Name2', description: 'Description2' },
    { name: 'Name3', description: 'Description3' },
  ];

  return (
    <Flex flexDirection='column' alignItems='stretch'>
      <div className='container'>
        <Table
          isResizable
          columns={columns}
          data={data}
          emptyTableContent='empty'
        />
      </div>

      {/* should resize only the current column when resize mode is expand */}
      {renderComponent({
        columns: [
          {
            id: 'name',
            Header: 'Name',
            accessor: 'name',
          },
          {
            id: 'description',
            Header: 'description',
            accessor: 'description',
          },
          {
            id: 'view',
            Header: 'view',
            Cell: () => <>View</>,
          },
        ],
        isResizable: true,
        columnResizeMode: 'expand',
      })}

      {/* should prevent from resizing past min-width */}
      {renderComponent({
        columns: [
          {
            id: 'name',
            Header: 'Name',
            accessor: 'name',
            minWidth: 50,
          },
          {
            id: 'description',
            Header: 'description',
            accessor: 'description',
            minWidth: 50,
          },
          {
            id: 'view',
            Header: 'view',
            Cell: () => <>View</>,
          },
        ],
        isResizable: true,
      })}
    </Flex>
  );
}

const renderComponent = (() => {
  type TestDataType = {
    name: string;
    description: string;
    accessor?: string;
    subRows?: TestDataType[];
    booleanValue?: boolean;
  };
  type TableProps = React.ComponentPropsWithoutRef<typeof Table<TestDataType>>;

  const columns = (
    onViewClick: () => void = () => {},
  ): Column<TestDataType>[] => [
    {
      id: 'name',
      Header: 'Name',
      accessor: 'name',
      width: 90,
    },
    {
      id: 'description',
      Header: 'Description',
      accessor: 'description',
      maxWidth: 200,
    },
    {
      id: 'view',
      Header: 'View',
      Cell: () => {
        return <span onClick={onViewClick}>View</span>;
      },
    },
  ];

  const mockedData = (count = 3): TestDataType[] =>
    [...new Array(count)].map((_, index) => ({
      name: `Name${index + 1}`,
      description: `Description${index + 1}`,
    }));

  function renderComponent(
    initialsProps?: Partial<TableProps>,
    onViewClick?: () => void,
    renderContainer?: HTMLElement,
  ) {
    const defaultProps: TableProps = {
      columns: columns(onViewClick),
      data: mockedData(),
      emptyTableContent: 'Empty table',
      emptyFilteredTableContent: 'No results. Clear filter.',
    };

    const props = { ...defaultProps, ...initialsProps };
    return <Table {...props} />;
  }

  return renderComponent;
})();
