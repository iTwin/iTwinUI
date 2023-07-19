/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  Button,
  InformationPanel,
  InformationPanelBody,
  InformationPanelContent,
  InformationPanelHeader,
  InformationPanelWrapper,
  Input,
  Label,
  Table,
  Text,
} from '@itwin/itwinui-react';
import * as React from 'react';

export default () => {
  const [openRowIndex, setOpenRowIndex] = React.useState<number>(1);

  return (
    <InformationPanelWrapper>
      <Table
        columns={[
          { id: 'name', Header: 'Name', accessor: 'name' },
          {
            Header: 'Details',
            Cell: ({ row }) => (
              <Button onClick={() => setOpenRowIndex(row.index)}>
                Details
              </Button>
            ),
          },
        ]}
        data={[...Array(3).fill(null)].map((_, index) => ({
          name: `Row${index}`,
        }))}
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
          <InformationPanelContent displayStyle='inline'>
            <Label htmlFor='name-input'>File name</Label>
            <Input
              localSize='small'
              id='name-input'
              value={`Row ${openRowIndex ?? 0}`}
              readOnly
            />

            <Label htmlFor='author-input'>Author</Label>
            <Input
              localSize='small'
              id='author-input'
              defaultValue='DJ Terry'
              readOnly
            />

            <Label htmlFor='year-input'>Year</Label>
            <Input
              localSize='small'
              id='year-input'
              defaultValue='2021'
              readOnly
            />
          </InformationPanelContent>
        </InformationPanelBody>
      </InformationPanel>
    </InformationPanelWrapper>
  );
};
