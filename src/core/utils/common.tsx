/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SvgInfoCircular from '@itwin/itwinui-icons-react/cjs/icons/InfoCircular';
import SvgStatusError from '@itwin/itwinui-icons-react/cjs/icons/StatusError';
import SvgStatusSuccess from '@itwin/itwinui-icons-react/cjs/icons/StatusSuccess';
import SvgStatusWarning from '@itwin/itwinui-icons-react/cjs/icons/StatusWarning';
import React from 'react';
import { CommonProps } from './props';

export const StatusIconMap = {
  negative: (args?: CommonProps) => <SvgStatusError aria-hidden {...args} />,
  positive: (args?: CommonProps) => <SvgStatusSuccess aria-hidden {...args} />,
  warning: (args?: CommonProps) => <SvgStatusWarning aria-hidden {...args} />,
  informational: (args?: CommonProps) => (
    <SvgInfoCircular aria-hidden {...args} />
  ),
};

export const SoftBackgrounds = {
  skyblue: 'hsl(197, 71%, 83%)',
  celery: 'hsl(72, 51%, 66%)',
  froly: 'hsl(2, 90%, 83%)',
  steelblue: 'hsl(207, 44%, 73%)',
  sunglow: 'hsl(42, 100%, 70%)',
  seabuckthorn: 'hsl(29, 92%, 71%)',
  montecarlo: 'hsl(176, 43%, 72%)',
  poloblue: 'hsl(211, 44%, 77%)',
  bouquet: 'hsl(305, 19%, 75%)',
  ash: 'hsl(42, 15%, 85%)',
  oak: 'hsl(27, 32%, 72%)',
} as const;

/** Returns true if a string value is one of the SoftBackgrounds keys */
export const isSoftBackground = (
  value: string,
): value is keyof typeof SoftBackgrounds => {
  return Object.keys(SoftBackgrounds).includes(value);
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

/**
 * Return input value bounded by specified range.
 */
export const getBoundedValue = (val: number, min: number, max: number) => {
  return Math.min(max, Math.max(min, val));
};

/**
 * Return array of focusable elements in the container.
 */
export const getFocusableElements = (
  container: HTMLElement | undefined | null,
) => {
  if (!container) {
    return [];
  }

  const elements = container.querySelectorAll(
    'a[href], button, input, textarea, select, details, audio[controls], video[controls], [contenteditable]:not([contenteditable="false"]), [tabindex]:not([tabindex="-1"])',
  );

  return Array.from(elements).filter((el) => !el.hasAttribute('disabled'));
};
