/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';
import { Small } from './Small';

describe('Small', () => {
  const testText = 'Test Small text';
  [
    {
      testName: 'renders in its most basic state',
      props: {},
      expectedClasses: 'iui-text-small',
    },
    {
      testName: 'renders muted',
      props: { isMuted: true },
      expectedClasses: 'iui-text-small iui-text-muted',
    },
    {
      testName: 'propagates className',
      props: { className: 'mockClassName' },
      expectedClasses: 'iui-text-small mockClassName',
    },
  ].forEach(({ testName, props, expectedClasses }) => {
    it(testName, () => {
      const { getByTestId } = render(
        <Small data-testid='small' {...props}>
          {testText}
        </Small>,
      );
      const small = getByTestId('small');
      expect(small.className).toBe(expectedClasses);
      expect(small.textContent).toBe(testText);
    });
  });
});
