/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { SvgUpload } from '../utils';
import cx from 'classnames';
import FileUploadCard from './FileUploadCard';

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
      {children ?? <SvgUpload className='iui-icon' aria-hidden />}
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
// FileEmptyCard.Description component

export type FileEmptyCardDescriptionProps = React.ComponentPropsWithRef<'div'>;

const FileEmptyCardDescription = React.forwardRef<
  HTMLDivElement,
  FileEmptyCardDescriptionProps
>((props, ref) => {
  const { children, className, ...rest } = props;
  return (
    <div className={className} ref={ref} {...rest}>
      {children}
    </div>
  );
});

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
 *     <FileEmptyCard.Description>
 *       Custom Description Text
 *     </FileEmptyCard.Description>
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
                <FileEmptyCard.Description>
                  or drag & drop it here.
                </FileEmptyCard.Description>
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
    Description: FileEmptyCardDescription,
  },
);

export const FileEmptyCardContext = React.createContext<
  | {
      /**
       * Id to pass to input
       */
      inputId: string;
    }
  | undefined
>(undefined);

export default FileEmptyCard;
