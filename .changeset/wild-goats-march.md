---
'@itwin/itwinui-react': minor
'@itwin/itwinui-css': minor
---

Added a new FileUploadCard component which serves as a default UI for when a single file is uploaded. This can also be used as a child of FileUpload

```jsx
<FileUploadCard />
```

```jsx
const [files, setFiles] = React.useState<File[]>([]);

<FileUpload
  onFileDropped={(files) => {
    setFiles(files);
  }}
>
  <FileUploadCard files={files} onFilesChange={(files) => setFiles(files)} />
</FileUpload>
```
