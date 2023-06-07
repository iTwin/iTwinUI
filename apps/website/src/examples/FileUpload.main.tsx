/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { FileUpload, FileUploadCard } from '@itwin/itwinui-react';

export default () => {
  const [files, setFiles] = React.useState<Array<File>>([]);
  return (
    <FileUpload
      style={{ position: 'absolute' }}
      onFileDropped={(files) => {
        setFiles(files);
      }}
    >
      <FileUploadCard files={files} onFilesChange={(files) => setFiles(files)} />
    </FileUpload>
  );
};
