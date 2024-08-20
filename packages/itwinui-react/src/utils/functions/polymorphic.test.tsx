/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render } from '@testing-library/react';
import { polymorphic } from './polymorphic.js';
import type { PolymorphicForwardRefComponent } from '../props.js';

it('should work when called directly', () => {
  const MyDiv1 = polymorphic.div('my-div1');
  const MyDiv2 = polymorphic.div('my-div2');
  const MyDiv = polymorphic(
    MyDiv1,
    MyDiv2,
  ) as PolymorphicForwardRefComponent<'div'>;

  const { container: container1 } = render(<MyDiv data-testid='foo'>🍏</MyDiv>);
  const el1 = container1.querySelector('div') as HTMLElement;
  expect(el1).toHaveClass('my-div1', 'my-div2');
  expect(el1).toHaveTextContent('🍏');
  expect(el1).toHaveAttribute('data-testid', 'foo');

  const { container: container2 } = render(
    <MyDiv as='span' data-testid='bar'>
      🥭
    </MyDiv>,
  );
  const el2 = container2.querySelector('span') as HTMLElement;
  expect(el2).toHaveClass('my-div1', 'my-div2');
  expect(el2).toHaveTextContent('🥭');
  expect(el2).toHaveAttribute('data-testid', 'bar');
});

it('should work when called as property', () => {
  const MyButton = polymorphic.button('my-button');

  const { container: container1 } = render(
    <MyButton data-testid='foo'>🍏</MyButton>,
  );
  const el1 = container1.querySelector('button.my-button') as HTMLElement;
  expect(el1).toHaveTextContent('🍏');
  expect(el1).toHaveAttribute('data-testid', 'foo');

  // eslint-disable-next-line -- href should produce error on button
  // @ts-expect-error
  <MyButton href='/foo'>🍏</MyButton>;

  const { container: container2 } = render(
    <MyButton as='a' data-testid='bar' href='#'>
      🥭
    </MyButton>,
  );
  const el2 = container2.querySelector('a.my-button') as HTMLElement;
  expect(el2).toHaveTextContent('🥭');
  expect(el2).toHaveAttribute('data-testid', 'bar');
  expect(el2).toHaveAttribute('href', '#');
});

it('should work with attributes', () => {
  const MyButton = polymorphic.button('my-button', {
    type: 'button',
    className: 'from-attrs',
  });

  const { container } = render(<MyButton className='from-props'>🍌</MyButton>);
  const el = container.querySelector('button.my-button') as HTMLElement;
  expect(el).toHaveTextContent('🍌');
  expect(el).toHaveAttribute('type', 'button');
  expect(el).toHaveClass('from-attrs from-props');
});

it('should set tabIndex for button, a, and checkbox input', () => {
  const MyButton = polymorphic.button('');
  const MyAnchor = polymorphic.a('');
  const MyCheckbox = polymorphic.input('', { type: 'checkbox' });

  const { container } = render(
    <>
      <MyButton>🍇</MyButton>
      <MyAnchor>🥕</MyAnchor>
      <MyCheckbox />
    </>,
  );

  expect(container.querySelector('button')).toHaveAttribute('tabindex', '0');
  expect(container.querySelector('a')).toHaveAttribute('tabindex', '0');
  expect(container.querySelector('input')).toHaveAttribute('tabindex', '0');
});
