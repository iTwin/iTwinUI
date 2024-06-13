/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { SvgCamera, SvgPlaceholder } from '@itwin/itwinui-icons-react';
import { LabeledTextarea, StatusMessage } from '@itwin/itwinui-react';

export default {
  title: 'LabeledTextarea',
};

export const Basic = () => {
  return (
    <LabeledTextarea
      label='Textarea Label'
      message='Display Message'
      placeholder='This is a textarea'
    />
  );
};

export const Disabled = () => {
  return (
    <LabeledTextarea
      label='Textarea Label'
      message='Display Message'
      placeholder='This is a textarea'
      disabled={true}
    />
  );
};

export const Positive = () => {
  return (
    <LabeledTextarea
      label='Textarea Label'
      message='Display Message'
      placeholder='This is a textarea'
      status='positive'
    />
  );
};

export const Warning = () => {
  return (
    <LabeledTextarea
      label='Textarea Label'
      message='Display Message'
      placeholder='This is a textarea'
      status='warning'
    />
  );
};

export const Negative = () => {
  return (
    <LabeledTextarea
      label='Textarea Label'
      message='Display Message'
      placeholder='This is a textarea'
      status='negative'
    />
  );
};

export const WithCustomIcon = () => {
  return (
    <LabeledTextarea
      placeholder='This is a textarea'
      label='Textarea Label'
      message={
        <StatusMessage startIcon={<SvgCamera />}>Display Message</StatusMessage>
      }
    />
  );
};

export const WithSvgIcon = () => {
  return (
    <LabeledTextarea
      placeholder='Enter text here...'
      label='This is a label'
      status='negative'
      svgIcon={<SvgPlaceholder />}
    />
  );
};

export const Inline = () => {
  return (
    <LabeledTextarea
      placeholder='This is a textarea'
      status='negative'
      label='Textarea Label'
      displayStyle='inline'
    />
  );
};
