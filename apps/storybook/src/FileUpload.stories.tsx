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
  FileUploadProps,
  FileUploadTemplate,
  LabeledInput,
} from '@itwin/itwinui-react';

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
