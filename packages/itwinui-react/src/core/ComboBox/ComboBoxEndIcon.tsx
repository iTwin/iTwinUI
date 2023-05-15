/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import * as React from 'react';
import {
  useSafeContext,
  useMergedRefs,
  SvgCaretDownSmall,
  composeEventHandlers,
} from '../utils/index.js';
import { ComboBoxActionContext, ComboBoxRefsContext } from './helpers.js';

type ComboBoxEndIconProps = React.ComponentPropsWithoutRef<'span'> & {
  disabled?: boolean;
  isOpen?: boolean;
};

export const ComboBoxEndIcon = React.forwardRef(
  (props: ComboBoxEndIconProps, forwardedRef: React.Ref<HTMLSpanElement>) => {
    const {
      className,
      children,
      onClick: onClickProp,
      disabled,
      isOpen,
      ...rest
    } = props;
    const dispatch = useSafeContext(ComboBoxActionContext);
    const { toggleButtonRef } = useSafeContext(ComboBoxRefsContext);
    const refs = useMergedRefs(toggleButtonRef, forwardedRef);

    return (
      <span
        ref={refs}
        className={cx(
          'iui-end-icon',
          {
            'iui-actionable': !disabled,
            'iui-disabled': disabled,
            'iui-open': isOpen,
          },
          className,
        )}
        onClick={composeEventHandlers(onClickProp, () => {
          dispatch({ type: isOpen ? 'close' : 'open' });
        })}
        {...rest}
      >
        {children ?? <SvgCaretDownSmall aria-hidden />}
      </span>
    );
  },
);
ComboBoxEndIcon.displayName = 'ComboBoxEndIcon';
