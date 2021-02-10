// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import { ExpandableBlock } from './ExpandableBlock';

it('should render correctly in its most basic state', () => {
  const { container } = render(<ExpandableBlock title='test title' />);

  const expandableBlock = container.querySelector(
    '.iui-expandable-block',
  ) as HTMLElement;
  expect(expandableBlock).toBeTruthy();
  expect(expandableBlock.classList).not.toContain('iui-with-caption');
  const title = container.querySelector('.iui-title') as HTMLElement;
  expect(title.textContent).toEqual('test title');
});

it('should render with caption', () => {
  const { container } = render(
    <ExpandableBlock title='test title' caption='test caption' />,
  );

  const expandableBlock = container.querySelector(
    '.iui-expandable-block.iui-with-caption',
  );
  expect(expandableBlock).toBeTruthy();
  const title = container.querySelector('.iui-title') as HTMLElement;
  expect(title).toBeTruthy();
  expect(title.textContent).toEqual('test title');
  const caption = container.querySelector('.iui-caption') as HTMLElement;
  expect(caption).toBeTruthy();
  expect(caption.textContent).toEqual('test caption');
});

it('should render content when expanded', () => {
  const { container } = render(
    <ExpandableBlock title='test title' isExpanded={true}>
      test content
    </ExpandableBlock>,
  );

  const expandableBlock = container.querySelector(
    '.iui-expandable-block.iui-expanded',
  );
  expect(expandableBlock).toBeTruthy();
  const content = container.querySelector('.iui-content') as HTMLElement;
  expect(content).toBeTruthy();
  expect(content.textContent).toEqual('test content');
});

it('should trigger onToggle when clicked only on header', () => {
  const onToggleMock = jest.fn();
  const { container } = render(
    <ExpandableBlock
      title='test title'
      onToggle={onToggleMock}
      isExpanded={true}
    >
      test content
    </ExpandableBlock>,
  );

  const header = container.querySelector('.iui-title') as HTMLElement;
  expect(header).toBeTruthy();
  fireEvent.click(header);
  expect(onToggleMock).toHaveBeenCalledTimes(1);

  const content = container.querySelector('.iui-content') as HTMLElement;
  expect(content).toBeTruthy();
  fireEvent.click(content);
  expect(onToggleMock).toHaveBeenCalledTimes(1);
});

it('should trigger onToggle when clicked with Enter or Spacebar', () => {
  const onToggleMock = jest.fn();
  const { container } = render(
    <ExpandableBlock
      title='test title'
      onToggle={onToggleMock}
      isExpanded={true}
    >
      test content
    </ExpandableBlock>,
  );

  const header = container.querySelector('.iui-title') as HTMLElement;
  expect(header).toBeTruthy();
  fireEvent.keyDown(header, {
    key: 'Enter',
    charCode: 13,
  });
  expect(onToggleMock).toHaveBeenCalledTimes(1);

  fireEvent.keyDown(header, {
    key: ' ',
    charCode: 32,
  });
  expect(onToggleMock).toHaveBeenCalledTimes(2);

  fireEvent.keyDown(header, {
    key: 'Spacebar',
    charCode: 32,
  });
  expect(onToggleMock).toHaveBeenCalledTimes(3);
});
