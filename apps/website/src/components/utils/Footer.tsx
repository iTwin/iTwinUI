/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

export default (props: React.ComponentProps<'footer'>) => {
  const currentYear = new Date().getFullYear();
  return <footer {...props}>© {currentYear} Bentley Systems, Inc</footer>;
};
