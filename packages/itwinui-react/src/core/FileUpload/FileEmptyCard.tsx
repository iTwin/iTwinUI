/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Box, polymorphic, SvgUpload } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import cx from 'classnames';
import { FileUploadCard } from './FileUploadCard.js';

// ----------------------------------------------------------------------------
// FileEmptyCard.Icon component

const FileEmptyCardIcon = polymorphic.span('iui-file-card-empty-icon', {
  children: <SvgUpload />,
});
if (process.env.NODE_ENV === 'development') {
  FileEmptyCardIcon.displayName = 'FileEmptyCard.Icon';
}

// ----------------------------------------------------------------------------
// FileEmptyCard.Text component

const FileEmptyCardText = polymorphic.span('iui-file-card-empty-action');
if (process.env.NODE_ENV === 'development') {
  FileEmptyCardText.displayName = 'FileEmptyCard.Text';
}

// ----------------------------------------------------------------------------
// FileEmptyCard component

const FileEmptyCardComponent = React.forwardRef((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <Box className={cx('iui-file-card-empty', className)} ref={ref} {...rest}>
      {children ?? (
        <>
          <FileEmptyCard.Icon />
          <FileEmptyCard.Text>
            <FileUploadCard.InputLabel>Choose a file</FileUploadCard.InputLabel>
            <div>to upload.</div>
          </FileEmptyCard.Text>
        </>
      )}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div'>;
if (process.env.NODE_ENV === 'development') {
  FileEmptyCardComponent.displayName = 'FileEmptyCard';
}

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
export const FileEmptyCard = Object.assign(FileEmptyCardComponent, {
  Icon: FileEmptyCardIcon,
  Text: FileEmptyCardText,
});
