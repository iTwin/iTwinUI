/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { render, screen } from '@testing-library/react';
import React from 'react';
import { ErrorPage, ErrorPageType } from './ErrorPage';
import Svg401 from '@itwin/itwinui-illustrations-react/cjs/illustrations/401';
import Svg403 from '@itwin/itwinui-illustrations-react/cjs/illustrations/403';
import Svg404 from '@itwin/itwinui-illustrations-react/cjs/illustrations/404';
import Svg500 from '@itwin/itwinui-illustrations-react/cjs/illustrations/500';
import Svg502 from '@itwin/itwinui-illustrations-react/cjs/illustrations/502';
import Svg503 from '@itwin/itwinui-illustrations-react/cjs/illustrations/503';
import SvgError from '@itwin/itwinui-illustrations-react/cjs/illustrations/Error';
import SvgRedirect from '@itwin/itwinui-illustrations-react/cjs/illustrations/Redirect';
import SvgTimedOut from '@itwin/itwinui-illustrations-react/cjs/illustrations/TimedOut';

describe(ErrorPage, () => {
  const defaultTests = [
    {
      errorType: '300',
      errorName: 'Redirect',
      illustration: (
        <SvgRedirect className='iui-non-ideal-state-illustration' />
      ),
    },
    {
      errorType: '301',
      errorName: 'Redirect',
      illustration: (
        <SvgRedirect className='iui-non-ideal-state-illustration' />
      ),
    },
    {
      errorType: '302',
      errorName: 'Redirect',
      illustration: (
        <SvgRedirect className='iui-non-ideal-state-illustration' />
      ),
    },
    {
      errorType: '303',
      errorName: 'Redirect',
      illustration: (
        <SvgRedirect className='iui-non-ideal-state-illustration' />
      ),
    },
    {
      errorType: '304',
      errorName: 'Redirect',
      illustration: (
        <SvgRedirect className='iui-non-ideal-state-illustration' />
      ),
    },
    {
      errorType: '305',
      errorName: 'Redirect',
      illustration: (
        <SvgRedirect className='iui-non-ideal-state-illustration' />
      ),
    },
    {
      errorType: '307',
      errorName: 'Redirect',
      illustration: (
        <SvgRedirect className='iui-non-ideal-state-illustration' />
      ),
    },
    {
      errorType: '308',
      errorName: 'Redirect',
      illustration: (
        <SvgRedirect className='iui-non-ideal-state-illustration' />
      ),
    },
    {
      errorType: '401',
      errorName: 'Unauthorized',
      illustration: <Svg401 className='iui-non-ideal-state-illustration' />,
    },
    {
      errorType: '403',
      errorName: 'Forbidden',
      illustration: <Svg403 className='iui-non-ideal-state-illustration' />,
    },
    {
      errorType: '404',
      errorName: 'Page not found',
      illustration: <Svg404 className='iui-non-ideal-state-illustration' />,
    },
    {
      errorType: '408',
      errorName: 'Timed out',
      illustration: (
        <SvgTimedOut className='iui-non-ideal-state-illustration' />
      ),
    },
    {
      errorType: '500',
      errorName: 'Internal server error',
      illustration: <Svg500 className='iui-non-ideal-state-illustration' />,
    },
    {
      errorType: '502',
      errorName: 'Bad gateway',
      illustration: <Svg502 className='iui-non-ideal-state-illustration' />,
    },
    {
      errorType: '503',
      errorName: 'Service unavailable',
      illustration: <Svg503 className='iui-non-ideal-state-illustration' />,
    },
    {
      errorType: '504',
      errorName: 'Timed out',
      illustration: (
        <SvgTimedOut className='iui-non-ideal-state-illustration' />
      ),
    },
    {
      errorType: 'generic',
      errorName: 'Error',
      illustration: <SvgError className='iui-non-ideal-state-illustration' />,
    },
  ] as {
    errorType: ErrorPageType;
    errorName: string;
    illustration: JSX.Element;
  }[];

  defaultTests.forEach((test) => {
    it(`displays ${test.errorType} error with default message`, () => {
      const { container } = render(<ErrorPage errorType={test.errorType} />);
      screen.getByText(test.errorName);
      const {
        container: { firstChild: illustration },
      } = render(test.illustration);
      expect(
        container.querySelector('.iui-non-ideal-state-illustration'),
      ).toEqual(illustration);
    });
  });

  const customTests = [
    {
      errorType: '300',
      errorName: '300 error',
      errorMessage: 'Page has multiple choices',
    },
    {
      errorType: '301',
      errorName: '301 error',
      errorMessage: 'Page moved permanently',
    },
    {
      errorType: '302',
      errorName: '302 error',
      errorMessage: 'Page not found',
    },
    {
      errorType: '303',
      errorName: '303 error',
      errorMessage: 'Page moved temporarily',
    },
    {
      errorType: '304',
      errorName: '304 error',
      errorMessage: 'Page not modified',
    },
    {
      errorType: '305',
      errorName: '305 error',
      errorMessage: 'Page use proxy',
    },
    {
      errorType: '307',
      errorName: '307 error',
      errorMessage: 'Page moved temporarily',
    },
    {
      errorType: '308',
      errorName: '308 error',
      errorMessage: 'Page moved permanently',
    },
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
      errorType: '408',
      errorName: 'You encountered a 408 error',
      errorMessage: 'Request timeout.',
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
      errorType: '504',
      errorName: 'You encountered a 504 error',
      errorMessage: 'Gateway timeout.',
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
          redirect: 'a redirect',
          serviceUnavailable: 'the service is not available',
          unauthorized: 'you shall not pass',
          timedOut: 'the request timed out',
        }}
      />,
    );
    screen.getByText('you shall not pass');
  });

  it('should propagate misc props', () => {
    const { container } = render(
      <ErrorPage
        errorType='401'
        className='test class'
        style={{ color: 'blue' }}
      />,
    );

    const element = container.querySelector(
      '.iui-non-ideal-state',
    ) as HTMLElement;
    expect(element).toHaveClass('test class');
    expect(element).toHaveStyle('color: blue');
  });
});
