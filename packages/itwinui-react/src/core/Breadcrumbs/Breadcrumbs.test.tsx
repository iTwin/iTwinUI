/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Breadcrumbs } from './Breadcrumbs.js';
import { SvgChevronRight, SvgMore } from '../../utils/index.js';
import * as UseOverflow from '../../utils/hooks/useOverflow.js';
import { IconButton } from '../Buttons/IconButton.js';
import { Button } from '../Buttons/Button.js';
import { userEvent } from '@testing-library/user-event';

const renderComponent = (
  props?: Partial<React.ComponentProps<typeof Breadcrumbs>>,
) => {
  const onClickMock = vi.fn();

  return render(
    <Breadcrumbs {...props}>
      {[...Array(3)].map((_, index) => (
        <Breadcrumbs.Item key={index} onClick={onClickMock}>
          Item {index}
        </Breadcrumbs.Item>
      ))}
    </Breadcrumbs>,
  );
};

const assertBaseElement = (
  container: HTMLElement,
  { itemsLength = 3, currentIndex = 2 } = {},
) => {
  expect(container.querySelector('.iui-breadcrumbs')).toBeTruthy();
  expect(container.querySelector('.iui-breadcrumbs-list')).toBeTruthy();

  // breadcrumb items
  const breadcrumbs = container.querySelectorAll('.iui-breadcrumbs-item');
  expect(breadcrumbs.length).toEqual(itemsLength);
  breadcrumbs.forEach((breadcrumb, index) => {
    expect(breadcrumb.textContent).toEqual(`Item ${index}`);

    const item = breadcrumb.firstElementChild;
    expect(item).toBeTruthy();
    expect(item).toHaveClass('iui-breadcrumbs-content');

    const text = item?.querySelector('span');
    expect(text).toBeTruthy();

    if (index === currentIndex) {
      expect(item?.getAttribute('aria-current')).toEqual('location');
    } else {
      expect(item?.getAttribute('aria-current')).toBeFalsy();
    }
  });
};

const useOverflowMock = vi
  .spyOn(UseOverflow, 'useOverflow')
  .mockImplementation((items) => [vi.fn(), items.length]);
beforeEach(() => {
  useOverflowMock.mockImplementation((items) => [vi.fn(), items.length]);
});

it('should render all elements in default state', () => {
  const { container } = renderComponent();
  assertBaseElement(container);

  const { container: chevron } = render(<SvgChevronRight />); // default separator

  const separators = container.querySelectorAll('.iui-breadcrumbs-separator');
  expect(separators.length).toEqual(2);
  separators.forEach((separator) => {
    expect(separator.getAttribute('aria-hidden')).toBeTruthy();
    expect(separator.firstElementChild).toEqual(chevron.firstChild);
  });
});

it('should render breadcrumbs item as span element by default', () => {
  const { container } = render(<Breadcrumbs.Item>Span 1</Breadcrumbs.Item>);
  expect(container.querySelector('span')).toHaveClass(
    'iui-breadcrumbs-content',
  );
});

it('should render breadcrumbs item as anchor elements (& should respect the as prop)', () => {
  const FakeRouterLink = ({
    children,
    href,
    className,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a
      className={['fake-router-link', className].filter(Boolean).join(' ')}
      href={href}
      {...rest}
    >
      {children}
    </a>
  );

  const FakeRouterLinkWithoutHref = ({
    children,
    to,
    className,
    ...rest
  }: {
    children: React.ReactNode;
    to: string;
    className?: string;
  }) => (
    <a
      className={['fake-router-link-without-href', className]
        .filter(Boolean)
        .join(' ')}
      href={to}
      {...rest}
    >
      {children}
    </a>
  );

  const { container } = render(
    <>
      <Breadcrumbs.Item href='/'>Anchor</Breadcrumbs.Item>
      <Breadcrumbs.Item as={FakeRouterLink} href='/'>
        Anchor
      </Breadcrumbs.Item>
      <Breadcrumbs.Item as={FakeRouterLinkWithoutHref} to='/'>
        Anchor
      </Breadcrumbs.Item>
    </>,
  );

  const anchors = container.querySelectorAll(
    'a',
  ) as NodeListOf<HTMLAnchorElement>;

  expect(anchors.length).toEqual(3);
  anchors.forEach((anchor) => {
    expect(anchor).toHaveClass('iui-breadcrumbs-content');
    expect(anchor).toHaveAttribute('data-iui-variant', 'borderless');
  });

  // When as={…} is passed, it should be used
  expect(anchors[1]).toHaveClass('fake-router-link');
  expect(anchors[2]).toHaveClass('fake-router-link-without-href');
});

it('should render breadcrumbs item as button elements', () => {
  const { container } = render(
    <Breadcrumbs.Item onClick={() => {}}>Button</Breadcrumbs.Item>,
  );

  const button = container.querySelector('button');
  expect(button).toHaveClass('iui-breadcrumbs-content');
  expect(button).toHaveAttribute('data-iui-variant', 'borderless');
});

it('should render custom separators', () => {
  const { container } = renderComponent({ separator: '>' });
  expect(container.querySelector('.iui-breadcrumbs')).toBeTruthy();
  expect(container.querySelector('.iui-breadcrumbs-list')).toBeTruthy();
  expect(container.querySelectorAll('.iui-breadcrumbs-item').length).toEqual(3);

  const separators = container.querySelectorAll('.iui-breadcrumbs-separator');
  expect(separators.length).toEqual(2);
  separators.forEach((separator) => {
    expect(separator.getAttribute('aria-hidden')).toBeTruthy();
    expect(separator.textContent).toEqual('>');
  });
});

it('should accept currentIndex prop', () => {
  const { container } = renderComponent({ currentIndex: 1 });
  assertBaseElement(container, { currentIndex: 1 });
});

it('should overflow when there is not enough space', () => {
  useOverflowMock.mockReturnValue([vi.fn(), 2]);
  const { container } = renderComponent();

  expect(container.querySelector('.iui-breadcrumbs')).toBeTruthy();
  expect(container.querySelector('.iui-breadcrumbs-list')).toBeTruthy();

  const breadcrumbs = container.querySelectorAll('.iui-breadcrumbs-item');
  expect(breadcrumbs.length).toEqual(3);
  expect(breadcrumbs[0].textContent).toEqual('Item 0');
  expect(breadcrumbs[1].textContent).toEqual('…');
  expect(breadcrumbs[1].firstElementChild?.textContent).toContain('…');
  expect(breadcrumbs[2].textContent).toEqual('Item 2');
});

it('should handle overflow when overflowButton is specified', () => {
  const onClick = vi.fn();
  useOverflowMock.mockReturnValue([vi.fn(), 2]);
  const { container } = renderComponent({
    overflowButton: (visibleCount) => (
      <IconButton onClick={onClick(visibleCount)}>
        <SvgMore />
      </IconButton>
    ),
  });

  expect(container.querySelector('.iui-breadcrumbs')).toBeTruthy();
  expect(container.querySelector('.iui-breadcrumbs-list')).toBeTruthy();

  const breadcrumbs = container.querySelectorAll('.iui-breadcrumbs-item');
  expect(breadcrumbs.length).toEqual(3);
  fireEvent.click(breadcrumbs[1]);
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(onClick).toHaveBeenCalledWith(2);
});

it('should show the last item when only one can be visible', () => {
  useOverflowMock.mockReturnValue([vi.fn(), 1]);

  const { container } = renderComponent();

  expect(container.querySelector('.iui-breadcrumbs')).toBeTruthy();
  expect(container.querySelector('.iui-breadcrumbs-list')).toBeTruthy();

  const breadcrumbs = container.querySelectorAll('.iui-breadcrumbs-item');
  expect(breadcrumbs.length).toEqual(2);
  expect(breadcrumbs[0].textContent).toEqual('…');
  expect(breadcrumbs[0].firstElementChild?.textContent).toContain('…');
  expect(breadcrumbs[1].textContent).toEqual('Item 2');
});

it('should support legacy api', async () => {
  const onClick = vi.fn();

  render(
    <div data-testid='1'>
      <Breadcrumbs>
        <Button onClick={onClick}>Item 1</Button>
        <a href='#'>Item 2</a>
        <span>Item 3</span>
      </Breadcrumbs>
    </div>,
  );
  render(
    <div data-testid='2'>
      <Breadcrumbs>
        <Breadcrumbs.Item onClick={onClick}>Item 1</Breadcrumbs.Item>
        <Breadcrumbs.Item href='#'>Item 2</Breadcrumbs.Item>
        <Breadcrumbs.Item>Item 3</Breadcrumbs.Item>
      </Breadcrumbs>
    </div>,
  );

  expect(screen.getByTestId('1').innerHTML).toEqual(
    screen.getByTestId('2').innerHTML,
  );

  await userEvent.click(
    screen.getByTestId('1').querySelector('button') as HTMLElement,
  );
  expect(onClick).toHaveBeenCalledTimes(1);
  await userEvent.click(
    screen.getByTestId('2').querySelector('button') as HTMLElement,
  );
  expect(onClick).toHaveBeenCalledTimes(2);

  expect(screen.getByTestId('1').querySelector('a')).toHaveAttribute(
    'href',
    '#',
  );
  expect(screen.getByTestId('2').querySelector('a')).toHaveAttribute(
    'href',
    '#',
  );
});
