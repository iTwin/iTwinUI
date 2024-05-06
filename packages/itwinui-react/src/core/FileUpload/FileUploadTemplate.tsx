/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { SvgUpload, Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { Anchor } from '../Typography/Anchor.js';

type FileUploadTemplateProps = {
  /**
   * Callback fired when a file is selected from the device.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Whether the file input accepts multiple files.
   * Passed to the `multiple` attribute of native file input.
   * @default true
   */
  acceptMultiple?: boolean;
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
};

/**
 * @deprecated Use [`FileUploadCard`](https://itwinui.bentley.com/docs/fileupload#fileuploadcard) instead.
 *
 * Default template to be used with the `FileUpload` wrapper component.
 * Contains a hidden input with styled labels (customizable).
 * @example
 * <FileUploadTemplate onChange={(e) => console.log(e.target.files)} />
 */
export const FileUploadTemplate = React.forwardRef((props, ref) => {
  const {
    onChange,
    acceptMultiple = true,
    acceptType,
    label = 'Choose a file',
    subtitle = 'or drag & drop it here.',
    children,
    className,
    ...rest
  } = props;

  return (
    <Box
      className={cx('iui-file-upload-template', className)}
      ref={ref}
      {...rest}
    >
      <SvgUpload className='iui-template-icon' aria-hidden />
      <Box className='iui-template-text'>
        <Anchor as='label'>
          <Box
            as='input'
            className='iui-browse-input'
            type='file'
            onChange={onChange}
            multiple={acceptMultiple}
            accept={acceptType}
          />
          {label}
        </Anchor>
        <div>{subtitle}</div>
        {children}
      </Box>
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', FileUploadTemplateProps>;
