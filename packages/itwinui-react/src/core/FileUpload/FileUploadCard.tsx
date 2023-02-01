/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { SvgDocument, SvgUpload } from '../utils';
import { FileUploadCardAction } from './FileUploadCardAction';
import cx from 'classnames';
import { FileUploadCardText } from './FileUploadCardText';
import { FileUploadCardLabel } from './FileUploadCardLabel';
import { FileUploadCardDescription } from './FileUploadCardDescription';
import { FileUploadCardInput } from './FileUploadCardInput';

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

export type FileUploadCardProps = {
  /**
   * Svg icon for uploaded file output.
   * @default: SvgDocument
   */
  icon?: JSX.Element;
} & React.ComponentPropsWithoutRef<'div'>;

export const FileUploadCard = Object.assign(
  React.forwardRef<HTMLDivElement, FileUploadCardProps>(
    (props, ref: React.RefObject<HTMLDivElement>) => {
      const { className, children, ...rest } = props;

      const [files, setFiles] = React.useState<Array<File>>([]);

      // only putting children as a condition here temporarily to see what cards look like when children are passed by the user
      return files.length || children ? (
        <div
          className={cx('iui-file-uploaded-template', className)}
          ref={ref}
          {...rest}
        >
          {children ?? (
            <>
              {<SvgDocument />}
              <FileUploadCard.Text>
                <FileUploadCard.Label>{files[0].name}</FileUploadCard.Label>
                <FileUploadCard.Description>
                  {toBytes(files[0].size) + ' ' + toDate(files[0].lastModified)}
                </FileUploadCard.Description>
              </FileUploadCard.Text>
              <FileUploadCard.Action>
                <FileUploadCard.Input />
                {'Replace'}
              </FileUploadCard.Action>
            </>
          )}
        </div>
      ) : (
        <>
          <SvgUpload className='iui-icon' aria-hidden />
          <div className='iui-template-text'>
            <label className='iui-anchor'>
              <input
                className='iui-browse-input'
                type='file'
                onChange={(e) => setFiles(Array.from(e.target.files || []))}
              />
              {'Choose a file'}
            </label>
            <div>{'or drag & drop it here.'}</div>
          </div>
        </>
      );
    },
  ),
  {
    Text: FileUploadCardText,
    Label: FileUploadCardLabel,
    Description: FileUploadCardDescription,
    Action: FileUploadCardAction,
    Input: FileUploadCardInput,
  },
);
export default FileUploadCard;
