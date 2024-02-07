/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Button,
  InformationPanel,
  InformationPanelBody,
  InformationPanelHeader,
  InformationPanelWrapper,
  Table,
  Text,
} from '@itwin/itwinui-react';

export default () => {
  const [openRowIndex, setOpenRowIndex] = React.useState(-1);

  return (
    <InformationPanelWrapper>
      <Table
        columns={[
          { id: 'name', Header: 'Name', accessor: 'name' },
          {
            Header: 'Details',
            Cell: ({ row }) => (
              <Button onClick={() => setOpenRowIndex(row.index)}>
                Click me
              </Button>
            ),
          },
        ]}
        data={[{ name: 'Row0' }, { name: 'Row1' }, { name: 'Row2' }]}
        emptyTableContent='No data.'
        style={{ minWidth: '450px' }}
      />

      <InformationPanel
        isOpen={openRowIndex != undefined && openRowIndex !== -1}
      >
        <InformationPanelHeader onClose={() => setOpenRowIndex(-1)}>
          <Text variant='subheading'>Row {openRowIndex ?? 0}</Text>
        </InformationPanelHeader>
        <InformationPanelBody>
          <Text as='p'>Content for row {openRowIndex ?? 0} goes here.</Text>
          <Text as='p'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maxime
            voluptatem praesentium nulla temporibus sit est officiis nobis
            nostrum, accusamus natus?
          </Text>
        </InformationPanelBody>
      </InformationPanel>
    </InformationPanelWrapper>
  );
};
