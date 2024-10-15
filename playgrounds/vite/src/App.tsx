import React from 'react';
import {
  Divider,
  ExpandableBlock,
  ExpanderColumn,
  Flex,
  SelectionColumn,
  Table,
  tableFilters,
  Text,
  Tooltip,
} from '@itwin/itwinui-react';

const data = new Array(5).fill(null).map((_, ind) => ({
  id: ind,
  name: `Name ${ind}`,
  permissionGroups: new Array(5).fill(null).map((_, i) => ({
    name: `Group ${i}`,
    description: `Group description ${i}`,
    permissions: new Array(6).fill(null).map((_, ii) => ({
      name: `Permissions ${ii}`,
      description: `Permission description ${ii}`,
    })),
  })),
}));

export const getSubRowStyle = ({ depth = 1, selectionColumnWidth = 0 }) => {
  const cellPadding = 8;
  const expanderMargin = 4;

  const multiplier = 26 + expanderMargin; // 26 = expander width

  return {
    paddingInlineStart: selectionColumnWidth + cellPadding + depth * multiplier,
  } satisfies React.CSSProperties;
};

export default function App() {
  const [te, setTe] = React.useState(0);

  React.useEffect(() => {
    setTimeout(() => {
      setTe((t) => ++t);
    }, 50);
  }, []);

  const getRowId = React.useCallback((row) => {
    console.log('getRowId', row.id);
    return row.id;
  }, []);

  const isRowDisabled = React.useCallback((rowData) => {
    return rowData.id % 2 === 0;
  }, []);

  const getSubComponentContent = React.useCallback((permissionGroup) => {
    return (
      <div
        style={{
          ...getSubRowStyle({ depth: 2, selectionColumnWidth: 0 }),
        }}
      >
        {permissionGroup.permissions.map((permission) => {
          return <div>{permission.name}</div>;
        })}
      </div>
    );
  }, []);

  const subComponent = React.useCallback(
    (row) => {
      if (
        row.original.permissionGroups &&
        row.original.permissionGroups.length > 0
      ) {
        const rows = row.original.permissionGroups.map((permissionGroup) => {
          const selectionColumnWidth = row.cells[0].column.width
            ? +row.cells[0].column.width
            : 0;
          const expandableRowContent = getSubComponentContent(permissionGroup);
          return (
            <React.Fragment key={`${row.original.id}-${permissionGroup.name}`}>
              <Divider />
              <ExpandableBlock
                title={permissionGroup.name}
                styleType='borderless'
                size='small'
                style={{
                  ...getSubRowStyle({
                    depth: 1,
                    selectionColumnWidth: selectionColumnWidth,
                  }),
                }}
              >
                {expandableRowContent}
              </ExpandableBlock>
            </React.Fragment>
          );
        });
        return <div>{rows}</div>;
      }
    },
    [getSubComponentContent],
  );

  const columns = React.useMemo(() => {
    const columns = [];
    columns.push({
      ...SelectionColumn({
        isDisabled: isRowDisabled,
      }),
    });
    columns.push(ExpanderColumn({ subComponent, isDisabled: isRowDisabled }));
    columns.push({
      Header: 'Name',
      accessor: 'name',
      Filter: tableFilters.TextFilter(),
    });
    return columns;
    // remove `te` dep and it works fine
  }, [isRowDisabled, te]);

  return (
    <>
      <Table
        columns={columns}
        data={data}
        subComponent={subComponent}
        isRowDisabled={isRowDisabled}
        getRowId={getRowId} //<-- this brings max rerenders warning
        density='extra-condensed'
        emptyTableContent='no data'
        isSelectable
        isSortable
        autoResetSelectedRows={false}
        autoResetFilters={false}
        autoResetGlobalFilter={false}
        selectRowOnClick={false}
      />
    </>
  );
}
