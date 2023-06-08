/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { render } from '@testing-library/react';

import { Tile } from './Tile.js';
import { Badge } from '../Badge/index.js';
import { Button, IconButton } from '../Buttons/index.js';
import { MenuItem } from '../Menu/index.js';
import { SvgClose as SvgPlaceholder } from '../utils/index.js';
import userEvent from '@testing-library/user-event';

it('should render in its most basic state', () => {
  const { container } = render(
    <Tile>
      <Tile.Name name='test-name' />
      <Tile.ContentArea />
    </Tile>,
  );
  expect(container.querySelector('.iui-tile')).toBeTruthy();

  expect(container.querySelector('.iui-tile-thumbnail')).toBeFalsy();
  expect(container.querySelector('.iui-tile-content')).toBeTruthy();

  const label = container.querySelector('.iui-tile-name') as HTMLSpanElement;
  expect(label.textContent).toBe('test-name');
});

it('should render new and selected states', () => {
  const { container } = render(
    <Tile isSelected>
      <Tile.Name name='test-name' />
    </Tile>,
  );
  expect(container.querySelector('.iui-tile.iui-selected')).toBeTruthy();

  const { container: container2 } = render(
    <Tile isNew>
      <Tile.Name name='test-name' />
    </Tile>,
  );
  expect(container2.querySelector('.iui-tile.iui-new')).toBeTruthy();
});

it('should render main text content correctly', () => {
  const { container } = render(
    <Tile>
      <Tile.Name name='test-name' />
      <Tile.ThumbnailArea>
        <SvgPlaceholder />
        <Tile.BadgeContainer>
          <Badge backgroundColor='blue'>test-badge</Badge>
        </Tile.BadgeContainer>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <Tile.Description>test-description</Tile.Description>
        <Tile.Metadata>test-metadata</Tile.Metadata>
      </Tile.ContentArea>
    </Tile>,
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
  const { container } = render(
    <Tile>
      <Tile.Name name='test-name' />
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture url='image.png' />
      </Tile.ThumbnailArea>
    </Tile>,
  );
  expect(container.querySelector('.iui-tile-thumbnail')).toBeTruthy();
  const picture = container.querySelector(
    '.iui-tile-thumbnail-picture',
  ) as HTMLDivElement;
  expect(picture).toBeTruthy();
  expect(picture.style.backgroundImage).toBe('url(image.png)');
});

it('should render thumbnail correctly (<img>)', () => {
  const { container } = render(
    <Tile>
      <Tile.Name name='test-name' />
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture>
          <img src='image.png' />
        </Tile.ThumbnailPicture>
      </Tile.ThumbnailArea>
    </Tile>,
  );
  expect(container.querySelector('.iui-tile-thumbnail')).toBeTruthy();
  const img = container.querySelector('.iui-thumbnail-icon')
    ?.firstChild as HTMLImageElement;
  expect(img).toBeTruthy();
  expect(img.src).toContain('image.png');
});

it('should render thumbnail correctly (svg)', () => {
  const { container } = render(
    <Tile>
      <Tile.Name name='test-name' />
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture>
          <SvgPlaceholder />
        </Tile.ThumbnailPicture>
      </Tile.ThumbnailArea>
    </Tile>,
  );
  const { container: placeholderIcon } = render(<SvgPlaceholder />);
  expect(container.querySelector('.iui-tile-thumbnail svg')).toBeTruthy();
  const svg = container.querySelector('svg') as SVGSVGElement;
  expect(svg).toBeTruthy();
  expect(svg).toEqual(placeholderIcon.firstChild);
});

it('should work with buttons correctly', () => {
  const onClickMock = jest.fn();

  const { container, getByText } = render(
    <Tile>
      <Tile.Name name='test-name' />
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture>
          <SvgPlaceholder />
        </Tile.ThumbnailPicture>
      </Tile.ThumbnailArea>
      <Tile.Buttons>
        <Button key={1} onClick={() => onClickMock(1)}>
          test-button 1
        </Button>
        <Button key={2} onClick={() => onClickMock(2)}>
          test-button 2
        </Button>
      </Tile.Buttons>
    </Tile>,
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
    <Tile>
      <Tile.Name name='test-name' />
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture>
          <SvgPlaceholder />
        </Tile.ThumbnailPicture>
        <Tile.TypeIndicator>
          <IconButton onClick={() => onClickMock('left')}>
            <SvgPlaceholder />
          </IconButton>
        </Tile.TypeIndicator>
        <Tile.QuickAction>
          <IconButton onClick={() => onClickMock('right')}>
            <SvgPlaceholder />
          </IconButton>
        </Tile.QuickAction>
      </Tile.ThumbnailArea>
    </Tile>,
  );
  expect(container.querySelector('.iui-tile')).toBeTruthy();

  const leftIcon = container.querySelector('.iui-tile-thumbnail-type-indicator')
    ?.firstChild?.firstChild as HTMLButtonElement;
  expect(leftIcon).toBeTruthy();
  leftIcon.click();
  expect(onClickMock).toBeCalledWith('left');

  const rightIcon = container.querySelector('.iui-tile-thumbnail-quick-action')
    ?.firstChild?.firstChild as HTMLButtonElement;
  expect(rightIcon).toBeTruthy();
  rightIcon.click();
  expect(onClickMock).toBeCalledWith('right');
});

it('should render options dropdown correctly', async () => {
  const onClickMock = jest.fn();
  const { container } = render(
    <Tile>
      <Tile.Name name='test-name' />
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture>
          <SvgPlaceholder />
        </Tile.ThumbnailPicture>
      </Tile.ThumbnailArea>
      <Tile.MoreOptions>
        <MenuItem key={1} value={'v1'} onClick={(value) => onClickMock(value)}>
          Item 1
        </MenuItem>
        <MenuItem key={2} value={'v2'} onClick={(value) => onClickMock(value)}>
          Item 1
        </MenuItem>
      </Tile.MoreOptions>
    </Tile>,
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
    <Tile className='test-class' style={{ height: '300px' }}>
      <Tile.Name name='test-name' />
      <Tile.ThumbnailArea>
        <Tile.ThumbnailPicture>
          <SvgPlaceholder />
        </Tile.ThumbnailPicture>
      </Tile.ThumbnailArea>
      <Tile.ContentArea>
        <span className='test-child'>test-content</span>
      </Tile.ContentArea>
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
  const { container } = render(
    <Tile isActionable>
      <Tile.Name name='test-name' />
    </Tile>,
  );
  expect(container.querySelector('.iui-tile.iui-actionable')).toBeTruthy();
});

it.each(['positive', 'warning', 'negative'] as const)(
  'should render tile with %s status',
  (status) => {
    const { container } = render(
      <Tile status={status}>
        <Tile.Name name='test-name' />
      </Tile>,
    );
    expect(container.querySelector(`.iui-tile.iui-${status}`)).toBeTruthy();
  },
);

it('should render tile with loading status', () => {
  const { container } = render(
    <Tile isLoading={true}>
      <Tile.Name name='test-name' />
    </Tile>,
  );
  expect(container.querySelector(`.iui-tile.iui-loading`)).toBeTruthy();
});

it('should render tile with disabled status', () => {
  const { container } = render(
    <Tile isDisabled={true}>
      <Tile.Name name='test-name' />
    </Tile>,
  );
  const tile = container.querySelector(`.iui-tile`) as HTMLElement;
  expect(tile).toBeTruthy();
  expect(tile).toHaveAttribute('aria-disabled', 'true');
});
