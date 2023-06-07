/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Box, StatusIconMap } from '../utils/index.js';

type StatusMessageProps = {
  /**
   * Custom icon to be displayed at the beginning.
   * It will default to the `status` icon, if it's set.
   */
  startIcon?: JSX.Element;
  /**
   * Message content.
   */
  children: React.ReactNode;
  /**
   * Status of the message.
   */
  status?: 'positive' | 'warning' | 'negative';
};

/**
 * Component to display icon and text below the `Combobox` component.
 * @example
 * <StatusMessage>This is the text</StatusMessage>
 * <StatusMessage startIcon={<SvgStar />}>This is the text</StatusMessage>
 */
export const StatusMessage = ({
  startIcon: userStartIcon,
  children,
  status,
}: StatusMessageProps) => {
  const icon = userStartIcon ?? (status && StatusIconMap[status]());

  return (
    <>
      {!!icon ? (
        <Box as='span' className='iui-input-icon' aria-hidden>
          {icon}
        </Box>
      ) : null}
      <Box className='iui-message'>{children}</Box>
    </>
  );
};

export default StatusMessage;
