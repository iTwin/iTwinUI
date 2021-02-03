import {
  SvgError,
  SvgSuccess,
  SvgWarning,
} from '@bentley/icons-generic-react/lib/icons/status';
import React from 'react';

export const StatusIconMap: {
  [key in 'negative' | 'positive' | 'warning']: JSX.Element;
} = {
  negative: <SvgError />,
  positive: <SvgSuccess />,
  warning: <SvgWarning />,
};
