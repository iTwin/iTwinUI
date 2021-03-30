/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';
import { Title } from './Title';

describe('Title', () => {
  const testText = 'Test Title text';
  [
    {
      testName: 'renders in its most basic state',
      props: {},
      expectedClasses: 'iui-text-title',
    },
    {
      testName: 'renders muted',
      props: { isMuted: true },
      expectedClasses: 'iui-text-title iui-text-muted',
    },
    {
      testName: 'propagates className',
      props: { className: 'mockClassName' },
      expectedClasses: 'iui-text-title mockClassName',
    },
  ].forEach(({ testName, props, expectedClasses }) => {
    it(testName, () => {
      const { getByTestId } = render(
        <Title data-testid='title' {...props}>
          {testText}
        </Title>,
      );
      const title = getByTestId('title');
      expect(title.className).toBe(expectedClasses);
      expect(title.textContent).toBe(testText);
    });
  });
});
