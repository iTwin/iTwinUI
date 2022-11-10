/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

export const SoftBackgrounds = {
  skyblue: 'var(--iui-color-background-skyblue)',
  celery: 'var(--iui-color-background-celery)',
  froly: 'var(--iui-color-background-froly)',
  steelblue: 'var(--iui-color-background-steelblue)',
  sunglow: 'var(--iui-color-background-sunglow)',
  seabuckthorn: 'var(--iui-color-background-seabuckthorn)',
  montecarlo: 'var(--iui-color-background-montecarlo)',
  poloblue: 'var(--iui-color-background-poloblue)',
  bouquet: 'var(--iui-color-background-bouquet)',
  ash: 'var(--iui-color-background-ash)',
  oak: 'var(--iui-color-background-oak)',
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
 * Recommended to use for `backgroundColor` in `Avatar` component.
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
