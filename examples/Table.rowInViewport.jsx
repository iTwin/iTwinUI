/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Table } from '@itwin/itwinui-react';

export default () => {
  const onClickHandler = (props) => console.log(props.row.original.name);

  const columns = React.useMemo(
    () => [
      {
        id: 'name',
        Header: 'Name',
        accessor: 'name',
      },
      {
        id: 'description',
        Header: 'Description',
        accessor: 'description',
        maxWidth: 200,
      },
      {
        id: 'click-me',
        Header: 'Click',
        width: 100,
        Cell: (props) => {
          const onClick = () => onClickHandler(props);
          return (
            <Anchor as='button' onClick={onClick}>
              Click me!
            </Anchor>
          );
        },
      },
    ],
    [],
  );

  const data = React.useMemo(
    () =>
      Array(100)
        .fill(null)
        .map((_, index) => ({
          name: `Name${index}`,
          description: `Description${index}`,
        })),
    [],
  );

  const onRowInViewport = useCallback((rowData) => {
    console.log(`Row in view: ${JSON.stringify(rowData)}`);
  }, []);

  return (
    <>
      <div>
        Demo of <Code>IntersectionObserver</Code> hook that triggers{' '}
        <Code>onRowInViewport</Code> callback once the row is visible.
      </div>
      <div>
        Open{' '}
        <Anchor
          as='button'
          onClick={() =>
            parent.document.querySelector('[id^="tabbutton-actions"]')?.click()
          }
        >
          Actions
        </Anchor>{' '}
        tab to see when callback is called and scroll the table.
      </div>
      <br />
      <Table
        columns={columns}
        emptyTableContent='No data.'
        onRowInViewport={onRowInViewport}
        data={data}
      />
    </>
  );
};
