/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SvgInfoCircular } from './SvgInfoCircular.js';
import { SvgStatusError } from './SvgStatusError.js';
import { SvgStatusSuccess } from './SvgStatusSuccess.js';
import { SvgStatusWarning } from './SvgStatusWarning.js';
import type { CommonProps } from '../props.js';

export const StatusIconMap = {
  negative: (args?: CommonProps) => <SvgStatusError aria-hidden {...args} />,
  positive: (args?: CommonProps) => <SvgStatusSuccess aria-hidden {...args} />,
  warning: (args?: CommonProps) => <SvgStatusWarning aria-hidden {...args} />,
  informational: (args?: CommonProps) => (
    <SvgInfoCircular aria-hidden {...args} />
  ),
};
