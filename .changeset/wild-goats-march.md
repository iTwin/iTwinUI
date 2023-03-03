---
'@itwin/itwinui-react': minor
'@itwin/itwinui-css': minor
---

Added a new FileUploadCard component which serves as a default GUI for when a single file is uploaded. This can also be used as a child of FileUpload

```jsx
<FileUploadCard />
```

```jsx
const [files, setFiles] = React.useState<File[]>([]);

<FileUpload
  onFileDropped={console.log()}
>
  <FileUploadCard data={files} onDataChange={(files) => setFiles(files)} />
</FileUpload>
```

```jsx
const inputRef = React.useRef<HTMLInputElement>(null);
const [files, setFiles] = React.useState<File[]>([]);

const emptyCard = (
  <FileEmptyCard>
    <FileEmptyCard.Icon>
      <svg>...</svg>
    </FileEmptyCard.Icon>
    <FileEmptyCard.Text>
      <FileUploadCard.InputLabel>Custom Label Text</FileUploadCard.InputLabel>
      <div>Custom Description Text</div>
    </FileEmptyCard.Text>
  </FileEmptyCard>
);

<FileUploadCard
  data={files}
  onDataChange={(files) => setFiles(files)}
  emptyCard={emptyCard}
  input={<FileUploadCard.Input name={'my-file'} ref={inputRef} />}
>
  <FileUploadCard.Icon>
    <svg>...</svg>
  </FileUploadCard.Icon>
  <FileUploadCard.Info>
    <FileUploadCard.Title>Custom File Name</FileUploadCard.Title>
    <FileUploadCard.Description>
      Custom File Description
    </FileUploadCard.Description>
  </FileUploadCard.Info>
  <FileUploadCard.Action>
    <FileUploadCard.InputLabel>
      Custom Input Label
    </FileUploadCard.InputLabel>
  </FileUploadCard.Action>
</FileUploadCard>
```
