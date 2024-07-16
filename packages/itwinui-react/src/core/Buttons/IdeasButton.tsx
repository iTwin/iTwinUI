/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import { SvgSmileyHappy } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { Button } from './Button.js';

type IdeasButtonProps = {
  /**
   * On click handler.
   */
  onClick?: () => void;
  /**
   * Localize 'Feedback' label if needed.
   * @default 'Feedback'
   */
  feedbackLabel?: string;
};
/**
 * Ideas button
 * @example
 * <IdeasButton />
 */
export const IdeasButton = React.forwardRef((props, ref) => {
  const { feedbackLabel = 'Feedback', className, onClick, ...rest } = props;

  return (
    <Button
      ref={ref}
      className={cx('iui-button-idea', className)}
      data-iui-variant='high-visibility'
      onClick={onClick}
      startIcon={<SvgSmileyHappy aria-hidden />}
      {...rest}
    >
      {feedbackLabel}
    </Button>
  );
}) as PolymorphicForwardRefComponent<'button', IdeasButtonProps>;
if (process.env.NODE_ENV === 'development') {
  IdeasButton.displayName = 'IdeasButton';
}
