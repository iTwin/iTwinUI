/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render } from '@testing-library/react';

import { Avatar, AvatarGroup } from '../../core';

function generateAvatars(length: number) {
  const userNames = [
    'Terry Rivers',
    'Robin Mercer',
    'Morgan Vera',
    'Ace Cash',
    'Tanner Fraser',
    'Ashley Miles',
    'Jean Mullins',
    'Nico Triplett',
    'Drew Abel',
    'Kendall Simons',
    'Kennedy Gray',
    'Charlie Mayfield',
    'Peyton Pennington',
    'Justice Harrington',
    'Jessie Dodd',
  ];

  return Array(length)
    .fill(null)
    .map((_, index) => userNames[index % userNames.length])
    .map((name, index) => (
      <Avatar
        key={`${name}-${index}`}
        title={name}
        abbreviation={name
          .split(' ')
          .map((token) => token[0])
          .join('')}
      />
    ));
}

it('should render in its most basic state', () => {
  const { container } = render(<AvatarGroup>{generateAvatars(7)}</AvatarGroup>);
  const avatarGroup = container.querySelector(
    '.iui-avatar-list.iui-stacked',
  ) as HTMLElement;
  expect(avatarGroup).toBeTruthy();
  expect(avatarGroup.classList).not.toContain(`iui-animated`);

  expect(
    container.querySelectorAll(`.iui-avatar-list > .iui-avatar.iui-small`)
      .length,
  ).toBe(6);

  const avatarGroupCount = container.querySelectorAll(
    '.iui-avatar-list > .iui-avatar',
  );
  expect(avatarGroupCount.length).toBe(6);
  const countAvatar = container.querySelector(
    '.iui-avatar-count',
  ) as HTMLElement;
  expect(countAvatar.textContent).toBe('2');

  expect(avatarGroup.querySelectorAll('.iui-stroke').length).toBe(6);
  expect(avatarGroup.querySelectorAll('.iui-initials').length).toBe(6);
});

it('should render animated', () => {
  const { container } = render(
    <AvatarGroup iconSize='medium' animated={true}>
      {generateAvatars(7)}
    </AvatarGroup>,
  );
  expect(container.querySelector('.iui-avatar-list.iui-animated')).toBeTruthy();
});

it('should render without count avatar', () => {
  const { container } = render(
    <AvatarGroup iconSize='medium'>{generateAvatars(6)}</AvatarGroup>,
  );
  const avatarGroup = container.querySelector(
    '.iui-avatar-list.iui-stacked',
  ) as HTMLElement;
  expect(avatarGroup).toBeTruthy();
  expect(avatarGroup.classList).not.toContain(`iui-animated`);

  const avatarGroupCount = container.querySelectorAll(
    '.iui-avatar-list > .iui-avatar',
  );
  expect(avatarGroupCount.length).toBe(6);

  expect(container.querySelector('.iui-avatar-count')).toBeFalsy();

  expect(avatarGroup.querySelectorAll('.iui-stroke').length).toBe(6);
  expect(avatarGroup.querySelectorAll('.iui-initials').length).toBe(6);
});

it('should render different length', () => {
  const { container } = render(
    <AvatarGroup iconSize='medium' maxIcons={3}>
      {generateAvatars(7)}
    </AvatarGroup>,
  );
  const avatarGroup = container.querySelector(
    '.iui-avatar-list.iui-stacked',
  ) as HTMLElement;
  expect(avatarGroup).toBeTruthy();

  const avatarGroupCount = container.querySelectorAll(
    '.iui-avatar-list > .iui-avatar',
  );
  expect(avatarGroupCount.length).toBe(4);

  const countAvatar = container.querySelector(
    '.iui-avatar-count',
  ) as HTMLElement;
  expect(countAvatar.textContent).toBe('4');

  expect(avatarGroup.querySelectorAll('.iui-stroke').length).toBe(4);
  expect(avatarGroup.querySelectorAll('.iui-initials').length).toBe(4);
});

it('should render animated', () => {
  const { container } = render(
    <AvatarGroup iconSize='medium' animated={true}>
      {generateAvatars(7)}
    </AvatarGroup>,
  );
  expect(container.querySelector('.iui-avatar-list.iui-animated')).toBeTruthy();
});

it('should render many avatars', () => {
  const { container } = render(
    <AvatarGroup iconSize='medium'>{generateAvatars(105)}</AvatarGroup>,
  );
  expect(container.querySelector('.iui-avatar-list.iui-stacked')).toBeTruthy();
  expect(
    container.querySelectorAll('.iui-avatar-list > .iui-avatar').length,
  ).toBe(6);
  const countAvatar = container.querySelector(
    '.iui-avatar-count',
  ) as HTMLElement;
  expect(countAvatar.textContent).toBe('99+');
});

it('should render not stacked', () => {
  const { container } = render(
    <AvatarGroup iconSize='medium' stacked={false}>
      {generateAvatars(7)}
    </AvatarGroup>,
  );

  expect(container.querySelector('.iui-avatar-list.iui-stacked')).toBeFalsy();
});

it.each(['small', 'medium', 'large', 'x-large'] as Array<
  'small' | 'medium' | 'large' | 'x-large'
>)('should render with %s size', (size) => {
  const { container } = render(
    <AvatarGroup iconSize={size} stacked={false}>
      {generateAvatars(7)}
    </AvatarGroup>,
  );

  expect(
    container.querySelectorAll(
      `.iui-avatar-list > .iui-avatar${
        size !== 'medium' ? `.iui-${size}` : ''
      }`,
    ).length,
  ).toBe(6);
});

it('should render custom classname', () => {
  const { container } = render(
    <AvatarGroup iconSize='medium' className='custom-classname' stacked={false}>
      {generateAvatars(7)}
    </AvatarGroup>,
  );

  expect(
    container.querySelector('.iui-avatar-list.custom-classname'),
  ).toBeTruthy();
});

it('should render custom classname for count avatar', () => {
  const { container } = render(
    <AvatarGroup
      iconSize='medium'
      countIconProps={{ className: 'custom-classname' }}
      stacked={false}
    >
      {generateAvatars(7)}
    </AvatarGroup>,
  );

  expect(
    container.querySelector(
      '.iui-avatar-list > .iui-avatar-count.custom-classname',
    ),
  ).toBeTruthy();
});
