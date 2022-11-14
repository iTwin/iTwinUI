/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import { CellProps } from 'react-table';
import { action } from '@storybook/addon-actions';
import { SvgEdit } from '@itwin/itwinui-icons-react';
import {
  InformationPanel,
  InformationPanelProps,
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

export default {
  component: InformationPanel,
  subcomponents: {
    InformationPanelWrapper,
    InformationPanelHeader,
    InformationPanelBody,
    InformationPanelContent,
  },
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    id: { control: { disable: true } },
    children: { control: { disable: true } },
  },
  args: {
    orientation: 'vertical',
    resizable: true,
  },
  title: 'Core/InformationPanel',
  parameters: {
    docs: { source: { excludeDecorators: true } },
  },
} as Meta<InformationPanelProps>;

export const Basic: Story<InformationPanelProps> = (args) => {
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
  );

  const data = React.useMemo(
    () =>
      [...Array(10).fill(null)].map((_, index) => ({ name: `Row${index}` })),
    [],
  );
  return (
    <InformationPanelWrapper>
      <Table columns={columns} data={data} emptyTableContent='No data.' />
      <InformationPanel
        {...args}
        isOpen={openRowIndex != undefined && openRowIndex !== -1}
      >
        <InformationPanelHeader
          onClose={() => {
            setOpenRowIndex(-1);
            action('Panel closed')();
          }}
        >
          <Text variant='subheading'>Row {openRowIndex ?? 0}</Text>
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
];

export const Horizontal: Story<InformationPanelProps> = (args) => {
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
  );

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
        {...args}
        isOpen={openRowIndex != undefined && openRowIndex !== -1}
      >
        <InformationPanelHeader
          onClose={() => {
            setOpenRowIndex(-1);
            action('Panel closed')();
          }}
        >
          <Text variant='subheading'>Row {openRowIndex ?? 0}</Text>
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
Horizontal.args = { orientation: 'horizontal' };
Horizontal.decorators = [...Basic.decorators];

export const CustomActions: Story<InformationPanelProps> = (args) => {
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
  );

  const [data, setData] = React.useState(() =>
    [...Array(10).fill(null)].map((_, index) => ({
      name: `Row${index}`,
      info: `Row${index} description: Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus veniam dicta error doloremque libero sit est. Voluptatum nam modi, ex illum veritatis nobis omnis porro quod harum optio minus magnam tenetur quia dolor quis natus, eius, suscipit hic? Nobis deleniti obcaecati, sequi mollitia vero magnam error quidem, voluptatem asperiores repudiandae, molestias sit et voluptatibus magni. Sequi delectus, sunt eaque corrupti architecto modi suscipit? Quos in itaque dolore voluptas saepe natus repellat ad qui dolores. Incidunt temporibus ut, unde maxime nam explicabo saepe aspernatur molestiae iste libero neque, alias corporis laboriosam fugiat ad. Dicta neque quos fuga odit quae sequi dolore!`,
    })),
  );

  return (
    <InformationPanelWrapper>
      <Table columns={columns} data={data} emptyTableContent='No data.' />

      <InformationPanel {...args} isOpen={openRowIndex != undefined}>
        <InformationPanelHeader
          onClose={() => {
            setOpenRowIndex(undefined);
            setIsEditing(false);
            action('Panel closed')();
          }}
          actions={
            <IconButton
              styleType='borderless'
              isActive={isEditing}
              onClick={() => setIsEditing((editing) => !editing)}
            >
              <SvgEdit />
            </IconButton>
          }
        >
          <Text variant='subheading'>Row details</Text>
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

export const CustomWidth: Story<InformationPanelProps> = (args) => {
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
        {...args}
        orientation='vertical'
      >
        <InformationPanelHeader
          onClose={() => {
            setIsOpen(false);
            action('Panel closed')();
          }}
        >
          <Text variant='subheading'>Details</Text>
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
];
