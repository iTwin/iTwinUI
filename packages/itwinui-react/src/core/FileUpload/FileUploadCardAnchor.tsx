import React from 'react';
import cx from 'classnames';

export type FileUploadCardAnchorProps = React.ComponentPropsWithRef<'label'>;

export const FileUploadCardAnchor = React.forwardRef<
  HTMLLabelElement,
  FileUploadCardAnchorProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <label className={cx('iui-anchor', className)} ref={ref} {...rest}>
      {children}
    </label>
  );
});
