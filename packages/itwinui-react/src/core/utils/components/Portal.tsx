/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ThemeContext } from '../../ThemeProvider/ThemeContext.js';
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
   * If `to === undefined` (or `to() === undefined`), default behavior will be used (i.e. as if `portal = undefined`).
   *
   * @default true
   */
  portal?:
    | boolean
    | {
        to: HTMLElement | undefined | (() => HTMLElement | undefined);
      };
};

// ----------------------------------------------------------------------------

/**
 * Helper component that portals children according to the following conditions:
 *   - renders null on server
 *   - if `portal` is set to true, renders into nearest ThemeContext.portalContainer
 *   - if `portal` is set to false, renders as-is without portal
 *   - otherwise renders into `portal.to` (can be an element or a function)
 *     - If `to === undefined` (or `to() === undefined`), default behavior will be used (i.e. as if `portal = undefined`).
 *     - E.g. `portal={{ to: () => document.querySelector('.may-not-exist') }}`.
 *
 * @private
 */
export const Portal = (props: React.PropsWithChildren<PortalProps>) => {
  const { portal: portalProp = true, children } = props;

  const portal = React.useMemo(() => {
    // Handle cases where `portal.to` or `portal.to()` is undefined
    if (typeof portalProp === 'object' && 'to' in portalProp) {
      // E.g. portalProp.to = () => document.querySelector('.may-not-exist')
      if (
        typeof portalProp.to === 'function' &&
        portalProp.to() === undefined
      ) {
        return true;
      }

      // E.g. portalProp.to = document.querySelector('.may-not-exist')
      if (typeof portalProp.to !== 'function' && portalProp.to === undefined) {
        return true;
      }
    }

    return portalProp;
  }, [portalProp]);

  const isClient = useIsClient();
  const portalTo = usePortalTo(portal);

  if (!isClient) {
    return null;
  }

  return portalTo ? ReactDOM.createPortal(children, portalTo) : children;
};

// ----------------------------------------------------------------------------

const usePortalTo = (portal: NonNullable<PortalProps['portal']>) => {
  const themeInfo = React.useContext(ThemeContext);

  if (typeof portal === 'boolean') {
    return portal ? themeInfo?.portalContainer ?? getDocument()?.body : null;
  }

  return typeof portal.to === 'function' ? portal.to() : portal.to;
};
