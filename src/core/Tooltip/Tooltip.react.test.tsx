// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { Tooltip } from './Tooltip';

it('should toggle the visibility of tooltip (hover)', () => {
  jest.useFakeTimers();
  const { getByText, queryByText } = render(
    <div id='container'>
      <Tooltip parentId='container' content='some text'>
        <div>Hover Here</div>
      </Tooltip>
    </div>,
  );

  expect(queryByText('some text')).toBeNull();

  fireEvent.mouseEnter(getByText('Hover Here'));

  getByText('some text');

  fireEvent.mouseLeave(getByText('Hover Here'));

  jest.runAllTimers();
  expect(queryByText('some text')).toBeNull();
  jest.useRealTimers();
});

it('should be visible', () => {
  const { getByText } = render(
    <Tooltip parentId='container' content='some text' isVisible>
      <div>Visible!</div>
    </Tooltip>,
  );

  getByText('some text');
});

it('should not be visible', () => {
  const { queryByText } = render(
    <Tooltip parentId='container' content='some text' isVisible={false}>
      <div>Visible!</div>
    </Tooltip>,
  );

  expect(queryByText('some text')).toBeNull();
});
