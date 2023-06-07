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
  VisuallyHidden,
} from '../utils/index.js';
import cx from 'classnames';
import { FileEmptyCard } from './FileEmptyCard.js';
import { Anchor } from '../Typography/Anchor/Anchor.js';
import '@itwin/itwinui-css/css/file-upload.css';

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
export type FileUploadCardIconProps = React.ComponentPropsWithRef<'span'>;

const FileUploadCardIcon = React.forwardRef<
  HTMLSpanElement,
  FileUploadCardIconProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <span className={cx('iui-file-card-icon', className)} ref={ref} {...rest}>
      {children ?? <SvgDocument />}
    </span>
  );
});
FileUploadCardIcon.displayName = 'FileUploadCard.Icon';

// ----------------------------------------------------------------------------
// FileUploadCard.Info component

export type FileUploadCardInfoProps = React.ComponentPropsWithRef<'span'>;

const FileUploadCardInfo = React.forwardRef<
  HTMLSpanElement,
  FileUploadCardInfoProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <span className={cx('iui-file-card-text', className)} ref={ref} {...rest}>
      {children}
    </span>
  );
});
FileUploadCardInfo.displayName = 'FileUploadCard.Info';

// ----------------------------------------------------------------------------
// FileUploadCard.Title component

export type FileUploadCardTitleProps = React.ComponentPropsWithRef<'span'>;

const FileUploadCardTitle = React.forwardRef<
  HTMLSpanElement,
  FileUploadCardTitleProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  const { files } = useSafeContext(FileUploadCardContext);
  const title =
    files.length > 1 ? files.length + ' files selected' : files[0].name;
  return (
    <span className={cx('iui-file-card-title', className)} ref={ref} {...rest}>
      {children ?? title}
    </span>
  );
});
FileUploadCardTitle.displayName = 'FileUploadCard.Title';

// ----------------------------------------------------------------------------
// FileUploadCard.Description component

export type FileUploadCardDescriptionProps =
  React.ComponentPropsWithRef<'span'>;

const FileUploadCardDescription = React.forwardRef<
  HTMLSpanElement,
  FileUploadCardDescriptionProps
>((props, ref) => {
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
    <span
      className={cx('iui-file-card-description', className)}
      ref={ref}
      {...rest}
    >
      {children ?? description}
    </span>
  );
});
FileUploadCardDescription.displayName = 'FileUploadCard.Description';

// ----------------------------------------------------------------------------
// FileUploadCard.Action component

export type FileUploadCardActionProps = React.ComponentPropsWithRef<'div'>;

const FileUploadCardAction = React.forwardRef<
  HTMLDivElement,
  FileUploadCardActionProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <div className={cx('iui-file-card-action', className)} ref={ref} {...rest}>
      {children}
    </div>
  );
});
FileUploadCardAction.displayName = 'FileUploadCard.Action';

// ----------------------------------------------------------------------------
// FileUploadCard.InputLabel component

export type FileUploadCardInputLabelProps =
  React.ComponentPropsWithRef<'label'>;

const FileUploadCardInputLabel = React.forwardRef<
  HTMLLabelElement,
  FileUploadCardInputLabelProps
>((props, ref) => {
  const { children, ...rest } = props;
  const { inputId } = useSafeContext(FileUploadCardContext);
  return (
    <Anchor as='label' ref={ref} htmlFor={inputId} {...rest}>
      {children}
    </Anchor>
  );
});
FileUploadCardInputLabel.displayName = 'FileUploadCard.InputLabel';

// ----------------------------------------------------------------------------
// FileUploadCard.Input component

export type FileUploadCardInputProps = React.ComponentPropsWithRef<'input'>;

const FileUploadCardInput = React.forwardRef<
  HTMLInputElement,
  FileUploadCardInputProps
>((props, ref) => {
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
});
FileUploadCardInput.displayName = 'FileUploadCard.Input';

// ----------------------------------------------------------------------------
// FileUploadCard component

export type FileUploadCardProps = {
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
} & React.ComponentPropsWithoutRef<'div'>;
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
export const FileUploadCard = Object.assign(
  React.forwardRef<HTMLDivElement, FileUploadCardProps>(
    (props, ref: React.RefObject<HTMLDivElement>) => {
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
            <div className={cx('iui-file-card', className)} ref={ref} {...rest}>
              {children ?? (
                <>
                  <FileUploadCard.Icon />
                  <FileUploadCard.Info>
                    <FileUploadCard.Title />
                    <FileUploadCard.Description />
                  </FileUploadCard.Info>
                  <FileUploadCard.Action>
                    <FileUploadCard.InputLabel>
                      Replace
                    </FileUploadCard.InputLabel>
                  </FileUploadCard.Action>
                </>
              )}
            </div>
          ) : (
            emptyCard
          )}
          {input ?? <FileUploadCard.Input />}
        </FileUploadCardContext.Provider>
      );
    },
  ),
  {
    Icon: FileUploadCardIcon,
    Info: FileUploadCardInfo,
    Title: FileUploadCardTitle,
    Description: FileUploadCardDescription,
    Action: FileUploadCardAction,
    InputLabel: FileUploadCardInputLabel,
    Input: FileUploadCardInput,
  },
);
FileUploadCard.displayName = 'FileUploadCard';
export default FileUploadCard;

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
