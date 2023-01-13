/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import type { AnyString } from '../types';
import '@itwin/itwinui-css/css/utils.css';

const sizeTokens = [
  '3xs',
  '2xs',
  'xs',
  's',
  'm',
  'l',
  'xl',
  '2xl',
  '3xl',
] as const;
type SizeToken = typeof sizeTokens[number];

const getValueForToken = (token: string) => {
  if (sizeTokens.includes(token as SizeToken)) {
    return `var(--iui-size-${token})`;
  }
  return token;
};

export type FlexProps = {
  /**
   * Value of the `display` property.
   * @default 'flex'
   */
  display?: 'flex' | 'inline-flex';
  /**
   * Value of the `justify-content` property.
   */
  justifyContent?: React.CSSProperties['justifyContent'];
  /**
   * Value of the `align-items` property. Defaults to 'center' but you
   * might want to use 'flex-start' in some cases.
   * @default 'center'
   */
  alignItems?: React.CSSProperties['alignItems'];
  /**
   * Value of the `gap` property.
   */
  gap?: SizeToken | `${SizeToken} ${SizeToken}` | AnyString;
  /**
   * Value of the `direction` property.
   * @default 'row'
   */
  direction?: React.CSSProperties['flexDirection'];
} & React.ComponentProps<'div'>;

/**
 * A utility component for working with flexbox and .
 */
export const Flex = (props: FlexProps) => {
  const {
    display,
    direction,
    justifyContent,
    alignItems,
    gap,
    className,
    style,
    ...rest
  } = props;

  const gapValue = gap ? gap.split(' ').map(getValueForToken) : undefined;

  return (
    <div
      className={cx('iui-flex', className)}
      style={
        {
          '--iui-flex-display': display,
          '--iui-flex-direction': direction,
          '--iui-flex-justify': justifyContent,
          '--iui-flex-align': alignItems,
          '--iui-flex-gap': gapValue,
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    />
  );
};

Flex.Spacer = (props: FlexSpacerProps) => {
  return <div className='iui-flex-spacer' {...props} />;
};
type FlexSpacerProps = React.ComponentProps<'div'>;

Flex.Item = (props: FlexItemProps) => {
  return <div className='iui-flex-item' {...props} />;
};
type FlexItemProps = React.ComponentProps<'div'>;

export default Flex;
