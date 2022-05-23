/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import { Anchor, ErrorPage, ErrorPageProps } from '@itwin/itwinui-react';

export default {
  title: 'Core/ErrorPage',
  component: ErrorPage,
  argTypes: {
    id: { control: { disable: true } },
    errorType: {
      type: { required: true } as unknown,
    },
    primaryButtonHandle: { action: 'Primary button clicked' },
    secondaryButtonHandle: { action: 'Secondary button clicked' },
  },
  args: {
    primaryButtonLabel: 'Close',
    secondaryButtonLabel: 'Cancel',
  },
} as Meta<ErrorPageProps>;

export const Unauthorized: Story<ErrorPageProps> = (props) => (
  <ErrorPage {...props} />
);
Unauthorized.args = {
  errorType: '401',
  errorMessage: (
    <>
      You do not have permission to access this server.
      <br />
      Unable to fulfill request.
    </>
  ),
};

export const Forbidden: Story<ErrorPageProps> = (props) => (
  <ErrorPage {...props} />
);
Forbidden.args = {
  errorType: '403',
  errorMessage: (
    <>
      You do not have permission to access this server.
      <br />
      Unable to fulfill request.
    </>
  ),
};

export const PageNotFound: Story<ErrorPageProps> = (props) => (
  <ErrorPage {...props} />
);
PageNotFound.args = {
  errorType: '404',
  errorMessage: (
    <>
      We can not find the iModel that you are looking for or it does not exist.
      <br />
      Visit the iModel HUB or contact our support team.
    </>
  ),
};

export const InternalServerError: Story<ErrorPageProps> = (props) => (
  <ErrorPage {...props} />
);
InternalServerError.args = {
  errorType: '500',
  errorMessage:
    'Please retry again. If this continues to happen, please contact our support team or visit the iModel HUB.',
};

export const BadGateway: Story<ErrorPageProps> = (props) => (
  <ErrorPage {...props} />
);
BadGateway.args = {
  errorType: '502',
  errorMessage:
    'The server encountered a temporary error. Please try again in 30 seconds or visit iModel HUB.',
};

export const ServiceUnavailable: Story<ErrorPageProps> = (props) => (
  <ErrorPage {...props} />
);
ServiceUnavailable.args = {
  errorType: '503',
  errorMessage:
    'This service is being worked on. Please come back in a little bit or visit iModel HUB.',
};

export const Generic: Story<ErrorPageProps> = (props) => (
  <ErrorPage {...props} />
);
Generic.args = {
  errorType: 'generic',
  errorMessage:
    "We can't find the iModel that you are looking for or it does not exist. Visit the iModel HUB or contact our support team.",
};

export const CustomHtmlMessage: Story<ErrorPageProps> = (props) => (
  <ErrorPage {...props} />
);
CustomHtmlMessage.args = {
  errorMessage: (
    <>
      A React component with an{' '}
      <Anchor href='https://www.bentley.com' target='_blank' rel='noreferrer'>
        anchor
      </Anchor>{' '}
      may be passed.
    </>
  ),
};

export const WithoutMessageOrButtons: Story<ErrorPageProps> = (props) => (
  <ErrorPage {...props} />
);
WithoutMessageOrButtons.args = {
  primaryButtonLabel: undefined,
  secondaryButtonLabel: undefined,
  primaryButtonHandle: undefined,
  secondaryButtonHandle: undefined,
};

export const TranslatedMessages: Story<ErrorPageProps> = (props) => (
  <ErrorPage {...props} />
);
TranslatedMessages.args = {
  errorType: 'generic',
  errorMessage:
    "We can't find the iModel that you are looking for or it does not exist. Visit the iModel HUB or contact our support team.",
  translatedErrorMessages: {
    unauthorized: 'uNaUtHoRiZeD',
    forbidden: 'fOrBiDdEn',
    pageNotFound: 'pAgE nOt FoUnD',
    internalServerError: 'iNtErNaL sErVeR eRrOr',
    badGateway: 'bAd GaTeWaY',
    serviceUnavailable: 'sErViCe UnAvAiLaBlE',
    error: 'eRrOr',
  },
};
