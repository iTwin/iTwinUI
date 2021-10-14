/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { CommonProps, useTheme } from '../utils';
import '@itwin/itwinui-css/css/information-panel.css';

export type InformationPanelWrapperProps = {
  children?: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * InformationPanelWrapper should contain the `InformationPanel`
 * and the component over which the panel will overlay.
 * @example
 * <InformationPanelWrapper>
 *   <Table ... />
 *   <InformationPanel ... />
 * </InformationPanelWrapper>
 */
export const InformationPanelWrapper = (
  props: InformationPanelWrapperProps,
) => {
  const { className, children, ...rest } = props;

  useTheme();

  return (
    <div className={cx('iui-information-panel-wrapper', className)} {...rest}>
      {children}
    </div>
  );
};

export default InformationPanelWrapper;
