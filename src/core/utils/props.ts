// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
export type ClassNameProps = {
  /**
   * Custom CSS class name
   */
  className?: string;
};

export type CommonProps = {
  /**
   * Custom CSS style properties
   */
  style?: React.CSSProperties;
  /**
   * HTML title attribute
   */
  title?: string;
} & ClassNameProps;
