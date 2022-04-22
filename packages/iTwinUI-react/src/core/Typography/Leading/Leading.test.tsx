/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';
import { Leading } from './Leading';

describe('Leading', () => {
  const testText = 'Test Leading text';
  [
    {
      testName: 'renders in its most basic state',
      props: {},
      expectedClasses: 'iui-text-leading iui-text-spacing',
    },
    {
      testName: 'renders muted',
      props: { isMuted: true },
      expectedClasses: 'iui-text-leading iui-text-spacing iui-text-muted',
    },
    {
      testName: 'propagates className',
      props: { className: 'mockClassName' },
      expectedClasses: 'iui-text-leading iui-text-spacing mockClassName',
    },
  ].forEach(({ testName, props, expectedClasses }) => {
    it(testName, () => {
      const { getByTestId } = render(
        <Leading data-testid='leading' {...props}>
          {testText}
        </Leading>,
      );
      const leading = getByTestId('leading');
      expect(leading.className).toBe(expectedClasses);
      expect(leading.textContent).toBe(testText);
    });
  });
});
