/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';

import SvgSmileyHappy2 from '@bentley/icons-generic-react/cjs/icons/SmileyHappy2';
import { useTheme } from '../../utils/hooks/useTheme';
import { Button } from '../Button';

export type IdeasButtonProps = {
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
export const IdeasButton = React.forwardRef<
  HTMLButtonElement,
  IdeasButtonProps
>((props: IdeasButtonProps, ref) => {
  const { feedbackLabel = 'Feedback', onClick, ...rest } = props;

  useTheme();

  return (
    <Button
      ref={ref}
      className='iui-idea'
      onClick={onClick}
      startIcon={<SvgSmileyHappy2 />}
      {...rest}
    >
      {feedbackLabel}
    </Button>
  );
});

export default IdeasButton;
