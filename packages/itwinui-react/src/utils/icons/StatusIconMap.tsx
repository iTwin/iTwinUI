/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { SvgInfoCircular } from './SvgInfoCircular.js';
import { SvgStatusError } from './SvgStatusError.js';
import { SvgStatusSuccess } from './SvgStatusSuccess.js';
import { SvgStatusWarning } from './SvgStatusWarning.js';

export const StatusIconMap = {
  negative: (args?: React.ComponentPropsWithoutRef<'svg'>) => (
    <SvgStatusError aria-hidden {...args} />
  ),
  positive: (args?: React.ComponentPropsWithoutRef<'svg'>) => (
    <SvgStatusSuccess aria-hidden {...args} />
  ),
  warning: (args?: React.ComponentPropsWithoutRef<'svg'>) => (
    <SvgStatusWarning aria-hidden {...args} />
  ),
  informational: (args?: React.ComponentPropsWithoutRef<'svg'>) => (
    <SvgInfoCircular aria-hidden {...args} />
  ),
};
