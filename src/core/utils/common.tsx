/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SvgStatusError from '@itwin/itwinui-icons-react/cjs/icons/StatusError';
import SvgStatusSuccess from '@itwin/itwinui-icons-react/cjs/icons/StatusSuccess';
import SvgStatusWarning from '@itwin/itwinui-icons-react/cjs/icons/StatusWarning';
import React from 'react';

export const StatusIconMap: {
  [key in 'negative' | 'positive' | 'warning']: JSX.Element;
} = {
  negative: <SvgStatusError />,
  positive: <SvgStatusSuccess />,
  warning: <SvgStatusWarning />,
};

const USER_COLORS = [
  '#6AB9EC',
  '#B1C854',
  '#F7706C',
  '#4585A5',
  '#FFC335',
  '#F7963E',
  '#73C7C1',
  '#85A9CF',
  '#A3779F',
  '#C8C2B4',
  '#A47854',
];

/**
 * Generate color from user name or email.
 * Recommended to use for `backgroundColor` in `UserIcon` component.
 */
export const getUserColor = (emailOrName: string) => {
  const normalizedString = emailOrName.trim().toLowerCase();

  let hash = 0;
  for (let i = 0; i < normalizedString.length; i++) {
    const charCode = normalizedString.charCodeAt(i);
    hash = (hash + charCode) % USER_COLORS.length;
  }
  return USER_COLORS[hash];
};
