// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { Story, Meta } from '@storybook/react/types-6-0';
import React from 'react';
import { ErrorPage } from '../../src/core';
import { ErrorPageProps } from '../../src/core/ErrorPage/ErrorPage';

export default {
  title: 'ErrorPage',
  component: ErrorPage,
  parameters: {
    docs: {
      description: {
        component: 'A stylized display to communicate common http errors',
      },
    },
  },
  argTypes: {
    errorType: {
      type: { required: true },
    },
    primaryButtonLabel: { defaultValue: 'Close' },
    secondaryButtonLabel: { defaultValue: 'Cancel' },
    primaryButtonHandle: { action: 'Primary button clicked' },
    secondaryButtonHandle: { action: 'Secondary button clicked' },
  },
} as Meta<ErrorPageProps>;

export const unauthorized: Story<ErrorPageProps> = (props) => (
  <ErrorPage {...props} />
);
unauthorized.args = {
  errorType: '401',
  errorMessage: (
    <>
      You do not have permission to access this server.
      <br />
      Unable to fulfill request.
    </>
  ),
};

export const forbidden: Story<ErrorPageProps> = (props) => (
  <ErrorPage {...props} />
);
forbidden.args = {
  errorType: '403',
  errorMessage: (
    <>
      You do not have permission to access this server.
      <br />
      Unable to fulfill request.
    </>
  ),
};

export const pageNotFound: Story<ErrorPageProps> = (props) => (
  <ErrorPage {...props} />
);
pageNotFound.args = {
  errorType: '404',
  errorMessage: (
    <>
      We can not find the iModel that you are looking for or it does not exist.
      <br />
      Visit the iModel HUB or contact our support team.
    </>
  ),
};

export const internalServerError: Story<ErrorPageProps> = (props) => (
  <ErrorPage {...props} />
);
internalServerError.args = {
  errorType: '500',
  errorMessage:
    'Please retry again. If this continues to happen, please contact our support team or visit the iModel HUB.',
};

export const badGateway: Story<ErrorPageProps> = (props) => (
  <ErrorPage {...props} />
);
badGateway.args = {
  errorType: '502',
  errorMessage:
    'The server encountered a temporary error. Please try again in 30 seconds or visit iModel HUB.',
};

export const serviceUnavailable: Story<ErrorPageProps> = (props) => (
  <ErrorPage {...props} />
);
serviceUnavailable.args = {
  errorType: '503',
  errorMessage:
    'This service is being worked on. Please come back in a little bit or visit iModel HUB.',
};

export const generic: Story<ErrorPageProps> = (props) => (
  <ErrorPage {...props} />
);
generic.args = {
  errorType: 'generic',
  errorMessage:
    "We can't find the iModel that you are looking for or it does not exist. Visit the iModel HUB or contact our support team.",
};

export const customHtmlMessage: Story<ErrorPageProps> = (props) => (
  <ErrorPage {...props} />
);
customHtmlMessage.args = {
  errorMessage: (
    <>
      A React component with an{' '}
      <a href='https://www.bentley.com' target='_blank' rel='noreferrer'>
        anchor
      </a>{' '}
      may be passed.
    </>
  ),
};

export const withoutMessageOrButtons: Story<ErrorPageProps> = (props) => (
  <ErrorPage {...props} />
);
withoutMessageOrButtons.args = {
  primaryButtonLabel: undefined,
  secondaryButtonLabel: undefined,
  primaryButtonHandle: undefined,
  secondaryButtonHandle: undefined,
};

export const translatedMessages: Story<ErrorPageProps> = (props) => (
  <ErrorPage {...props} />
);
translatedMessages.args = {
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
