/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import React from 'react';
import { WorkflowDiagramStep } from './WorkflowDiagramStep';

it('should render correctly', () => {
  const step = <WorkflowDiagramStep title='Second step' />;

  const { container } = render(step);

  // Renders step
  const stepContainer = container.querySelector(
    '.iui-workflow-diagram-step',
  ) as HTMLElement;
  expect(stepContainer).toBeTruthy();

  // No tabindex
  expect(stepContainer).not.toHaveAttribute('tabindex');

  // No title
  expect(container.querySelector('.iui-stepper-step-name')).toBeFalsy();
  // Content
  const content = container.querySelector(
    '.iui-workflow-diagram-content',
  ) as HTMLElement;
  expect(content).toBeTruthy();
  expect(content.textContent).toBe('Second step');
});

it('should add className and style props correctly', () => {
  const { container } = render(
    <WorkflowDiagramStep
      title='Mock step'
      className='custom-class'
      style={{ width: 50, color: 'red' }}
    />,
  );

  const step = container.querySelector(
    '.iui-workflow-diagram-step.custom-class',
  ) as HTMLElement;
  expect(step).toBeTruthy();
  expect(step.style.width).toEqual('50px');
  expect(step.style.color).toEqual('red');
});
