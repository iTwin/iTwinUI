/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { render, screen } from '@testing-library/react';

import { defaultStatusTitles, Avatar, AvatarStatus } from './Avatar';

function assertBaseElements(size = 'small', backgroundColor = 'white') {
  const avatarContainer = screen.getByTitle('Terry Rivers');
  expect(avatarContainer.className).toEqual(
    `iui-avatar${size !== 'medium' ? ` iui-${size}` : ''}`,
  );

  const abbreviation = screen.getByText('TR');
  expect(abbreviation.className).toEqual('iui-initials');
  expect(abbreviation.style.backgroundColor).toEqual(backgroundColor);
}

it('should render with given abbreviation', () => {
  render(<Avatar abbreviation='TR' title='Terry Rivers' />);
  assertBaseElements();
});

it('should render with given abbreviation (longer than 2 chars)', () => {
  render(<Avatar abbreviation='TRivers' title='Terry Rivers' />);
  assertBaseElements();
});

it.each(['small', 'medium', 'large', 'x-large'] as Array<
  'small' | 'medium' | 'large' | 'x-large'
>)('should render with %s size', (size) => {
  render(<Avatar abbreviation='TR' title='Terry Rivers' size={size} />);
  assertBaseElements(size);
});

it.each(['', 'online', 'busy', 'away', 'offline'] as Array<AvatarStatus>)(
  'should render with the %s status',
  (status) => {
    const { container } = render(
      <Avatar abbreviation='TR' title='Terry Rivers' status={status} />,
    );
    assertBaseElements();
    const statusContainer = container.querySelector(
      '.iui-status',
    ) as HTMLElement;
    if (!status) {
      expect(statusContainer).toBeFalsy();
      return;
    }
    expect(statusContainer).toBeTruthy();
    expect(statusContainer.classList).toContain(`iui-${status}`);
    expect(statusContainer.getAttribute('title')).toEqual(
      defaultStatusTitles[status],
    );
  },
);

it('should render with translated statuses', () => {
  const { container } = render(
    <Avatar
      abbreviation='TR'
      title='Terry Rivers'
      status='offline'
      translatedStatusTitles={{
        ...defaultStatusTitles,
        offline: 'test-offline',
      }}
    />,
  );

  const statusContainer = container.querySelector('.iui-status') as HTMLElement;
  expect(statusContainer.getAttribute('title')).toEqual('test-offline');
});

it('should render with custom color', () => {
  render(
    <Avatar abbreviation='TR' title='Terry Rivers' backgroundColor={'pink'} />,
  );
  assertBaseElements(undefined, 'pink');
});

it('renders with image', () => {
  const { container } = render(<Avatar image={<img />} title='Terry Rivers' />);

  const avatarContainer = screen.getByTitle('Terry Rivers');
  expect(avatarContainer.className).toEqual('iui-avatar iui-small');
  const abbreviation = container.querySelector('.iui-initials');
  expect(abbreviation).toBeFalsy();
  const img = container.querySelector('img');
  expect(img).toBeTruthy();
});

it('should render with custom className', () => {
  const { container } = render(
    <Avatar
      abbreviation='TR'
      title='Terry Rivers'
      className='test-classname'
    />,
  );

  const avatarContainer = container.querySelector('.test-classname');
  expect(avatarContainer).toBeTruthy();
});
