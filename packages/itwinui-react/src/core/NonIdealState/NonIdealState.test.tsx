/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render, screen } from '@testing-library/react';
import { NonIdealState } from './NonIdealState';

it(`displays correctly`, () => {
  const props = {
    svg: 'svg',
    heading: 'heading',
    description: 'description',
    actions: 'actions',
    'data-test': 'non-ideal-state-test',
  };

  const { container } = render(<NonIdealState {...props} />);

  expect(container.querySelector('.iui-non-ideal-state')).toHaveAttribute(
    'data-test',
    'non-ideal-state-test',
  );

  expect(screen.getByText(props.svg)).toHaveClass(
    'iui-non-ideal-state-illustration',
  );
  expect(screen.getByText(props.heading)).toHaveClass(
    'iui-non-ideal-state-title',
  );
  expect(screen.getByText(props.description)).toHaveClass(
    'iui-non-ideal-state-description',
  );
  expect(screen.getByText(props.actions)).toHaveClass(
    'iui-non-ideal-state-actions',
  );
});
