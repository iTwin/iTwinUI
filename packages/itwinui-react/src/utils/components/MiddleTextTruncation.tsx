/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type { PolymorphicForwardRefComponent } from '../props.js';
import { OverflowContainer } from './OverflowContainer.js';

const ELLIPSIS_CHAR = '…';

type MiddleTextTruncationProps = {
  /**
   * Text to truncate.
   */
  text: string;
  /**
   * Number of characters to leave at the end.
   * @default 6
   */
  endCharsCount?: number;
  /**
   * Custom renderer for the truncated text.
   */
  textRenderer?: (
    truncatedText: string,
    originalText: string,
  ) => React.ReactNode;
};

/**
 * Truncates text with the ellipsis in the middle,
 * leaving defined number of chars at the end.
 * @example
 * <MiddleTextTruncation text='ThisIsMyVeryLongFileName.dgn' />
 * @example
 * <MiddleTextTruncation text='ThisIsMyVeryLongFileName.dgn' endCharsCount={10} />
 * @example
 * <MiddleTextTruncation
 *   text='ThisIsMyVeryLongFileName.dgn'
 *   textRenderer={React.useCallback(
 *     (truncatedText) => <b>{truncatedText}</b>,
 *     []
 *   )}
 * />
 */
export const MiddleTextTruncation = React.forwardRef((props, forwardedRef) => {
  const { text, endCharsCount, textRenderer, style, ...rest } = props;

  return (
    <OverflowContainer
      as='span'
      style={{
        display: 'flex',
        minWidth: 0,
        flexGrow: 1,
        whiteSpace: 'nowrap',
        ...style,
      }}
      itemsCount={text.length}
      {...rest}
      ref={forwardedRef}
    >
      <MiddleTextTruncationContent
        text={text}
        endCharsCount={endCharsCount}
        textRenderer={textRenderer}
      />
    </OverflowContainer>
  );
}) as PolymorphicForwardRefComponent<'span', MiddleTextTruncationProps>;
if (process.env.NODE_ENV === 'development') {
  MiddleTextTruncation.displayName = 'MiddleTextTruncation';
}

// ----------------------------------------------------------------------------

const MiddleTextTruncationContent = (props: MiddleTextTruncationProps) => {
  const { text, endCharsCount = 6, textRenderer } = props;
  const { visibleCount } = OverflowContainer.useContext();

  const truncatedText = React.useMemo(() => {
    if (visibleCount < text.length) {
      return `${text.substring(
        0,
        visibleCount - endCharsCount - ELLIPSIS_CHAR.length,
      )}${ELLIPSIS_CHAR}${text.substring(text.length - endCharsCount)}`;
    }

    return text;
  }, [endCharsCount, text, visibleCount]);

  return textRenderer?.(truncatedText, text) ?? truncatedText;
};
