/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type { JSX } from 'react';

import { Select } from '../Select/Select.js';
import type { SelectProps } from '../Select/Select.js';
import type { LabeledInputProps } from '../LabeledInput/LabeledInput.js';
import { StatusMessage } from '../StatusMessage/StatusMessage.js';
import { InputGrid } from '../InputGrid/InputGrid.js';
import { Label } from '../Label/Label.js';
import { Icon } from '../Icon/Icon.js';

export type LabeledSelectProps<T> = {
  /**
   * Label of the select.
   */
  label?: React.ReactNode;
  /**
   * Message below the select. Does not apply to 'inline' select.
   *
   * @example
   * <caption>strings</caption>
   * <LabeledSelect message='Positive Message' … />
   *
   * @example
   * <caption>Using StatusMessage for complete customization (e.g. icon)</caption>
   * <LabeledSelect
   *   status="positive"
   *   message={
   *     <StatusMessage status="positive" startIcon={<SvgStar />}>
   *       Help message
   *     </StatusMessage>
   *   }
   *   …
   * />
   */
  message?: React.ReactNode;
  /**
   * Status of the select.
   * @default ''
   */
  status?: 'positive' | 'warning' | 'negative';
  /**
   * @deprecated Pass a `<StatusMessage startIcon={svgIcon} />` to the `message` prop instead.
   *
   * Custom svg icon. Will override status icon if specified.
   */
  svgIcon?: JSX.Element;
  /**
   * If true, shows a red asterisk.
   *
   * Form submission is only disabled when using the `native` prop (i.e. `<LabeledSelect native>`).
   *
   * @default false
   */
  required?: boolean;
  /**
   * Pass props to wrapper element.
   */
  wrapperProps?: React.ComponentProps<typeof InputGrid>;
  /**
   * Passes properties for label.
   */
  labelProps?: React.ComponentProps<'div'>;
  /**
   * Passes properties for message content.
   */
  messageContentProps?: React.ComponentPropsWithRef<'div'>;
  /**
   * Passes properties for message icon.
   */
  messageIconProps?: React.ComponentProps<typeof Icon>;
} & Pick<LabeledInputProps, 'displayStyle'> &
  SelectProps<T> & {
    /**
     * LabeledSelect does not support `styleType`.
     */
    styleType?: never; // see: https://github.com/iTwin/iTwinUI/pull/1886#discussion_r1516839342
  };

/**
 * Labeled select component to select value from options.
 * @example
 * <LabeledSelect
 *   label='Select Label'
 *   options={[
 *     { value: 1, label: 'Item #1' },
 *     { value: 2, label: 'Item #2' },
 *     { value: 3, label: 'Item #3' },
 *   ]}
 *   message='Help Message'
 * />
 * <LabeledSelect
 *   label='Select Label'
 *   options={[
 *     { value: 1, label: 'Item #1' },
 *     { value: 2, label: 'Item #2' },
 *     { value: 3, label: 'Item #3' },
 *   ]}
 *   message='Positive Message'
 *   status='positive'
 * />
 * <LabeledSelect
 *   label='Select Label'
 *   options={[
 *     { value: 1, label: 'Item #1' },
 *     { value: 2, label: 'Item #2' },
 *     { value: 3, label: 'Item #3' },
 *   ]}
 *   message='Custom Message'
 *   svgIcon={<SvgCamera />}
 * />
 */
export const LabeledSelect = React.forwardRef(
  <T,>(
    props: LabeledSelectProps<T>,
    forwardedRef: React.ForwardedRef<HTMLElement>,
  ) => {
    const {
      className,
      disabled = false,
      label,
      message,
      status,
      svgIcon,
      displayStyle = 'default',
      style,
      required = false,
      wrapperProps,
      labelProps,
      messageContentProps,
      messageIconProps,
      ...rest
    } = props;

    return (
      <InputGrid
        labelPlacement={displayStyle}
        data-iui-status={status}
        {...wrapperProps}
      >
        {label && (
          <Label
            as='div'
            required={required}
            disabled={disabled}
            {...labelProps}
          >
            {label}
          </Label>
        )}
        <Select<T>
          disabled={disabled}
          className={className}
          style={style}
          {...{ required: props.native ? required : undefined }}
          {...rest}
          ref={forwardedRef}
          {...({ styleType: 'default' } as any)} // Never allow LabeledSelect to be borderless
        />
        {typeof message === 'string' ? (
          <StatusMessage
            status={status}
            startIcon={svgIcon}
            iconProps={messageIconProps}
            contentProps={messageContentProps}
          >
            {message}
          </StatusMessage>
        ) : (
          message
        )}
      </InputGrid>
    );
  },
) as <T>(
  props: LabeledSelectProps<T> & { ref?: React.ForwardedRef<HTMLElement> },
) => JSX.Element;
if (process.env.NODE_ENV === 'development') {
  (LabeledSelect as any).displayName = 'LabeledSelect';
}
