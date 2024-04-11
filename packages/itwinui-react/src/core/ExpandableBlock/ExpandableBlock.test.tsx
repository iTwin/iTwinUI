/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { fireEvent, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import * as React from 'react';
import { StatusIconMap, SvgMore as SvgPlaceholder } from '../../utils/index.js';
import * as UseId from '../../utils/hooks/useId.js';

import { ExpandableBlock } from './ExpandableBlock.js';

it('should render correctly in its most basic state', () => {
  const { container, getByRole } = render(
    <ExpandableBlock.Wrapper>
      <ExpandableBlock.Trigger label='test title' />
      <ExpandableBlock.Content>content</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>,
  );

  const expandableBlock = container.querySelector(
    '.iui-expandable-block',
  ) as HTMLElement;
  expect(expandableBlock).toBeTruthy();
  expect(
    container.querySelector(
      '.iui-expandable-block-label .iui-expandable-block-title',
    ),
  ).toHaveTextContent('test title');

  expect(getByRole('button')).toHaveAccessibleName('test title');
});

it('should render with caption', () => {
  const { container, getByRole } = render(
    <ExpandableBlock.Wrapper>
      <ExpandableBlock.Trigger>
        <ExpandableBlock.LabelArea>
          <ExpandableBlock.Title>test title</ExpandableBlock.Title>
          <ExpandableBlock.Caption>test caption</ExpandableBlock.Caption>
        </ExpandableBlock.LabelArea>
      </ExpandableBlock.Trigger>
      <ExpandableBlock.Content>content</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>,
  );

  const button = getByRole('button');
  expect(button).toHaveTextContent('test title');
  expect(button).toHaveAccessibleDescription('test caption');

  const caption = container.querySelector(
    '.iui-expandable-block-label .iui-expandable-block-caption',
  );
  expect(caption).toHaveTextContent('test caption');
});

it('should render content when expanded', () => {
  const { container, getByRole } = render(
    <ExpandableBlock.Wrapper isExpanded={true}>
      <ExpandableBlock.Trigger label='test title' />
      <ExpandableBlock.Content>test content</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>,
  );

  const expandableBlock = container.querySelector('.iui-expandable-block');
  expect(expandableBlock).toBeTruthy();
  expect(expandableBlock).toHaveAttribute('data-iui-expanded', 'true');

  const button = getByRole('button');
  expect(button).toHaveAttribute('aria-expanded', 'true');

  const content = container.querySelector(
    '.iui-expandable-content',
  ) as HTMLElement;
  expect(content).toBeTruthy();
  expect(content.textContent).toEqual('test content');
});

it('should trigger onToggle when clicked only on header', () => {
  const onToggleMock = vi.fn();
  const { container, getByRole } = render(
    <ExpandableBlock.Wrapper onToggle={onToggleMock} isExpanded={true}>
      <ExpandableBlock.Trigger label='test title' />
      <ExpandableBlock.Content>test content</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>,
  );

  fireEvent.click(getByRole('button'));
  expect(onToggleMock).toHaveBeenCalledTimes(1);

  const content = container.querySelector(
    '.iui-expandable-content',
  ) as HTMLElement;
  expect(content).toBeTruthy();
  fireEvent.click(content);
  expect(onToggleMock).toHaveBeenCalledTimes(1);
});

it('should trigger onToggle when clicked with Enter or Spacebar', async () => {
  const onToggleMock = vi.fn();
  const { container } = render(
    <ExpandableBlock.Wrapper onToggle={onToggleMock} isExpanded={true}>
      <ExpandableBlock.Trigger label='test title' />
      <ExpandableBlock.Content>test content</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>,
  );

  const header = container.querySelector(
    '.iui-expandable-header',
  ) as HTMLElement;

  expect(header).toBeTruthy();

  await userEvent.tab();
  await userEvent.keyboard('{Enter}');
  expect(onToggleMock).toHaveBeenCalledTimes(1);

  await userEvent.keyboard(' ');
  expect(onToggleMock).toHaveBeenCalledTimes(2);
});

it.each(['positive', 'negative', 'warning', 'informational'] as const)(
  'should set %s status',
  (status) => {
    const { container, queryByText } = render(
      <ExpandableBlock.Wrapper status={status}>
        <ExpandableBlock.Trigger>
          <ExpandableBlock.LabelArea>
            <ExpandableBlock.Title>test title</ExpandableBlock.Title>
          </ExpandableBlock.LabelArea>
          <ExpandableBlock.EndIcon />
        </ExpandableBlock.Trigger>
        <ExpandableBlock.Content>content</ExpandableBlock.Content>
      </ExpandableBlock.Wrapper>,
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
    <ExpandableBlock.Wrapper>
      <ExpandableBlock.Trigger>
        <ExpandableBlock.LabelArea>
          <ExpandableBlock.Title>test title</ExpandableBlock.Title>
        </ExpandableBlock.LabelArea>
        <ExpandableBlock.EndIcon>
          <SvgPlaceholder />
        </ExpandableBlock.EndIcon>
      </ExpandableBlock.Trigger>
      <ExpandableBlock.Content>content</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>,
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
    <ExpandableBlock.Wrapper size='small'>
      <ExpandableBlock.Trigger label='test title' />
      <ExpandableBlock.Content>content</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>,
  );
  const expandableBlock = container.querySelector(
    '.iui-expandable-block',
  ) as HTMLElement;
  expect(expandableBlock).toBeTruthy();
  expect(expandableBlock).toHaveAttribute('data-iui-size', 'small');
});

it('should render borderless', () => {
  const { container } = render(
    <ExpandableBlock.Wrapper styleType='borderless'>
      <ExpandableBlock.Trigger label='test title' />
      <ExpandableBlock.Content>content</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>,
  );
  expect(container.querySelector('.iui-expandable-block')).toHaveAttribute(
    'data-iui-variant',
    'borderless',
  );
});

it('should respect disabled prop', () => {
  const onToggleMock = vi.fn();
  const { getByRole } = render(
    <ExpandableBlock.Wrapper onToggle={onToggleMock} disabled>
      <ExpandableBlock.Trigger label='test title' />
      <ExpandableBlock.Content>test content</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>,
  );
  const header = getByRole('button');
  expect(header).toHaveAttribute('aria-disabled', 'true');
  fireEvent.click(header);
  expect(onToggleMock).not.toHaveBeenCalled();
  expect(header).toHaveAttribute('aria-expanded', 'false');
});

it('should support legacy api', () => {
  const useIdMock = vi.spyOn(UseId, 'useId');
  useIdMock.mockReturnValue('foo'); // to ensure the id is same for both calls

  render(
    <div data-testid='1'>
      <ExpandableBlock
        title='test title'
        caption='test caption'
        endIcon='test icon'
      >
        test content
      </ExpandableBlock>
    </div>,
  );

  render(
    <div data-testid='2'>
      <ExpandableBlock.Wrapper>
        <ExpandableBlock.Trigger>
          <ExpandableBlock.ExpandIcon />
          <ExpandableBlock.LabelArea>
            <ExpandableBlock.Title>test title</ExpandableBlock.Title>
            <ExpandableBlock.Caption>test caption</ExpandableBlock.Caption>
          </ExpandableBlock.LabelArea>
          <ExpandableBlock.EndIcon>test icon</ExpandableBlock.EndIcon>
        </ExpandableBlock.Trigger>
        <ExpandableBlock.Content>test content</ExpandableBlock.Content>
      </ExpandableBlock.Wrapper>
    </div>,
  );

  expect(screen.getByTestId('1').innerHTML).toEqual(
    screen.getByTestId('2').innerHTML,
  );

  useIdMock.mockRestore();
});
