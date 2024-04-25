/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeContext } from '../../core/ThemeProvider/ThemeContext.js';
import { getDocument } from '../functions/dom.js';
import { useIsClient } from '../hooks/useIsClient.js';

export type PortalProps = {
  /**
   * Where should the element be portaled to?
   *
   * If true, it will portal into nearest ThemeContext.portalContainer.
   *
   * If false, it will not be portaled.
   *
   * Otherwise, it will portal to the element passed to `to`.
   *
   * If `to`/`to()` === `null`/`undefined`, the default behavior will be used (i.e. as if `portal` is not passed).
   *
   * @default true
   */
  portal?:
    | boolean
    | {
        to:
          | HTMLElement
          | null
          | undefined
          | (() => HTMLElement | null | undefined);
      };
};

// ----------------------------------------------------------------------------

/**
 * Helper component that portals children according to the following conditions:
 *   - renders null on server
 *   - if `portal` is set to true, renders into nearest ThemeContext.portalContainer
 *   - if `portal` is set to false, renders as-is without portal
 *   - otherwise renders into `portal.to` (can be an element or a function)
 *     - If `to`/`to()` === `null`/`undefined`, the default behavior will be used (i.e. as if `portal` is not passed).
 *     - E.g. `portal={{ to: () => document.querySelector('.may-not-exist') }}`.
 *
 * @private
 */
export const Portal = (props: React.PropsWithChildren<PortalProps>) => {
  const { portal = true, children } = props;

  const isClient = useIsClient();
  const portalTo = usePortalTo(portal);

  if (!isClient) {
    return null;
  }

  return portalTo ? ReactDOM.createPortal(children, portalTo) : children;
};

// ----------------------------------------------------------------------------

export const usePortalTo = (portal: NonNullable<PortalProps['portal']>) => {
  const themeInfo = React.useContext(ThemeContext);
  const defaultPortalTo = themeInfo?.portalContainer ?? getDocument()?.body;

  if (typeof portal === 'boolean') {
    return portal ? defaultPortalTo : null;
  }

  const portalTo = typeof portal.to === 'function' ? portal.to() : portal.to;
  return portalTo ?? defaultPortalTo;
};
