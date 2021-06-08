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
  negative: <SvgStatusError aria-hidden />,
  positive: <SvgStatusSuccess aria-hidden />,
  warning: <SvgStatusWarning aria-hidden />,
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

/**
 * Get the container as a child of body, or create one if it doesn't exist.
 * Mostly used for dynamic components like Modal or Toast.
 *
 * @param containerId id of the container to find or create
 * @param ownerDocument Can be changed if the container should be in a different document (e.g. in popup).
 */
export const getContainer = (
  containerId: string,
  ownerDocument = getDocument(),
) => {
  let container = ownerDocument?.getElementById(containerId) ?? undefined;
  if (container == null && !!ownerDocument) {
    container = ownerDocument.createElement('div');
    container.setAttribute('id', containerId);
    ownerDocument.body.appendChild(container);
  }
  return container;
};

/**
 * Get document if it is defined.
 * Used to support SSR/SSG applications.
 */
export const getDocument = () => {
  return typeof document === 'undefined' ? undefined : document;
};

/**
 * Get window if it is defined.
 * Used to support SSR/SSG applications.
 */
export const getWindow = () => {
  return typeof window === 'undefined' ? undefined : window;
};
