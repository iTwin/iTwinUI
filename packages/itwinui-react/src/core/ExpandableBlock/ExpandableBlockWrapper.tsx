/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import type { ExpandableBlockOwnProps } from './ExpandableBlock.js';
import { ExpandableBlockContext } from './ExpandableBlockContext.js';

export const ExpandableBlockWrapper = React.forwardRef(
  (props, forwardedRef) => {
    const {
      children,
      className,
      onToggle,
      style,
      isExpanded,
      status,
      size = 'default',
      styleType = 'default',
      disabled = false,
      startExpanded = false,
      ...rest
    } = props;

    const [expandedState, setExpanded] = React.useState(
      startExpanded ?? isExpanded ?? false,
    );
    const expanded = isExpanded ?? expandedState;

    const [descriptionId, setDescriptionId] = React.useState<
      string | undefined
    >(undefined);

    return (
      <ExpandableBlockContext.Provider
        value={{
          status,
          isExpanded: expanded,
          onToggle,
          size,
          styleType,
          disabled,
          setExpanded,
          children,
          descriptionId,
          setDescriptionId,
        }}
      >
        <Box
          className={cx('iui-expandable-block', className)}
          data-iui-expanded={expanded}
          data-iui-size={size}
          data-iui-variant={styleType !== 'default' ? styleType : undefined}
          style={style}
          ref={forwardedRef}
          {...rest}
        >
          {children}
        </Box>
      </ExpandableBlockContext.Provider>
    );
  },
) as PolymorphicForwardRefComponent<'div', ExpandableBlockOwnProps>;
if (process.env.NODE_ENV === 'development') {
  ExpandableBlockWrapper.displayName = 'ExpandableBlock.Wrapper';
}
