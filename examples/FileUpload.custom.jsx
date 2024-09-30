/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  FileUpload,
  FileUploadCard,
  FileEmptyCard,
  IconButton,
} from '@itwin/itwinui-react';
import {
  SvgSmileySadVery,
  SvgSmileyHappyVery,
  SvgClose,
} from '@itwin/itwinui-icons-react';

export default () => {
  const inputRef = React.useRef(null);
  const [files, setFiles] = React.useState([]);
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
        const fileArray = Array.from(files);
        setFiles(fileArray);
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
            label='Remove file'
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
