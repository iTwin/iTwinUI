/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import {
  screen,
  render,
  waitForElementToBeRemoved,
  fireEvent,
} from '@testing-library/react';
import React from 'react';
import { WorkflowDiagram } from './WorkflowDiagram';

it('should display all step names in default workflow diagram', () => {
  const workflowDiagram = (
    <WorkflowDiagram
      steps={[
        {
          name: 'Step One',
        },
        {
          name: 'Step Two',
        },
        {
          name: 'Step Three',
        },
      ]}
    />
  );

  const { getByText, queryByText } = render(workflowDiagram);

  getByText('Step One');
  getByText('Step Two');
  getByText('Step Three');

  expect(queryByText('1')).toBeNull();
  expect(queryByText('2')).toBeNull();
  expect(queryByText('3')).toBeNull();
});

it('should display tooltip upon hovering step if description provided', async () => {
  jest.useFakeTimers();

  const workflowDiagram = (
    <WorkflowDiagram
      steps={[
        {
          name: 'Step One',
          description: 'Step one tooltip',
        },
        {
          name: 'Step Two',
          description: 'Step two tooltip',
        },
        {
          name: 'Step Three',
        },
      ]}
    />
  );

  render(workflowDiagram);

  expect(document.querySelector('.iui-tooltip')).toBeNull();
  expect(screen.queryByText('Step one tooltip')).toBeNull();
  fireEvent.mouseEnter(screen.getByText('Step One'), { bubbles: true });
  const tooltip = document.querySelector('.iui-tooltip') as HTMLElement;
  expect(tooltip).toBeVisible();
  expect(tooltip).toHaveTextContent('Step one tooltip');

  fireEvent.mouseLeave(screen.getByText('Step One'), { bubbles: true });
  await waitForElementToBeRemoved(tooltip);

  fireEvent.mouseEnter(screen.getByText('Step Three'), { bubbles: true });
  expect(document.querySelector('.iui-tooltip')).toBeNull();

  jest.useRealTimers();
});
