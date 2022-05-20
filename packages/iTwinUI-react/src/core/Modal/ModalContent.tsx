/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { CommonProps, useTheme } from '../utils';
import '@itwin/itwinui-css/css/dialog.css';

export type ModalContentProps = {
  /**
   * Main content in the `Modal`.
   */
  children: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * Container for content in `Modal`.
 */
export const ModalContent = (props: ModalContentProps) => {
  const { children, className, ...rest } = props;

  useTheme();
  return (
    <div className={cx('iui-dialog-content', className)} {...rest}>
      {children}
    </div>
  );
};

export default ModalContent;
