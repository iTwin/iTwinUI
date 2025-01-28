/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import {
  Box,
  InputWithIcon,
  cloneElementWithRef,
  useId,
} from '../../utils/index.js';
import cx from 'classnames';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { Label } from '../Label/Label.js';
import { Input } from '../Input/Input.js';
import { Textarea } from '../Textarea/Textarea.js';
import { StatusMessage } from '../StatusMessage/StatusMessage.js';
import { InputWithDecorations } from '../InputWithDecorations/InputWithDecorations.js';
import { ComboBox } from '../ComboBox/ComboBox.js';
import { Select } from '../Select/Select.js';

type InputGridOwnProps = {
  /**
   * Set display style of label.
   * Supported values:
   * - 'default' - label appears above input.
   * - 'inline' - appears in the same line as input.
   * @default 'default'
   */
  labelPlacement?: 'default' | 'inline';
};

//-------------------------------------------------------------------------------

/**
 * InputGrid component is used to display form fields (input, textarea, select)
 * with label and/or status message
 *
 * Form fields are automatically associated with the label and status message for
 * better accessibility.
 *
 * @example
 * <InputGrid>
 *   <Label>This is a label</Label>
 *   <Input />
 *   <StatusMessage>This is a message</StatusMessage>
 * </InputGrid>
 */
export const InputGrid = React.forwardRef((props, ref) => {
  const {
    children: childrenProp,
    className,
    labelPlacement = undefined,
    ...rest
  } = props;

  const children = useChildrenWithIds(childrenProp);

  return (
    <Box
      className={cx('iui-input-grid', className)}
      data-iui-label-placement={labelPlacement}
      ref={ref}
      {...rest}
    >
      {children}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'div', InputGridOwnProps>;
if (process.env.NODE_ENV === 'development') {
  InputGrid.displayName = 'InputGrid';
}

//-------------------------------------------------------------------------------

/**
 * Ensures that label, input and message are properly associated
 * with each other, for accessibility purposes.
 *
 * - `Select` will be associated with label using `aria-labelledby`
 * - Other inputs will be associated with label using `htmlFor`
 * - Message will be associated with input/select using `aria-describedby`
 */
const useChildrenWithIds = (children: React.ReactNode) => {
  const { labelId, inputId, messageId } = useSetup(children);

  return React.useMemo(
    () =>
      React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return child;
        }

        if (child.type === Label || child.type === 'label') {
          return cloneElementWithRef(child, (child) => ({
            ...child.props,
            htmlFor: child.props.htmlFor || inputId,
            id: child.props.id || labelId,
          }));
        }

        if (child.type === StatusMessage) {
          return cloneElementWithRef(child, (child) => ({
            ...child.props,
            id: child.props.id || messageId,
          }));
        }

        if (
          isInput(child) ||
          child.type === InputWithDecorations ||
          child.type === InputWithIcon
        ) {
          return handleCloningInputs(child, {
            labelId,
            inputId,
            messageId,
          });
        }

        return child;
      }),
    [children, inputId, labelId, messageId],
  );
};

//-------------------------------------------------------------------------------

/**
 * Setup/prerequisite for `useChildrenWithIds` to gather information from children.
 *
 * @returns the following ids (prefers id from props, otherwise generates one)
 *  - `labelId`
 *  - `inputId`
 *  - `messageId`
 */
const useSetup = (children: React.ReactNode) => {
  const idPrefix = useId();

  let labelId: string | undefined;
  let inputId: string | undefined;
  let messageId: string | undefined;

  let hasLabel = false;
  let hasSelect = false;

  const findInputId = (child: React.ReactNode) => {
    if (!React.isValidElement<Record<string, any>>(child)) {
      return;
    }
    // ComboBox input id is passed through `inputProps`
    if (child.type === ComboBox) {
      return child.props.inputProps?.id || `${idPrefix}--input`;
    }
    // Select input id would be passed through `triggerProps`, but we don't even
    // need it because, unlike other inputs, it gets labelled using `aria-labelledby`
    else if (child.type !== Select) {
      return child.props.id || `${idPrefix}--input`;
    }
  };

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement<Record<string, any>>(child)) {
      return;
    }

    if (child.type === Label || child.type === 'label') {
      hasLabel = true;
      labelId ||= child.props.id || `${idPrefix}--label`;
    }

    if (child.type === StatusMessage) {
      messageId ||= child.props.id || `${idPrefix}--message`;
    }

    if (child.type === InputWithDecorations || child.type === InputWithIcon) {
      React.Children.forEach(child.props.children, (child) => {
        if (isInput(child)) {
          inputId ||= findInputId(child);
        }
      });
    } else if (isInput(child)) {
      inputId ||= findInputId(child);
    }

    if (child.type === Select) {
      hasSelect = true;
    }
  });

  return {
    labelId: hasSelect ? labelId : undefined, // only need labelId for Select
    inputId: hasLabel && !hasSelect ? inputId : undefined, // only need inputId for labeled inputs (not Select)
    messageId,
  } as const;
};

//-------------------------------------------------------------------------------

/**
 * Handles regular inputs, plus `InputWithDecorations`, `InputWithIcon`, `ComboBox` and `Select`.
 */
const handleCloningInputs = (
  child: React.ReactElement<any>,
  {
    labelId,
    inputId,
    messageId,
  }: {
    labelId: string | undefined;
    inputId: string | undefined;
    messageId: string | undefined;
  },
) => {
  const inputProps = (props: Record<string, unknown> = {}) => {
    // Concatenate aria-describedby from props and from StatusMessage
    const ariaDescribedBy = [props['aria-describedby'], messageId]
      .filter(Boolean)
      .join(' ');

    return {
      ...props,
      ...(child.type !== Select && { id: props.id || inputId }),
      'aria-describedby': ariaDescribedBy?.trim() || undefined,
    };
  };

  const cloneInput = (child: React.ReactElement<any>) => {
    if (child.type === ComboBox) {
      return cloneElementWithRef(child, (child) => ({
        inputProps: inputProps(child.props.inputProps),
      }));
    }

    if (child.type === Select) {
      return cloneElementWithRef(child, (child) => ({
        triggerProps: {
          ...{ 'aria-labelledby': labelId },
          ...inputProps(child.props.triggerProps),
        },
      }));
    }

    return cloneElementWithRef(child, (child) => inputProps(child.props));
  };

  if (child.type === InputWithDecorations || child.type === InputWithIcon) {
    return cloneElementWithRef(child, (child) => ({
      children: React.Children.map(
        child.props.children,
        (child: React.ReactNode) => {
          if (React.isValidElement(child) && isInput(child)) {
            return cloneInput(child);
          }
          return child;
        },
      ),
    }));
  }

  return cloneInput(child);
};

//-------------------------------------------------------------------------------

/** @returns true if `child` is a form element that can be associated with a label using id  */
const isInput = (child: React.ReactNode): boolean => {
  return (
    React.isValidElement(child) &&
    (child.type === 'input' ||
      child.type === 'textarea' ||
      child.type === 'select' ||
      child.type === Input ||
      child.type === Textarea ||
      child.type === InputWithDecorations.Input ||
      child.type === Select || // contains ComboBox.inputProps
      child.type === ComboBox) // contains Select.triggerProps
  );
};

//-------------------------------------------------------------------------------
