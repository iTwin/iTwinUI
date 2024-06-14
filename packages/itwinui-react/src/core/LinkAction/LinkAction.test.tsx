/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import { LinkBox, LinkAction } from './LinkAction.js';

it('should render LinkBox and LinkAction in its most basic state', () => {
  const { container } = render(
    <LinkBox data-testid='link-box'>
      <LinkAction href='#' data-testid='link-overlay'>
        Content
      </LinkAction>
    </LinkBox>,
  );

  const linkBox = container.querySelector('div') as HTMLElement;
  const linkAction = container.querySelector('a') as HTMLElement;

  expect(linkBox).toBeTruthy();
  expect(linkBox).toHaveClass('iui-link-box');
  expect(linkBox).toHaveAttribute('data-testid', 'link-box');

  expect(linkAction).toBeTruthy();
  expect(linkAction).toHaveClass('iui-link-action');
  expect(linkAction).toHaveAttribute('data-testid', 'link-overlay');
});

it.each(['implicit', 'explicit'])(
  'should render LinkAction as a button (%s)',
  (implicitOrExplicit) => {
    const as = implicitOrExplicit === 'implicit' ? undefined : 'button';

    const { container } = render(
      <LinkBox data-test-id='link-box'>
        <LinkAction as={as as 'button'} data-test-id='link-overlay'>
          Content
        </LinkAction>
      </LinkBox>,
    );
    expect(container.querySelector('div')).toHaveClass('iui-link-box');
    expect(container.querySelector('button')).toHaveClass('iui-link-action');
  },
);

it('should render LinkAction as a paragraph', () => {
  const { container } = render(
    <LinkBox as='p' data-test-id='link-box'>
      <LinkAction href='#' data-test-id='link-overlay'>
        Content
      </LinkAction>
    </LinkBox>,
  );
  expect(container.querySelector('p')).toHaveClass('iui-link-box');
  expect(container.querySelector('a')).toHaveClass('iui-link-action');
});
