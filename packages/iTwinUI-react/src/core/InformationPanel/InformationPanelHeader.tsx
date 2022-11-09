/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { IconButton } from '../Buttons';
import { CommonProps, useTheme, SvgCloseSmall } from '../utils';
import '@itwin/itwinui-css/css/information-panel.css';

export type InformationPanelHeaderProps = {
  /**
   * Callback fired when close icon is clicked.
   *
   * If not specified, close icon will not be shown.
   */
  onClose?: (e: React.MouseEvent) => void;
  /**
   * Custom header action buttons shown alongside the close button.
   * @example
   * actions={(
   *   <>
   *     <IconButton styleType='borderless' onClick={() => {}}><SvgEdit /></IconButton>
   *     <IconButton styleType='borderless' onClick={() => {}}><SvgDelete /></IconButton>
   *   </>
   * )}
   */
  actions?: React.ReactNode;
  /**
   * Content of the panel header.
   */
  children?: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * Header of the InformationPanel to be passed in the `header` prop.
 *
 * @example
 * <InformationPanelHeader
 *   onClose={() => {}}
 *   actions={(
 *     <>
 *       <IconButton styleType='borderless' onClick={() => {}}><SvgEdit /></IconButton>
 *       <IconButton styleType='borderless' onClick={() => {}}><SvgDelete /></IconButton>
 *     </>
 *   )}
 * >
 *   <Text variant='subheading'>InfoPanel heading</Text>
 * </InformationPanelHeader>
 */
export const InformationPanelHeader = (props: InformationPanelHeaderProps) => {
  const { children, onClose, actions, className, ...rest } = props;

  useTheme();

  return (
    <div className={cx('iui-information-header', className)} {...rest}>
      <span className='iui-information-header-label'>{children}</span>
      <div className='iui-information-header-actions'>
        {actions}
        {onClose && (
          <IconButton
            styleType='borderless'
            onClick={onClose}
            aria-label='Close'
          >
            <SvgCloseSmall aria-hidden />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default InformationPanelHeader;
