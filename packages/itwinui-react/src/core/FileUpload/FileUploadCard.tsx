/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import {
  getWindow,
  SvgDocument,
  useMergedRefs,
  useSafeContext,
} from '../utils';
import cx from 'classnames';
import { FileEmptyCard } from './FileEmptyCard';
import { useId } from '../utils';

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

// ----------------------------------------------------------------------------
// FileUploadCard.InputLabel component

export type FileUploadCardInputLabelProps =
  React.ComponentPropsWithRef<'label'>;

const FileUploadCardInputLabel = React.forwardRef<
  HTMLLabelElement,
  FileUploadCardInputLabelProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  const { inputId } = useSafeContext(FileUploadCardContext);
  return (
    <label
      className={cx('iui-anchor', className)}
      ref={ref}
      htmlFor={inputId}
      {...rest}
    >
      {children}
    </label>
  );
});

// ----------------------------------------------------------------------------
// FileUploadCard.Input component

export type FileUploadCardInputProps = React.ComponentPropsWithRef<'input'>;

const FileUploadCardInput = React.forwardRef<
  HTMLInputElement,
  FileUploadCardInputProps
>((props, ref) => {
  const { children, className, onChange, id, ...rest } = props;
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

  if (id && id !== inputId) {
    setInputId(id);
  }

  return (
    <>
      <input
        className={cx('iui-visually-hidden', className)}
        type='file'
        onChange={(e) => {
          onChange?.(e);
          if (!e.isDefaultPrevented()) {
            const _files = Array.from(e.currentTarget.files || []);
            onFilesChange?.(_files);
            setInternalFiles(_files);
          }
        }}
        ref={refs}
        id={id ?? inputId}
        {...rest}
      />
      {children}
    </>
  );
});

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
      const [inputId, setInputId] = React.useState(useId());
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
