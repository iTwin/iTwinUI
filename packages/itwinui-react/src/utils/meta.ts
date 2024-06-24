/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { version } from '../styles.js';

const module: 'ESM' | 'CJS' =
  // @ts-expect-error: __module gets injected by SWC
  typeof __module !== 'undefined' ? __module : 'DEV';

/** Meta information about the package. */
export const meta = {
  /** The exact version of `@itwin/itwinui-react`. */
  version,
  /** The current module format (i.e. "ESM" vs "CJS"). */
  module,
};
