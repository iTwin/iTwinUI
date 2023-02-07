import React from 'react';
import cx from 'classnames';

export type FileUploadCardTextProps = React.ComponentPropsWithRef<'span'>;

export const FileUploadCardText = React.forwardRef<
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
