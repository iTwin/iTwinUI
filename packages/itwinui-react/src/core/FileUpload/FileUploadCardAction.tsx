import React from 'react';
import { FileUploadTemplateProps } from './FileUploadTemplate';
import cx from 'classnames';

export type FileUploadCardActionProps = {
  /**
   * Buttons in the dialog bar.
   */
  children?: React.ReactNode;
} & React.ComponentPropsWithRef<'div'> &
  Pick<
    FileUploadTemplateProps,
    'acceptType' | 'acceptMultiple' | 'label' | 'onChange'
  >;

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
      <label className='iui-anchor'>
        <input
          className='iui-browse-input'
          type='file'
          onChange={props.onChange}
          multiple={props.acceptMultiple}
          accept={props.acceptType}
        />
        {children ?? 'Test Action'}
      </label>
    </div>
  );
});
