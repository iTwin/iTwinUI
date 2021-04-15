/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import SvgStatusError from '@itwin/itwinui-icons-react/cjs/icons/StatusError';
import SvgStatusSuccess from '@itwin/itwinui-icons-react/cjs/icons/StatusSuccess';
import SvgStatusWarning from '@itwin/itwinui-icons-react/cjs/icons/StatusWarning';
import React from 'react';

export const StatusIconMap: {
  [key in 'negative' | 'positive' | 'warning']: JSX.Element;
} = {
  negative: <SvgStatusError />,
  positive: <SvgStatusSuccess />,
  warning: <SvgStatusWarning />,
};
