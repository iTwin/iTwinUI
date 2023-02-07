import React from 'react';
import cx from 'classnames';
import { FileUploadCardContext } from './FileUploadCard';
import { useSafeContext } from '../utils';

export type FileUploadCardLabelProps = React.ComponentPropsWithRef<'span'>;

export const FileUploadCardLabel = React.forwardRef<
  HTMLSpanElement,
  FileUploadCardLabelProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  const { files } = useSafeContext(FileUploadCardContext);
  return (
    <span className={cx('iui-file-card-label', className)} ref={ref} {...rest}>
      {children ?? files[0].name}
    </span>
  );
});
