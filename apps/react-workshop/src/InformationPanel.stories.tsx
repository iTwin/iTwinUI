/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import type { CellProps, Column } from '@itwin/itwinui-react/react-table';
import { SvgEdit } from '@itwin/itwinui-icons-react';
import {
  InformationPanel,
  InformationPanelWrapper,
  InformationPanelHeader,
  InformationPanelBody,
  InformationPanelContent,
  Table,
  Text,
  Button,
  IconButton,
  Input,
  Label,
  Textarea,
} from '@itwin/itwinui-react';
import { StoryDecorator } from '@ladle/react';

export default {
  title: 'InformationPanel',
};

export const Basic = () => {
  const [openRowIndex, setOpenRowIndex] = React.useState<number>();

  const columns = React.useMemo(
    () => [
      { id: 'name', Header: 'Name', accessor: 'name' },
      {
        Header: 'Details',
        Cell: ({ row: { index } }: CellProps<Record<string, string>>) => (
          <Button onClick={() => setOpenRowIndex(index)}>Details</Button>
        ),
      },
    ],
    [],
  ) satisfies Column[];

  const data = React.useMemo(
    () =>
      [...Array(10).fill(null)].map((_, index) => ({ name: `Row${index}` })),
    [],
  );
  return (
    <InformationPanelWrapper>
      <Table columns={columns} data={data} emptyTableContent='No data.' />
      <InformationPanel
        isOpen={openRowIndex != undefined && openRowIndex !== -1}
      >
        <InformationPanelHeader
          onClose={() => {
            setOpenRowIndex(-1);
            console.log('Panel closed');
          }}
        >
          <Text variant='subheading' as='h2'>
            Row {openRowIndex ?? 0}
          </Text>
        </InformationPanelHeader>
        <InformationPanelBody>
          <InformationPanelContent displayStyle='inline'>
            <Label htmlFor='name-input'>File name</Label>
            <Input
              size='small'
              id='name-input'
              defaultValue={`Row ${openRowIndex ?? 0}`}
              readOnly
            />

            <Label htmlFor='author-input'>Author</Label>
            <Input
              size='small'
              id='author-input'
              defaultValue='DJ Terry'
              readOnly
            />

            <Label htmlFor='year-input'>Year</Label>
            <Input size='small' id='year-input' defaultValue='2021' readOnly />

            <Label htmlFor='path-input'>Path</Label>
            <Input
              size='small'
              id='path-input'
              defaultValue='/Shared/Music/'
              readOnly
            />
          </InformationPanelContent>
        </InformationPanelBody>
      </InformationPanel>
    </InformationPanelWrapper>
  );
};
Basic.decorators = [
  (Story) => (
    <>
      <Text isMuted style={{ marginBottom: 11 }}>
        <em>Click on Details to open InformationalPanel</em>
      </Text>
      <Story />
    </>
  ),
] satisfies StoryDecorator[];

export const Horizontal = () => {
  const [openRowIndex, setOpenRowIndex] = React.useState<number>();

  const columns = React.useMemo(
    () => [
      { id: 'name', Header: 'Name', accessor: 'name' },
      {
        Header: 'Details',
        Cell: ({ row: { index } }: CellProps<{ name: string }>) => (
          <Button onClick={() => setOpenRowIndex(index)}>Details</Button>
        ),
      },
    ],
    [],
  ) satisfies Column<{ name: string }>[];

  const data = React.useMemo(
    () =>
      [...Array(10).fill(null)].map((_, index) => ({ name: `Row${index}` })),
    [],
  );
  return (
    <InformationPanelWrapper>
      <Table columns={columns} data={data} emptyTableContent='No data.' />
      <InformationPanel
        orientation='horizontal'
        isOpen={openRowIndex != undefined && openRowIndex !== -1}
      >
        <InformationPanelHeader
          onClose={() => {
            setOpenRowIndex(-1);
            console.log('Panel closed');
          }}
        >
          <Text variant='subheading' as='h2'>
            Row {openRowIndex ?? 0}
          </Text>
        </InformationPanelHeader>
        <InformationPanelBody>
          <InformationPanelContent displayStyle='inline'>
            <Label htmlFor='name-input'>File name</Label>
            <Input
              size='small'
              id='name-input'
              defaultValue={`Row ${openRowIndex ?? 0}`}
              readOnly
            />

            <Label htmlFor='author-input'>Author</Label>
            <Input
              size='small'
              id='author-input'
              defaultValue='DJ Terry'
              readOnly
            />

            <Label htmlFor='year-input'>Year</Label>
            <Input size='small' id='year-input' defaultValue='2021' readOnly />

            <Label htmlFor='path-input'>Path</Label>
            <Input
              size='small'
              id='path-input'
              defaultValue='/Shared/Music/'
              readOnly
            />
          </InformationPanelContent>
        </InformationPanelBody>
      </InformationPanel>
    </InformationPanelWrapper>
  );
};
Horizontal.decorators = [...Basic.decorators];

export const CustomActions = () => {
  const [openRowIndex, setOpenRowIndex] = React.useState<number>();
  const [isEditing, setIsEditing] = React.useState(false);

  const columns = React.useMemo(
    () => [
      { id: 'name', Header: 'Name', accessor: 'name' },
      {
        Header: 'Details',
        Cell: ({ row }: CellProps<{ name: string; info: string }>) => (
          <Button onClick={() => setOpenRowIndex(row.index)}>Details</Button>
        ),
      },
    ],
    [],
  ) satisfies Column<{ name: string }>[];

  const [data, setData] = React.useState(() =>
    [...Array(10).fill(null)].map((_, index) => ({
      name: `Row${index}`,
      info: `Row${index} description: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus veniam dicta error doloremque libero sit est. Voluptatum nam modi, ex illum veritatis nobis omnis porro quod harum optio minus magnam tenetur quia dolor quis natus, eius, suscipit hic? Nobis deleniti obcaecati, sequi mollitia vero magnam error quidem, voluptatem asperiores repudiandae, molestias sit et voluptatibus magni. Sequi delectus, sunt eaque corrupti architecto modi suscipit? Quos in itaque dolore voluptas saepe natus repellat ad qui dolores. Incidunt temporibus ut, unde maxime nam explicabo saepe aspernatur molestiae iste libero neque, alias corporis laboriosam fugiat ad. Dicta neque quos fuga odit quae sequi dolore!`,
    })),
  );

  return (
    <InformationPanelWrapper>
      <Table columns={columns} data={data} emptyTableContent='No data.' />

      <InformationPanel isOpen={openRowIndex != undefined}>
        <InformationPanelHeader
          onClose={() => {
            setOpenRowIndex(undefined);
            setIsEditing(false);
            console.log('Panel closed');
          }}
          actions={
            <IconButton
              styleType='borderless'
              isActive={isEditing}
              onClick={() => setIsEditing((editing) => !editing)}
              aria-label='Edit'
            >
              <SvgEdit />
            </IconButton>
          }
        >
          <Text variant='subheading' as='h2'>
            Row details
          </Text>
        </InformationPanelHeader>
        <InformationPanelBody>
          {openRowIndex != undefined && (
            <InformationPanelContent>
              <Label htmlFor='name-input'>Name</Label>
              <Input
                id='name-input'
                defaultValue={data[openRowIndex]?.name}
                disabled={!isEditing}
                onChange={({ target: { value } }) => {
                  setData((data) => {
                    const newData = [...data];
                    newData[openRowIndex] = {
                      ...newData[openRowIndex],
                      name: value,
                    };
                    return newData;
                  });
                }}
              />
              <Label htmlFor='description-input'>Description</Label>
              <Textarea
                id='description-input'
                defaultValue={data[openRowIndex]?.info}
                disabled={!isEditing}
                onChange={({ target: { value } }) => {
                  setData((data) => {
                    const newData = [...data];
                    newData[openRowIndex] = {
                      ...newData[openRowIndex],
                      info: value,
                    };
                    return newData;
                  });
                }}
                rows={15}
              />
            </InformationPanelContent>
          )}
        </InformationPanelBody>
      </InformationPanel>
    </InformationPanelWrapper>
  );
};
CustomActions.decorators = [...Basic.decorators];

export const CustomWidth = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const lorem100 = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus veniam dicta error doloremque libero sit est. Voluptatum nam modi, ex illum veritatis nobis omnis porro quod harum optio minus magnam tenetur quia dolor quis natus, eius, suscipit hic? Nobis deleniti obcaecati, sequi mollitia vero magnam error quidem, voluptatem asperiores repudiandae, molestias sit et voluptatibus magni. Sequi delectus, sunt eaque corrupti architecto modi suscipit? Quos in itaque dolore voluptas saepe natus repellat ad qui dolores. Incidunt temporibus ut, unde maxime nam explicabo saepe aspernatur molestiae iste libero neque, alias corporis laboriosam fugiat ad. Dicta neque quos fuga odit quae sequi dolore!`;

  return (
    <InformationPanelWrapper style={{ height: '80vh', width: '90%' }}>
      <div
        style={{
          backgroundColor: 'var(--iui-color-background-disabled)',
          padding: 16,
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Button onClick={() => setIsOpen((open) => !open)}>Toggle</Button>
      </div>
      <InformationPanel
        style={{ width: '40%', maxWidth: '70%' }} // should be set in CSS using a custom className
        isOpen={isOpen}
        orientation='vertical'
      >
        <InformationPanelHeader
          onClose={() => {
            setIsOpen(false);
            console.log('Panel closed');
          }}
        >
          <Text variant='subheading' as='h2'>
            Details
          </Text>
        </InformationPanelHeader>
        <InformationPanelBody>
          <Text>{lorem100}</Text>
        </InformationPanelBody>
      </InformationPanel>
    </InformationPanelWrapper>
  );
};
CustomWidth.decorators = [
  (Story) => (
    <>
      <Text isMuted style={{ marginBottom: 11 }}>
        <em>
          Notice that the panel has an initial width of 40% and can only be
          resized upto 70% of the container width.
        </em>
      </Text>
      <Story />
    </>
  ),
] satisfies StoryDecorator[];
