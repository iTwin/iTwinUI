/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { InputGroup } from '../InputGroup/InputGroup.js';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import cx from 'classnames';

type RadioTileGroupProps = {
  tileContainerProps?: React.ComponentProps<'div'>;
} & Omit<React.ComponentProps<typeof InputGroup>, 'displayStyle' | 'disabled'>;

/**
 * RadioTileGroup component to group RadioTile components together
 * @example
 * <RadioTileGroup label='My group'>
 *   <RadioTile label='First tile' icon={<SvgSmileyHappy />} />
 *   <RadioTile label='Second tile' icon={<SvgSmileySad />} />
 * </RadioTileGroup>
 */
export const RadioTileGroup = React.forwardRef((props, forwardedRef) => {
  const { children, label, tileContainerProps, ...rest } = props;

  return (
    <InputGroup label={label} ref={forwardedRef} {...rest}>
      <Box
        as='div'
        {...tileContainerProps}
        className={cx(
          'iui-radio-tile-container',
          tileContainerProps?.className,
        )}
      >
        {children}
      </Box>
    </InputGroup>
  );
}) as PolymorphicForwardRefComponent<'div', RadioTileGroupProps>;
if (process.env.NODE_ENV === 'development') {
  RadioTileGroup.displayName = 'RadioTileGroup';
}
