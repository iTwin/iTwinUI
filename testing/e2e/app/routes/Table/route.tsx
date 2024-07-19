import {
  Table,
  tableFilters,
  TablePaginator,
  TablePaginatorRendererProps,
} from '@itwin/itwinui-react';
import { useSearchParams } from '@remix-run/react';
import * as React from 'react';

export default function TableTest() {
  const [searchParams] = useSearchParams();

  const config = getConfigFromSearchParams(searchParams);

  return config.exampleType === 'withTablePaginator' ? (
    <WithTablePaginator config={config} />
  ) : (
    <Default config={config} />
  );
}

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
  const subRows = searchParams.get('subRows') === 'true';
  const filter = searchParams.get('filter') === 'true';
  const selectSubRows = !(searchParams.get('selectSubRows') === 'false');
  const enableVirtualization = searchParams.get('virtualization') === 'true';
  const empty = searchParams.get('empty') === 'true';
  const scroll = searchParams.get('scroll') === 'true';
  const oneRow = searchParams.get('oneRow') === 'true';
  const stateReducer = searchParams.get('stateReducer') === 'true';
  const scrollRow = Number(searchParams.get('scrollRow'));

  return {
    exampleType,
    disableResizing,
    columnResizeMode,
    maxWidths,
    minWidths,
    density,
    isSelectable,
    subRows,
    filter,
    selectSubRows,
    enableVirtualization,
    empty,
    scroll,
    oneRow,
    stateReducer,
    scrollRow,
  };
};

const Default = ({
  config,
}: {
  config: ReturnType<typeof getConfigFromSearchParams>;
}) => {
  const data = config.subRows
    ? [
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
      ]
    : [
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
          id: '222',
        },
        {
          index: 3,
          name: 'Name3',
          description: 'Description3',
          id: '333',
        },
      ];

  const isRowDisabled = React.useCallback(
    (rowData: Record<string, unknown>) => {
      return rowData.name === 'Name3.2';
    },
    [],
  );

  const virtualizedData = React.useMemo(() => {
    const size = config.oneRow ? 1 : 100000;
    const arr = new Array(size);
    if (!config.empty) {
      for (let i = 0; i < size; ++i) {
        arr[i] = {
          index: i,
          name: `Name${i}`,
          description: `Description${i}`,
          id: i,
        };
      }
    }
    return arr;
  }, [config.oneRow, config.empty]);

  return (
    <>
      <Table
        columns={[
          {
            Header: '#',
            accessor: 'index',
            width: 100,
            maxWidth: parseInt(config.maxWidths[0]) || undefined,
            minWidth: parseInt(config.minWidths[0]) || undefined,
          },
          {
            Header: 'Name',
            accessor: 'name',
            maxWidth: parseInt(config.maxWidths[1]) || undefined,
            minWidth: parseInt(config.minWidths[1]) || undefined,
            disableResizing: config.disableResizing,
            Filter: config.filter ? tableFilters.TextFilter() : undefined,
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
        data={config.enableVirtualization ? virtualizedData : data}
        emptyTableContent='No data.'
        isResizable
        isRowDisabled={isRowDisabled}
        isSelectable={config.isSelectable}
        isSortable
        density={config.density}
        columnResizeMode={
          config.columnResizeMode as 'fit' | 'expand' | undefined
        }
        selectSubRows={config.selectSubRows}
        enableVirtualization={config.enableVirtualization}
        style={config.enableVirtualization ? { maxHeight: '90vh' } : undefined}
        scrollToRow={
          config.scroll
            ? (rows, data) =>
                rows.findIndex((row) => row.original === data[config.scrollRow])
            : undefined
        }
        stateReducer={
          config.stateReducer
            ? (newState, action, previousState, instance) => {
                if (action.type === 'toggleRowSelected') {
                  console.log(action.value);
                }
                return newState;
              }
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
          density={config.density}
          paginatorRenderer={paginator}
        />
      </div>
    </>
  );
};
