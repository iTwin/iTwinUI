import React from 'react';
import cx from 'classnames';

export type FileUploadCardActionProps = {
  /**
   * Buttons in the dialog bar.
   */
  children: React.ReactNode;
} & React.ComponentPropsWithRef<'div'>;

export const FileUploadCardAction = React.forwardRef<
  HTMLDivElement,
  FileUploadCardActionProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <div
      className={cx('iui-file-uploaded-template-action', className)}
      ref={ref}
      {...rest}
    >
      <label className='iui-anchor'>{children}</label>
    </div>
  );
});
