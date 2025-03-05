/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import type { PolymorphicForwardRefComponent } from '../../utils/index.js';
import type { ExpandableBlockTriggerOwnProps } from './ExpandableBlockTrigger.js';
import { ExpandableBlockContent } from './ExpandableBlockContent.js';
import { ExpandableBlockTrigger } from './ExpandableBlockTrigger.js';
import { ExpandableBlockWrapper } from './ExpandableBlockWrapper.js';
import { ExpandableBlockEndIcon } from './ExpandableBlockEndIcon.js';
import { ExpandableBlockCaption } from './ExpandableBlockCaption.js';
import { ExpandableBlockExpandIcon } from './ExpandableBlockExpandIcon.js';
import { ExpandableBlockLabelArea } from './ExpandableBlockLabelArea.js';
import { ExpandableBlockTitle } from './ExpandableBlockTitle.js';

export type ExpandableBlockOwnProps = {
  /**
   * Status of the block.
   * When set, a colored status icon is shown at the end of the main text.
   */
  status?: 'positive' | 'negative' | 'warning' | 'informational';
  /**
   * Whether or not to show the block's content.
   * @default false
   */
  isExpanded?: boolean;
  /**
   * Whether or not to show the block's content from the start.
   * @default false
   */
  startExpanded?: boolean;
  /**
   * Callback function for toggling an expansion state.
   */
  onToggle?: (isExpanding: boolean) => void;
  /**
   * Content in the expandable block.
   */
  children: React.ReactNode;
  /**
   * Modify size of the ExpandableBlock.
   * @default 'default'
   */
  size?: 'default' | 'small';
  /**
   * Style of the ExpandableBlock.
   * Use 'borderless' to hide outline.
   * @default 'default'
   */
  styleType?: 'default' | 'borderless';
  /**
   * Disables ExpandableBlock.
   * @default false
   */
  disabled?: boolean;
};

type ExpandableBlockLegacyProps = {
  title?: React.ReactNode;
} & Pick<ExpandableBlockTriggerOwnProps, 'caption' | 'endIcon'>;

const ExpandableBlockComponent = React.forwardRef((props, forwardedRef) => {
  const { children, title, caption, endIcon, ...rest } = props;
  return (
    <ExpandableBlock.Wrapper {...rest} ref={forwardedRef}>
      <ExpandableBlock.Trigger
        label={title}
        caption={caption}
        endIcon={endIcon}
      />
      <ExpandableBlock.Content>{children}</ExpandableBlock.Content>
    </ExpandableBlock.Wrapper>
  );
}) as PolymorphicForwardRefComponent<
  'div',
  ExpandableBlockOwnProps & ExpandableBlockLegacyProps
>;
if (process.env.NODE_ENV === 'development') {
  ExpandableBlockComponent.displayName = 'ExpandableBlock';
}

/**
 * Expandable block with customizable Title, Caption, Content and EndIcon subcomponents.
 * @example
 *  <ExpandableBlock.Wrapper>
 *    <ExpandableBlock.Trigger>
 *      <ExpandableBlock.ExpandIcon/>
 *      <ExpandableBlock.LabelArea>
 *        <ExpandableBlock.Title/>
 *        <ExpandableBlock.Caption/>
 *      </ExpandableBlock.LabelArea>
 *      <ExpandableBlock.EndIcon/>
 *    </ExpandableBlock.Trigger>
 *    <ExpandableBlock.Content/>
 *  </ExpandableBlock.Wrapper>
 */
export const ExpandableBlock = Object.assign(ExpandableBlockComponent, {
  Wrapper: ExpandableBlockWrapper,
  /**
   * `Header` container that contains `ExpandIcon`, `LabelArea` and `EndIcon` subcomponents
   * @example
   * <ExpandableBlock.Trigger>
   *    <ExpandableBlock.ExpandIcon/>
   *    <ExpandableBlock.LabelArea/>
   *    <ExpandableBlock.EndIcon/>
   * </ExpandableBlock.Trigger>
   */
  Trigger: ExpandableBlockTrigger,
  /**
   * The expanding icon on the left of header
   */
  ExpandIcon: ExpandableBlockExpandIcon,
  /**
   * `LabelArea` subcomponent that contains `Title` and `Caption`
   * @example
   * <ExpandableBlock.LabelArea>
   *    <ExpandableBLock.Title> Title </ExpandableBlock.Title>
   *    <ExpandableBlock.Caption> Caption </ExpandableBlock.Caption>
   * </ExpandableBlock.LabelArea>
   */
  LabelArea: ExpandableBlockLabelArea,
  /**
   * The main text displayed on the block header, regardless of state.
   */
  Title: ExpandableBlockTitle,
  /**
   * Small note displayed below title, regardless of state.
   */
  Caption: ExpandableBlockCaption,
  /**
   * Svg icon displayed at the end of the main text.
   * Will override status icon if specified. Used inside `Header` subcomponent.
   * @example
   * <ExpandableBlock.Trigger>
   *    <ExpandableBlock.EndIcon> <SvgIcon/> </ExpandableBlock.EndIcon>
   * <ExpandableBlock.Trigger/>
   */
  EndIcon: ExpandableBlockEndIcon,
  /**
   * Content shown in the block's body when fully expanded.
   * @example
   * <ExpandableBlock.Wrapper>
   *    <ExpandableBlock.Content> Content </ExpandableBlock.Content>
   * </ExpandableBlock.Wrapper>
   */
  Content: ExpandableBlockContent,
});
