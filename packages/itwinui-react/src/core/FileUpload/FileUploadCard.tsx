/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { SvgUpload } from '../utils';
import { FileUploadCardAction } from './FileUploadCardAction';
import cx from 'classnames';
import { FileUploadCardText } from './FileUploadCardText';
import { FileUploadCardLabel } from './FileUploadCardLabel';
import { FileUploadCardDescription } from './FileUploadCardDescription';
import { FileUploadCardInput } from './FileUploadCardInput';
import { FileUploadCardIcon } from './FileUploadCardIcon';

export type FileUploadCardProps = {
  /**
   * List of files to pass (only needed when passing a custom action)
   */
  files?: File[];
  /**
   * Callback fired when files have changed (only needed passing  custom action)
   */
  onFilesChange?: (files: File[]) => void;
} & React.ComponentPropsWithoutRef<'div'>;
/**
 * Default card to be used with the `FileUpload` wrapper component for single-file uploading.
 * @example
 * <FileUploadCard />
 * <FileUploadCard files={files} onFilesChange={(files) => setFiles(files)}>
 *   <FileUploadCard.Icon>
 *     <SvgSmileyHappyVery />
 *   </FileUploadCard.Icon>
 *   <FileUploadCard.Text>
 *     <FileUploadCard.Label>Custom File Name</FileUploadCard.Label>
 *     <FileUploadCard.Description>
 *       Custom File Description
 *     </FileUploadCard.Description>
 *   </FileUploadCard.Text>
 *   <FileUploadCard.Action>
 *     <Button
 *       onClick={() => {
 *         setFiles([]);
 *       }}
 *     />
 *     <FileUploadCard.Input name={fileInputId} ref={inputRef} />
 *   </FileUploadCard.Action>
 * </FileUploadCard>
 */
export const FileUploadCard = Object.assign(
  React.forwardRef<HTMLDivElement, FileUploadCardProps>(
    (props, ref: React.RefObject<HTMLDivElement>) => {
      const {
        className,
        children,
        files: filesProp,
        onFilesChange,
        ...rest
      } = props;

      const [internalFiles, setInternalFiles] = React.useState<File[]>();
      const files = filesProp ?? internalFiles ?? [];

      return (
        <FileUploadCardContext.Provider
          value={{ files, onFilesChange, setInternalFiles }}
        >
          {files?.length ? (
            <div className={cx('iui-file-card', className)} ref={ref} {...rest}>
              {children ?? (
                <>
                  <FileUploadCard.Icon />
                  <FileUploadCard.Text>
                    <FileUploadCard.Label />
                    <FileUploadCard.Description />
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
                  <FileUploadCard.Input />
                  {'Choose a file'}
                </label>
                <div>{'or drag & drop it here.'}</div>
              </div>
            </>
          )}
        </FileUploadCardContext.Provider>
      );
    },
  ),
  {
    Icon: FileUploadCardIcon,
    Text: FileUploadCardText,
    Label: FileUploadCardLabel,
    Description: FileUploadCardDescription,
    Action: FileUploadCardAction,
    Input: FileUploadCardInput,
  },
);
export default FileUploadCard;

export const FileUploadCardContext = React.createContext<
  | {
      /**
       * List of files to pass
       */
      files: File[];
      /**
       * Callback fired when files have changed
       */
      onFilesChange?: (files: File[]) => void;
      /**
       * Sets the state of the files within FileUploadCard
       */
      setInternalFiles: (files: File[]) => void;
    }
  | undefined
>(undefined);
