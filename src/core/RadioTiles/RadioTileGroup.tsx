import React from 'react';
import { InputGroup } from '../InputGroup';
import '@bentley/itwinui/css/inputs.css';

export type RadioTileGroupProps = {
  /**
   * Label of the Radio tiles group.
   */
  label?: React.ReactNode;
  /**
   * RadioTile components.
   */
  children: React.ReactNodeArray;
};

/**
 * RadioTileGroup component to group RadioTile components together
 * @example
 * <RadioTileGroup label='My group'>
 *   <RadioTile label='First tile' icon={<SvgSmileyHappy />} />
 *   <RadioTile label='Second tile' icon={<SvgSmileySad />} />
 * </RadioTileGroup>
 */
export const RadioTileGroup: React.FC<RadioTileGroupProps> = (props) => {
  const { children, label } = props;

  return (
    <InputGroup label={label}>
      <div className='iui-radio-tile-container'>{children}</div>
    </InputGroup>
  );
};

export default RadioTileGroup;
