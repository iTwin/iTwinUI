/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import {
  useSafeContext,
  mergeEventHandlers,
  ButtonBase,
} from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { ExpandableBlockContext } from './ExpandableBlockContext.js';

export const ExpandableBlockTitle = React.forwardRef((props, forwardedRef) => {
  const { className, children, onClick: onClickProp, ...rest } = props;

  const { isExpanded, setExpanded, disabled, onToggle, descriptionId } =
    useSafeContext(ExpandableBlockContext);

  return (
    <ButtonBase
      className={cx('iui-expandable-block-title', 'iui-link-action', className)}
      aria-expanded={isExpanded}
      aria-disabled={disabled}
      onClick={mergeEventHandlers(onClickProp, () => {
        if (disabled) {
          return;
        }
        setExpanded(!isExpanded);
        onToggle?.(!isExpanded);
      })}
      ref={forwardedRef}
      aria-describedby={descriptionId}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
}) as PolymorphicForwardRefComponent<'button'>;
if (process.env.NODE_ENV === 'development') {
  ExpandableBlockTitle.displayName = 'ExpandableBlock.Title';
}
