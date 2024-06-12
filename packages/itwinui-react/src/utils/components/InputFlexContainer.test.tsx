/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import { InputFlexContainer } from './InputFlexContainer.js';

it('should render InputFlexContainer in its most basic state', () => {
  const { container } = render(
    <InputFlexContainer>
      <input />
    </InputFlexContainer>,
  );
  expect(container.querySelector('div')).toHaveClass(
    'iui-input-flex-container',
  );
});

it.each(['positive', 'negative', 'warning'] as const)(
  'should render InputFlexContainer in %s status',
  (status) => {
    const { container } = render(
      <InputFlexContainer status={status}>
        <input />
      </InputFlexContainer>,
    );
    expect(container.querySelector('div')).toHaveAttribute(
      'data-iui-status',
      status,
    );
  },
);

it('should render InputFlexContainer disabled', () => {
  const { container } = render(
    <InputFlexContainer isDisabled>
      <input />
    </InputFlexContainer>,
  );
  expect(container.querySelector('div')).toHaveAttribute(
    'data-iui-disabled',
    'true',
  );
});
