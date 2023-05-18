/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SvgSmileyHappy, useGlobals } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { Button } from '../Button/index.js';

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
  const { feedbackLabel = 'Feedback', onClick, ...rest } = props;

  useGlobals();

  return (
    <Button
      ref={ref}
      data-iui-variant='idea'
      onClick={onClick}
      startIcon={<SvgSmileyHappy aria-hidden />}
      {...rest}
    >
      {feedbackLabel}
    </Button>
  );
}) as PolymorphicForwardRefComponent<'button', IdeasButtonProps>;

export default IdeasButton;
