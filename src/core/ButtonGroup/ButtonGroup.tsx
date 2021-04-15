/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { useTheme } from '../utils/hooks/useTheme';
import '@itwin/itwinui-css/css/button.css';

export type ButtonGroupProps = {
  /**
   * Buttons in the ButtonGroup.
   */
  children: React.ReactNode;
};

/**
 * Group buttons together for common actions
 * @example
 * <ButtonGroup>
 *   <IconButton>
 *     <SvgAdd />
 *   </IconButton>
 *   <IconButton>
 *     <SvgEdit />
 *   </IconButton>
 * </ButtonGroup>
 */
export const ButtonGroup = ({ children, ...rest }: ButtonGroupProps) => {
  useTheme();
  return (
    <div className='iui-button-group' {...rest}>
      {children}
    </div>
  );
};

export default ButtonGroup;
