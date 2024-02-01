import { Button, Table } from '@itwin/itwinui-react';
import { Column } from '@itwin/itwinui-react/react-table';
import React from 'react';

const App = () => {
  return (
    <>
      <Button>Hello world</Button>

      <br />

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
      })}
    </>
  );
};

export default App;

// ------------------------------------------------------------------------------------------------

type TableProps = React.ComponentProps<typeof Table<TestDataType>>;

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
type TestDataType = {
  name: string;
  description: string;
  accessor?: string;
  subRows?: TestDataType[];
  booleanValue?: boolean;
};

const mockedData = (count = 3): TestDataType[] =>
  [...new Array(count)].map((_, index) => ({
    name: `Name${index + 1}`,
    description: `Description${index + 1}`,
  }));

const mockedSubRowsData = () => [
  {
    name: 'Row 1',
    description: 'Description 1',
    subRows: [
      { name: 'Row 1.1', description: 'Description 1.1', subRows: [] },
      {
        name: 'Row 1.2',
        description: 'Description 1.2',
        subRows: [
          {
            name: 'Row 1.2.1',
            description: 'Description 1.2.1',
            subRows: [],
          },
          {
            name: 'Row 1.2.2',
            description: 'Description 1.2.2',
            subRows: [],
          },
        ],
      },
      { name: 'Row 1.3', description: 'Description 1.3', subRows: [] },
    ],
  },
  {
    name: 'Row 2',
    description: 'Description 2',
    subRows: [
      { name: 'Row 2.1', description: 'Description 2.1', subRows: [] },
      { name: 'Row 2.2', description: 'Description 2.2', subRows: [] },
    ],
  },
  { name: 'Row 3', description: 'Description 3', subRows: [] },
];

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

const flattenData = (data: TestDataType[]) => {
  const flatData: TestDataType[] = [];

  const handleItem = (item: TestDataType) => {
    flatData.push(item);
    if (item.subRows?.length) {
      item.subRows.forEach((subRow) => handleItem(subRow));
    }
  };
  data.forEach((item) => handleItem(item));

  return flatData;
};
