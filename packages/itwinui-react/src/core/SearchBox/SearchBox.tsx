/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import cx from 'classnames';
import { InputProps } from '../Input';
import { Icon, InputFlexContainer, useTheme } from '../utils';
import { IconButton } from '../Buttons';
import { SvgSearch, SvgCloseSmall } from '@itwin/itwinui-icons-react';

export type SearchBoxProps =
  | ({
      /**
       *
       */
      expandable?: false;
      animateTo?: undefined;
    } & InputProps)
  | ({ expandable: true; animateTo?: 'left' | 'right' } & InputProps);

/**
 * // TODO:
 * Searchbox component.
 * Used for searches :)
 * @example
 * Example usages go here!
 */
export const SearchBox = (props: SearchBoxProps) => {
  const {
    size,
    expandable = false,
    animateTo = 'right',
    children,
    ...rest
  } = props;

  useTheme();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const searchIcon = () => {
    return isExpanded ? <SvgCloseSmall /> : <SvgSearch />;
  };

  const animatedVersion = () => {
    return (
      <>
        {animateTo === 'right' && (
          <IconButton
            styleType='borderless'
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {searchIcon()}
          </IconButton>
        )}
        {isExpanded && children}
        {animateTo === 'left' && (
          <IconButton
            styleType='borderless'
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {searchIcon()}
          </IconButton>
        )}
      </>
    );
  };

  const staticVersion = () => {
    return (
      <>
        <Icon>
          <SvgSearch />
        </Icon>
        {children}
      </>
    );
  };

  return (
    <InputFlexContainer
      className={cx({
        'iui-expandable-searchbox': expandable,
        'iui-animate-left': expandable && animateTo === 'left',
      })}
      aria-expanded={isExpanded}
      data-iui-size={size}
      {...rest}
    >
      {expandable ? animatedVersion() : staticVersion()}
    </InputFlexContainer>
  );
};

export default SearchBox;
