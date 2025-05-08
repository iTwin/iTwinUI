/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Table } from '@itwin/itwinui-react';

export default () => {
  const columns = React.useMemo(
    () => [
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
        cellRenderer: (props) => (
          <DefaultCell
            {...props}
            startIcon={props.cellProps.row.original.startIcon}
            endIcon={
              props.cellProps.row.original.isLoading ? (
                <ProgressRadial value={40} size='small' />
              ) : (
                props.cellProps.row.original.endIcon
              )
            }
          />
        ),
      },
      {
        id: 'modified',
        Header: 'Modified',
        accessor: 'modified',
        maxWidth: 200,
        cellRenderer: (props) => {
          return (
            <DefaultCell
              {...props}
              status={props.cellProps.row.original.status}
            />
          );
        },
      },
      {
        id: 'size',
        Header: 'Size',
        maxWidth: 200,
        accessor: 'size',
      },
    ],
    [],
  );

  const data = React.useMemo(
    () => [
      {
        name: 'alfa.mp3',
        modified: 'Just now',
        size: '76 KB',
        isLoading: true,
      },
      {
        name: 'beta.mp3',
        modified: 'Just now',
        size: '15 KB',
        startIcon: <SvgSoundLoud fill='#66c6ff' />,
      },
      {
        name: 'gamma.pdf',
        modified: 'A few moments ago',
        size: '9 MB',
        startIcon: <SvgDetails fill='#dd3e39' />,
        endIcon: <SvgStatusSuccess />,
        status: 'positive',
      },
      {
        name: 'delta.jpg',
        modified: 'A few moments ago',
        size: '963 MB',
        startIcon: <SvgDetails fill='#7957a3' />,
        endIcon: <SvgStatusWarning />,
        status: 'warning',
      },
      {
        name: 'theta.dgn',
        modified: 'A few moments ago',
        size: '64 KB',
        startIcon: <SvgDetails fill='#d16c00' />,
        endIcon: <SvgStatusError />,
        status: 'negative',
      },
    ],
    [],
  );

  const rowProps = useCallback((row) => {
    return {
      status: row.original.status,
      isLoading: row.original.isLoading,
    };
  }, []);

  return (
    <Table
      caption='Files'
      columns={columns}
      data={data}
      emptyTableContent='No data.'
      selectionMode='multi'
      isSelectable={true}
      rowProps={rowProps}
    />
  );
};
