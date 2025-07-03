/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

const className = '_iui-line-clamp';

const css = /* css */ `
.${className} {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: var(--_iui-line-clamp, 3);
  -webkit-box-orient: vertical;
}
`;

/** @private */
export const lineClamp = {
  css,
  className,
};
