/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import React from 'react';
import Tippy, { TippyProps } from '@tippyjs/react';
import { Placement, Instance } from 'tippy.js';
import { useMergedRefs } from './hooks/useMergedRefs';
export type PopoverInstance = Instance;

export type PopoverProps = {
  /**
   * Controlled flag for whether the popover is visible.
   */
  visible?: boolean;
  /**
   * Determines the events that cause the popover to show.
   * Should not be used when `visible` is set.
   * @see tippy.js {@link https://atomiks.github.io/tippyjs/v6/all-props/#trigger trigger}.
   */
  trigger?: string;
  /**
   * Placement of the popover content.
   * @default 'bottom-start'
   * @see tippy.js {@link https://atomiks.github.io/tippyjs/v6/all-props/#placement placement}.
   */
  placement?: Placement;
} & Omit<TippyProps, 'placement' | 'trigger' | 'visible'>;

/**
 * Wrapper around Tippy with pre-configured props and plugins (e.g. lazy mounting, focus, etc).
 * @private
 */
export const Popover = React.forwardRef((props: PopoverProps, ref) => {
  const [mounted, setMounted] = React.useState(false);

  const tippyRef = React.useRef(null);
  const refs = useMergedRefs(tippyRef, ref);

  // Plugin to allow lazy mounting. See https://github.com/atomiks/tippyjs-react#lazy-mounting
  const lazyLoad = {
    fn: () => ({
      onShow: () => setMounted(true),
      onHidden: () => setMounted(false),
    }),
  };

  // Plugin to remove tabindex from tippy, to prevent focus ring from unintentionally showing.
  const removeTabIndex = {
    fn: () => ({
      onCreate: (instance: Instance) => {
        instance.popper.firstElementChild?.removeAttribute('tabindex');
      },
    }),
  };

  const computedProps: Partial<TippyProps> = {
    allowHTML: true,
    animation: false,
    appendTo: 'parent',
    arrow: false,
    duration: 0,
    interactive: true,
    popperOptions: {
      strategy: 'fixed',
      modifiers: [{ name: 'flip' }],
    },
    role: undefined,
    offset: [0, 0],
    ...props,
    plugins: [lazyLoad, removeTabIndex, hideOnEsc, ...(props.plugins || [])],
  };

  if (props.render) {
    const render = props.render;
    computedProps.render = (...args) => (mounted ? render(...args) : '');
  } else {
    computedProps.content = mounted ? props.content : '';
  }

  return <Tippy {...computedProps} ref={refs} />;
});

export const hideOnEsc = {
  fn(instance: Instance) {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        instance.hide();
      }
    };

    return {
      onShow() {
        document.addEventListener('keydown', onKeyDown);
      },
      onHide() {
        document.removeEventListener('keydown', onKeyDown);
      },
    };
  },
};

export default Popover;
