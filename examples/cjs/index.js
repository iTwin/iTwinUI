/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { ThemeProvider } from '@itwin/itwinui-react';
const withThemeProvider = (Component) => () => {
  return React.createElement(
    ThemeProvider,
    { theme: 'dark', themeOptions: { applyBackground: false } },
    React.createElement(Component, null),
  );
};
// ----------------------------------------------------------------------------
import { default as AlertMainExampleRaw } from './Alert.main';
const AlertMainExample = withThemeProvider(AlertMainExampleRaw);
export { AlertMainExample };
import { default as AlertInlineExampleRaw } from './Alert.inline';
const AlertInlineExample = withThemeProvider(AlertInlineExampleRaw);
export { AlertInlineExample };
import { default as AlertInformationalExampleRaw } from './Alert.informational';
const AlertInformationalExample = withThemeProvider(
  AlertInformationalExampleRaw,
);
export { AlertInformationalExample };
import { default as AlertPositiveExampleRaw } from './Alert.positive';
const AlertPositiveExample = withThemeProvider(AlertPositiveExampleRaw);
export { AlertPositiveExample };
import { default as AlertNegativeExampleRaw } from './Alert.negative';
const AlertNegativeExample = withThemeProvider(AlertNegativeExampleRaw);
export { AlertNegativeExample };
import { default as AlertStickyExampleRaw } from './Alert.sticky';
const AlertStickyExample = withThemeProvider(AlertStickyExampleRaw);
export { AlertStickyExample };
import { default as AlertWarningExampleRaw } from './Alert.warning';
const AlertWarningExample = withThemeProvider(AlertWarningExampleRaw);
export { AlertWarningExample };
// ----------------------------------------------------------------------------
import { default as AvatarMainExampleRaw } from './Avatar.main';
const AvatarMainExample = withThemeProvider(AvatarMainExampleRaw);
export { AvatarMainExample };
import { default as AvatarGroupExampleRaw } from './Avatar.group';
const AvatarGroupExample = withThemeProvider(AvatarGroupExampleRaw);
export { AvatarGroupExample };
import { default as AvatarGroupAnimatedExampleRaw } from './Avatar.groupanimated';
const AvatarGroupAnimatedExample = withThemeProvider(
  AvatarGroupAnimatedExampleRaw,
);
export { AvatarGroupAnimatedExample };
import { default as AvatarGroupOverflowExampleRaw } from './Avatar.groupoverflow';
const AvatarGroupOverflowExample = withThemeProvider(
  AvatarGroupOverflowExampleRaw,
);
export { AvatarGroupOverflowExample };
import { default as AvatarGroupOverflowTooltipExampleRaw } from './Avatar.groupoverflowtooltip';
const AvatarGroupOverflowTooltipExample = withThemeProvider(
  AvatarGroupOverflowTooltipExampleRaw,
);
export { AvatarGroupOverflowTooltipExample };
import { default as AvatarGroupStackedExampleRaw } from './Avatar.groupstacked';
const AvatarGroupStackedExample = withThemeProvider(
  AvatarGroupStackedExampleRaw,
);
export { AvatarGroupStackedExample };
import { default as AvatarIconExampleRaw } from './Avatar.icon';
const AvatarIconExample = withThemeProvider(AvatarIconExampleRaw);
export { AvatarIconExample };
import { default as AvatarInitialsExampleRaw } from './Avatar.initials';
const AvatarInitialsExample = withThemeProvider(AvatarInitialsExampleRaw);
export { AvatarInitialsExample };
import { default as AvatarPictureExampleRaw } from './Avatar.picture';
const AvatarPictureExample = withThemeProvider(AvatarPictureExampleRaw);
export { AvatarPictureExample };
import { default as AvatarSizesExampleRaw } from './Avatar.sizes';
const AvatarSizesExample = withThemeProvider(AvatarSizesExampleRaw);
export { AvatarSizesExample };
import { default as AvatarStatusesExampleRaw } from './Avatar.statuses';
const AvatarStatusesExample = withThemeProvider(AvatarStatusesExampleRaw);
export { AvatarStatusesExample };
// ----------------------------------------------------------------------------
import { default as AnchorMainExampleRaw } from './Anchor.main';
const AnchorMainExample = withThemeProvider(AnchorMainExampleRaw);
export { AnchorMainExample };
import { default as AnchorAsButtonExampleRaw } from './Anchor.asbutton';
const AnchorAsButtonExample = withThemeProvider(AnchorAsButtonExampleRaw);
export { AnchorAsButtonExample };
// ----------------------------------------------------------------------------
import { default as BadgeMainExampleRaw } from './Badge.main';
const BadgeMainExample = withThemeProvider(BadgeMainExampleRaw);
export { BadgeMainExample };
import { default as BadgeSoftExampleRaw } from './Badge.soft';
const BadgeSoftExample = withThemeProvider(BadgeSoftExampleRaw);
export { BadgeSoftExample };
import { default as BadgeStatusesExampleRaw } from './Badge.statuses';
const BadgeStatusesExample = withThemeProvider(BadgeStatusesExampleRaw);
export { BadgeStatusesExample };
// ----------------------------------------------------------------------------
import { default as BlockquoteFooterExampleRaw } from './Blockquote.footer';
const BlockquoteFooterExample = withThemeProvider(BlockquoteFooterExampleRaw);
export { BlockquoteFooterExample };
import { default as BlockquoteMainExampleRaw } from './Blockquote.main';
const BlockquoteMainExample = withThemeProvider(BlockquoteMainExampleRaw);
export { BlockquoteMainExample };
// ----------------------------------------------------------------------------
import { default as BreadcrumbsButtonExampleRaw } from './Breadcrumbs.button';
const BreadcrumbsButtonExample = withThemeProvider(BreadcrumbsButtonExampleRaw);
export { BreadcrumbsButtonExample };
import { default as BreadcrumbsExtremeTruncationExampleRaw } from './Breadcrumbs.extremeTruncation';
const BreadcrumbsExtremeTruncationExample = withThemeProvider(
  BreadcrumbsExtremeTruncationExampleRaw,
);
export { BreadcrumbsExtremeTruncationExample };
import { default as BreadcrumbsFolderExampleRaw } from './Breadcrumbs.folder';
const BreadcrumbsFolderExample = withThemeProvider(BreadcrumbsFolderExampleRaw);
export { BreadcrumbsFolderExample };
import { default as BreadcrumbsLinkExampleRaw } from './Breadcrumbs.link';
const BreadcrumbsLinkExample = withThemeProvider(BreadcrumbsLinkExampleRaw);
export { BreadcrumbsLinkExample };
import { default as BreadcrumbsMainExampleRaw } from './Breadcrumbs.main';
const BreadcrumbsMainExample = withThemeProvider(BreadcrumbsMainExampleRaw);
export { BreadcrumbsMainExample };
import { default as BreadcrumbsTruncationExampleRaw } from './Breadcrumbs.truncation';
const BreadcrumbsTruncationExample = withThemeProvider(
  BreadcrumbsTruncationExampleRaw,
);
export { BreadcrumbsTruncationExample };
import { default as BreadcrumbsCustomOverflowDropdownExampleRaw } from './Breadcrumbs.customOverflowDropdown';
const BreadcrumbsCustomOverflowDropdownExample = withThemeProvider(
  BreadcrumbsCustomOverflowDropdownExampleRaw,
);
export { BreadcrumbsCustomOverflowDropdownExample };
// ----------------------------------------------------------------------------
import { default as ButtonSizeExampleRaw } from './Button.size';
const ButtonSizeExample = withThemeProvider(ButtonSizeExampleRaw);
export { ButtonSizeExample };
import { default as ButtonDefaultExampleRaw } from './Button.default';
const ButtonDefaultExample = withThemeProvider(ButtonDefaultExampleRaw);
export { ButtonDefaultExample };
import { default as ButtonHighVisibilityExampleRaw } from './Button.highvisibility';
const ButtonHighVisibilityExample = withThemeProvider(
  ButtonHighVisibilityExampleRaw,
);
export { ButtonHighVisibilityExample };
import { default as ButtonBorderlessExampleRaw } from './Button.borderless';
const ButtonBorderlessExample = withThemeProvider(ButtonBorderlessExampleRaw);
export { ButtonBorderlessExample };
import { default as ButtonCTAExampleRaw } from './Button.cta';
const ButtonCTAExample = withThemeProvider(ButtonCTAExampleRaw);
export { ButtonCTAExample };
import { default as ButtonMainExampleRaw } from './Button.main';
const ButtonMainExample = withThemeProvider(ButtonMainExampleRaw);
export { ButtonMainExample };
import { default as IconButtonMainExampleRaw } from './IconButton.main';
const IconButtonMainExample = withThemeProvider(IconButtonMainExampleRaw);
export { IconButtonMainExample };
import { default as IdeasButtonMainExampleRaw } from './IdeasButton.main';
const IdeasButtonMainExample = withThemeProvider(IdeasButtonMainExampleRaw);
export { IdeasButtonMainExample };
import { default as SplitButtonMainExampleRaw } from './SplitButton.main';
const SplitButtonMainExample = withThemeProvider(SplitButtonMainExampleRaw);
export { SplitButtonMainExample };
// ----------------------------------------------------------------------------
import { default as ButtonGroupMainExampleRaw } from './ButtonGroup.main';
const ButtonGroupMainExample = withThemeProvider(ButtonGroupMainExampleRaw);
export { ButtonGroupMainExample };
import { default as ButtonGroupVerticalExampleRaw } from './ButtonGroup.vertical';
const ButtonGroupVerticalExample = withThemeProvider(
  ButtonGroupVerticalExampleRaw,
);
export { ButtonGroupVerticalExample };
import { default as ButtonGroupOverflowExampleRaw } from './ButtonGroup.overflow';
const ButtonGroupOverflowExample = withThemeProvider(
  ButtonGroupOverflowExampleRaw,
);
export { ButtonGroupOverflowExample };
import { default as ButtonGroupInputExampleRaw } from './ButtonGroup.input';
const ButtonGroupInputExample = withThemeProvider(ButtonGroupInputExampleRaw);
export { ButtonGroupInputExample };
import { default as ButtonGroupUsageExampleRaw } from './ButtonGroup.usage';
const ButtonGroupUsageExample = withThemeProvider(ButtonGroupUsageExampleRaw);
export { ButtonGroupUsageExample };
// ----------------------------------------------------------------------------
import { default as CarouselMainExampleRaw } from './Carousel.main';
const CarouselMainExample = withThemeProvider(CarouselMainExampleRaw);
export { CarouselMainExample };
import { default as CarouselControlledExampleRaw } from './Carousel.controlled';
const CarouselControlledExample = withThemeProvider(
  CarouselControlledExampleRaw,
);
export { CarouselControlledExample };
import { default as CarouselOnlyDotsExampleRaw } from './Carousel.onlyDots';
const CarouselOnlyDotsExample = withThemeProvider(CarouselOnlyDotsExampleRaw);
export { CarouselOnlyDotsExample };
// ----------------------------------------------------------------------------
import { default as CheckboxMainExampleRaw } from './Checkbox.main';
const CheckboxMainExample = withThemeProvider(CheckboxMainExampleRaw);
export { CheckboxMainExample };
import { default as CheckboxIndeterminateExampleRaw } from './Checkbox.indeterminate';
const CheckboxIndeterminateExample = withThemeProvider(
  CheckboxIndeterminateExampleRaw,
);
export { CheckboxIndeterminateExample };
import { default as CheckboxLoadingExampleRaw } from './Checkbox.loading';
const CheckboxLoadingExample = withThemeProvider(CheckboxLoadingExampleRaw);
export { CheckboxLoadingExample };
import { default as CheckboxStatusesExampleRaw } from './Checkbox.statuses';
const CheckboxStatusesExample = withThemeProvider(CheckboxStatusesExampleRaw);
export { CheckboxStatusesExample };
import { default as CheckboxVisibilityExampleRaw } from './Checkbox.visibility';
const CheckboxVisibilityExample = withThemeProvider(
  CheckboxVisibilityExampleRaw,
);
export { CheckboxVisibilityExample };
import { default as CheckboxInputGroupExampleRaw } from './Checkbox.inputgroup';
const CheckboxInputGroupExample = withThemeProvider(
  CheckboxInputGroupExampleRaw,
);
export { CheckboxInputGroupExample };
// ----------------------------------------------------------------------------
import { default as CodeMainExampleRaw } from './Code.main';
const CodeMainExample = withThemeProvider(CodeMainExampleRaw);
export { CodeMainExample };
// ----------------------------------------------------------------------------
import { default as ColorPickerMainExampleRaw } from './ColorPicker.main';
const ColorPickerMainExample = withThemeProvider(ColorPickerMainExampleRaw);
export { ColorPickerMainExample };
import { default as ColorPickerBasicExampleRaw } from './ColorPicker.basic';
const ColorPickerBasicExample = withThemeProvider(ColorPickerBasicExampleRaw);
export { ColorPickerBasicExample };
import { default as ColorPickerAdvancedExampleRaw } from './ColorPicker.advanced';
const ColorPickerAdvancedExample = withThemeProvider(
  ColorPickerAdvancedExampleRaw,
);
export { ColorPickerAdvancedExample };
import { default as ColorPickerAdvancedPopoverExampleRaw } from './ColorPicker.advancedPopover';
const ColorPickerAdvancedPopoverExample = withThemeProvider(
  ColorPickerAdvancedPopoverExampleRaw,
);
export { ColorPickerAdvancedPopoverExample };
// ----------------------------------------------------------------------------
import { default as ComboBoxMainExampleRaw } from './ComboBox.main';
const ComboBoxMainExample = withThemeProvider(ComboBoxMainExampleRaw);
export { ComboBoxMainExample };
import { default as ComboBoxControlledExampleRaw } from './ComboBox.controlled';
const ComboBoxControlledExample = withThemeProvider(
  ComboBoxControlledExampleRaw,
);
export { ComboBoxControlledExample };
import { default as ComboBoxCustomExampleRaw } from './ComboBox.custom';
const ComboBoxCustomExample = withThemeProvider(ComboBoxCustomExampleRaw);
export { ComboBoxCustomExample };
import { default as ComboBoxDisabledExampleRaw } from './ComboBox.disabled';
const ComboBoxDisabledExample = withThemeProvider(ComboBoxDisabledExampleRaw);
export { ComboBoxDisabledExample };
import { default as ComboBoxLabelExampleRaw } from './ComboBox.label';
const ComboBoxLabelExample = withThemeProvider(ComboBoxLabelExampleRaw);
export { ComboBoxLabelExample };
import { default as ComboBoxLoadingExampleRaw } from './ComboBox.loading';
const ComboBoxLoadingExample = withThemeProvider(ComboBoxLoadingExampleRaw);
export { ComboBoxLoadingExample };
import { default as ComboBoxMessageExampleRaw } from './ComboBox.message';
const ComboBoxMessageExample = withThemeProvider(ComboBoxMessageExampleRaw);
export { ComboBoxMessageExample };
import { default as ComboBoxMessageIconExampleRaw } from './ComboBox.messageIcon';
const ComboBoxMessageIconExample = withThemeProvider(
  ComboBoxMessageIconExampleRaw,
);
export { ComboBoxMessageIconExample };
import { default as ComboBoxMultipleSelectExampleRaw } from './ComboBox.multipleSelect';
const ComboBoxMultipleSelectExample = withThemeProvider(
  ComboBoxMultipleSelectExampleRaw,
);
export { ComboBoxMultipleSelectExample };
import { default as ComboBoxStatusExampleRaw } from './ComboBox.status';
const ComboBoxStatusExample = withThemeProvider(ComboBoxStatusExampleRaw);
export { ComboBoxStatusExample };
import { default as ComboBoxVirtualizedExampleRaw } from './ComboBox.virtualized';
const ComboBoxVirtualizedExample = withThemeProvider(
  ComboBoxVirtualizedExampleRaw,
);
export { ComboBoxVirtualizedExample };
// ----------------------------------------------------------------------------
import { default as DatePickerMainExampleRaw } from './DatePicker.main';
const DatePickerMainExample = withThemeProvider(DatePickerMainExampleRaw);
export { DatePickerMainExample };
import { default as DatePickerMenuExampleRaw } from './DatePicker.menu';
const DatePickerMenuExample = withThemeProvider(DatePickerMenuExampleRaw);
export { DatePickerMenuExample };
import { default as DatePickerBasicExampleRaw } from './DatePicker.basic';
const DatePickerBasicExample = withThemeProvider(DatePickerBasicExampleRaw);
export { DatePickerBasicExample };
import { default as DatePickerWithTimeExampleRaw } from './DatePicker.withtime';
const DatePickerWithTimeExample = withThemeProvider(
  DatePickerWithTimeExampleRaw,
);
export { DatePickerWithTimeExample };
import { default as DatePickerWithCombinedTimeExampleRaw } from './DatePicker.withcombinedtime';
const DatePickerWithCombinedTimeExample = withThemeProvider(
  DatePickerWithCombinedTimeExampleRaw,
);
export { DatePickerWithCombinedTimeExample };
import { default as DatePickerDateRangeExampleRaw } from './DatePicker.daterange';
const DatePickerDateRangeExample = withThemeProvider(
  DatePickerDateRangeExampleRaw,
);
export { DatePickerDateRangeExample };
import { default as DatePickerWithYearExampleRaw } from './DatePicker.withyear';
const DatePickerWithYearExample = withThemeProvider(
  DatePickerWithYearExampleRaw,
);
export { DatePickerWithYearExample };
import { default as DatePickerLocalizedExampleRaw } from './DatePicker.localized';
const DatePickerLocalizedExample = withThemeProvider(
  DatePickerLocalizedExampleRaw,
);
export { DatePickerLocalizedExample };
import { default as DatePickerDatesDisabledExampleRaw } from './DatePicker.datesdisabled';
const DatePickerDatesDisabledExample = withThemeProvider(
  DatePickerDatesDisabledExampleRaw,
);
export { DatePickerDatesDisabledExample };
// ----------------------------------------------------------------------------
import { default as DialogDismissibleExampleRaw } from './Dialog.dismissible';
const DialogDismissibleExample = withThemeProvider(DialogDismissibleExampleRaw);
export { DialogDismissibleExample };
import { default as DialogDraggableExampleRaw } from './Dialog.draggable';
const DialogDraggableExample = withThemeProvider(DialogDraggableExampleRaw);
export { DialogDraggableExample };
import { default as DialogFullPageExampleRaw } from './Dialog.fullpage';
const DialogFullPageExample = withThemeProvider(DialogFullPageExampleRaw);
export { DialogFullPageExample };
import { default as DialogMainExampleRaw } from './Dialog.main';
const DialogMainExample = withThemeProvider(DialogMainExampleRaw);
export { DialogMainExample };
import { default as DialogModalExampleRaw } from './Dialog.modal';
const DialogModalExample = withThemeProvider(DialogModalExampleRaw);
export { DialogModalExample };
import { default as DialogNonDismissibleExampleRaw } from './Dialog.nondismissible';
const DialogNonDismissibleExample = withThemeProvider(
  DialogNonDismissibleExampleRaw,
);
export { DialogNonDismissibleExample };
import { default as DialogPlacementExampleRaw } from './Dialog.placement';
const DialogPlacementExample = withThemeProvider(DialogPlacementExampleRaw);
export { DialogPlacementExample };
// ----------------------------------------------------------------------------
import { default as DropdownButtonMainExampleRaw } from './DropdownButton.main';
const DropdownButtonMainExample = withThemeProvider(
  DropdownButtonMainExampleRaw,
);
export { DropdownButtonMainExample };
// ----------------------------------------------------------------------------
import { default as DropdownMenuMainExampleRaw } from './DropdownMenu.main';
const DropdownMenuMainExample = withThemeProvider(DropdownMenuMainExampleRaw);
export { DropdownMenuMainExample };
import { default as DropdownMenuBasicExampleRaw } from './DropdownMenu.basic';
const DropdownMenuBasicExample = withThemeProvider(DropdownMenuBasicExampleRaw);
export { DropdownMenuBasicExample };
import { default as DropdownMenuIconExampleRaw } from './DropdownMenu.icon';
const DropdownMenuIconExample = withThemeProvider(DropdownMenuIconExampleRaw);
export { DropdownMenuIconExample };
import { default as DropdownMenuBadgeExampleRaw } from './DropdownMenu.badge';
const DropdownMenuBadgeExample = withThemeProvider(DropdownMenuBadgeExampleRaw);
export { DropdownMenuBadgeExample };
import { default as DropdownMenuSublabelExampleRaw } from './DropdownMenu.sublabel';
const DropdownMenuSublabelExample = withThemeProvider(
  DropdownMenuSublabelExampleRaw,
);
export { DropdownMenuSublabelExample };
import { default as DropdownMenuSubmenuExampleRaw } from './DropdownMenu.submenu';
const DropdownMenuSubmenuExample = withThemeProvider(
  DropdownMenuSubmenuExampleRaw,
);
export { DropdownMenuSubmenuExample };
import { default as DropdownMenuSeparatorExampleRaw } from './DropdownMenu.separator';
const DropdownMenuSeparatorExample = withThemeProvider(
  DropdownMenuSeparatorExampleRaw,
);
export { DropdownMenuSeparatorExample };
import { default as DropdownMenuContentExampleRaw } from './DropdownMenu.content';
const DropdownMenuContentExample = withThemeProvider(
  DropdownMenuContentExampleRaw,
);
export { DropdownMenuContentExample };
// ----------------------------------------------------------------------------
import { default as ExpandableBlockMainExampleRaw } from './ExpandableBlock.main';
const ExpandableBlockMainExample = withThemeProvider(
  ExpandableBlockMainExampleRaw,
);
export { ExpandableBlockMainExample };
import { default as ExpandableBlockWithCaptionExampleRaw } from './ExpandableBlock.withcaption';
const ExpandableBlockWithCaptionExample = withThemeProvider(
  ExpandableBlockWithCaptionExampleRaw,
);
export { ExpandableBlockWithCaptionExample };
import { default as ExpandableBlockAccordionExampleRaw } from './ExpandableBlock.accordion';
const ExpandableBlockAccordionExample = withThemeProvider(
  ExpandableBlockAccordionExampleRaw,
);
export { ExpandableBlockAccordionExample };
import { default as ExpandableBlockStatusExampleRaw } from './ExpandableBlock.status';
const ExpandableBlockStatusExample = withThemeProvider(
  ExpandableBlockStatusExampleRaw,
);
export { ExpandableBlockStatusExample };
import { default as ExpandableBlockSmallExampleRaw } from './ExpandableBlock.small';
const ExpandableBlockSmallExample = withThemeProvider(
  ExpandableBlockSmallExampleRaw,
);
export { ExpandableBlockSmallExample };
import { default as ExpandableBlockBorderlessExampleRaw } from './ExpandableBlock.borderless';
const ExpandableBlockBorderlessExample = withThemeProvider(
  ExpandableBlockBorderlessExampleRaw,
);
export { ExpandableBlockBorderlessExample };
import { default as ExpandableBlockFormExampleRaw } from './ExpandableBlock.form';
const ExpandableBlockFormExample = withThemeProvider(
  ExpandableBlockFormExampleRaw,
);
export { ExpandableBlockFormExample };
import { default as ExpandableBlockDisabledExampleRaw } from './ExpandableBlock.disabled';
const ExpandableBlockDisabledExample = withThemeProvider(
  ExpandableBlockDisabledExampleRaw,
);
export { ExpandableBlockDisabledExample };
// ----------------------------------------------------------------------------
import { default as FieldsetMainExampleRaw } from './Fieldset.main';
const FieldsetMainExample = withThemeProvider(FieldsetMainExampleRaw);
export { FieldsetMainExample };
import { default as FieldsetDisabledExampleRaw } from './Fieldset.disabled';
const FieldsetDisabledExample = withThemeProvider(FieldsetDisabledExampleRaw);
export { FieldsetDisabledExample };
// ----------------------------------------------------------------------------
import { default as FileUploadMainExampleRaw } from './FileUpload.main';
const FileUploadMainExample = withThemeProvider(FileUploadMainExampleRaw);
export { FileUploadMainExample };
// ----------------------------------------------------------------------------
import { default as FlexMainExampleRaw } from './Flex.main';
const FlexMainExample = withThemeProvider(FlexMainExampleRaw);
export { FlexMainExample };
// ----------------------------------------------------------------------------
import { default as FooterMainExampleRaw } from './Footer.main';
const FooterMainExample = withThemeProvider(FooterMainExampleRaw);
export { FooterMainExample };
// ----------------------------------------------------------------------------
import { default as HeaderMainExampleRaw } from './Header.main';
const HeaderMainExample = withThemeProvider(HeaderMainExampleRaw);
export { HeaderMainExample };
// ----------------------------------------------------------------------------
import { default as InformationPanelMainExampleRaw } from './InformationPanel.main';
const InformationPanelMainExample = withThemeProvider(
  InformationPanelMainExampleRaw,
);
export { InformationPanelMainExample };
// ----------------------------------------------------------------------------
import { default as InputGroupToggleSwitchExampleRaw } from './InputGroup.toggleSwitch';
const InputGroupToggleSwitchExample = withThemeProvider(
  InputGroupToggleSwitchExampleRaw,
);
export { InputGroupToggleSwitchExample };
import { default as InputGroupCheckboxGroupExampleRaw } from './InputGroup.checkboxGroup';
const InputGroupCheckboxGroupExample = withThemeProvider(
  InputGroupCheckboxGroupExampleRaw,
);
export { InputGroupCheckboxGroupExample };
import { default as InputGroupRadioGroupExampleRaw } from './InputGroup.radioGroup';
const InputGroupRadioGroupExample = withThemeProvider(
  InputGroupRadioGroupExampleRaw,
);
export { InputGroupRadioGroupExample };
// ----------------------------------------------------------------------------
import { default as InputMainExampleRaw } from './Input.main';
const InputMainExample = withThemeProvider(InputMainExampleRaw);
export { InputMainExample };
import { default as InputSizesExampleRaw } from './Input.sizes';
const InputSizesExample = withThemeProvider(InputSizesExampleRaw);
export { InputSizesExample };
import { default as InputSeparateLabelExampleRaw } from './Input.separatelabel';
const InputSeparateLabelExample = withThemeProvider(
  InputSeparateLabelExampleRaw,
);
export { InputSeparateLabelExample };
import { default as InputInlineExampleRaw } from './Input.inline';
const InputInlineExample = withThemeProvider(InputInlineExampleRaw);
export { InputInlineExample };
import { default as InputStatusExampleRaw } from './Input.status';
const InputStatusExample = withThemeProvider(InputStatusExampleRaw);
export { InputStatusExample };
import { default as InputButtonExampleRaw } from './Input.button';
const InputButtonExample = withThemeProvider(InputButtonExampleRaw);
export { InputButtonExample };
// ----------------------------------------------------------------------------
import { default as KeyboardMainExampleRaw } from './Keyboard.main';
const KeyboardMainExample = withThemeProvider(KeyboardMainExampleRaw);
export { KeyboardMainExample };
// ----------------------------------------------------------------------------
import { default as LabelMainExampleRaw } from './Label.main';
const LabelMainExample = withThemeProvider(LabelMainExampleRaw);
export { LabelMainExample };
// ----------------------------------------------------------------------------
import { default as ListMainExampleRaw } from './List.main';
const ListMainExample = withThemeProvider(ListMainExampleRaw);
export { ListMainExample };
import { default as ListSubcomponentsExampleRaw } from './List.subcomponents';
const ListSubcomponentsExample = withThemeProvider(ListSubcomponentsExampleRaw);
export { ListSubcomponentsExample };
import { default as ListLinksExampleRaw } from './List.links';
const ListLinksExample = withThemeProvider(ListLinksExampleRaw);
export { ListLinksExample };
import { default as ListComboboxExampleRaw } from './List.combobox';
const ListComboboxExample = withThemeProvider(ListComboboxExampleRaw);
export { ListComboboxExample };
// ----------------------------------------------------------------------------
import { default as NonIdealStateBadgatewayExampleRaw } from './NonIdealState.badgateway';
const NonIdealStateBadgatewayExample = withThemeProvider(
  NonIdealStateBadgatewayExampleRaw,
);
export { NonIdealStateBadgatewayExample };
import { default as NonIdealStateForbiddenExampleRaw } from './NonIdealState.forbidden';
const NonIdealStateForbiddenExample = withThemeProvider(
  NonIdealStateForbiddenExampleRaw,
);
export { NonIdealStateForbiddenExample };
import { default as NonIdealStateInternalErrorExampleRaw } from './NonIdealState.internalerror';
const NonIdealStateInternalErrorExample = withThemeProvider(
  NonIdealStateInternalErrorExampleRaw,
);
export { NonIdealStateInternalErrorExample };
import { default as NonIdealStatePagenotfoundExampleRaw } from './NonIdealState.Pagenotfound';
const NonIdealStatePagenotfoundExample = withThemeProvider(
  NonIdealStatePagenotfoundExampleRaw,
);
export { NonIdealStatePagenotfoundExample };
import { default as NonIdealStateRedirectExampleRaw } from './NonIdealState.redirect';
const NonIdealStateRedirectExample = withThemeProvider(
  NonIdealStateRedirectExampleRaw,
);
export { NonIdealStateRedirectExample };
import { default as NonIdealStateServiceunavailableExampleRaw } from './NonIdealState.serviceunavailable';
const NonIdealStateServiceunavailableExample = withThemeProvider(
  NonIdealStateServiceunavailableExampleRaw,
);
export { NonIdealStateServiceunavailableExample };
import { default as NonIdealStateTimeoutExampleRaw } from './NonIdealState.timeout';
const NonIdealStateTimeoutExample = withThemeProvider(
  NonIdealStateTimeoutExampleRaw,
);
export { NonIdealStateTimeoutExample };
import { default as NonIdealStateUnauthorizedExampleRaw } from './NonIdealState.unauthorized';
const NonIdealStateUnauthorizedExample = withThemeProvider(
  NonIdealStateUnauthorizedExampleRaw,
);
export { NonIdealStateUnauthorizedExample };
import { default as NonIdealStateErrorExampleRaw } from './NonIdealState.error';
const NonIdealStateErrorExample = withThemeProvider(
  NonIdealStateErrorExampleRaw,
);
export { NonIdealStateErrorExample };
// ----------------------------------------------------------------------------
import { default as ProgressLinearMainExampleRaw } from './ProgressLinear.main';
const ProgressLinearMainExample = withThemeProvider(
  ProgressLinearMainExampleRaw,
);
export { ProgressLinearMainExample };
import { default as ProgressRadialMainExampleRaw } from './ProgressRadial.main';
const ProgressRadialMainExample = withThemeProvider(
  ProgressRadialMainExampleRaw,
);
export { ProgressRadialMainExample };
// ----------------------------------------------------------------------------
import { default as RadioMainExampleRaw } from './Radio.main';
const RadioMainExample = withThemeProvider(RadioMainExampleRaw);
export { RadioMainExample };
import { default as RadioStatusesExampleRaw } from './Radio.statuses';
const RadioStatusesExample = withThemeProvider(RadioStatusesExampleRaw);
export { RadioStatusesExample };
import { default as RadioTileMainExampleRaw } from './RadioTile.main';
const RadioTileMainExample = withThemeProvider(RadioTileMainExampleRaw);
export { RadioTileMainExample };
import { default as RadioTileColorExampleRaw } from './RadioTile.color';
const RadioTileColorExample = withThemeProvider(RadioTileColorExampleRaw);
export { RadioTileColorExample };
// ----------------------------------------------------------------------------
import { default as SearchBoxMainExampleRaw } from './SearchBox.main';
const SearchBoxMainExample = withThemeProvider(SearchBoxMainExampleRaw);
export { SearchBoxMainExample };
import { default as SearchBoxBasicExampleRaw } from './SearchBox.basic';
const SearchBoxBasicExample = withThemeProvider(SearchBoxBasicExampleRaw);
export { SearchBoxBasicExample };
import { default as SearchBoxSizeExampleRaw } from './SearchBox.size';
const SearchBoxSizeExample = withThemeProvider(SearchBoxSizeExampleRaw);
export { SearchBoxSizeExample };
import { default as SearchBoxExpandableExampleRaw } from './SearchBox.expandable';
const SearchBoxExpandableExample = withThemeProvider(
  SearchBoxExpandableExampleRaw,
);
export { SearchBoxExpandableExample };
import { default as SearchBoxStatusExampleRaw } from './SearchBox.status';
const SearchBoxStatusExample = withThemeProvider(SearchBoxStatusExampleRaw);
export { SearchBoxStatusExample };
import { default as SearchBoxCustomExampleRaw } from './SearchBox.custom';
const SearchBoxCustomExample = withThemeProvider(SearchBoxCustomExampleRaw);
export { SearchBoxCustomExample };
import { default as SearchBoxCustomOpenExampleRaw } from './SearchBox.customopen';
const SearchBoxCustomOpenExample = withThemeProvider(
  SearchBoxCustomOpenExampleRaw,
);
export { SearchBoxCustomOpenExample };
// ----------------------------------------------------------------------------
import { default as SelectDisableExampleRaw } from './Select.disable';
const SelectDisableExample = withThemeProvider(SelectDisableExampleRaw);
export { SelectDisableExample };
import { default as SelectIconExampleRaw } from './Select.icon';
const SelectIconExample = withThemeProvider(SelectIconExampleRaw);
export { SelectIconExample };
import { default as SelectMainExampleRaw } from './Select.main';
const SelectMainExample = withThemeProvider(SelectMainExampleRaw);
export { SelectMainExample };
import { default as SelectStatusesExampleRaw } from './Select.statuses';
const SelectStatusesExample = withThemeProvider(SelectStatusesExampleRaw);
export { SelectStatusesExample };
import { default as SelectSublabelsExampleRaw } from './Select.sublabels';
const SelectSublabelsExample = withThemeProvider(SelectSublabelsExampleRaw);
export { SelectSublabelsExample };
import { default as SelectTruncateExampleRaw } from './Select.truncate';
const SelectTruncateExample = withThemeProvider(SelectTruncateExampleRaw);
export { SelectTruncateExample };
// ----------------------------------------------------------------------------
import { default as SideNavigationMainExampleRaw } from './SideNavigation.main';
const SideNavigationMainExample = withThemeProvider(
  SideNavigationMainExampleRaw,
);
export { SideNavigationMainExample };
import { default as SideNavigationBasicExampleRaw } from './SideNavigation.basic';
const SideNavigationBasicExample = withThemeProvider(
  SideNavigationBasicExampleRaw,
);
export { SideNavigationBasicExample };
import { default as SideNavigationActiveItemExampleRaw } from './SideNavigation.activeitem';
const SideNavigationActiveItemExample = withThemeProvider(
  SideNavigationActiveItemExampleRaw,
);
export { SideNavigationActiveItemExample };
import { default as SideNavigationSubmenuExampleRaw } from './SideNavigation.submenu';
const SideNavigationSubmenuExample = withThemeProvider(
  SideNavigationSubmenuExampleRaw,
);
export { SideNavigationSubmenuExample };
// ----------------------------------------------------------------------------
import { default as SliderMainExampleRaw } from './Slider.main';
const SliderMainExample = withThemeProvider(SliderMainExampleRaw);
export { SliderMainExample };
import { default as SliderRangeExampleRaw } from './Slider.range';
const SliderRangeExample = withThemeProvider(SliderRangeExampleRaw);
export { SliderRangeExample };
import { default as SliderRangeMultipleExampleRaw } from './Slider.rangemultiple';
const SliderRangeMultipleExample = withThemeProvider(
  SliderRangeMultipleExampleRaw,
);
export { SliderRangeMultipleExample };
import { default as SliderVerticalExampleRaw } from './Slider.vertical';
const SliderVerticalExample = withThemeProvider(SliderVerticalExampleRaw);
export { SliderVerticalExample };
import { default as SliderLabelsExampleRaw } from './Slider.labels';
const SliderLabelsExample = withThemeProvider(SliderLabelsExampleRaw);
export { SliderLabelsExample };
import { default as SliderThumbCustomExampleRaw } from './Slider.thumbcustom';
const SliderThumbCustomExample = withThemeProvider(SliderThumbCustomExampleRaw);
export { SliderThumbCustomExample };
import { default as SliderTooltipCustomExampleRaw } from './Slider.tooltipcustom';
const SliderTooltipCustomExample = withThemeProvider(
  SliderTooltipCustomExampleRaw,
);
export { SliderTooltipCustomExample };
import { default as SliderTooltipNoneExampleRaw } from './Slider.tooltipnone';
const SliderTooltipNoneExample = withThemeProvider(SliderTooltipNoneExampleRaw);
export { SliderTooltipNoneExample };
// ----------------------------------------------------------------------------
import { default as StepperMainExampleRaw } from './Stepper.main';
const StepperMainExample = withThemeProvider(StepperMainExampleRaw);
export { StepperMainExample };
import { default as StepperShortExampleRaw } from './Stepper.short';
const StepperShortExample = withThemeProvider(StepperShortExampleRaw);
export { StepperShortExample };
import { default as StepperLongExampleRaw } from './Stepper.long';
const StepperLongExample = withThemeProvider(StepperLongExampleRaw);
export { StepperLongExample };
import { default as StepperTooltipExampleRaw } from './Stepper.tooltip';
const StepperTooltipExample = withThemeProvider(StepperTooltipExampleRaw);
export { StepperTooltipExample };
import { default as StepperLocalizationExampleRaw } from './Stepper.localization';
const StepperLocalizationExample = withThemeProvider(
  StepperLocalizationExampleRaw,
);
export { StepperLocalizationExample };
import { default as StepperLayoutExampleRaw } from './Stepper.layout';
const StepperLayoutExample = withThemeProvider(StepperLayoutExampleRaw);
export { StepperLayoutExample };
// ----------------------------------------------------------------------------
import { default as SurfaceMainExampleRaw } from './Surface.main';
const SurfaceMainExample = withThemeProvider(SurfaceMainExampleRaw);
export { SurfaceMainExample };
import { default as SurfaceElevationExampleRaw } from './Surface.elevation';
const SurfaceElevationExample = withThemeProvider(SurfaceElevationExampleRaw);
export { SurfaceElevationExample };
import { default as SurfaceHeaderFooterExampleRaw } from './Surface.headerfooter';
const SurfaceHeaderFooterExample = withThemeProvider(
  SurfaceHeaderFooterExampleRaw,
);
export { SurfaceHeaderFooterExample };
import { default as SurfaceNoPaddingExampleRaw } from './Surface.nopadding';
const SurfaceNoPaddingExample = withThemeProvider(SurfaceNoPaddingExampleRaw);
export { SurfaceNoPaddingExample };
// ----------------------------------------------------------------------------
import { default as TableMainExampleRaw } from './Table.main';
const TableMainExample = withThemeProvider(TableMainExampleRaw);
export { TableMainExample };
// ----------------------------------------------------------------------------
import { default as TabsMainExampleRaw } from './Tabs.main';
const TabsMainExample = withThemeProvider(TabsMainExampleRaw);
export { TabsMainExample };
import { default as TabsOverflowExampleRaw } from './Tabs.overflow';
const TabsOverflowExample = withThemeProvider(TabsOverflowExampleRaw);
export { TabsOverflowExample };
// ----------------------------------------------------------------------------
import { default as TagMainExampleRaw } from './Tag.main';
const TagMainExample = withThemeProvider(TagMainExampleRaw);
export { TagMainExample };
import { default as TagBasicExampleRaw } from './Tag.basic';
const TagBasicExample = withThemeProvider(TagBasicExampleRaw);
export { TagBasicExample };
import { default as TagDefaultExampleRaw } from './Tag.default';
const TagDefaultExample = withThemeProvider(TagDefaultExampleRaw);
export { TagDefaultExample };
// ----------------------------------------------------------------------------
import { default as TagContainerMainExampleRaw } from './TagContainer.main';
const TagContainerMainExample = withThemeProvider(TagContainerMainExampleRaw);
export { TagContainerMainExample };
import { default as TagContainerWrapExampleRaw } from './TagContainer.wrap';
const TagContainerWrapExample = withThemeProvider(TagContainerWrapExampleRaw);
export { TagContainerWrapExample };
import { default as TagContainerTruncateExampleRaw } from './TagContainer.truncate';
const TagContainerTruncateExample = withThemeProvider(
  TagContainerTruncateExampleRaw,
);
export { TagContainerTruncateExample };
import { default as TagContainerScrollExampleRaw } from './TagContainer.scroll';
const TagContainerScrollExample = withThemeProvider(
  TagContainerScrollExampleRaw,
);
export { TagContainerScrollExample };
// ----------------------------------------------------------------------------
import { default as TextareaMainExampleRaw } from './Textarea.main';
const TextareaMainExample = withThemeProvider(TextareaMainExampleRaw);
export { TextareaMainExample };
import { default as TextareaScrollExampleRaw } from './Textarea.scroll';
const TextareaScrollExample = withThemeProvider(TextareaScrollExampleRaw);
export { TextareaScrollExample };
import { default as TextareaStatusExampleRaw } from './Textarea.status';
const TextareaStatusExample = withThemeProvider(TextareaStatusExampleRaw);
export { TextareaStatusExample };
import { default as TextareaInlineExampleRaw } from './Textarea.inline';
const TextareaInlineExample = withThemeProvider(TextareaInlineExampleRaw);
export { TextareaInlineExample };
// ----------------------------------------------------------------------------
import { default as TextMainExampleRaw } from './Text.main';
const TextMainExample = withThemeProvider(TextMainExampleRaw);
export { TextMainExample };
// ----------------------------------------------------------------------------
import { default as TileMainExampleRaw } from './Tile.main';
const TileMainExample = withThemeProvider(TileMainExampleRaw);
export { TileMainExample };
// ----------------------------------------------------------------------------
import { default as ToastMainExampleRaw } from './Toast.main';
const ToastMainExample = withThemeProvider(ToastMainExampleRaw);
export { ToastMainExample };
// ----------------------------------------------------------------------------
import { default as ToggleSwitchMainExampleRaw } from './ToggleSwitch.main';
const ToggleSwitchMainExample = withThemeProvider(ToggleSwitchMainExampleRaw);
export { ToggleSwitchMainExample };
import { default as ToggleSwitchSizesExampleRaw } from './ToggleSwitch.sizes';
const ToggleSwitchSizesExample = withThemeProvider(ToggleSwitchSizesExampleRaw);
export { ToggleSwitchSizesExample };
import { default as ToggleSwitchLabelsExampleRaw } from './ToggleSwitch.labels';
const ToggleSwitchLabelsExample = withThemeProvider(
  ToggleSwitchLabelsExampleRaw,
);
export { ToggleSwitchLabelsExample };
import { default as ToggleSwitchIconExampleRaw } from './ToggleSwitch.icon';
const ToggleSwitchIconExample = withThemeProvider(ToggleSwitchIconExampleRaw);
export { ToggleSwitchIconExample };
import { default as ToggleSwitchInputGroupExampleRaw } from './ToggleSwitch.inputgroup';
const ToggleSwitchInputGroupExample = withThemeProvider(
  ToggleSwitchInputGroupExampleRaw,
);
export { ToggleSwitchInputGroupExample };
// ----------------------------------------------------------------------------
import { default as TooltipMainExampleRaw } from './Tooltip.main';
const TooltipMainExample = withThemeProvider(TooltipMainExampleRaw);
export { TooltipMainExample };
import { default as TooltipPlacementExampleRaw } from './Tooltip.placement';
const TooltipPlacementExample = withThemeProvider(TooltipPlacementExampleRaw);
export { TooltipPlacementExample };
// ----------------------------------------------------------------------------
import { default as TransferListMainExampleRaw } from './TransferList.main';
const TransferListMainExample = withThemeProvider(TransferListMainExampleRaw);
export { TransferListMainExample };
import { default as TransferListWithLabelExampleRaw } from './TransferList.withlabel';
const TransferListWithLabelExample = withThemeProvider(
  TransferListWithLabelExampleRaw,
);
export { TransferListWithLabelExample };
// ----------------------------------------------------------------------------
import { default as TreeMainExampleRaw } from './Tree.main';
const TreeMainExample = withThemeProvider(TreeMainExampleRaw);
export { TreeMainExample };
// ----------------------------------------------------------------------------
import { default as VisuallyHiddenIconExampleRaw } from './VisuallyHidden.icon';
const VisuallyHiddenIconExample = withThemeProvider(
  VisuallyHiddenIconExampleRaw,
);
export { VisuallyHiddenIconExample };
import { default as VisuallyHiddenMoreTextExampleRaw } from './VisuallyHidden.moretext';
const VisuallyHiddenMoreTextExample = withThemeProvider(
  VisuallyHiddenMoreTextExampleRaw,
);
export { VisuallyHiddenMoreTextExample };
