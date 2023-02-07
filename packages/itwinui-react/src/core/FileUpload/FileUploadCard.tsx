/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { SvgUpload } from '../utils';
import cx from 'classnames';
import { FileUploadCardAction } from './FileUploadCardAction';
import { FileUploadCardText } from './FileUploadCardText';
import { FileUploadCardLabel } from './FileUploadCardLabel';
import { FileUploadCardDescription } from './FileUploadCardDescription';
import { FileUploadCardInput } from './FileUploadCardInput';
import { FileUploadCardIcon } from './FileUploadCardIcon';
import { FileUploadCardAnchor } from './FileUploadCardAnchor';

export type FileUploadCardProps = {
  /**
   * File to pass (only needed when passing a custom action)
   */
  data?: File;
  /**
   * Callback fired when data has changed (only needed passing custom action)
   */
  onDataChange?: (data: File) => void;
} & React.ComponentPropsWithoutRef<'div'>;
/**
 * Default card to be used with the `FileUpload` wrapper component for single-file uploading.
 * @example
 * <FileUploadCard />
 * <FileUploadCard data={data} onDataChange={(data) => setData(data)}>
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
 *         setData([]);
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
        data: dataProps,
        onDataChange,
        ...rest
      } = props;

      const [internalData, setInternalData] = React.useState<File>();
      const data = dataProps ?? internalData ?? undefined;

      return (
        <FileUploadCardContext.Provider
          value={{ data, onDataChange, setInternalData }}
        >
          {data ? (
            <div className={cx('iui-file-card', className)} ref={ref} {...rest}>
              {children ?? (
                <>
                  <FileUploadCard.Icon />
                  <FileUploadCard.Text>
                    <FileUploadCard.Label />
                    <FileUploadCard.Description />
                  </FileUploadCard.Text>
                  <FileUploadCard.Action>
                    <FileUploadCard.Anchor>
                      <FileUploadCard.Input />
                      {'Replace'}{' '}
                    </FileUploadCard.Anchor>
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
    Anchor: FileUploadCardAnchor,
    Input: FileUploadCardInput,
  },
);
export default FileUploadCard;

export const FileUploadCardContext = React.createContext<
  | {
      /**
       * Data to pass
       */
      data?: File;
      /**
       * Callback fired when data has changed
       */
      onDataChange?: (data: File) => void;
      /**
       * Sets the state of the data within FileUploadCard
       */
      setInternalData: (data: File) => void;
    }
  | undefined
>(undefined);
