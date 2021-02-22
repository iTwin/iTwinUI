// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import { useTheme } from '../utils/hooks/useTheme';
import '@bentley/itwinui/css/buttons.css';

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
export const ButtonGroup = ({ children }: ButtonGroupProps) => {
  useTheme();
  return <div className='iui-buttons-group'>{children}</div>;
};

export default ButtonGroup;
