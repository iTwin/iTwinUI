/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type { CommonProps } from '../props.js';
import { OverflowContainer } from './OverflowContainer.js';

const ELLIPSIS_CHAR = '…';

export type MiddleTextTruncationProps = {
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
} & CommonProps;

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
export const MiddleTextTruncation = (props: MiddleTextTruncationProps) => {
  const { text, style, endCharsCount = 6, textRenderer, ...rest } = props;

  const children = React.useCallback(
    (visibleCount: number) => (
      <MiddleTextTruncationContent
        visibleCount={visibleCount}
        endCharsCount={endCharsCount}
        text={text}
        textRenderer={textRenderer}
      />
    ),
    [endCharsCount, text, textRenderer],
  );

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
      items={text}
      {...rest}
    >
      {children}
    </OverflowContainer>
  );
};
if (process.env.NODE_ENV === 'development') {
  MiddleTextTruncation.displayName = 'MiddleTextTruncation';
}

// ----------------------------------------------------------------------------

const MiddleTextTruncationContent = ({
  visibleCount,
  text,
  endCharsCount,
  textRenderer,
}: Required<Pick<MiddleTextTruncationProps, 'endCharsCount'>> &
  Pick<MiddleTextTruncationProps, 'text' | 'textRenderer'> & {
    visibleCount: number;
  }) => {
  const truncatedText = React.useMemo(() => {
    if (visibleCount < text.length) {
      return `${text.substring(
        0,
        visibleCount - endCharsCount - ELLIPSIS_CHAR.length,
      )}${ELLIPSIS_CHAR}${text.substring(text.length - endCharsCount)}`;
    } else {
      return text;
    }
  }, [endCharsCount, text, visibleCount]);

  return textRenderer?.(truncatedText, text) ?? truncatedText;
};
