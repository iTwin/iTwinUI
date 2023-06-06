/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
// import * as React from 'react';

// import cx from 'classnames';
import { polymorphic } from '../../utils/index.js';
// import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import '@itwin/itwinui-css/css/progress-indicator.css';

// export const Overlay = React.forwardRef((props, ref) => {
//   const { ...rest } = props;
//   return (
//     <Box className={cx('iui-progress-indicator-overlay')} ref={ref} {...rest} />
//   );
// }) as PolymorphicForwardRefComponent<'div', OverlayProps>;

export const Overlay = polymorphic('iui-progress-indicator-overlay');
Overlay.displayName = 'Overlay';
