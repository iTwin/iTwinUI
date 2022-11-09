/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { StatusIconMap, SvgMore as SvgPlaceholder } from '../utils';

import { ExpandableBlock } from './ExpandableBlock';

it('should render correctly in its most basic state', () => {
  const { container } = render(
    <ExpandableBlock title='test title'>content</ExpandableBlock>,
  );

  const expandableBlock = container.querySelector(
    '.iui-expandable-block',
  ) as HTMLElement;
  expect(expandableBlock).toBeTruthy();
  expect(expandableBlock.classList).not.toContain('iui-with-caption');
  expect(
    container.querySelector('.iui-expandable-block-label .iui-title'),
  ).toHaveTextContent('test title');
});

it('should render with caption', () => {
  const { container } = render(
    <ExpandableBlock title='test title' caption='test caption'>
      content
    </ExpandableBlock>,
  );

  const expandableBlock = container.querySelector(
    '.iui-expandable-block.iui-with-caption',
  );
  expect(expandableBlock).toBeTruthy();
  expect(
    container.querySelector('.iui-expandable-block-label .iui-title'),
  ).toHaveTextContent('test title');
  expect(
    container.querySelector('.iui-expandable-block-label .iui-caption'),
  ).toHaveTextContent('test caption');
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
  const content = container.querySelector(
    '.iui-expandable-content',
  ) as HTMLElement;
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

  const content = container.querySelector(
    '.iui-expandable-content',
  ) as HTMLElement;
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

it.each(['positive', 'negative', 'warning', 'informational'] as const)(
  'should set %s status',
  (status) => {
    const { container, queryByText } = render(
      <ExpandableBlock title='test title' status={status}>
        content
      </ExpandableBlock>,
    );
    expect(container.querySelector('.iui-expandable-block')).toBeTruthy();
    expect(queryByText('test title')).toHaveClass('iui-title');

    const {
      container: { firstChild: statusIcon },
    } = render(StatusIconMap[status]({ className: `iui-status-icon` }));
    (statusIcon as HTMLElement).setAttribute('data-iui-icon-color', status);
    expect(container.querySelector('.iui-status-icon')).toEqual(statusIcon);
  },
);

it('should render with custom endIcon', () => {
  const { container, queryByText } = render(
    <ExpandableBlock title='test title' endIcon={<SvgPlaceholder />}>
      content
    </ExpandableBlock>,
  );
  expect(container.querySelector('.iui-expandable-block')).toBeTruthy();
  expect(queryByText('test title')).toHaveClass('iui-title');

  const {
    container: { firstChild: placeholderIcon },
  } = render(<SvgPlaceholder className='iui-status-icon' />);
  expect(container.querySelector('.iui-status-icon')).toEqual(placeholderIcon);
});

it('should render small size', () => {
  const { container } = render(
    <ExpandableBlock title='test title' size='small'>
      content
    </ExpandableBlock>,
  );
  const expandableBlock = container.querySelector(
    '.iui-expandable-block',
  ) as HTMLElement;
  expect(expandableBlock).toBeTruthy();
  expect(expandableBlock.classList).toContain('iui-small');
});

it('should render borderless', () => {
  const { container } = render(
    <ExpandableBlock title='test title' styleType='borderless'>
      content
    </ExpandableBlock>,
  );
  expect(container.querySelector('.iui-expandable-block')).toHaveClass(
    'iui-borderless',
  );
});
