/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SvgInfoCircular from '@itwin/itwinui-icons-react/cjs/icons/InfoCircular';
import SvgStatusError from '@itwin/itwinui-icons-react/cjs/icons/StatusError';
import SvgStatusSuccess from '@itwin/itwinui-icons-react/cjs/icons/StatusSuccess';
import SvgStatusWarning from '@itwin/itwinui-icons-react/cjs/icons/StatusWarning';
import React from 'react';
import { CommonProps } from '../props';

export const StatusIconMap = {
  negative: (args?: CommonProps) => <SvgStatusError aria-hidden {...args} />,
  positive: (args?: CommonProps) => <SvgStatusSuccess aria-hidden {...args} />,
  warning: (args?: CommonProps) => <SvgStatusWarning aria-hidden {...args} />,
  informational: (args?: CommonProps) => (
    <SvgInfoCircular aria-hidden {...args} />
  ),
};
