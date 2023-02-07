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
  const { data, onDataChange, setInternalData } = useSafeContext(
    FileUploadCardContext,
  );

  const setNativeFilesRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      if (!node || !data) {
        return;
      }

      const dataTransfer = new DataTransfer();
      dataTransfer.items.clear();
      dataTransfer.items.add(data);

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
          if (!e.isDefaultPrevented()) {
            const _files = Array.from(e.currentTarget.files || []);
            onDataChange?.(_files[0]);
            setInternalData(_files[0]);
          }
        }}
        ref={refs}
        {...rest}
      />
      {children}
    </>
  );
});
