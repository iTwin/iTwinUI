/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Box } from '../utils/index.js';
import cx from 'classnames';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';

type InputGridOwnProps = {
  /**
   * Set display style of label.
   * Supported values:
   * - 'default' - label appears above input.
   * - 'inline' - appears in the same line as input.
   * @default 'default'
   */
  labelPlacement?: 'default' | 'inline';
  /**
   * Status of the InputGrid (and its descendants).
   */
  status?: 'positive' | 'warning' | 'negative';
};

//-------------------------------------------------------------------------------

/**
 * InputGrid component is used to display inputs (input, textarea, select)
 * with label and/or status message
 *
 * @usage
 *
 * <InputGrid>
 *   <Label htmlFor='input-1'>This is label</Label>
 *   <Input id='input-1'/>
 *   <StatusMessage>This is message</StatusMessage>
 * </InputGrid>
 */
export const InputGrid = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    status,
    labelPlacement = undefined,
    ...rest
  } = props;

  return (
    <Box
      className={cx('iui-input-grid', className)}
      data-iui-label-placement={labelPlacement}
      data-iui-status={status}
      ref={ref}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', InputGridOwnProps>;

//-------------------------------------------------------------------------------

export default InputGrid;
