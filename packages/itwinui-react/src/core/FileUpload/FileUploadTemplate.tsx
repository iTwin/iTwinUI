/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { useTheme, SvgUpload, SvgDocument } from '../utils';
import '@itwin/itwinui-css/css/file-upload.css';

const toBytes = (bytes: number) => {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB'];
  let i = 0;

  while (bytes >= 1024 && ++i) {
    bytes = bytes / 1024;
  }

  return bytes.toFixed(bytes < 10 && i > 0 ? 2 : 0) + units[i];
};

const toDate = (dateNumber: number) => {
  const date = new Date(dateNumber);
  return date.toDateString() + ' ' + date.toLocaleTimeString();
};

export type FileUploadedTemplateProps =
  | {
      /**
       * Whether the file input accepts multiple files.
       * Passed to the `multiple` attribute of native file input.
       * @default true
       */
      acceptMultiple?: true;
      /**
       * Files selected. Used for default uploaded file output only when one file is selected.
       */
      data?: undefined;
      /**
       * Localized version of label used for default uploaded file output. Defaults to file name.
       */
      dataLabel?: undefined;
      /**
       * Localized version of description used for default uploaded file output. Defaults to file size and modified date.
       */
      dataDescription?: undefined;
      /**
       * Custom svg icon for uploaded file output.
       */
      dataSvg?: undefined;
    }
  | {
      acceptMultiple: false;
      data?: File;
      dataLabel?: string;
      dataDescription?: string;
      dataSvg?: JSX.Element;
    };

export type FileUploadTemplateProps = {
  /**
   * Callback fired when a file is selected from the device.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
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
   * Optional children appended to the template.
   */
  children?: React.ReactNode;
} & FileUploadedTemplateProps;

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
    data,
    dataLabel,
    dataDescription,
    dataSvg,
    children,
  } = props;
  useTheme();

  const icon = dataSvg ? (
    React.cloneElement(dataSvg, {
      className: cx('iui-icon', dataSvg.props.className),
      'aria-hidden': true,
    })
  ) : (
    <SvgDocument className='iui-icon' aria-hidden />
  );

  return !acceptMultiple && data ? (
    <div className='iui-file-uploaded-template'>
      {icon}
      <span className='iui-file-uploaded-template-text'>
        <span className='iui-file-uploaded-template-label'>
          {dataLabel ?? data.name}
        </span>
        <span className='iui-file-uploaded-template-description'>
          {dataDescription ??
            toBytes(data.size) + ' ' + toDate(data.lastModified)}
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
    </div>
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
