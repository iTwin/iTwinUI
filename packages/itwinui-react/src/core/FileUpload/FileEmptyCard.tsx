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
    <span className={cx('iui-template-icon', className)} ref={ref} {...rest}>
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
    <span className={cx('iui-template-text', className)} ref={ref} {...rest}>
      {children}
    </span>
  );
});

// ----------------------------------------------------------------------------
// FileEmptyCard.Anchor component

export type FileEmptyCardAnchorProps = {
  /**
   * Anchor label
   * @default 'Choose a file'
   */
  label?: string;
} & React.ComponentPropsWithRef<'label'>;

const FileEmptyCardAnchor = React.forwardRef<
  HTMLLabelElement,
  FileEmptyCardAnchorProps
>((props, ref) => {
  const { children, className, label = 'Choose a file', ...rest } = props;
  return (
    <label className={cx('iui-anchor', className)} ref={ref} {...rest}>
      {children}
      {label}
    </label>
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
      {children ?? 'or drag & drop it here.'}
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
 *     <FileEmptyCard.Anchor label='Custom Label Text'>
 *       <FileEmptyCard.Input name={fileInputId} ref={inputRef} />
 *     </FileEmptyCard.Anchor>
 *     <FileEmptyCard.Description>
 *       Custom Description Text
 *     </FileEmptyCard.Description>
 *   </FileEmptyCard.Text>
 * </FileEmptyCard>
 */
export const FileEmptyCard = Object.assign(
  (props: FileEmptyCardProps) => {
    const { children } = props;

    return (
      <>
        {children ?? (
          <>
            <FileEmptyCard.Icon />
            <FileEmptyCard.Text>
              <FileEmptyCard.Anchor>
                <FileUploadCard.Input />
              </FileEmptyCard.Anchor>
              <FileEmptyCard.Description />
            </FileEmptyCard.Text>
          </>
        )}
      </>
    );
  },
  {
    Icon: FileEmptyCardIcon,
    Text: FileEmptyCardText,
    Description: FileEmptyCardDescription,
    Anchor: FileEmptyCardAnchor,
  },
);
export default FileEmptyCard;
