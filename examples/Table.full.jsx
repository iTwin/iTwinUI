/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Table } from '@itwin/itwinui-react';

export default () => {
  const [hoveredRowIndex, setHoveredRowIndex] = React.useState(0);

  const [rowRefMap, setRowRefMap] = React.useState({});

  const isRowDisabled = useCallback((rowData) => {
    return rowData.name === 'Name2';
  }, []);

  const menuItems = useCallback((close) => {
    return [
      <MenuItem key={1} onClick={() => close()}>
        Edit
      </MenuItem>,
      <MenuItem key={2} onClick={() => close()}>
        Delete
      </MenuItem>,
    ];
  }, []);

  const columns = React.useMemo(
    () => [
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
        Filter: tableFilters.TextFilter(),
        disableToggleVisibility: true,
      },
      {
        id: 'description',
        Header: 'Description',
        accessor: 'description',
        maxWidth: 200,
        Filter: tableFilters.TextFilter(),
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
              aria-label='More options'
            >
              <SvgMore />
            </IconButton>
          </DropdownMenu>
        ),
      },
    ],
    [menuItems],
  );

  const data = React.useMemo(
    () => [
      { name: 'Name1', description: 'Description1' },
      { name: 'Name2', description: 'Description2' },
      { name: 'Name3', description: 'Description3' },
    ],
    [],
  );

  const expandedSubComponent = useCallback(
    (row) => (
      <div style={{ padding: 16 }}>
        <Text variant='leading'>Extra information</Text>
        <pre>
          <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
        </pre>
      </div>
    ),
    [],
  );

  const rowProps = useCallback((row) => {
    return {
      onMouseEnter: () => {
        console.log(`Hovered over ${row.original.name}`);
        setHoveredRowIndex(row.index);
      },
      ref: (el) => {
        if (el) {
          setRowRefMap((r) => {
            r[row.index] = el;
            return r;
          });
        }
      },
    };
  }, []);

  return (
    <>
      <Table
        columns={columns}
        data={data}
        emptyTableContent='No data.'
        subComponent={expandedSubComponent}
        isRowDisabled={isRowDisabled}
        rowProps={rowProps}
        isSelectable
        isSortable
        isResizable
        enableColumnReordering
      />
      <Tooltip
        reference={rowRefMap[hoveredRowIndex]}
        content={`Hovered over ${data[hoveredRowIndex].name}.`}
        placement='bottom'
      />
    </>
  );
};
