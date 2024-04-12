/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { VisuallyHidden } from '../../core/VisuallyHidden/VisuallyHidden.js';
import { getWindow } from '../functions/index.js';

/**
 * Visually-hidden polite live region that automatically clears itself after 5 seconds.
 *
 * Should only be used for small updates and user-initiated actions (e.g. when _updating_ the selection),
 * otherwise it could cause too many announcements every time an instance of this component is mounted.
 *
 * @private
 */
export const AutoclearingHiddenLiveRegion = ({ text = '' }) => {
  const [maybeText, setMaybeText] = React.useState(text);

  React.useEffect(() => {
    setMaybeText(text);

    const timeout = getWindow()?.setTimeout(() => setMaybeText(''), 5000);
    return () => void getWindow()?.clearTimeout(timeout);
  }, [text]);

  return (
    <VisuallyHidden as='div' aria-live='polite' aria-atomic='true'>
      {maybeText}
    </VisuallyHidden>
  );
};
