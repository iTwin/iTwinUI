import React from 'react';
import cx from 'classnames';

export type FileUploadCardTextProps = {
  /**
   * Buttons in the dialog bar.
   */
  children: React.ReactNode;
} & React.ComponentPropsWithRef<'span'>;

export const FileUploadCardText = React.forwardRef<
  HTMLSpanElement,
  FileUploadCardTextProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <span
      className={cx('iui-file-uploaded-template-text', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </span>
  );
});
