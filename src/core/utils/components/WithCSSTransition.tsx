/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export const WithCSSTransition = (
  props: Partial<CSSTransitionProps> & {
    children: JSX.Element;
    dimension?: 'height' | 'width';
  },
) => {
  const { in: visible, dimension = 'height', children, ...rest } = props;

  const expandedSize = React.useRef(0);

  const dimensionCamelCase = dimension === 'height' ? 'Height' : 'Width';

  return (
    <CSSTransition
      in={visible}
      timeout={200}
      unmountOnExit={true}
      onEnter={(node) => {
        node.style[`min${dimensionCamelCase}`] = 'initial';
        node.style[dimension] = '0px';
      }}
      onEntering={(node) => {
        node.style[dimension] = `${expandedSize.current}px`;
      }}
      onEntered={(node) => {
        node.style[`min${dimensionCamelCase}`] = '';
        node.style[dimension] = '';
      }}
      onExit={(node) => {
        node.style[dimension] = `${expandedSize.current}px`;
      }}
      onExiting={(node) => {
        node.style[`min${dimensionCamelCase}`] = 'initial';
        node.style[dimension] = '0px';
      }}
      classNames='iui'
      {...rest}
    >
      {React.cloneElement(children, {
        ref: (el: HTMLElement) => {
          if (el) {
            expandedSize.current = el.getBoundingClientRect()[dimension];
          }
        },
      })}
    </CSSTransition>
  );
};

export default WithCSSTransition;
