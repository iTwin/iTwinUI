/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import cx from 'classnames';
import React from 'react';
import {
  Button,
  ButtonProps,
  DropdownButton,
  DropdownButtonProps,
} from '../Buttons';

import { useTheme } from '../utils/hooks/useTheme';
import '@itwin/itwinui-css/css/header.css';
import { ClassNameProps } from '../utils/props';

export type HeaderButtonProps = {
  /**
   * Name.
   */
  name: React.ReactNode;
  /**
   * Description shown below the name, will be hidden in `Header` slim mode.
   */
  description?: React.ReactNode;
  /**
   * Is the menu active.
   * @default false
   */
  isActive?: boolean;
} & Omit<
  Partial<DropdownButtonProps> & Partial<ButtonProps>,
  'children' | 'styleType'
>;

/**
 * Header button that handles slim state of the `Header` it's in.
 * When in slim mode, will only display the name and reduce icon size.
 * Will display an arrow on the right if `menuItems` prop is provided.
 * @example
 * <HeaderButton name='Project A' description='0n00434' menuItems={...} />
 * <HeaderButton name='Project B' description='0n00434' startIcon={<SvgImodelHollow />} />
 * <HeaderButton name='Project C' startIcon={<img src='project.png' />} />
 * <HeaderButton name='Project D' isActive />
 */
export const HeaderButton = (props: HeaderButtonProps) => {
  const {
    name,
    description,
    isActive = false,
    menuItems,
    className,
    startIcon,
    ...rest
  } = props;
  const buttonProps: ButtonProps & { styleType: 'borderless' } = {
    startIcon: React.isValidElement<ClassNameProps>(startIcon)
      ? React.cloneElement(startIcon, {
          className: cx('iui-header-button-icon', startIcon.props.className),
        })
      : undefined,
    styleType: 'borderless',
    className: cx(
      'iui-header-button',
      {
        'iui-active': isActive,
      },
      className,
    ),
    'aria-current': isActive ? 'location' : undefined,
    children: (
      <>
        <div>{name}</div>
        {description && <div className='iui-description'>{description}</div>}
      </>
    ),
    ...rest,
  };
  useTheme();
  return menuItems ? (
    <DropdownButton {...buttonProps} menuItems={menuItems} />
  ) : (
    <Button {...buttonProps} />
  );
};

export default HeaderButton;
