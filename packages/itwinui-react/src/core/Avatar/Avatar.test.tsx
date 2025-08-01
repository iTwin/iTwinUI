/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from '@testing-library/react';
import { SvgUser } from '@itwin/itwinui-icons-react';

import { defaultStatusTitles, Avatar, type AvatarStatus } from './Avatar.js';

function assertBaseElements({
  size = 'small',
  backgroundColor = '',
  abbreviation = 'TR',
} = {}) {
  const avatar = screen.getByText(abbreviation);
  if (size !== 'medium') {
    expect(avatar).toHaveAttribute('data-iui-size', size);
  } else {
    expect(avatar).not.toHaveAttribute('data-iui-size');
  }
  expect(avatar).toHaveClass(`iui-avatar`);

  if (backgroundColor) {
    expect(avatar.style.backgroundColor).toEqual(backgroundColor);
  }

  return avatar;
}

it('should render with given abbreviation', () => {
  render(<Avatar abbreviation='TR' />);
  assertBaseElements();
});

it('should render with given abbreviation (longer than 2 chars)', () => {
  render(<Avatar abbreviation='TRivers' />);
  assertBaseElements();
});

it.each(['small', 'medium', 'large', 'x-large'] as Array<
  'small' | 'medium' | 'large' | 'x-large'
>)('should render with %s size', (size) => {
  render(<Avatar abbreviation='TR' size={size} />);
  assertBaseElements({ size });
});

it.each(['', 'online', 'busy', 'away', 'offline'] as Array<AvatarStatus>)(
  'should render with the %s status',
  (status) => {
    render(<Avatar abbreviation='TR' status={status} />);
    const avatar = assertBaseElements();

    if (status) {
      expect(avatar).toHaveAttribute('data-iui-status', status);
      expect(avatar).toHaveTextContent(`TR${defaultStatusTitles[status]}`);
    }
  },
);

it('should render with translated statuses', () => {
  render(
    <Avatar
      abbreviation='TR'
      status='offline'
      translatedStatusTitles={{
        ...defaultStatusTitles,
        offline: 'test-offline',
      }}
    />,
  );

  const avatar = assertBaseElements();
  expect(avatar).toHaveAttribute('data-iui-status', 'offline');
  expect(avatar).toHaveTextContent(`TRtest-offline`);
});

it('should render with custom color', () => {
  render(<Avatar abbreviation='TR' backgroundColor={'pink'} />);
  assertBaseElements({ backgroundColor: 'pink' });
});

it('renders with image', () => {
  const { container } = render(<Avatar image={<img />} />);
  const img = container.querySelector('img');
  expect(img).toBeTruthy();
});

it('image prop also supports passing <svg>', () => {
  const {
    container: { firstChild: userIcon },
  } = render(<SvgUser />);

  const { container } = render(<Avatar image={<SvgUser />} />);
  expect(container.querySelector('.iui-avatar > svg')).toEqual(userIcon);
});

it('should render with custom className', () => {
  const { container } = render(
    <Avatar abbreviation='TR' className='test-classname' />,
  );

  const avatarContainer = container.querySelector('.test-classname');
  expect(avatarContainer).toBeTruthy();
});
