import {
  Table,
  tableFilters,
  TablePaginator,
  TablePaginatorRendererProps,
} from '@itwin/itwinui-react';
import type { CellProps } from '@itwin/itwinui-react/react-table';
import { useSearchParams } from '@remix-run/react';
import React from 'react';

export default function Page() {
  const [searchParams] = useSearchParams();

  const config = getConfigFromSearchParams(searchParams);
  const { exampleType } = config;

  switch (exampleType) {
    case 'withTablePaginator':
      return <WithTablePaginator config={config} />;
    case 'allFilters':
      return <FiltersTest />;
    default:
      return <Default config={config} />;
  }
}

// ----------------------------------------------------------------------------

function FiltersTest() {
  return (
    <Table
      columns={React.useMemo(
        () => [
          {
            Header: '#',
            accessor: 'index',
            fieldType: 'number',
            Filter: tableFilters.NumberRangeFilter(),
            filter: 'between',
          },
          {
            Header: 'Name',
            accessor: 'name',
            fieldType: 'text',
            Filter: tableFilters.TextFilter(),
          },
          {
            Header: 'Date',
            accessor: 'date',
            Filter: tableFilters.DateRangeFilter(),
            filter: 'betweenDate',
            Cell: ({ value }: CellProps<any>) => {
              return <>{(value as Date).toLocaleDateString()}</>;
            },
          },
        ],
        [],
      )}
      data={baseData}
      emptyTableContent='No data.'
    />
  );
}

// ----------------------------------------------------------------------------

const getConfigFromSearchParams = (searchParams: URLSearchParams) => {
  const exampleType = searchParams.get('exampleType') || 'default';
  const disableResizing = searchParams.get('disableResizing') === 'true';
  const columnResizeMode = searchParams.get('columnResizeMode') || 'fit';
  const maxWidths = searchParams.getAll('maxWidth');
  const minWidths = searchParams.getAll('minWidth');
  const density = (searchParams.get('density') || undefined) as
    | 'default'
    | 'condensed'
    | 'extra-condensed'
    | undefined;
  const isSelectable = searchParams.get('isSelectable') === 'true';
  const rows = searchParams.get('rows');
  const filter = searchParams.get('filter') === 'true';
  const selectSubRows = !(searchParams.get('selectSubRows') === 'false');
  const enableVirtualization = searchParams.get('virtualization') === 'true';
  const empty = searchParams.get('empty') === 'true';
  const scroll = searchParams.get('scroll') === 'true';
  const oneRow = searchParams.get('oneRow') === 'true';
  const stateReducer = searchParams.get('stateReducer') === 'true';
  const scrollRow = Number(searchParams.get('scrollRow'));
  const hasSubComponent = searchParams.get('hasSubComponent') === 'true';
  const onSelect = searchParams.get('onSelect') === 'true';

  return {
    exampleType,
    disableResizing,
    columnResizeMode,
    maxWidths,
    minWidths,
    density,
    isSelectable,
    rows,
    filter,
    selectSubRows,
    enableVirtualization,
    empty,
    scroll,
    oneRow,
    stateReducer,
    scrollRow,
    hasSubComponent,
    onSelect,
  };
};

const Default = ({
  config,
}: {
  config: ReturnType<typeof getConfigFromSearchParams>;
}) => {
  const {
    oneRow,
    empty,
    columnResizeMode,
    density,
    disableResizing,
    enableVirtualization,
    filter,
    isSelectable,
    maxWidths,
    minWidths,
    scroll,
    scrollRow,
    selectSubRows,
    stateReducer,
    rows,
    hasSubComponent,
    onSelect,
  } = config;

  const virtualizedData = React.useMemo(() => {
    if (empty) {
      return [];
    }

    const size = oneRow ? 1 : 100000;
    const arr = new Array(size);
    for (let i = 0; i < size; ++i) {
      arr[i] = {
        index: i,
        name: `Name${i}`,
        description: `Description${i}`,
        id: i,
      };
    }
    return arr;
  }, [oneRow, empty]);

  const data = (() => {
    switch (rows) {
      case 'subRows':
        return dataWithSubrows;
      case 'large':
        return largeData;
      default:
        return baseData;
    }
  })();

  const isRowDisabled = React.useCallback(
    (rowData: Record<string, unknown>) => {
      return rowData.name === 'Name3.2';
    },
    [],
  );

  return (
    <>
      <Table
        columns={[
          {
            Header: '#',
            accessor: 'index',
            width: 100,
            maxWidth: parseInt(maxWidths[0]) || undefined,
            minWidth: parseInt(minWidths[0]) || undefined,
          },
          {
            Header: 'Name',
            accessor: 'name',
            maxWidth: parseInt(maxWidths[1]) || undefined,
            minWidth: parseInt(minWidths[1]) || undefined,
            disableResizing,
            Filter: filter ? tableFilters.TextFilter() : undefined,
          },
          {
            Header: 'Description',
            accessor: 'description',
            width: '200px',
          },
          {
            Header: 'ID',
            accessor: 'id',
            width: '8rem',
          },
        ]}
        data={enableVirtualization ? virtualizedData : data}
        emptyTableContent='No data.'
        isResizable
        isRowDisabled={isRowDisabled}
        isSelectable={isSelectable}
        isSortable
        density={density}
        columnResizeMode={columnResizeMode as 'fit' | 'expand' | undefined}
        selectSubRows={selectSubRows}
        enableVirtualization={enableVirtualization}
        style={{ maxHeight: '90vh' }}
        onSelect={onSelect ? () => console.log('onSelect') : undefined}
        scrollToRow={
          scroll
            ? (rows, data) =>
                rows.findIndex((row) => row.original === data[scrollRow])
            : undefined
        }
        stateReducer={
          stateReducer
            ? (newState, action, previousState, instance) => {
                if (action.type === 'toggleRowSelected') {
                  console.log(action.value);
                }
                return newState;
              }
            : undefined
        }
        subComponent={
          hasSubComponent
            ? (row) => (
                <div>{`Expanded component, name: ${row.original.name}`}</div>
              )
            : undefined
        }
      />
    </>
  );
};

const WithTablePaginator = ({
  config,
}: {
  config: ReturnType<typeof getConfigFromSearchParams>;
}) => {
  const { density } = config;

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
        maxWidth: 200,
        Filter: tableFilters.TextFilter(),
      },
    ],
    [],
  );

  const data = React.useMemo(
    () =>
      Array(505)
        .fill(null)
        .map((_, index) => ({
          name: `Name ${index}`,
          description: `Description ${index}`,
        })),
    [],
  );

  const paginator = React.useCallback(
    (props: TablePaginatorRendererProps) => (
      <TablePaginator id='paginator' {...props} />
    ),
    [],
  );

  return (
    <>
      <div id='container' style={{ height: '80vh' }}>
        <Table
          style={{ height: '100%' }}
          emptyTableContent='No data.'
          columns={columns}
          data={data}
          pageSize={50}
          density={density}
          paginatorRenderer={paginator}
        />
      </div>
    </>
  );
};

// ----------------------------------------------------------------------------

const baseData = [
  {
    index: 1,
    name: 'Name1',
    description: 'Description1',
    id: '111',
    date: new Date('Aug 1, 2023'),
  },
  {
    index: 2,
    name: 'Name2',
    description: 'Description2',
    id: '222',
    date: new Date('Aug 2, 2024'),
  },
  {
    index: 3,
    name: 'Name3',
    description: 'Description3',
    id: '333',
    date: new Date('Aug 3, 2025'),
  },
];

const largeData = new Array(100).fill(0).map((_, i) => ({
  index: i,
  name: `Name${i}`,
  description: `Description${i}`,
  id: i,
}));

const dataWithSubrows = [
  {
    index: 1,
    name: 'Name1',
    description: 'Description1',
    id: '111',
  },
  {
    index: 2,
    name: 'Name2',
    description: 'Description2',
    subRows: [
      {
        index: 2.1,
        name: 'Name2.1',
        description: 'Description2.1',
        id: '223',
      },
      {
        index: 2.2,
        name: 'Name2.2',
        description: 'Description2.2',
        id: '224',
      },
    ],
    id: '222',
  },
  {
    index: 3,
    name: 'Name3',
    description: 'Description3',
    subRows: [
      {
        index: 3.1,
        name: 'Name3.1',
        description: 'Description3.1',
        id: '334',
      },
      {
        index: 3.2,
        name: 'Name3.2',
        description: 'Description3.2',
        id: '335',
      },
    ],
    id: '333',
  },
];
