// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import { InputGroup } from '../InputGroup';
import '@bentley/itwinui/css/inputs.css';
import { useTheme } from '../utils/hooks/useTheme';

export type RadioTileGroupProps = {
  /**
   * Label of the Radio tiles group.
   */
  label?: React.ReactNode;
  /**
   * RadioTile components.
   */
  children: React.ReactNode;
};

/**
 * RadioTileGroup component to group RadioTile components together
 * @example
 * <RadioTileGroup label='My group'>
 *   <RadioTile label='First tile' icon={<SvgSmileyHappy />} />
 *   <RadioTile label='Second tile' icon={<SvgSmileySad />} />
 * </RadioTileGroup>
 */
export const RadioTileGroup = (props: RadioTileGroupProps) => {
  const { children, label } = props;

  useTheme();

  return (
    <InputGroup label={label}>
      <div className='iui-radio-tile-container'>{children}</div>
    </InputGroup>
  );
};

export default RadioTileGroup;
