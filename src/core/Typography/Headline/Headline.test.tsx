/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';
import { Headline } from './Headline';

describe('Headline', () => {
  const testText = 'Test Headline text';
  [
    {
      testName: 'renders in its most basic state',
      props: {},
      expectedClasses: 'iui-text-headline iui-text-spacing',
    },
    {
      testName: 'renders muted',
      props: { isMuted: true },
      expectedClasses: 'iui-text-headline iui-text-spacing iui-text-muted',
    },
    {
      testName: 'propagates className',
      props: { className: 'mockClassName' },
      expectedClasses: 'iui-text-headline iui-text-spacing mockClassName',
    },
  ].forEach(({ testName, props, expectedClasses }) => {
    it(testName, () => {
      const { getByTestId } = render(
        <Headline data-testid='headline' {...props}>
          {testText}
        </Headline>,
      );
      const headline = getByTestId('headline');
      expect(headline.className).toBe(expectedClasses);
      expect(headline.textContent).toBe(testText);
    });
  });
});
