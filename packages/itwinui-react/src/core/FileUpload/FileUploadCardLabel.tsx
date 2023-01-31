import React from 'react';
import cx from 'classnames';

export type FileUploadCardLabelProps = {
  /**
   * Buttons in the dialog bar.
   */
  children: React.ReactNode;
} & React.ComponentPropsWithRef<'span'>;

export const FileUploadCardLabel = React.forwardRef<
  HTMLSpanElement,
  FileUploadCardLabelProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <span
      className={cx('iui-file-uploaded-template-label', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </span>
  );
});
