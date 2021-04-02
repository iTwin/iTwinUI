/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
export type ClassNameProps = {
  /**
   * Custom CSS class name.
   */
  className?: string;
};

export type CommonProps = {
  /**
   * Custom CSS style properties.
   */
  style?: React.CSSProperties;
  /**
   * HTML title attribute.
   */
  title?: string;
} & ClassNameProps;
