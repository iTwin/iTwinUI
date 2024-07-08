/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import cx from 'classnames';
import { useOverflow, useMergedRefs, Box } from '../../utils/index.js';
import type {
  AnyString,
  PolymorphicForwardRefComponent,
} from '../../utils/index.js';
import {
  Composite,
  CompositeItem,
  FloatingDelayGroup,
} from '@floating-ui/react';

// ----------------------------------------------------------------------------

/** This context is used for letting descendant IconButtons know the ButtonGroup's orientation. */
export const ButtonGroupContext = React.createContext<string | undefined>(
  undefined,
);
ButtonGroupContext.displayName = 'ButtonGroupContext';

// ----------------------------------------------------------------------------

type ButtonGroupProps = {
  /**
   * Buttons in the ButtonGroup.
   */
  children: React.ReactNode;
  /**
   * If specified, this prop will be used to show a custom button when overflow happens,
   * i.e. when there is not enough space to fit all the buttons.
   *
   * Expects a function that takes the index of the first button that is overflowing (i.e. hidden)
   * and returns the `ReactNode` to render.
   *
   * The placement of this button can be controlled using the `overflowPlacement` prop.
   */
  overflowButton?: (firstOverflowingIndex: number) => React.ReactNode;
  /**
   * If `overflowButton` is specified, should it placed at the start or the end?
   * @default 'end'
   */
  overflowPlacement?: 'start' | 'end';
  /**
   * Should the buttons be placed in a horizontal or vertical layout?
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * ARIA role for the ButtonGroup.
   *
   * If set to toolbar', it will automatically support arrow-key navigation.
   *
   * **Note**: `role="toolbar"` should not be used when the ButtonGroup contains
   * non-button elements (such as inputs).
   */
  role?: 'toolbar' | AnyString;
};

/**
 * Group buttons together for common actions.
 * Handles responsive overflow when the `overflowButton` prop is specified.
 *
 * @example
 * <ButtonGroup role="toolbar">
 *   <IconButton>
 *     <SvgAdd />
 *   </IconButton>
 *   <IconButton>
 *     <SvgEdit />
 *   </IconButton>
 * </ButtonGroup>
 *
 * @example
 * const buttons = [...Array(10)].map((_, index) => <IconButton><SvgPlaceholder /></IconButton>);
 * <ButtonGroup
 *   overflowButton={(overflowStart) => <DropdownMenu menuItems={(close) =>
 *     [...Array(buttons.length - overflowStart + 1)].map((_, index) => (
 *       <MenuItem icon={<SvgPlaceholder />} onClick={close}>Button #{overflowStart + index}</MenuItem>
 *     ))
 *   }>
 *     <IconButton><SvgMore /></IconButton>
 *   </DropdownMenu>}
 * >
 *   {buttons}
 * </ButtonGroup>
 */
export const ButtonGroup = React.forwardRef((props, forwardedRef) => {
  const {
    children: childrenProp,
    overflowButton,
    overflowPlacement = 'end',
    orientation = 'horizontal',
    ...rest
  } = props;

  const children = React.useMemo(() => {
    if (props.role !== 'toolbar') {
      return childrenProp;
    }

    return React.Children.map(childrenProp, (child, index) =>
      React.isValidElement(child) ? (
        <CompositeItem key={index} render={child} />
      ) : (
        child
      ),
    );
  }, [childrenProp, props.role]);

  const node = overflowButton ? (
    <OverflowGroup
      orientation={orientation}
      overflowButton={overflowButton}
      overflowPlacement={overflowPlacement}
      ref={forwardedRef}
      {...rest}
    >
      {children}
    </OverflowGroup>
  ) : (
    <BaseGroup orientation={orientation} ref={forwardedRef} {...rest}>
      {children}
    </BaseGroup>
  );

  return (
    <FloatingDelayGroup delay={{ open: 50, close: 250 }}>
      <ButtonGroupContext.Provider value={orientation}>
        {props.role === 'toolbar' ? (
          <Composite
            orientation={orientation}
            render={node}
            disabledIndices={[]}
          />
        ) : (
          node
        )}
      </ButtonGroupContext.Provider>
    </FloatingDelayGroup>
  );
}) as PolymorphicForwardRefComponent<'div', ButtonGroupProps>;

// ----------------------------------------------------------------------------

const BaseGroup = React.forwardRef((props, forwardedRef) => {
  const { orientation, className, ...rest } = props;

  return (
    <Box
      className={cx('iui-button-group', className)}
      data-iui-orientation={
        orientation === 'vertical' ? orientation : undefined
      }
      ref={forwardedRef}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<
  'div',
  Pick<ButtonGroupProps, 'orientation'>
>;

// ----------------------------------------------------------------------------

const OverflowGroup = React.forwardRef((props, forwardedRef) => {
  const {
    children: childrenProp,
    orientation,
    overflowButton,
    overflowPlacement,
    ...rest
  } = props;

  const items = React.useMemo(
    () => React.Children.toArray(childrenProp).filter(Boolean),
    [childrenProp],
  );

  const [overflowRef, visibleCount] = useOverflow(
    items.length,
    !overflowButton,
    orientation,
    undefined,
  );

  return (
    <BaseGroup
      orientation={orientation}
      {...rest}
      className={cx(
        {
          'iui-button-group-overflow-x':
            !!overflowButton && orientation === 'horizontal',
        },
        props.className,
      )}
      ref={useMergedRefs(forwardedRef, overflowRef)}
    >
      {(() => {
        if (!(visibleCount < items.length)) {
          return items;
        }

        const overflowStart =
          overflowPlacement === 'start'
            ? items.length - visibleCount
            : visibleCount - 1;

        return (
          <>
            {overflowButton &&
              overflowPlacement === 'start' &&
              overflowButton(overflowStart)}

            {overflowPlacement === 'start'
              ? items.slice(overflowStart + 1)
              : items.slice(0, Math.max(0, overflowStart))}

            {overflowButton &&
              overflowPlacement === 'end' &&
              overflowButton(overflowStart)}
          </>
        );
      })()}
    </BaseGroup>
  );
}) as PolymorphicForwardRefComponent<
  'div',
  Pick<
    ButtonGroupProps,
    'children' | 'orientation' | 'overflowButton' | 'overflowPlacement'
  >
>;
