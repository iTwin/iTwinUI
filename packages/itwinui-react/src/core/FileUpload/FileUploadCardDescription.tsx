import React from 'react';
import cx from 'classnames';
import { FileUploadCardContext } from './FileUploadCard';
import { useSafeContext } from '../utils';

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

export type FileUploadCardDescriptionProps = {
  /**
   * Children for FileUploadCardLabel.
   */
  children?: React.ReactNode;
} & React.ComponentPropsWithRef<'span'>;

export const FileUploadCardDescription = React.forwardRef<
  HTMLSpanElement,
  FileUploadCardDescriptionProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  const { files } = useSafeContext(FileUploadCardContext);
  return (
    <span
      className={cx('iui-file-card-description', className)}
      ref={ref}
      {...rest}
    >
      {children ?? toBytes(files[0].size) + ' ' + toDate(files[0].lastModified)}
    </span>
  );
});
