import { SvgAirplane } from '@itwin/itwinui-icons-react';
import { Button, FileUpload, FileUploadCard } from '@itwin/itwinui-react';
import React from 'react';

const App = () => {
  const [files, setFiles] = React.useState<Array<File>>([]);

  return (
    <>
      <FileUpload onFileDropped={() => console.log('Files were dropped')}>
        <FileUploadCard />
      </FileUpload>
      <FileUpload onFileDropped={() => console.log('Files were dropped')}>
        <FileUploadCard
          onFileChange={(e) => {
            setFiles(Array.from(e.target.files || []));
          }}
        >
          {<SvgAirplane></SvgAirplane>}
          <FileUploadCard.Text>
            <FileUploadCard.Label>
              {files.length ? files[0].name : undefined}
            </FileUploadCard.Label>
            <FileUploadCard.Description>
              {files.length ? files[0].name : undefined}
            </FileUploadCard.Description>
          </FileUploadCard.Text>
          <FileUploadCard.Action>
            <Button onClick={(e) => setFiles([])}>Clear</Button>
          </FileUploadCard.Action>
        </FileUploadCard>
      </FileUpload>
    </>
  );
};

// const WithDiscrd = () => {
//   return (
//     <FileUpload onFileDropped={() => console.log('File has been dropped')}>
//       <FileUploadCard>
//         <FileUploadCard.Icon></FileUploadCard.Icon>
//         <FileUploadCard.Title></FileUploadCard.Title>
//         <FileUploadCard.Description></FileUploadCard.Description>
//         <FileUploadCard.Action>
//           <Button onClick={() => (inputRef.current.files = [])}>Clear</Button>
//           <FileUploadCard.Input />
//         </FileUploadCard.Action>
//       </FileUploadCard>
//     </FileUpload>
//   );
// };

export default App;
