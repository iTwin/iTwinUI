import React from 'react';
import cx from 'classnames';

export type FileUploadCardActionProps = React.ComponentPropsWithRef<'div'>;

export const FileUploadCardAction = React.forwardRef<
  HTMLDivElement,
  FileUploadCardActionProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <div className={cx('iui-file-card-action', className)} ref={ref} {...rest}>
      <label className='iui-anchor'>{children}</label>
    </div>
  );
});
