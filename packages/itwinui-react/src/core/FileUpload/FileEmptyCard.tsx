/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SvgUpload } from '../utils/index.js';
import cx from 'classnames';
import FileUploadCard from './FileUploadCard.js';

// ----------------------------------------------------------------------------
// FileEmptyCard.Icon component
export type FileEmptyCardIconProps = React.ComponentPropsWithRef<'span'>;

const FileEmptyCardIcon = React.forwardRef<
  HTMLSpanElement,
  FileEmptyCardIconProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <span
      className={cx('iui-file-card-empty-icon', className)}
      ref={ref}
      {...rest}
    >
      {children ?? <SvgUpload />}
    </span>
  );
});

// ----------------------------------------------------------------------------
// FileEmptyCard.Text component

export type FileEmptyCardTextProps = React.ComponentPropsWithRef<'span'>;

const FileEmptyCardText = React.forwardRef<
  HTMLSpanElement,
  FileEmptyCardTextProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <span
      className={cx('iui-file-card-empty-action', className)}
      ref={ref}
      {...rest}
    >
      {children}
    </span>
  );
});

// ----------------------------------------------------------------------------
// FileEmptyCard component

export type FileEmptyCardProps = React.ComponentPropsWithoutRef<'div'>;
/**
 * Empty file card to be used with the `FileUploadCard` component when no file has been uploaded.
 * @example
 * <FileEmptyCard />
 * <FileEmptyCard>
 *   <FileEmptyCard.Icon>
 *     <SvgSmileySadVery />
 *   </FileEmptyCard.Icon>
 *   <FileEmptyCard.Text>
 *     <FileUploadCard.InputLabel>
 *       Custom Label Text
 *     </FileUploadCard.InputLabel>
 *     <div>Custom Description Text</div>
 *   </FileEmptyCard.Text>
 * </FileEmptyCard>
 */
export const FileEmptyCard = Object.assign(
  React.forwardRef<HTMLDivElement, FileEmptyCardProps>(
    (props, ref: React.RefObject<HTMLDivElement>) => {
      const { children, className, ...rest } = props;

      return (
        <div
          className={cx('iui-file-card-empty', className)}
          ref={ref}
          {...rest}
        >
          {children ?? (
            <>
              <FileEmptyCard.Icon />
              <FileEmptyCard.Text>
                <FileUploadCard.InputLabel>
                  Choose a file
                </FileUploadCard.InputLabel>
                <div>to upload.</div>
              </FileEmptyCard.Text>
            </>
          )}
        </div>
      );
    },
  ),
  {
    Icon: FileEmptyCardIcon,
    Text: FileEmptyCardText,
  },
);

export default FileEmptyCard;
