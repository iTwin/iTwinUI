import React from 'react';
import cx from 'classnames';

export type FileUploadCardDescriptionProps = {
  /**
   * Buttons in the dialog bar.
   */
  children: React.ReactNode;
} & React.ComponentPropsWithRef<'span'>;

export const FileUploadCardDescription = React.forwardRef<
  HTMLSpanElement,
  FileUploadCardDescriptionProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <span
      className={cx('iui-file-uploaded-template-description', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </span>
  );
});
