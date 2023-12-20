/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
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
  InputGrid,
  IconButton,
} from '@itwin/itwinui-react';
import { SvgWindowPopout } from '@itwin/itwinui-icons-react';

export default () => {
  const [openRowIndex, setOpenRowIndex] = React.useState<number>(-1);

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
        data={[{ name: 'Row0' }, { name: 'Row1' }, { name: 'Row2' }]}
        emptyTableContent='No data.'
        style={{ minWidth: '450px' }}
      />

      <InformationPanel
        isOpen={openRowIndex != undefined && openRowIndex !== -1}
        orientation='horizontal'
      >
        <InformationPanelHeader
          onClose={() => setOpenRowIndex(-1)}
          actions={
            <IconButton
              label='Open in new window'
              styleType='borderless'
              onClick={() => {}}
            >
              <SvgWindowPopout />
            </IconButton>
          }
        >
          <Text variant='subheading'>Row {openRowIndex ?? 0}</Text>
        </InformationPanelHeader>
        <InformationPanelBody>
          <InformationPanelContent displayStyle='inline'>
            <InputGrid>
              <Label htmlFor='name-input'>File name</Label>
              <Input
                size='small'
                id='name-input'
                value={`Row ${openRowIndex ?? 0}`}
                readOnly
              />
            </InputGrid>
            <InputGrid>
              <Label htmlFor='author-input'>Author</Label>
              <Input
                size='small'
                id='author-input'
                defaultValue='DJ Terry'
                readOnly
              />
            </InputGrid>
            <InputGrid>
              <Label htmlFor='year-input'>Year</Label>
              <Input
                size='small'
                id='year-input'
                defaultValue='2021'
                readOnly
              />
            </InputGrid>
          </InformationPanelContent>
        </InformationPanelBody>
      </InformationPanel>
    </InformationPanelWrapper>
  );
};
