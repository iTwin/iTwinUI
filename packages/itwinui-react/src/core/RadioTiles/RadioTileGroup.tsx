/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { InputGroup } from '../InputGroup/index.js';
import type { InputGroupProps } from '../InputGroup/index.js';
import '@itwin/itwinui-css/css/radio-tile.css';
import { useItwinui } from '../utils/index.js';

export type RadioTileGroupProps = Omit<
  InputGroupProps,
  'displayStyle' | 'disabled'
>;

/**
 * RadioTileGroup component to group RadioTile components together
 * @example
 * <RadioTileGroup label='My group'>
 *   <RadioTile label='First tile' icon={<SvgSmileyHappy />} />
 *   <RadioTile label='Second tile' icon={<SvgSmileySad />} />
 * </RadioTileGroup>
 */
export const RadioTileGroup = (props: RadioTileGroupProps) => {
  const { children, label, ...rest } = props;

  useItwinui();

  return (
    <InputGroup label={label} {...rest}>
      <div className='iui-radio-tile-container'>{children}</div>
    </InputGroup>
  );
};

export default RadioTileGroup;
