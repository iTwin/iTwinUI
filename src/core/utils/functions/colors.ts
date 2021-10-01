/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

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
