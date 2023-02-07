import React from 'react';
import cx from 'classnames';
import { useMergedRefs, useSafeContext } from '../utils';
import { FileUploadCardContext } from './FileUploadCard';

export type FileUploadCardInputProps = React.ComponentPropsWithRef<'input'>;

export const FileUploadCardInput = React.forwardRef<
  HTMLInputElement,
  FileUploadCardInputProps
>((props, ref) => {
  const { children, className, onChange, ...rest } = props;
  const { files, onFilesChange, setInternalFiles } = useSafeContext(
    FileUploadCardContext,
  );

  const setNativeFilesRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      if (!node) {
        return;
      }

      const dataTransfer = new DataTransfer();
      dataTransfer.items.clear();
      files.forEach((file) => dataTransfer.items.add(file));

      node.files = dataTransfer.files;
    },
    [files],
  );

  const refs = useMergedRefs(ref, setNativeFilesRef);

  return (
    <>
      <input
        className={cx('iui-file-card-input', className)}
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
        {...rest}
      />
      {children}
    </>
  );
});
