import React from 'react';
import { FileUploadTemplateProps } from './FileUploadTemplate';

export type FileUploadCardActionProps = Pick<
  FileUploadTemplateProps,
  'acceptType' | 'acceptMultiple' | 'label' | 'onChange'
>;

export const FileUploadCardAction = (props: FileUploadCardActionProps) => {
  return (
    <label className='iui-anchor'>
      <input
        className='iui-browse-input'
        type='file'
        onChange={props.onChange}
        multiple={props.acceptMultiple}
        accept={props.acceptType}
      />
      {props.label ?? 'Test Action'}
    </label>
  );
};
