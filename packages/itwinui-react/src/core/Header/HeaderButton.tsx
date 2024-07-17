/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from 'react';
import type { ButtonProps } from '../Buttons/Button.js';

import { Box } from '../../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import { HeaderSplitButton } from './HeaderSplitButton.js';
import { HeaderDropdownButton } from './HeaderDropdownButton.js';
import type { DropdownButtonProps } from '../Buttons/DropdownButton.js';
import { HeaderBasicButton } from './HeaderBasicButton.js';

type HeaderButtonProps = {
  /**
   * Main label of the header button.
   */
  name: React.ReactNode;
  /**
   * Description shown below the main label, will be hidden in `Header` slim mode.
   */
  description?: React.ReactNode;
  /**
   * Is the menu active.
   * @default false
   */
  isActive?: boolean;
  /**
   * Modify the native `name` attribute of the `<button>` element.
   */
  htmlName?: string;
} & Partial<Pick<DropdownButtonProps, 'menuItems'>> &
  Pick<ButtonProps, 'startIcon' | 'endIcon'>;

/**
 * Header button that handles slim state of the `Header` it's in.
 * When in slim mode, will only display the name and reduce icon size.
 * Will display an arrow on the right if `menuItems` prop is provided.
 * @example
 * <HeaderButton name='Project A' description='0n00434' menuItems={...} />
 * <HeaderButton name='Project B' description='0n00434' startIcon={<SvgImodelHollow />} />
 * <HeaderButton name='Project C' startIcon={<img style={{ objectFit: 'cover' }} src='project.png' />} />
 * <HeaderButton name='Project D' isActive />
 */
export const HeaderButton = React.forwardRef((props, ref) => {
  const {
    name,
    description,
    htmlName,
    isActive = false,
    startIcon,
    menuItems,
    disabled,
    ...rest
  } = props;

  const buttonProps = {
    startIcon: startIcon ? (
      <Box as='span' className='iui-header-breadcrumb-button-icon' aria-hidden>
        {startIcon}
      </Box>
    ) : null,
    children: (
      <Box as='span' className='iui-header-breadcrumb-button-text'>
        <Box as='span' className='iui-header-breadcrumb-button-text-label'>
          {name}
        </Box>
        {description && (
          <Box as='span' className='iui-header-breadcrumb-button-text-sublabel'>
            {description}
          </Box>
        )}
      </Box>
    ),
    ref: ref,
    disabled: disabled,
    name: htmlName,
    ...(!!menuItems && { menuItems }),
    ...rest,
  } as any;

  const headerButton =
    !!props.menuItems && !!props.onClick ? (
      <HeaderSplitButton {...buttonProps} />
    ) : !!props.menuItems ? (
      <HeaderDropdownButton {...buttonProps} />
    ) : (
      <HeaderBasicButton {...buttonProps} />
    );

  return (
    <Box
      as='li'
      className='iui-header-breadcrumb-item'
      aria-current={isActive ? 'location' : undefined}
      aria-disabled={disabled ? 'true' : undefined}
    >
      {headerButton}
    </Box>
  );
}) as PolymorphicForwardRefComponent<'button', HeaderButtonProps>;
if (process.env.NODE_ENV === 'development') {
  HeaderButton.displayName = 'HeaderButton';
}
