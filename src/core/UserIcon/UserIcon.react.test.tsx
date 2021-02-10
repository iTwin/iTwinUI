// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import React from 'react';
import { render, screen } from '@testing-library/react';

import { defaultStatusTitles, UserIcon, UserIconStatus } from './UserIcon';

function assertBaseElements(size = 'small', backgroundColor = 'white') {
  const userIconContainer = screen.getByTitle('Greg Bentley');
  expect(userIconContainer.className).toEqual(`iui-user-icons-${size}`);

  const abbreviation = screen.getByText('GB');
  expect(abbreviation.className).toEqual('iui-user-icons-initials');
  expect(abbreviation.style.backgroundColor).toEqual(backgroundColor);
}

it('should render with given abbreviation', () => {
  render(<UserIcon abbreviation='GB' title='Greg Bentley' />);
  assertBaseElements();
});

it('should render with given abbreviation (longer than 2 chars)', () => {
  render(<UserIcon abbreviation='GBentley' title='Greg Bentley' />);
  assertBaseElements();
});

it.each(['small', 'medium', 'large', 'x-large'] as Array<
  'small' | 'medium' | 'large' | 'x-large'
>)('should render with %s size', (size) => {
  render(<UserIcon abbreviation='GB' title='Greg Bentley' size={size} />);
  assertBaseElements(size);
});

it.each(['', 'online', 'busy', 'away', 'offline'] as Array<UserIconStatus>)(
  'should render with the %s status',
  (status) => {
    const { container } = render(
      <UserIcon abbreviation='GB' title='Greg Bentley' status={status} />,
    );
    assertBaseElements();
    const statusContainer = container.querySelector(
      '.iui-user-icons-status',
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
    <UserIcon
      abbreviation='GB'
      title='Greg Bentley'
      status='offline'
      translatedStatusTitles={{
        ...defaultStatusTitles,
        offline: 'test-offline',
      }}
    />,
  );

  const statusContainer = container.querySelector(
    '.iui-user-icons-status',
  ) as HTMLElement;
  expect(statusContainer.getAttribute('title')).toEqual('test-offline');
});

it('should render with custom color', () => {
  render(
    <UserIcon
      abbreviation='GB'
      title='Greg Bentley'
      backgroundColor={'pink'}
    />,
  );
  assertBaseElements(undefined, 'pink');
});

it('renders with image', () => {
  const { container } = render(
    <UserIcon
      image={
        <img src='https://prod-bentleycdn.azureedge.net/-/media/images/colleague-portraits/greg_bentley_gc1_1620_3896x4920.jpg?modified=20200504182215' />
      }
      title='Greg Bentley'
    />,
  );

  const userIconContainer = screen.getByTitle('Greg Bentley');
  expect(userIconContainer.className).toEqual('iui-user-icons-small');
  const abbreviation = container.querySelector('.iui-user-icons-initials');
  expect(abbreviation).toBeFalsy();
  const img = container.querySelector('img');
  expect(img).toBeTruthy();
});

it('should render with custom className', () => {
  const { container } = render(
    <UserIcon
      abbreviation='GB'
      title='Greg Bentley'
      className='test-classname'
    />,
  );

  const userIconContainer = container.querySelector('.test-classname');
  expect(userIconContainer).toBeTruthy();
});
