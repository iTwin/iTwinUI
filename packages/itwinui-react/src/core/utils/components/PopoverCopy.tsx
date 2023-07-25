/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import cx from 'classnames';
import { ThemeContext } from '../../ThemeProvider/ThemeContext.js';
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  type Placement,
  size,
  autoUpdate,
} from '@floating-ui/react';
import ReactDOM from 'react-dom';
import {
  Box,
  getDocument,
  useMergedRefs,
  type PolymorphicForwardRefComponent,
  mergeRefs,
} from '../index.js';

type PopoverOptions = {
  placement?: Placement;
  visible?: boolean;
  onToggleVisible?: (open: boolean) => void;
};

function usePopover({
  placement = 'bottom',

  visible: controlledOpen,
  onToggleVisible,
}: PopoverOptions = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState<boolean>();

  const open = controlledOpen ?? uncontrolledOpen;
  const setOpen = onToggleVisible ?? setUncontrolledOpen;

  const data = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    whileElementsMounted: (referenceEl, floatingEl, update) =>
      autoUpdate(referenceEl, floatingEl, update, {
        animationFrame: true,
      }),
    middleware: [
      size({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        apply({ rects, elements }: any) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  });

  const context = data.context;

  const click = useClick(context, {
    enabled: controlledOpen == null,
  });
  const dismiss = useDismiss(context, {
    enabled: controlledOpen == null,
  });
  const role = useRole(context);

  const interactions = useInteractions([click, dismiss, role]);

  return React.useMemo(
    () => ({
      open,
      setOpen,
      ...interactions,
      ...data,
    }),
    [open, setOpen, interactions, data],
  );
}

type PopoverOwnProps = {
  /**
   * Controlled flag for whether the popover is visible.
   */
  visible?: boolean;
  /**
   * Placement of the popover content.
   * @default 'bottom-start'
   */
  placement?: Placement;
  content?: React.ReactNode;
  children?: React.ReactNode;
  applyBackground?: boolean;
  portal?: boolean | { to: HTMLElement };
};

/**
 * Uses [FloatingUI](https://floating-ui.com/).
 * @private
 */
export const PopoverCopy = React.forwardRef((props, ref) => {
  const {
    children,
    content,
    className,
    style,
    portal = true,
    applyBackground = false,
    placement,
    visible,
    onToggleVisible,
    ...rest
  } = props;
  const themeInfo = React.useContext(ThemeContext);

  const popover = usePopover({ placement, visible, onToggleVisible });

  const refs = useMergedRefs(popover.refs.setFloating, ref);
  const childrenRef =
    React.isValidElement(children) &&
    mergeRefs(
      popover.refs.setReference,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (children as any).ref,
    );

  const contentBox = (
    <Box
      className={cx('iui-popover', className)}
      data-iui-apply-background={applyBackground ? true : undefined}
      style={{ ...popover.floatingStyles, ...style }}
      {...popover.getFloatingProps(rest)}
      ref={refs}
    >
      {content}
    </Box>
  );

  const portalTo =
    typeof portal !== 'boolean'
      ? portal.to
      : portal
      ? themeInfo?.portalContainerRef?.current ?? getDocument()?.body
      : null;

  return (
    <>
      {React.isValidElement(children)
        ? React.cloneElement(
            children,
            popover.getReferenceProps({
              ref: childrenRef,
              ...(children as JSX.Element).props,
            }),
          )
        : null}
      {popover.open
        ? portalTo
          ? ReactDOM.createPortal(contentBox, portalTo)
          : contentBox
        : null}
    </>
  );
}) as PolymorphicForwardRefComponent<'div', PopoverOwnProps & PopoverOptions>;

export default PopoverCopy;
