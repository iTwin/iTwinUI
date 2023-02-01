import React from 'react';
import cx from 'classnames';
import { SvgDocument } from '../utils';

export type FileUploadCardIconProps = {
  /**
   * Children for FileUploadCardLabel.
   */
  children?: JSX.Element;
} & React.ComponentPropsWithRef<'span'>;

export const FileUploadCardIcon = React.forwardRef<
  HTMLSpanElement,
  FileUploadCardIconProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <span className={cx('iui-file-card-icon', className)} ref={ref} {...rest}>
      {children ?? <SvgDocument />}
    </span>
  );
});
