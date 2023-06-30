/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import { StatusIconMap, SvgMore as SvgPlaceholder } from '../utils/index.js';

import { ExpandableBlock } from './ExpandableBlock.js';

it('should render correctly in its most basic state', () => {
  const { container } = render(
    <ExpandableBlock>
      <ExpandableBlock.Header label='test title' />
      <ExpandableBlock.Content>content</ExpandableBlock.Content>
    </ExpandableBlock>,
  );

  const expandableBlock = container.querySelector(
    '.iui-expandable-block',
  ) as HTMLElement;
  expect(expandableBlock).toBeTruthy();
  expect(expandableBlock.classList).not.toContain('iui-with-caption');
  expect(
    container.querySelector(
      '.iui-expandable-block-label .iui-expandable-block-title',
    ),
  ).toHaveTextContent('test title');
});

it('should render with caption', () => {
  const { container } = render(
    <ExpandableBlock>
      <ExpandableBlock.Header>
        <ExpandableBlock.LabelArea>
          <ExpandableBlock.Title>test title</ExpandableBlock.Title>
          <ExpandableBlock.Caption>test caption</ExpandableBlock.Caption>
        </ExpandableBlock.LabelArea>
      </ExpandableBlock.Header>
      <ExpandableBlock.Content>content</ExpandableBlock.Content>
    </ExpandableBlock>,
  );

  const expandableBlock = container.querySelector('.iui-expandable-block');
  expect(expandableBlock).toBeTruthy();
  expect(
    container.querySelector(
      '.iui-expandable-block-label .iui-expandable-block-title',
    ),
  ).toHaveTextContent('test title');
  expect(
    container.querySelector(
      '.iui-expandable-block-label .iui-expandable-block-caption',
    ),
  ).toHaveTextContent('test caption');
});

it('should render content when expanded', () => {
  const { container } = render(
    <ExpandableBlock isExpanded={true}>
      <ExpandableBlock.Content>test content</ExpandableBlock.Content>
    </ExpandableBlock>,
  );

  const expandableBlock = container.querySelector(
    '.iui-expandable-block.iui-expandable-block-expanded',
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
    <ExpandableBlock onToggle={onToggleMock} isExpanded={true}>
      <ExpandableBlock.Header label='test title' />
      <ExpandableBlock.Content>test content</ExpandableBlock.Content>
    </ExpandableBlock>,
  );

  const header = container.querySelector(
    '.iui-expandable-block-title',
  ) as HTMLElement;
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
    <ExpandableBlock onToggle={onToggleMock} isExpanded={true}>
      <ExpandableBlock.Header label='test title' />
      <ExpandableBlock.Content>test content</ExpandableBlock.Content>
    </ExpandableBlock>,
  );

  const header = container.querySelector(
    '.iui-expandable-block-title',
  ) as HTMLElement;
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
      <ExpandableBlock status={status}>
        <ExpandableBlock.Header>
          <ExpandableBlock.LabelArea>
            <ExpandableBlock.Title>test title</ExpandableBlock.Title>
          </ExpandableBlock.LabelArea>
          <ExpandableBlock.EndIcon />
        </ExpandableBlock.Header>
        <ExpandableBlock.Content>content</ExpandableBlock.Content>
      </ExpandableBlock>,
    );
    expect(container.querySelector('.iui-expandable-block')).toBeTruthy();
    expect(queryByText('test title')).toHaveClass('iui-expandable-block-title');

    const statusIconWrapper = container.querySelector('.iui-svg-icon');
    expect(statusIconWrapper).toHaveAttribute('data-iui-icon-color', status);

    const {
      container: { firstChild: statusSvg },
    } = render(StatusIconMap[status]());

    expect(container.querySelector('.iui-svg-icon > svg')).toEqual(statusSvg);
  },
);

it('should render with custom endIcon', () => {
  const { container, queryByText } = render(
    <ExpandableBlock>
      <ExpandableBlock.Header>
        <ExpandableBlock.LabelArea>
          <ExpandableBlock.Title>test title</ExpandableBlock.Title>
        </ExpandableBlock.LabelArea>
        <ExpandableBlock.EndIcon>
          <SvgPlaceholder />
        </ExpandableBlock.EndIcon>
      </ExpandableBlock.Header>
      <ExpandableBlock.Content>content</ExpandableBlock.Content>
    </ExpandableBlock>,
  );
  expect(container.querySelector('.iui-expandable-block')).toBeTruthy();
  expect(queryByText('test title')).toHaveClass('iui-expandable-block-title');

  const {
    container: { firstChild: placeholderIcon },
  } = render(<SvgPlaceholder />);
  expect(container.querySelector('.iui-svg-icon > svg')).toEqual(
    placeholderIcon,
  );
});

it('should render small size', () => {
  const { container } = render(
    <ExpandableBlock size='small'>
      <ExpandableBlock.Header label='test title' />
      <ExpandableBlock.Content>content</ExpandableBlock.Content>
    </ExpandableBlock>,
  );
  const expandableBlock = container.querySelector(
    '.iui-expandable-block',
  ) as HTMLElement;
  expect(expandableBlock).toBeTruthy();
  expect(expandableBlock.classList).toContain('iui-expandable-block-small');
});

it('should render borderless', () => {
  const { container } = render(
    <ExpandableBlock styleType='borderless'>
      <ExpandableBlock.Header label='test title' />
      <ExpandableBlock.Content>content</ExpandableBlock.Content>
    </ExpandableBlock>,
  );
  expect(container.querySelector('.iui-expandable-block')).toHaveClass(
    'iui-expandable-block-borderless',
  );
});

it('should respect disabled prop', () => {
  const onToggleMock = jest.fn();
  const { getByRole } = render(
    <ExpandableBlock onToggle={onToggleMock} disabled>
      <ExpandableBlock.Header label='test title' />
      <ExpandableBlock.Content>test content</ExpandableBlock.Content>
    </ExpandableBlock>,
  );
  const header = getByRole('button');
  expect(header).toHaveAttribute('aria-disabled', 'true');
  fireEvent.click(header);
  expect(onToggleMock).not.toHaveBeenCalled();
  expect(header).toHaveAttribute('aria-expanded', 'false');
});
