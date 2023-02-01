import React from 'react';
import cx from 'classnames';
import { FileUploadTemplateProps } from './FileUploadTemplate';

export type FileUploadCardInputProps = {
  /**
   * Buttons in the dialog bar.
   */
  children?: React.ReactNode;
} & React.ComponentPropsWithRef<'input'> &
  Pick<
    FileUploadTemplateProps,
    'acceptType' | 'acceptMultiple' | 'label' | 'onChange'
  >;

export const FileUploadCardInput = React.forwardRef<
  HTMLInputElement,
  FileUploadCardInputProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <>
      <input
        className={cx('iui-browse-input', className)}
        type='file'
        onChange={props.onChange}
        multiple={props.acceptMultiple}
        accept={props.acceptType}
        ref={ref}
        {...rest}
      />
      {children}
    </>
  );
});
