/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { FileUpload, LabeledInput } from '@itwin/itwinui-react';

export default () => {
  const [files, setFiles] = React.useState([]);
  return (
    <FileUpload
      dragContent='Drop file to upload'
      onFileDropped={(files) => {
        setFiles(Array.from(files));
        console.log(`${files.length} files uploaded`);
      }}
    >
      <LabeledInput
        aria-label='Message'
        placeholder='Type a message'
        style={{
          width: '100%',
        }}
        message={
          files.length
            ? `Attached: ${files.map((f) => f.name)}`
            : 'Drag files to attach'
        }
      />
    </FileUpload>
  );
};
