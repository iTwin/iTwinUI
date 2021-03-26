// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import { render } from '@testing-library/react';

import { Tile } from './Tile';
import { Badge } from '../Badge';
import { Button, IconButton } from '../Buttons';
import { MenuItem } from '../Menu';
import SvgPlaceholder from '@bentley/icons-generic-react/cjs/icons/Placeholder';

it('should render in its most basic state', () => {
  const { container } = render(
    <Tile name='test-name' thumbnail={<SvgPlaceholder />} />,
  );
  expect(container.querySelector('.iui-tile')).toBeTruthy();

  expect(container.querySelector('.iui-thumbnail')).toBeTruthy();
  expect(container.querySelector('.iui-content')).toBeTruthy();

  const label = container.querySelector('.iui-name-label') as HTMLSpanElement;
  expect(label.textContent).toBe('test-name');
});

it('should render new and selected states', () => {
  const { container } = render(
    <Tile isSelected name='test-name' thumbnail={<SvgPlaceholder />} />,
  );
  expect(container.querySelector('.iui-tile.iui-active')).toBeTruthy();

  const { container: container2 } = render(
    <Tile isNew name='test-name' thumbnail={<SvgPlaceholder />} />,
  );
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

  const desc = container.querySelector('.iui-description') as HTMLDivElement;
  expect(desc.textContent).toBe('test-description');

  const metadata = container.querySelector('.iui-metadata') as HTMLDivElement;
  expect(metadata.textContent).toBe('test-metadata');

  expect(container.querySelector('.iui-badge-container')).toBeTruthy();
  const badge = container.querySelector('.iui-badge') as HTMLSpanElement;
  expect(badge.textContent).toBe('test-badge');
});

it('should render thumbnail correctly (url)', () => {
  const { container } = render(<Tile name='test-name' thumbnail='image.png' />);
  const picture = container.querySelector('.iui-picture') as HTMLDivElement;
  expect(picture).toBeTruthy();
  expect(picture.style.backgroundImage).toBe('url(image.png)');
});

it('should render thumbnail correctly (<img>)', () => {
  const { container } = render(
    <Tile name='test-name' thumbnail={<img src='image.png' />} />,
  );
  const img = container.querySelector('.iui-picture') as HTMLImageElement;
  expect(img).toBeTruthy();
  expect(img.src).toContain('image.png');
});

it('should render thumbnail correctly (svg)', () => {
  const { container } = render(
    <Tile name='test-name' thumbnail={<SvgPlaceholder />} />,
  );
  const { container: placeholderIcon } = render(<SvgPlaceholder />);
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
    '.iui-type-indicator',
  ) as HTMLButtonElement;
  expect(leftIcon).toBeTruthy();
  leftIcon.click();
  expect(onClickMock).toBeCalledWith('left');

  const rightIcon = container.querySelector(
    '.iui-quick-action',
  ) as HTMLButtonElement;
  expect(rightIcon).toBeTruthy();
  rightIcon.click();
  expect(onClickMock).toBeCalledWith('right');
});

it('should render options dropdown correctly', () => {
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
    '.iui-more-options',
  ) as HTMLButtonElement;
  expect(menuButton).toBeTruthy();
  menuButton.click();

  const menu = document.querySelector('.iui-menu') as HTMLUListElement;
  expect(menu).toBeTruthy();
  expect(document.querySelectorAll('li')).toHaveLength(2);

  const menuItem = menu.querySelector('li') as HTMLLIElement;
  expect(menuItem).toBeTruthy();
  expect(menuItem.textContent).toBe('Item 1');
  menuItem.click();
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
    '.iui-content .test-child',
  ) as HTMLSpanElement;
  expect(child).toBeTruthy();
  expect(child.textContent).toBe('test-content');
});
