/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { IconButton } from '../Buttons/IconButton.js';
import { SvgCloseSmall, Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';

type InformationPanelHeaderProps = {
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
};

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
export const InformationPanelHeader = React.forwardRef(
  (props, forwardedRef) => {
    const { children, onClose, actions, className, ...rest } = props;

    return (
      <Box
        className={cx('iui-information-header', className)}
        ref={forwardedRef}
        {...rest}
      >
        <Box as='span' className='iui-information-header-label'>
          {children}
        </Box>
        <Box className='iui-information-header-actions'>
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
        </Box>
      </Box>
    );
  },
) as PolymorphicForwardRefComponent<'div', InformationPanelHeaderProps>;
