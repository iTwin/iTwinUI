/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { useState } from 'react';
import * as React from 'react';
import {
  FileUpload,
  FileUploadCard,
  FileEmptyCard,
  LabeledInput,
  IconButton,
} from '@itwin/itwinui-react';
import {
  SvgClose,
  SvgSmileyHappyVery,
  SvgSmileySadVery,
} from '@itwin/itwinui-icons-react';

export default {
  title: 'FileUpload',
};

export const WrappingInput = () => {
  const [files, setFiles] = useState<Array<File>>([]);

  return (
    <FileUpload
      dragContent='Drop file to upload'
      onFileDropped={(files) => {
        setFiles(Array.from(files));
        console.log(`${files.length} files uploaded`);
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

export const DefaultFileUploadCard = () => {
  const [files, setFiles] = useState<Array<File>>([]);
  return (
    <FileUpload
      onFileDropped={(files) => {
        setFiles(Array.from(files));
        console.log(`${files.length} files uploaded`);
      }}
    >
      <FileUploadCard
        files={files}
        onFilesChange={(files) => setFiles(files)}
      />
    </FileUpload>
  );
};

export const CustomFileUploadCard = () => {
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
      onFileDropped={(files) => {
        setFiles(Array.from(files));
        console.log(`${files.length} files uploaded`);
      }}
    >
      <FileUploadCard
        files={files}
        onFilesChange={(files) => setFiles(files)}
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
