/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { InformationPanelContent } from './InformationPanelContent';

it('should render in its most basic state', () => {
  const { container } = render(
    <InformationPanelContent>inner content</InformationPanelContent>,
  );

  const element = container.querySelector(
    '.iui-information-body-content',
  ) as HTMLElement;
  expect(element).not.toHaveClass('iui-inline');
  expect(element).toHaveTextContent('inner content');
});

it.each(['inline', 'default'] as const)(
  'should render with (%s) displayStyle',
  (displayStyle) => {
    const { container } = render(
      <InformationPanelContent displayStyle={displayStyle}>
        inner content
      </InformationPanelContent>,
    );
    const element = container.querySelector(
      '.iui-information-body-content',
    ) as HTMLElement;
    expect(element).toHaveTextContent('inner content');

    if (displayStyle === 'inline') {
      expect(element).toHaveClass('iui-inline');
    } else {
      expect(element).not.toHaveClass('iui-inline');
    }
  },
);

it('should propagate misc props', () => {
  const { container } = render(
    <InformationPanelContent className='test class' style={{ color: 'black' }}>
      inner content
    </InformationPanelContent>,
  );

  const element = container.querySelector(
    '.iui-information-body-content',
  ) as HTMLElement;
  expect(element).toHaveClass('test class');
  expect(element).toHaveStyle('color: black');
  expect(element).toHaveTextContent('inner content');
});
