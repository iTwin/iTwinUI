/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { CSSTransition } from 'react-transition-group';
import { styles } from '../../styles.js';

export const WithCSSTransition = (
  props: Partial<React.ComponentPropsWithoutRef<typeof CSSTransition>> & {
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
      onEnter={(node: HTMLElement) => {
        node.style[`min${dimensionCamelCase}`] = 'initial';
        node.style[dimension] = '0px';
      }}
      onEntering={(node: HTMLElement) => {
        node.style[dimension] = `${expandedSize.current}px`;
      }}
      onEntered={(node: HTMLElement) => {
        node.style[`min${dimensionCamelCase}`] = '';
        node.style[dimension] = '';
      }}
      onExit={(node: HTMLElement) => {
        node.style[dimension] = `${expandedSize.current}px`;
      }}
      onExiting={(node: HTMLElement) => {
        node.style[`min${dimensionCamelCase}`] = 'initial';
        node.style[dimension] = '0px';
      }}
      classNames={{
        enter: styles['iui-enter'],
        enterActive: styles['iui-enter-active'],
        exit: styles['iui-exit'],
        exitActive: styles['iui-exit-active'],
      }}
      {...rest}
    >
      {React.isValidElement(children) ? (
        React.cloneElement(children as JSX.Element, {
          ref: (el: HTMLElement) => {
            if (el) {
              expandedSize.current = el.getBoundingClientRect()[dimension];
            }
          },
        })
      ) : (
        <></>
      )}
    </CSSTransition>
  );
};
