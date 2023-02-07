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

export type FileUploadCardDescriptionProps =
  React.ComponentPropsWithRef<'span'>;

export const FileUploadCardDescription = React.forwardRef<
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
      {children ??
        (data ? toBytes(data.size) + ' ' + toDate(data.lastModified) : '')}
    </span>
  );
});
