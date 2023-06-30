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
   * Context prop for sizing subcomponents
   */
  size?: 'small' | 'large';
  /**
   * Context prop for disabling subcomponents
   */
  disabled?: boolean;
  /**
   * Status of the input.
   */
  status?: 'positive' | 'warning' | 'negative';
  /**
   * Set display style of label.
   * Supported values:
   * - 'default' - label appears above input.
   * - 'inline' - appears in the same line as input.
   * @default 'default'
   */
  displayStyle?: 'default' | 'inline';
  /**
   *
   */
  required?: boolean;
};

//-------------------------------------------------------------------------------

/**
 * Fancy labeled input component
 */

export const InputGrid = React.forwardRef((props, ref) => {
  const { children, className, displayStyle, ...rest } = props;

  return (
    <Box
      className={cx(
        'iui-input-grid',
        {
          'iui-inline-label': displayStyle,
        },
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', InputGridOwnProps>;

//-------------------------------------------------------------------------------

export default InputGrid;
