export type ClassNameProps = {
  /** Custom CSS class name */
  className?: string;
};

export type CommonProps = {
  /** Custom CSS style properties */
  style?: React.CSSProperties;
} & ClassNameProps;
