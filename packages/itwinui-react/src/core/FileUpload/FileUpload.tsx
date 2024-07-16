/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box, mergeEventHandlers } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type FileUploadProps = {
  /**
   * Content shown over `children` when file is being dragged onto the component.
   * Should always be used when drag content differs from `children` being wrapped.
   */
  dragContent?: React.ReactNode;
  /**
   * Callback fired when files are dropped onto the component.
   *
   * The first argument is the `files` list, and the second argument is the underlying "drop" event.
   */
  onFileDropped: (files: FileList, event: React.DragEvent) => void;
  /**
   * Component to wrap `FileUpload` around.
   * Either pass `FileUploadCard` (for default state) or a different component to wrap.
   */
  children: React.ReactNode;
  /**
   *  Allows for custom prop to be passed for content.
   */
  contentProps?: React.ComponentProps<'div'>;
};

/**
 * File upload component to be wrapped around `FileUploadCard` or any arbitrary component.
 * Provides support for dragging and dropping multiple files.
 * @example
 * <FileUpload onFileDropped={console.log}><FileUploadCard /></FileUpload>
 * <FileUpload dragContent='Drop file here' onFileDropped={console.log}><Textarea /></FileUpload>
 */
export const FileUpload = React.forwardRef((props, forwardedRef) => {
  const { dragContent, children, onFileDropped, contentProps, ...rest } = props;

  const [isDragActive, setIsDragActive] = React.useState(false);

  const onDragOverHandler = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onDragEnterHandler = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // only set active if a file is dragged over
    if (!isDragActive && e.dataTransfer?.items?.[0]?.kind === 'file') {
      setIsDragActive(true);
    }
  };

  const onDragLeaveHandler = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // only set inactive if secondary target is outside the component
    if (isDragActive && !e.currentTarget?.contains(e.relatedTarget as Node)) {
      setIsDragActive(false);
    }
  };

  const onDropHandler = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDragActive) {
      setIsDragActive(false);
      onFileDropped(e.dataTransfer?.files, e);
    }
  };

  return (
    <Box
      {...rest}
      className={cx(
        'iui-file-upload',
        { 'iui-drag': isDragActive },
        props?.className,
      )}
      ref={forwardedRef}
      onDragEnter={mergeEventHandlers(props.onDragEnter, onDragEnterHandler)}
      onDragOver={mergeEventHandlers(props.onDragOver, onDragOverHandler)}
      onDragLeave={mergeEventHandlers(props.onDragLeave, onDragLeaveHandler)}
      onDrop={mergeEventHandlers(props.onDrop, onDropHandler)}
    >
      {dragContent ? (
        children
      ) : (
        <Box
          as='div'
          {...contentProps}
          className={cx('iui-content', contentProps?.className)}
        >
          {children}
        </Box>
      )}
      {dragContent && (
        <Box
          as='div'
          {...contentProps}
          className={cx('iui-content', contentProps?.className)}
        >
          {dragContent}
        </Box>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', FileUploadProps>;
if (process.env.NODE_ENV === 'development') {
  FileUpload.displayName = 'FileUpload';
}
