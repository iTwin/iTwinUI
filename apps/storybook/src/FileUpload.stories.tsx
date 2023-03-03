/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { action } from '@storybook/addon-actions';
import { useState } from '@storybook/client-api';
import { Story, Meta } from '@storybook/react';
import React from 'react';
import {
  FileUpload,
  FileUploadCard,
  FileEmptyCard,
  FileUploadProps,
  FileUploadTemplate,
  LabeledInput,
  IconButton,
} from '@itwin/itwinui-react';
import {
  SvgClose,
  SvgSmileyHappyVery,
  SvgSmileySadVery,
} from '@itwin/itwinui-icons-react';

export default {
  component: FileUpload,
  argTypes: {
    className: { control: { disable: true } },
    style: { control: { disable: true } },
    title: { control: { disable: true } },
    id: { control: { disable: true } },
    onFileDropped: { control: { disable: true } },
    children: { control: { disable: true } },
  },
  title: 'Core/FileUpload',
} as Meta<FileUploadProps>;

export const Default: Story<FileUploadProps> = (args) => {
  const [files, setFiles] = useState<Array<File>>([]);

  return (
    <FileUpload
      {...args}
      onFileDropped={(files) => {
        setFiles(Array.from(files));
        action(`${files.length} files uploaded`)();
      }}
    >
      <FileUploadTemplate
        onChange={(e) => setFiles(Array.from(e.target.files || []))}
      >
        {files.map((f) => f.name).join(', ')}
      </FileUploadTemplate>
    </FileUpload>
  );
};

export const WrappingInput: Story<FileUploadProps> = (args) => {
  const [files, setFiles] = useState<Array<File>>([]);

  return (
    <FileUpload
      dragContent='Drop file to upload'
      {...args}
      onFileDropped={(files) => {
        setFiles(Array.from(files));
        action(`${files.length} files uploaded`)();
      }}
    >
      <LabeledInput
        placeholder='Type a message'
        style={{ width: '100%' }}
        message={
          files.length
            ? `Attached: ${files.map((f) => f.name)}`
            : 'Drag files to attach'
        }
      />
    </FileUpload>
  );
};

WrappingInput.args = {
  dragContent: 'Drop file to upload',
};

export const SingleFileUpload: Story<FileUploadProps> = (args) => {
  const [files, setFiles] = useState<Array<File>>([]);
  return (
    <FileUpload
      {...args}
      onFileDropped={(files) => {
        setFiles(files);
        action(`${files.length} files uploaded`)();
      }}
    >
      <FileUploadCard data={files} onDataChange={(files) => setFiles(files)} />
    </FileUpload>
  );
};

export const SingleFileUploadCustom: Story<FileUploadProps> = (args) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [files, setFiles] = React.useState<File[]>([]);

  const emptyCard = (
    <FileEmptyCard>
      <FileEmptyCard.Icon>
        <SvgSmileySadVery />
      </FileEmptyCard.Icon>
      <FileEmptyCard.Text>
        <FileUploadCard.InputLabel>Custom Label Text</FileUploadCard.InputLabel>
        <div>Custom Description Text</div>
      </FileEmptyCard.Text>
    </FileEmptyCard>
  );
  return (
    <FileUpload
      {...args}
      onFileDropped={(files) => {
        setFiles(files);
        action(`${files.length} files uploaded`)();
      }}
    >
      <FileUploadCard
        data={files}
        onDataChange={(files) => setFiles(files)}
        emptyCard={emptyCard}
        input={<FileUploadCard.Input name={'my-file'} ref={inputRef} />}
      >
        <FileUploadCard.Icon>
          <SvgSmileyHappyVery />
        </FileUploadCard.Icon>
        <FileUploadCard.Info>
          <FileUploadCard.Title>Custom File Name</FileUploadCard.Title>
          <FileUploadCard.Description>
            Custom File Description
          </FileUploadCard.Description>
        </FileUploadCard.Info>
        <FileUploadCard.Action>
          <IconButton
            onClick={() => {
              setFiles([]);
            }}
            styleType={'borderless'}
          >
            <SvgClose />
          </IconButton>
        </FileUploadCard.Action>
      </FileUploadCard>
    </FileUpload>
  );
};
