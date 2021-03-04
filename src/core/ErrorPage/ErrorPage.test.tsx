// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ErrorPage, ErrorPageType } from './ErrorPage';

describe(ErrorPage, () => {
  const defaultTests = [
    {
      errorType: '401',
      errorName: 'Unauthorized',
    },
    {
      errorType: '403',
      errorName: 'Forbidden',
    },
    {
      errorType: '404',
      errorName: 'Page not found',
    },
    {
      errorType: '500',
      errorName: 'Internal server error',
    },
    {
      errorType: '502',
      errorName: 'Bad gateway',
    },
    {
      errorType: '503',
      errorName: 'Service unavailable',
    },
    {
      errorType: 'generic',
      errorName: 'Error',
    },
  ] as { errorType: ErrorPageType; errorName: string }[];

  defaultTests.forEach((test) => {
    it(`displays ${test.errorType} error with default message`, () => {
      render(<ErrorPage errorType={test.errorType} />);
      screen.getByText(test.errorName);
      screen.getByTestId(`error-${test.errorType}`);
    });
  });

  const customTests = [
    {
      errorType: '401',
      errorName: '401 error',
      errorMessage: 'You do not have permission.',
    },
    {
      errorType: '403',
      errorName: '403 error',
      errorMessage: 'You do not have permission.',
    },
    {
      errorType: '404',
      errorName: 'You encountered a 404 error',
      errorMessage: 'Page does not exist here.',
    },
    {
      errorType: '500',
      errorName: 'You encountered a 500 error',
      errorMessage: 'Please try again.',
    },
    {
      errorType: '502',
      errorName: 'You encountered a 502 error',
      errorMessage: 'Having temporary problems.',
    },
    {
      errorType: '503',
      errorName: 'You encountered a 503 error',
      errorMessage: 'The service may be unavailable.',
    },
    {
      errorType: 'generic',
      errorName: 'You encountered a generic error',
      errorMessage: 'Please seek help.',
    },
  ] as { errorType: ErrorPageType; errorName: string; errorMessage: string }[];

  customTests.forEach((test) => {
    it(`displays ${test.errorType} error with custom message`, () => {
      render(
        <ErrorPage
          errorType={test.errorType}
          errorName={test.errorName}
          errorMessage={test.errorMessage}
        />,
      );
      screen.getByText(test.errorName);
      screen.getByText(test.errorMessage);
      screen.getByTestId(`error-${test.errorType}`);
    });
  });

  it('displays primary button', () => {
    const onClick = jest.fn();
    render(
      <ErrorPage
        errorType='404'
        primaryButtonHandle={onClick}
        primaryButtonLabel='Close'
      />,
    );

    screen.getByText('Close').click();
    expect(onClick).toHaveBeenCalled();
  });

  it('displays secondary button', () => {
    const onClick = jest.fn();
    render(
      <ErrorPage
        errorType='404'
        secondaryButtonHandle={onClick}
        secondaryButtonLabel='Cancel'
      />,
    );

    screen.getByText('Cancel').click();
    expect(onClick).toHaveBeenCalled();
  });

  it('translates default error messages', () => {
    render(
      <ErrorPage
        errorType='401'
        translatedErrorMessages={{
          badGateway: 'a bad gateway',
          error: 'an error',
          forbidden: 'a forbidden request',
          internalServerError: 'an internal server error',
          pageNotFound: 'the page was not found',
          serviceUnavailable: 'the service is not available',
          unauthorized: 'you shall not pass',
        }}
      />,
    );
    screen.getByText('you shall not pass');
  });
});
