/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { Tile } from './Tile';
import { Badge } from '../Badge';
import { Button, IconButton } from '../Buttons';
import { MenuItem } from '../Menu';
import { SvgClose as SvgPlaceholder } from '../utils';
import userEvent from '@testing-library/user-event';

it('should render in its most basic state', () => {
  const { container } = render(<Tile name='test-name' />);
  expect(container.querySelector('.iui-tile')).toBeTruthy();

  expect(container.querySelector('.iui-tile-thumbnail')).toBeFalsy();
  expect(container.querySelector('.iui-tile-content')).toBeTruthy();

  const label = container.querySelector(
    '.iui-tile-name-label',
  ) as HTMLSpanElement;
  expect(label.textContent).toBe('test-name');
});

it('should render new and selected states', () => {
  const { container } = render(<Tile isSelected name='test-name' />);
  expect(container.querySelector('.iui-tile.iui-selected')).toBeTruthy();

  const { container: container2 } = render(<Tile isNew name='test-name' />);
  expect(container2.querySelector('.iui-tile.iui-new')).toBeTruthy();
});

it('should render main text content correctly', () => {
  const { container } = render(
    <Tile
      name='test-name'
      thumbnail={<SvgPlaceholder />}
      description='test-description'
      metadata='test-metadata'
      badge={<Badge backgroundColor='blue'>test-badge</Badge>}
    />,
  );
  expect(container.querySelector('.iui-tile')).toBeTruthy();

  const desc = container.querySelector(
    '.iui-tile-description',
  ) as HTMLDivElement;
  expect(desc.textContent).toBe('test-description');

  const metadata = container.querySelector(
    '.iui-tile-metadata',
  ) as HTMLDivElement;
  expect(metadata.textContent).toBe('test-metadata');

  expect(
    container.querySelector('.iui-tile-thumbnail-badge-container'),
  ).toBeTruthy();
  const badge = container.querySelector('.iui-badge') as HTMLSpanElement;
  expect(badge.textContent).toBe('test-badge');
});

it('should render thumbnail correctly (url)', () => {
  const { container } = render(<Tile name='test-name' thumbnail='image.png' />);
  expect(container.querySelector('.iui-tile-thumbnail')).toBeTruthy();
  const picture = container.querySelector(
    '.iui-tile-thumbnail-picture',
  ) as HTMLDivElement;
  expect(picture).toBeTruthy();
  expect(picture.style.backgroundImage).toBe('url(image.png)');
});

it('should render thumbnail correctly (<img>)', () => {
  const { container } = render(
    <Tile name='test-name' thumbnail={<img src='image.png' />} />,
  );
  expect(container.querySelector('.iui-tile-thumbnail')).toBeTruthy();
  const img = container.querySelector(
    '.iui-tile-thumbnail-picture',
  ) as HTMLImageElement;
  expect(img).toBeTruthy();
  expect(img.src).toContain('image.png');
});

it('should render thumbnail correctly (svg)', () => {
  const { container } = render(
    <Tile name='test-name' thumbnail={<SvgPlaceholder />} />,
  );
  const { container: placeholderIcon } = render(
    <SvgPlaceholder className='iui-thumbnail-icon' />,
  );
  expect(container.querySelector('.iui-tile-thumbnail')).toBeTruthy();
  const svg = container.querySelector('svg') as SVGSVGElement;
  expect(svg).toBeTruthy();
  expect(svg).toEqual(placeholderIcon.firstChild);
});

it('should work with buttons correctly', () => {
  const onClickMock = jest.fn();

  const { container, getByText } = render(
    <Tile
      name='test-name'
      thumbnail={<SvgPlaceholder />}
      buttons={[
        <Button key={1} onClick={() => onClickMock(1)}>
          test-button 1
        </Button>,
        <Button key={2} onClick={() => onClickMock(2)}>
          test-button 2
        </Button>,
      ]}
    />,
  );
  expect(container.querySelector('.iui-tile')).toBeTruthy();
  expect(container.querySelector('.iui-tile-buttons')).toBeTruthy();

  const button1 = getByText('test-button 1') as HTMLButtonElement;
  expect(button1).toBeTruthy();
  button1.click();
  expect(onClickMock).toBeCalledWith(1);

  const button2 = getByText('test-button 2') as HTMLButtonElement;
  expect(button2).toBeTruthy();
  button2.click();
  expect(onClickMock).toBeCalledWith(2);
});

it('should work with icons correctly', () => {
  const onClickMock = jest.fn();

  const { container } = render(
    <Tile
      name='test-name'
      thumbnail={<SvgPlaceholder />}
      leftIcon={
        <IconButton onClick={() => onClickMock('left')}>
          <SvgPlaceholder />
        </IconButton>
      }
      rightIcon={
        <IconButton onClick={() => onClickMock('right')}>
          <SvgPlaceholder />
        </IconButton>
      }
    />,
  );
  expect(container.querySelector('.iui-tile')).toBeTruthy();

  const leftIcon = container.querySelector(
    '.iui-tile-thumbnail-type-indicator',
  ) as HTMLButtonElement;
  expect(leftIcon).toBeTruthy();
  leftIcon.click();
  expect(onClickMock).toBeCalledWith('left');

  const rightIcon = container.querySelector(
    '.iui-tile-thumbnail-quick-action',
  ) as HTMLButtonElement;
  expect(rightIcon).toBeTruthy();
  rightIcon.click();
  expect(onClickMock).toBeCalledWith('right');
});

it('should render options dropdown correctly', async () => {
  const onClickMock = jest.fn();
  const { container } = render(
    <Tile
      name='test-name'
      thumbnail={<SvgPlaceholder />}
      moreOptions={[
        <MenuItem key={1} value={'v1'} onClick={(value) => onClickMock(value)}>
          Item 1
        </MenuItem>,
        <MenuItem key={2} value={'v2'} onClick={(value) => onClickMock(value)}>
          Item 1
        </MenuItem>,
      ]}
    />,
  );

  expect(container.querySelector('.iui-tile')).toBeTruthy();

  const menuButton = container.querySelector(
    '.iui-tile-more-options',
  ) as HTMLButtonElement;
  expect(menuButton).toBeTruthy();
  await userEvent.click(menuButton);

  const menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeTruthy();
  expect(document.querySelectorAll('li')).toHaveLength(2);

  const menuItem = menu.querySelector('li') as HTMLLIElement;
  expect(menuItem).toBeTruthy();
  expect(menuItem.textContent).toBe('Item 1');
  await userEvent.click(menuItem);
  expect(onClickMock).toBeCalledWith('v1');
});

it('should propagate misc props correctly', () => {
  const { container } = render(
    <Tile
      name='test-name'
      thumbnail={<SvgPlaceholder />}
      className='test-class'
      style={{ height: '300px' }}
    >
      <span className='test-child'>test-content</span>
    </Tile>,
  );

  const tile = container.querySelector('.iui-tile.test-class') as HTMLElement;
  expect(tile).toBeTruthy();
  expect(tile.style.height).toBe('300px');

  const child = container.querySelector(
    '.iui-tile-content .test-child',
  ) as HTMLSpanElement;
  expect(child).toBeTruthy();
  expect(child.textContent).toBe('test-content');
});

it('should render actionable tile', () => {
  const { container } = render(<Tile isActionable name='test-name' />);
  expect(container.querySelector('.iui-tile.iui-actionable')).toBeTruthy();
});

it.each(['positive', 'warning', 'negative'] as const)(
  'should render tile with %s status',
  (status) => {
    const { container } = render(<Tile status={status} name='test-name' />);
    expect(container.querySelector(`.iui-tile.iui-${status}`)).toBeTruthy();
  },
);

it('should render tile with loading status', () => {
  const { container } = render(<Tile isLoading={true} name='test-name' />);
  expect(container.querySelector(`.iui-tile.iui-loading`)).toBeTruthy();
});

it('should render tile with disabled status', () => {
  const { container } = render(<Tile isDisabled={true} name='test-name' />);
  const tile = container.querySelector(`.iui-tile`) as HTMLElement;
  expect(tile).toBeTruthy();
  expect(tile).toHaveAttribute('aria-disabled', 'true');
});
