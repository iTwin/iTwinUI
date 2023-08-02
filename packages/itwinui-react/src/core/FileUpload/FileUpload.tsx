/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { Box, useMergedRefs } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';

type FileUploadProps = {
  /**
   * Content shown over `children` when file is being dragged onto the component.
   * Should always be used when drag content differs from `children` being wrapped.
   */
  dragContent?: React.ReactNode;
  /**
   * Callback fired when files are dropped onto the component.
   */
  onFileDropped: (files: FileList) => void;
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
export const FileUpload = React.forwardRef((props, ref) => {
  const {
    dragContent,
    children,
    onFileDropped,
    className,
    contentProps,
    ...rest
  } = props;

  const [isDragActive, setIsDragActive] = React.useState(false);
  const fileUploadRef = React.useRef<HTMLDivElement>(null);
  const refs = useMergedRefs(fileUploadRef, ref);

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
    if (
      isDragActive &&
      !fileUploadRef.current?.contains(e.relatedTarget as Node)
    ) {
      setIsDragActive(false);
    }
  };

  const onDropHandler = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDragActive) {
      setIsDragActive(false);
      onFileDropped(e.dataTransfer?.files);
    }
  };

  return (
    <Box
      className={cx('iui-file-upload', { 'iui-drag': isDragActive }, className)}
      onDragEnter={onDragEnterHandler}
      onDragOver={onDragOverHandler}
      onDragLeave={onDragLeaveHandler}
      onDrop={onDropHandler}
      ref={refs}
      {...rest}
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

export default FileUpload;
