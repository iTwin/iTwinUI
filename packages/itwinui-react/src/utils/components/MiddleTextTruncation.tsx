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
// TODO: Add React.forwardRef?
export const MiddleTextTruncation = (props: MiddleTextTruncationProps) => {
  const { text, endCharsCount = 6, textRenderer, style, ...rest } = props;

  const truncatedText = React.useCallback(
    (visibleCount: number) => {
      if (visibleCount < text.length) {
        return `${text.substring(
          0,
          visibleCount - endCharsCount - ELLIPSIS_CHAR.length,
        )}${ELLIPSIS_CHAR}${text.substring(text.length - endCharsCount)}`;
      } else {
        return text;
      }
    },
    [endCharsCount, text],
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
      itemsLength={text.length}
      {...rest}
    >
      {(visibleCount) =>
        textRenderer?.(truncatedText(visibleCount), text) ??
        truncatedText(visibleCount)
      }
    </OverflowContainer>
  );
};
