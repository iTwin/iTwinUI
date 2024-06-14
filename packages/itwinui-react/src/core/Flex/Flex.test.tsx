/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';

import { Flex } from './Flex.js';

it('should render Flex in its most basic state', () => {
  const { container } = render(<Flex>it do be flex</Flex>);
  expect(container.querySelector('div')).toHaveClass('iui-flex');
});

it('should render Flex.Item', () => {
  const { container } = render(<Flex.Item>item!</Flex.Item>);
  expect(container.querySelector('div')).toHaveClass('iui-flex-item');
});

it('should render Flex.Spacer', () => {
  const { container } = render(<Flex.Spacer />);
  expect(container.querySelector('div')).toHaveClass('iui-flex-spacer');
});

it.each(['3xs', '2xs', 'xs', 's', 'm', 'l', 'xl', '2xl', '3xl'] as const)(
  'should accept preset token (%s) as gap value',
  (value) => {
    const { container } = render(
      <Flex gap={value}>
        <Flex.Item gapBefore={value} gapAfter={value}>
          hello
        </Flex.Item>
      </Flex>,
    );
    expect(container.querySelector('.iui-flex')).toHaveStyle(
      `--iui-flex-gap: var(--iui-size-${value});`,
    );
    expect(container.querySelector('.iui-flex-item')).toHaveStyle(
      `--iui-flex-item-gap-before: var(--iui-size-${value});` +
        `--iui-flex-item-gap-after: var(--iui-size-${value});` +
        `--iui-flex-item-gap-before-toggle: var(--iui-on);` +
        `--iui-flex-item-gap-after-toggle: var(--iui-on);`,
    );
  },
);

it('should allow arbitrary gap values', () => {
  const { container } = render(
    <Flex gap='2rem'>
      <Flex.Item gapBefore='calc(0.25vw + 3.5px)' gapAfter='0px'>
        hello
      </Flex.Item>
    </Flex>,
  );

  expect(container.querySelector('.iui-flex')).toHaveStyle(
    '--iui-flex-gap: 2rem',
  );
  expect(container.querySelector('.iui-flex-item')).toHaveStyle(
    `--iui-flex-item-gap-before: calc(0.25vw + 3.5px);` +
      `--iui-flex-item-gap-after: 0px;` +
      `--iui-flex-item-gap-before-toggle: var(--iui-on);` +
      `--iui-flex-item-gap-after-toggle: var(--iui-on);`,
  );
});

it('should respect display prop', () => {
  const { container } = render(<Flex display='inline-flex'>flex</Flex>);
  const flex = container.querySelector('.iui-flex');
  expect(flex).toHaveStyle('--iui-flex-display: inline-flex;');
});

it('should respect justifyContent prop', () => {
  const { container } = render(<Flex justifyContent='flex-end'>flex</Flex>);
  const flex = container.querySelector('.iui-flex');
  expect(flex).toHaveStyle('--iui-flex-justify: flex-end;');
});

it('should respect alignItems prop', () => {
  const { container } = render(<Flex alignItems='baseline'>flex</Flex>);
  const flex = container.querySelector('.iui-flex');
  expect(flex).toHaveStyle('--iui-flex-align: baseline;');
});

it('should respect flexDirection prop', () => {
  const { container } = render(<Flex flexDirection='column'>flex</Flex>);
  const flex = container.querySelector('.iui-flex');
  expect(flex).toHaveStyle('--iui-flex-direction: column;');
});

it('should respect flexWrap prop', () => {
  const { container } = render(<Flex flexWrap='wrap'>flex</Flex>);
  const flex = container.querySelector('.iui-flex');
  expect(flex).toHaveStyle('--iui-flex-wrap: wrap;');
});

it('(Flex.Item) should respect alignSelf prop', () => {
  const { container } = render(<Flex.Item alignSelf='stretch'>flex</Flex.Item>);
  const item = container.querySelector('.iui-flex-item');
  expect(item).toHaveStyle('--iui-flex-item-align: stretch;');
});

it('(Flex.Item) should respect flex prop', () => {
  const { container } = render(<Flex.Item flex='3000'>flex</Flex.Item>);
  const item = container.querySelector('.iui-flex-item');
  expect(item).toHaveStyle('--iui-flex-item-flex: 3000;');
});

it('(Flex.Spacer) should respect flex prop', () => {
  const { container } = render(<Flex.Spacer flex='3000' />);
  const spacer = container.querySelector('.iui-flex-spacer');
  expect(spacer).toHaveStyle('--iui-flex-spacer-flex: 3000;');
});
