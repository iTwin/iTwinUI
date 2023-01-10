/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme, SvgUpload, SvgDocument } from '../utils';
import '@itwin/itwinui-css/css/file-upload.css';

export type FileUploadTemplateProps = {
  /**
   * Callback fired when a file is selected from the device.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Whether the file input accepts multiple files.
   * Passed to the `multiple` attribute of native file input.
   * @default true
   */
  acceptMultiple?: boolean;
  /**
   * File types allowed.
   * Passed to the `accept` attribute of native file input.
   */
  acceptType?: string;
  /**
   * Localized version of primary clickable label. Gets styled like a hyperlink.
   * @default 'Choose a file'
   */
  label?: React.ReactNode;
  /**
   * Localized version of the secondary text shown below the label.
   * @default 'or drag & drop it here.'
   */
  subtitle?: React.ReactNode;
  /**
   * Files selected. Used for default uploaded file output only when one file is selected.
   */
  files?: Array<File>;
  /**
   * Localized version of label used for default uploaded file output. Defaults to file name.
   */
  fileLabel?: string;
  /**
   * Localized version of description used for default uploaded file output. Defaults to file size and modified date.
   */
  fileDescription?: string;
  /**
   * Custom svg icon for uploaded file output.
   */
  svgIcon?: JSX.Element;
  /**
   * Optional children appended to the template.
   */
  children?: React.ReactNode;
};

/**
 * Default template to be used with the `FileUpload` wrapper component.
 * Contains a hidden input with styled labels (customizable).
 * @example
 * <FileUploadTemplate onChange={(e) => console.log(e.target.files)} />
 */
export const FileUploadTemplate = (props: FileUploadTemplateProps) => {
  const {
    onChange,
    acceptMultiple = true,
    acceptType,
    label = 'Choose a file',
    subtitle = 'or drag & drop it here.',
    files,
    fileLabel,
    fileDescription,
    svgIcon,
    children,
  } = props;
  useTheme();

  const icon = svgIcon ? (
    React.cloneElement(svgIcon, {
      className: cx('iui-icon', svgIcon.props.className),
      'aria-hidden': true,
      'data-iui-file-uploaded': true,
    })
  ) : (
    <SvgDocument
      className='iui-icon'
      aria-hidden
      data-iui-file-uploaded={true}
    />
  );

  return files?.length === 1 ? (
    <>
      {icon}
      <span className='iui-template-file-uploaded-text'>
        <span className='iui-template-file-uploaded-label'>
          {fileLabel ?? files[0].name}
        </span>
        <span className='iui-template-file-uploaded-description'>
          {fileDescription ??
            toBytes(files[0].size) + ' ' + toDate(files[0].lastModified)}
        </span>
      </span>
      <label className='iui-anchor'>
        <input
          className='iui-browse-input'
          type='file'
          onChange={onChange}
          multiple={acceptMultiple}
          accept={acceptType}
        />
        {label}
      </label>
    </>
  ) : (
    <>
      <SvgUpload className='iui-icon' aria-hidden />
      <div className='iui-template-text'>
        <label className='iui-anchor'>
          <input
            className='iui-browse-input'
            type='file'
            onChange={onChange}
            multiple={acceptMultiple}
            accept={acceptType}
          />
          {label}
        </label>
        <div>{subtitle}</div>
        {children}
      </div>
    </>
  );
};

export default FileUploadTemplate;

function toBytes(bytes: number) {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;

  while (bytes >= 1024 && ++i) {
    bytes = bytes / 1024;
  }

  return bytes.toFixed(bytes < 10 && i > 0 ? 2 : 0) + units[i];
}

function toDate(dateNumber: number) {
  const date = new Date(dateNumber);
  return date.toDateString() + ' ' + date.toLocaleTimeString();
}
