/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  getWindow,
  SvgDocument,
  useMergedRefs,
  useSafeContext,
  useId,
  mergeEventHandlers,
  polymorphic,
  Box,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import cx from 'classnames';
import { FileEmptyCard } from './FileEmptyCard.js';
import { Anchor } from '../Typography/Anchor.js';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden.js';

const toBytes = (bytes: number) => {
  const units = [' bytes', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;

  while (bytes >= 1024 && ++i) {
    bytes = bytes / 1024;
  }

  return bytes.toFixed(bytes < 10 && i > 0 ? 2 : 0) + units[i];
};

const toDate = (dateNumber: number) => {
  const date = new Date(dateNumber);
  return date.toDateString() + ' ' + date.toLocaleTimeString();
};

// ----------------------------------------------------------------------------
// FileUploadCard.Icon component

const FileUploadCardIcon = polymorphic.span('iui-file-card-icon', {
  children: <SvgDocument />,
});
if (process.env.NODE_ENV === 'development') {
  FileUploadCardIcon.displayName = 'FileUploadCard.Icon';
}

// ----------------------------------------------------------------------------
// FileUploadCard.Info component

const FileUploadCardInfo = polymorphic.span('iui-file-card-text');
if (process.env.NODE_ENV === 'development') {
  FileUploadCardInfo.displayName = 'FileUploadCard.Info';
}

// ----------------------------------------------------------------------------
// FileUploadCard.Title component

const FileUploadCardTitle = React.forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const { files } = useSafeContext(FileUploadCardContext);
  const title =
    files.length > 1 ? files.length + ' files selected' : files[0].name;
  return (
    <Box
      as='span'
      className={cx('iui-file-card-title', className)}
      ref={ref}
      {...rest}
    >
      {children ?? title}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'span'>;
if (process.env.NODE_ENV === 'development') {
  FileUploadCardTitle.displayName = 'FileUploadCard.Title';
}

// ----------------------------------------------------------------------------
// FileUploadCard.Description component

const FileUploadCardDescription = React.forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const { files } = useSafeContext(FileUploadCardContext);

  let description =
    files.length > 1
      ? files[0].name + ', ' + files[1].name
      : toBytes(files[0].size) + ' ' + toDate(files[0].lastModified);

  if (files.length > 2) {
    description += ', and ' + (files.length - 2) + ' others';
  }

  return (
    <Box
      as='span'
      className={cx('iui-file-card-description', className)}
      ref={ref}
      {...rest}
    >
      {children ?? description}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'span'>;
if (process.env.NODE_ENV === 'development') {
  FileUploadCardDescription.displayName = 'FileUploadCard.Description';
}

// ----------------------------------------------------------------------------
// FileUploadCard.Action component

const FileUploadCardAction = polymorphic.div('iui-file-card-action');
if (process.env.NODE_ENV === 'development') {
  FileUploadCardAction.displayName = 'FileUploadCard.Action';
}

// ----------------------------------------------------------------------------
// FileUploadCard.InputLabel component

const FileUploadCardInputLabel = React.forwardRef((props, ref) => {
  const { children, ...rest } = props;
  const { inputId } = useSafeContext(FileUploadCardContext);
  return (
    <Anchor as='label' ref={ref} htmlFor={inputId} {...rest}>
      {children}
    </Anchor>
  );
}) as PolymorphicForwardRefComponent<'label'>;
if (process.env.NODE_ENV === 'development') {
  FileUploadCardInputLabel.displayName = 'FileUploadCard.InputLabel';
}

// ----------------------------------------------------------------------------
// FileUploadCard.Input component

const FileUploadCardInput = React.forwardRef((props, ref) => {
  const { children, onChange, id, ...rest } = props;
  const { files, onFilesChange, setInternalFiles, inputId, setInputId } =
    useSafeContext(FileUploadCardContext);

  const setNativeFilesRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      if (!node || !getWindow()?.DataTransfer) {
        return;
      }

      const dataTransfer = new DataTransfer();
      dataTransfer.items.clear();
      Array.from(files).forEach((file) => dataTransfer.items.add(file));
      node.files = dataTransfer.files;
    },
    [files],
  );

  const refs = useMergedRefs(ref, setNativeFilesRef);

  React.useEffect(() => {
    if (id && id !== inputId) {
      setInputId(id);
    }
  }, [id, inputId, setInputId]);

  return (
    <>
      <VisuallyHidden
        as='input'
        type='file'
        unhideOnFocus={false}
        onChange={mergeEventHandlers(onChange, (e) => {
          const _files = Array.from(e.currentTarget.files || []);
          onFilesChange?.(_files);
          setInternalFiles(_files);
        })}
        ref={refs}
        id={id ?? inputId}
        {...rest}
      />
      {children}
    </>
  );
}) as PolymorphicForwardRefComponent<'input'>;
if (process.env.NODE_ENV === 'development') {
  FileUploadCardInput.displayName = 'FileUploadCard.Input';
}

// ----------------------------------------------------------------------------
// FileUploadCard component

type FileUploadCardProps = {
  /**
   * Files to pass (only needed when passing a custom action)
   */
  files?: File[];
  /**
   * Callback fired when files has changed (only needed passing custom action)
   */
  onFilesChange?: (files: File[]) => void;
  /**
   * Node that is shown when there is no file uploaded
   * Either pass `FileEmptyCard` (for default state) or a different component to show
   * @default <FileEmptyCard />
   */
  emptyCard?: React.ReactNode;
  /**
   * Input node
   * @default <FileUploadCard.Input />
   */
  input?: React.ReactNode;
};

const FileUploadCardComponent = React.forwardRef((props, ref) => {
  const {
    className,
    children,
    files: filesProp,
    onFilesChange,
    emptyCard = <FileEmptyCard />,
    input,
    ...rest
  } = props;

  const [internalFiles, setInternalFiles] = React.useState<File[]>();
  const uid = useId();
  const [inputId, setInputId] = React.useState(uid);
  const files = filesProp ?? internalFiles ?? [];

  return (
    <FileUploadCardContext.Provider
      value={{
        files,
        onFilesChange,
        setInternalFiles,
        inputId,
        setInputId,
      }}
    >
      {files?.length ? (
        <Box className={cx('iui-file-card', className)} ref={ref} {...rest}>
          {children ?? (
            <>
              <FileUploadCard.Icon />
              <FileUploadCard.Info>
                <FileUploadCard.Title />
                <FileUploadCard.Description />
              </FileUploadCard.Info>
              <FileUploadCard.Action>
                <FileUploadCard.InputLabel>Replace</FileUploadCard.InputLabel>
              </FileUploadCard.Action>
            </>
          )}
        </Box>
      ) : (
        emptyCard
      )}
      {input ?? <FileUploadCard.Input />}
    </FileUploadCardContext.Provider>
  );
}) as PolymorphicForwardRefComponent<'div', FileUploadCardProps>;

/**
 * Default card to be used with the `FileUpload` wrapper component for single-file uploading.
 * @example
 * <FileUploadCard />
 * <FileUploadCard files={files} onFilesChange={(files) => setFiles(files)}>
 *   <FileUploadCard.Icon>
 *     <SvgSmileyHappyVery />
 *   </FileUploadCard.Icon>
 *   <FileUploadCard.Info>
 *     <FileUploadCard.Title>Custom File Name</FileUploadCard.Title>
 *     <FileUploadCard.Description>
 *       Custom File Description
 *     </FileUploadCard.Description>
 *   </FileUploadCard.Info>
 *   <FileUploadCard.Action>
 *     <Button
 *       onClick={() => {
 *         setFiles([]);
 *       }}
 *     />
 *     <FileUploadCard.Input name={fileInputId} ref={inputRef} />
 *   </FileUploadCard.Action>
 * </FileUploadCard>
 */
export const FileUploadCard = Object.assign(FileUploadCardComponent, {
  Icon: FileUploadCardIcon,
  Info: FileUploadCardInfo,
  Title: FileUploadCardTitle,
  Description: FileUploadCardDescription,
  Action: FileUploadCardAction,
  InputLabel: FileUploadCardInputLabel,
  Input: FileUploadCardInput,
});
if (process.env.NODE_ENV === 'development') {
  FileUploadCard.displayName = 'FileUploadCard';
}

export const FileUploadCardContext = React.createContext<
  | {
      /**
       * Files to pass
       */
      files: File[];
      /**
       * Callback fired when files have changed
       */
      onFilesChange?: (files: File[]) => void;
      /**
       * Sets the state of the files within FileUploadCard
       */
      setInternalFiles: (files: File[]) => void;
      /**
       * Id to pass to input
       */
      inputId?: string;

      setInputId: (inputId: string) => void;
    }
  | undefined
>(undefined);
if (process.env.NODE_ENV === 'development') {
  FileUploadCardContext.displayName = 'FileUploadCardContext';
}
