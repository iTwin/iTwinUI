/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import {
  SvgDocument,
  SvgUpload,
  useMergedRefs,
  useSafeContext,
} from '../utils';
import cx from 'classnames';

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
// FileUploadCard.Text component

export type FileUploadCardTextProps = React.ComponentPropsWithRef<'span'>;

const FileUploadCardText = React.forwardRef<
  HTMLSpanElement,
  FileUploadCardTextProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <span className={cx('iui-file-card-text', className)} ref={ref} {...rest}>
      {children}
    </span>
  );
});

// ----------------------------------------------------------------------------
// FileUploadCard.Label component

export type FileUploadCardLabelProps = React.ComponentPropsWithRef<'span'>;

const FileUploadCardLabel = React.forwardRef<
  HTMLSpanElement,
  FileUploadCardLabelProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  const { data } = useSafeContext(FileUploadCardContext);
  return (
    <span className={cx('iui-file-card-label', className)} ref={ref} {...rest}>
      {children ?? data[0].name}
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
  const { data } = useSafeContext(FileUploadCardContext);
  return (
    <span
      className={cx('iui-file-card-description', className)}
      ref={ref}
      {...rest}
    >
      {children ?? toBytes(data[0].size) + ' ' + toDate(data[0].lastModified)}
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
      <label className='iui-anchor'>{children}</label>
    </div>
  );
});

// ----------------------------------------------------------------------------
// FileUploadCard.Anchor component

export type FileUploadCardAnchorProps = React.ComponentPropsWithRef<'label'>;

const FileUploadCardAnchor = React.forwardRef<
  HTMLLabelElement,
  FileUploadCardAnchorProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <label className={cx('iui-anchor', className)} ref={ref} {...rest}>
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
  const { children, className, onChange, ...rest } = props;
  const { data, onDataChange, setInternalData } = useSafeContext(
    FileUploadCardContext,
  );

  const setNativeFilesRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      if (!node) {
        return;
      }

      const dataTransfer = new DataTransfer();
      dataTransfer.items.clear();
      data.forEach((file) => dataTransfer.items.add(file));
      node.files = dataTransfer.files;
    },
    [data],
  );

  const refs = useMergedRefs(ref, setNativeFilesRef);

  return (
    <>
      <input
        className={cx('iui-file-card-input', className)}
        type='file'
        onChange={(e) => {
          onChange?.(e);
          console.log('e.currentTarget.files', e.currentTarget.files);
          if (!e.isDefaultPrevented()) {
            const _files = Array.from(e.currentTarget.files || []);
            console.log('_files', _files);
            onDataChange?.(_files);
            setInternalData(_files);
          }
        }}
        ref={refs}
        {...rest}
      />
      {children}
    </>
  );
});

export type FileUploadCardProps = {
  /**
   * File to pass (only needed when passing a custom action)
   */
  data?: File[];
  /**
   * Callback fired when data has changed (only needed passing custom action)
   */
  onDataChange?: (data: File[]) => void;
} & React.ComponentPropsWithoutRef<'div'>;
/**
 * Default card to be used with the `FileUpload` wrapper component for single-file uploading.
 * @example
 * <FileUploadCard />
 * <FileUploadCard data={data} onDataChange={(data) => setData(data)}>
 *   <FileUploadCard.Icon>
 *     <SvgSmileyHappyVery />
 *   </FileUploadCard.Icon>
 *   <FileUploadCard.Text>
 *     <FileUploadCard.Label>Custom File Name</FileUploadCard.Label>
 *     <FileUploadCard.Description>
 *       Custom File Description
 *     </FileUploadCard.Description>
 *   </FileUploadCard.Text>
 *   <FileUploadCard.Action>
 *     <Button
 *       onClick={() => {
 *         setData([]);
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
        data: dataProps,
        onDataChange,
        ...rest
      } = props;

      const [internalData, setInternalData] = React.useState<File[]>();
      const data = dataProps ?? internalData ?? [];

      return (
        <FileUploadCardContext.Provider
          value={{ data, onDataChange, setInternalData }}
        >
          {data?.length ? (
            <div className={cx('iui-file-card', className)} ref={ref} {...rest}>
              {children ?? (
                <>
                  <FileUploadCard.Icon />
                  <FileUploadCard.Text>
                    <FileUploadCard.Label />
                    <FileUploadCard.Description />
                  </FileUploadCard.Text>
                  <FileUploadCard.Action>
                    <FileUploadCard.Anchor>
                      <FileUploadCard.Input />
                      {'Replace'}
                    </FileUploadCard.Anchor>
                  </FileUploadCard.Action>
                </>
              )}
            </div>
          ) : (
            <>
              <SvgUpload className='iui-icon' aria-hidden />
              <div className='iui-template-text'>
                <label className='iui-anchor'>
                  <FileUploadCard.Input />
                  {'Choose a file'}
                </label>
                <div>{'or drag & drop it here.'}</div>
              </div>
            </>
          )}
        </FileUploadCardContext.Provider>
      );
    },
  ),
  {
    Icon: FileUploadCardIcon,
    Text: FileUploadCardText,
    Label: FileUploadCardLabel,
    Description: FileUploadCardDescription,
    Action: FileUploadCardAction,
    Anchor: FileUploadCardAnchor,
    Input: FileUploadCardInput,
  },
);
export default FileUploadCard;

export const FileUploadCardContext = React.createContext<
  | {
      /**
       * Data to pass
       */
      data: File[];
      /**
       * Callback fired when data has changed
       */
      onDataChange?: (data: File[]) => void;
      /**
       * Sets the state of the data within FileUploadCard
       */
      setInternalData: (data: File[]) => void;
    }
  | undefined
>(undefined);
