/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { screen, render, fireEvent, act } from '@testing-library/react';
import { WorkflowDiagram } from './WorkflowDiagram.js';

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

it('should add custom prop to workflow diagram wrapper', () => {
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
      wrapperProps={{ className: 'some-wrapper' }}
    />
  );

  const { container } = render(workflowDiagram);

  expect(container.querySelector('div')).toHaveClass('some-wrapper');
});

it('should display tooltip upon hovering step if description provided', async () => {
  vi.useFakeTimers();

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

  expect(document.querySelector('.iui-tooltip')).not.toBeVisible();
  fireEvent.mouseEnter(screen.getByText('Step One'), { bubbles: true });
  act(() => void vi.advanceTimersByTime(100));
  const tooltip = document.querySelector('.iui-tooltip') as HTMLElement;
  expect(tooltip).toBeVisible();
  expect(tooltip).toHaveTextContent('Step one tooltip');

  fireEvent.mouseLeave(screen.getByText('Step One'), { bubbles: true });
  act(() => void vi.advanceTimersByTime(250));

  fireEvent.mouseEnter(screen.getByText('Step Three'), { bubbles: true });
  act(() => void vi.advanceTimersByTime(100));
  expect(document.querySelector('.iui-tooltip')).not.toBeVisible();

  vi.useRealTimers();
});
