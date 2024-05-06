/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/**
 * Return true if the first date is earlier than the second date
 */

export const isBefore = (
  beforeDate: Date | undefined,
  afterDate: Date | undefined,
) => {
  if (!beforeDate || !afterDate) {
    return false;
  }
  const firstDate = new Date(beforeDate);
  const secondDate = new Date(afterDate);
  firstDate && firstDate.setHours(0, 0, 0, 0);
  secondDate && secondDate.setHours(0, 0, 0, 0);
  return firstDate < secondDate;
};
