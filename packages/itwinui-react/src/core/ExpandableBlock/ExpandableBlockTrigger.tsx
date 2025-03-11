/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { useSafeContext } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { LinkBox } from '../LinkAction/LinkAction.js';
import { ExpandableBlockContext } from './ExpandableBlockContext.js';
import { ExpandableBlock } from './ExpandableBlock.js';

export type ExpandableBlockTriggerOwnProps = {
  label?: React.ReactNode;
  caption?: React.ReactNode;
  expandIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

export const ExpandableBlockTrigger = React.forwardRef(
  (props, forwardedRef) => {
    const {
      className,
      children,
      label,
      caption,
      expandIcon,
      endIcon,
      ...rest
    } = props;
    const { disabled, status } = useSafeContext(ExpandableBlockContext);

    return (
      <LinkBox
        className={cx('iui-expandable-header', className)}
        data-iui-disabled={disabled ? 'true' : undefined}
        ref={forwardedRef}
        {...rest}
      >
        {children ?? (
          <>
            {expandIcon ?? <ExpandableBlock.ExpandIcon />}
            <ExpandableBlock.LabelArea>
              <ExpandableBlock.Title>{label}</ExpandableBlock.Title>
              {caption && (
                <ExpandableBlock.Caption>{caption}</ExpandableBlock.Caption>
              )}
            </ExpandableBlock.LabelArea>
            {endIcon || status ? (
              <ExpandableBlock.EndIcon>{endIcon}</ExpandableBlock.EndIcon>
            ) : null}
          </>
        )}
      </LinkBox>
    );
  },
) as PolymorphicForwardRefComponent<'div', ExpandableBlockTriggerOwnProps>;
if (process.env.NODE_ENV === 'development') {
  ExpandableBlockTrigger.displayName = 'ExpandableBlock.Trigger';
}
