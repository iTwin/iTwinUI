// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';

import SvgSmileyHappy2 from '@bentley/icons-generic-react/cjs/icons/SmileyHappy2';
import { useTheme } from '../../utils/hooks/useTheme';
import '@bentley/itwinui/css/buttons.css';

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
    <button
      ref={ref}
      className='iui-buttons-idea'
      onClick={onClick}
      type='button'
      {...rest}
    >
      <SvgSmileyHappy2 className='iui-buttons-icon' />
      {feedbackLabel}
    </button>
  );
});

export default IdeasButton;
