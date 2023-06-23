/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { RadioTileGroup, RadioTile } from '@itwin/itwinui-react';
import { SvgNetwork, SvgWindows } from '@itwin/itwinui-icons-react';
export default () => {
  return React.createElement(
    RadioTileGroup,
    { style: { width: 'min(100%, 350px)' } },
    React.createElement(RadioTile, {
      label: 'Web',
      description: 'Dimensions in px',
      icon: React.createElement(SvgNetwork, null),
      defaultChecked: true,
      name: 'OS',
      value: 'Web',
    }),
    React.createElement(RadioTile, {
      label: 'iOS',
      description: 'Dimensions in pt',
      icon: React.createElement(
        'svg',
        { 'aria-hidden': 'true', viewBox: '0 0 16 16' },
        React.createElement('path', {
          d: 'm14.38732 12.46864a8.67507 8.67507 0 0 1 -.85133 1.54667 7.83909 7.83909 0 0 1 -1.096 1.33933 2.11842 2.11842 0 0 1 -1.40933.62733 3.50824 3.50824 0 0 1 -1.30133-.314 3.7014 3.7014 0 0 0 -1.40133-.31333 3.82728 3.82728 0 0 0 -1.44066.31333 3.84425 3.84425 0 0 1 -1.24467.33067 1.98968 1.98968 0 0 1 -1.44066-.644 8.203 8.203 0 0 1 -1.14667-1.38664 9.61729 9.61729 0 0 1 -1.21266-2.43466 8.99338 8.99338 0 0 1 -.50933-2.90134 5.34287 5.34287 0 0 1 .68865-2.772 4.05969 4.05969 0 0 1 1.44134-1.474 3.84792 3.84792 0 0 1 1.94933-.556 4.55944 4.55944 0 0 1 1.50733.35466 4.79788 4.79788 0 0 0 1.196.35534 7.06478 7.06478 0 0 0 1.326-.41866 4.34039 4.34039 0 0 1 1.802-.32334 3.8146 3.8146 0 0 1 2.99733 1.59533 3.37671 3.37671 0 0 0 -1.768 3.062 3.3911 3.3911 0 0 0 1.09733 2.54467 3.59839 3.59839 0 0 0 1.096.72733q-.132.386-.27933.74133zm-3.05466-12.14864a3.43565 3.43565 0 0 1 -.86533 2.23866 2.93869 2.93869 0 0 1 -2.45 1.22267 2.58687 2.58687 0 0 1 -.018-.30334 3.63848 3.63848 0 0 1 2.03667-3.11132 3.30968 3.30968 0 0 1 1.28-.36667 2.86658 2.86658 0 0 1 .01667.32z',
        }),
      ),
      name: 'OS',
      value: 'iOS',
    }),
    React.createElement(RadioTile, {
      label: 'Android',
      description: 'Dimensions in dp/sp',
      icon: React.createElement(
        'svg',
        { 'aria-hidden': 'true', viewBox: '0 0 16 16' },
        React.createElement('path', {
          d: 'm3.28467 6.184v4.122a.97577.97577 0 1 1 -1.95134 0v-4.122a.97576.97576 0 1 1 1.95134 0zm2.58133-4.71533-.688-1.25934a.14184.14184 0 0 1 .054-.19133.13814.13814 0 0 1 .18867.05467l.696 1.27333a4.63366 4.63366 0 0 1 3.76666 0l.696-1.27333a.1368.1368 0 0 1 .18867-.05467.14184.14184 0 0 1 .054.19133l-.688 1.25934a4.03915 4.03915 0 0 1 2.218 3.546h-8.704a4.03915 4.03915 0 0 1 2.218-3.546zm3.77933 1.56266a.36337.36337 0 1 0 .36334-.36866.36621.36621 0 0 0 -.36334.36866zm-4.01733 0a.36337.36337 0 1 0 .36333-.36866.3662.3662 0 0 0 -.36333.36866zm8.06267 2.16334a.98351.98351 0 0 0 -.97534.98933v4.122a.97577.97577 0 1 0 1.95134 0v-4.122a.98365.98365 0 0 0 -.976-.98933zm-10.04267.16933v6.39733a1.05948 1.05948 0 0 0 1.052 1.06667h.69867v2.18267a.97543.97543 0 1 0 1.95066 0v-2.18267h1.30134v2.18267a.97543.97543 0 1 0 1.95066 0v-2.18267h.69867a1.05948 1.05948 0 0 0 1.052-1.06667v-6.39733z',
        }),
      ),
      name: 'OS',
      value: 'Android',
    }),
    React.createElement(RadioTile, {
      label: 'Windows',
      description: 'Windows phone is no longer supported',
      icon: React.createElement(SvgWindows, null),
      disabled: true,
      name: 'OS',
      value: 'Windows',
    }),
  );
};
