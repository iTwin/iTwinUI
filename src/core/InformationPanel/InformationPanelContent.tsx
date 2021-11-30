/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import cx from 'classnames';
import React from 'react';
import { CommonProps, useTheme } from '../utils';
import '@itwin/itwinui-css/css/information-panel.css';

export type InformationPanelContentProps = {
  /**
   * If set to 'inline', the label/input pairs will be shown on the same line.
   * The component handles the spacing and alignment automatically.
   *
   * @default 'default'
   */
  displayStyle?: 'default' | 'inline';
  /**
   * Content of the component.
   * Should ideally be pairs of `Label` and input components.
   */
  children: React.ReactNode;
} & Omit<CommonProps, 'title'>;

/**
 * The `InformationPanelContent` component should be used inside `InformationPanelBody`
 * to style rows of key/value pairs, where the key is ideally represented by a `Label` component
 * and the value can be any input element (including readonly inputs for non-modifiable fields).
 *
 * By default, the pairs are displayed of label and input are displayed  in separate lines,
 * but displayStyle can be set to 'inline' to show them in the same line with correct alignment.
 *
 * You can use multiple `InformationPanelContent` instances inside one `InformationPanelBody`; this is
 * useful when you want to show other content, e.g. separate headings for different sections of key/value pairs.
 *
 * @example
 * <InformationPanelContent displayStyle='inline'>
 *   <Label htmlFor='name-input'>File name</Label>
 *   <Input id='name-input' value='Alpha.mp3' />
 *
 *   <Label htmlFor='year-input'>Year</Label>
 *   <Input id='year-input' value='2021' />
 *
 *   <Label htmlFor='path-input'>Path</Label>
 *   <Input id='path-input' value='/Shared/Music/' />
 * </InformationPanelContent>
 */
export const InformationPanelContent = (
  props: InformationPanelContentProps,
) => {
  const { className, displayStyle = 'default', children, ...rest } = props;

  useTheme();

  return (
    <div
      className={cx(
        'iui-information-body-content',
        { 'iui-inline': displayStyle === 'inline' },
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default InformationPanelContent;
