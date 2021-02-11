// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import '@bentley/itwinui/css/buttons.css';
import React from 'react';
import { useTheme } from '../utils/hooks/useTheme';

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
export const ButtonGroup: React.FC = ({ children }) => {
  useTheme();
  return <div className='iui-buttons-group'>{children}</div>;
};

export default ButtonGroup;
