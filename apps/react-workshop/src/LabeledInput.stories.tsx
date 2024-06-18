/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { SvgPlaceholder } from '@itwin/itwinui-icons-react';
import { SvgCamera } from '@itwin/itwinui-icons-react';
import { LabeledInput, StatusMessage } from '@itwin/itwinui-react';

export default {
  title: 'LabeledInput',
};

export const Basic = () => {
  return (
    <LabeledInput placeholder='Enter text here...' label='This is a label' />
  );
};

export const WithMessage = () => {
  return (
    <LabeledInput
      placeholder='Enter text here...'
      message='This is a message'
      label='This is a label'
    />
  );
};

export const Disabled = () => {
  return (
    <LabeledInput
      placeholder='Enter text here...'
      message='This is a message'
      label='This is a label'
      disabled
    />
  );
};

export const Positive = () => {
  return (
    <LabeledInput
      placeholder='Enter text here...'
      label='This is a label'
      message='This is a message'
      status='positive'
    />
  );
};

export const Warning = () => {
  return (
    <LabeledInput
      placeholder='Enter text here...'
      label='This is a label'
      message='This is a message'
      status='warning'
    />
  );
};

export const Negative = () => {
  return (
    <LabeledInput
      placeholder='Enter text here...'
      label='This is a label'
      message='This is a message'
      status='negative'
    />
  );
};

export const WithCustomIcon = () => {
  return (
    <LabeledInput
      placeholder='Enter text here...'
      label='This is a label'
      message={
        <StatusMessage startIcon={<SvgCamera />}>
          ⬅ This is a custom icon
        </StatusMessage>
      }
    />
  );
};

export const WithSvgIcon = () => {
  return (
    <LabeledInput
      placeholder='Enter text here...'
      label='This is a label'
      status='negative'
      svgIcon={<SvgPlaceholder />}
    />
  );
};

export const Inline = () => {
  return (
    <LabeledInput
      placeholder='Enter text here...'
      status='negative'
      label='This is a label'
      displayStyle='inline'
    />
  );
};

export const HybridLayout = () => {
  return (
    <>
      <LabeledInput
        placeholder='Enter text here...'
        label='This is a label'
        svgIcon={<SvgPlaceholder />}
        message='Block layout with inline icon'
      />
    </>
  );
};
