/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';
import { Subheading } from './Subheading';

describe('Subheading', () => {
  const testText = 'Test Subheading text';
  [
    {
      testName: 'renders in its most basic state',
      props: {},
      expectedClasses: 'iui-text-subheading',
    },
    {
      testName: 'renders muted',
      props: { isMuted: true },
      expectedClasses: 'iui-text-subheading iui-text-muted',
    },
    {
      testName: 'propagates className',
      props: { className: 'mockClassName' },
      expectedClasses: 'iui-text-subheading mockClassName',
    },
  ].forEach(({ testName, props, expectedClasses }) => {
    it(testName, () => {
      const { getByTestId } = render(
        <Subheading data-testid='subheading' {...props}>
          {testText}
        </Subheading>,
      );
      const subheading = getByTestId('subheading');
      expect(subheading.className).toBe(expectedClasses);
      expect(subheading.textContent).toBe(testText);
    });
  });
});
