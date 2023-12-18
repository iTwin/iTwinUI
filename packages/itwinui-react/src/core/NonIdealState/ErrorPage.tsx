/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import { Button } from '../Buttons/Button.js';
import { NonIdealState } from './NonIdealState.js';
import { ProgressRadial } from '../ProgressIndicators/ProgressRadial.js';
import { isDev } from '../utils/index.js';
import type { PolymorphicForwardRefComponent } from '../utils/index.js';

/**
 * If `@itwin/itwinui-illustrations-react` is not found, we will log an error
 * and return an empty component to prevent crashing the app.
 */
const failGracefully = () => {
  if (isDev) {
    console.warn(
      'ErrorPage component requires manually installing the @itwin/itwinui-illustrations-react package.\n' +
        'If you are not using ErrorPage, you can safely ignore this warning.',
    );
  }
  return { default: () => null };
};

const Svg401 = React.lazy(() =>
  import('@itwin/itwinui-illustrations-react/Svg401').catch(failGracefully),
);
const Svg403 = React.lazy(() =>
  import('@itwin/itwinui-illustrations-react/Svg403').catch(failGracefully),
);
const Svg404 = React.lazy(() =>
  import('@itwin/itwinui-illustrations-react/Svg404').catch(failGracefully),
);
const Svg500 = React.lazy(() =>
  import('@itwin/itwinui-illustrations-react/Svg500').catch(failGracefully),
);
const Svg502 = React.lazy(() =>
  import('@itwin/itwinui-illustrations-react/Svg502').catch(failGracefully),
);
const Svg503 = React.lazy(() =>
  import('@itwin/itwinui-illustrations-react/Svg503').catch(failGracefully),
);
const SvgError = React.lazy(() =>
  import('@itwin/itwinui-illustrations-react/SvgError').catch(failGracefully),
);
const SvgRedirect = React.lazy(() =>
  import('@itwin/itwinui-illustrations-react/SvgRedirect').catch(
    failGracefully,
  ),
);
const SvgTimedOut = React.lazy(() =>
  import('@itwin/itwinui-illustrations-react/SvgTimedOut').catch(
    failGracefully,
  ),
);

/** @deprecated Use `NonIdealState` instead. */
export type ErrorPageType =
  | '300'
  | '301'
  | '302'
  | '303'
  | '304'
  | '305'
  | '307'
  | '308'
  | '401'
  | '403'
  | '404'
  | '408'
  | '500'
  | '502'
  | '503'
  | '504'
  | 'generic';

/** @deprecated Use `NonIdealState` instead. */
export type ErrorTypeTranslations = {
  badGateway: string;
  error: string;
  forbidden: string;
  internalServerError: string;
  redirect?: string;
  pageNotFound: string;
  serviceUnavailable: string;
  timedOut?: string;
  unauthorized: string;
};

type ErrorPageProps = {
  /**
   * Type of error controls image and default text
   */
  errorType: ErrorPageType;

  /**
   * Primary heading for the error page
   */
  errorName?: string;

  /**
   * Secondary text to explain the error
   * Can include html in order to provide a hyperlink
   * E.g. `Please visit <a href="https://www.bentley.com/help">our support page</a> for help.`
   */
  errorMessage?: React.ReactNode;

  /**
   * On click handler for primary button, if left out no primary button will be displayed
   */
  primaryButtonHandle?: () => void;

  /**
   * Text for primary button, if left out no primary button will be displayed
   */
  primaryButtonLabel?: string;

  /**
   * On click handler for secondary button, if left out no secondary button will be displayed
   */
  secondaryButtonHandle?: () => void;

  /**
   * Text for secondary button, if left out no secondary button will be displayed
   */
  secondaryButtonLabel?: string;

  /**
   * Used to translate default error messages, if no specific @errorName passed in
   */
  translatedErrorMessages?: ErrorTypeTranslations;
};

/**
 * @deprecated Use `NonIdealState` instead for a smaller client bundle.
 *
 * A stylized display to communicate common http errors.
 * @example
 * <ErrorPage errorType='401' />
 */
export const ErrorPage = React.forwardRef((props, forwardedRef) => {
  const {
    errorType,
    errorName,
    errorMessage,
    primaryButtonHandle,
    primaryButtonLabel,
    secondaryButtonHandle,
    secondaryButtonLabel,
    translatedErrorMessages,
    ...rest
  } = props;

  const defaultErrorMessages = {
    badGateway: 'Bad gateway',
    error: 'Error',
    forbidden: 'Forbidden',
    internalServerError: 'Internal server error',
    redirect: 'Redirect',
    pageNotFound: 'Page not found',
    serviceUnavailable: 'Service unavailable',
    timedOut: 'Timed out',
    unauthorized: 'Unauthorized',
    ...translatedErrorMessages,
  } as ErrorTypeTranslations;

  function getErrorIcon(): JSX.Element {
    switch (errorType) {
      case '300':
      case '301':
      case '302':
      case '303':
      case '304':
      case '305':
      case '307':
      case '308': {
        return <SvgRedirect />;
      }
      case '401': {
        return <Svg401 />;
      }
      case '403': {
        return <Svg403 />;
      }
      case '404': {
        return <Svg404 />;
      }
      case '408':
      case '504': {
        return <SvgTimedOut />;
      }
      case '500': {
        return <Svg500 />;
      }
      case '502': {
        return <Svg502 />;
      }
      case '503': {
        return <Svg503 />;
      }
      case 'generic':
      default: {
        return <SvgError />;
      }
    }
  }

  function getHeadingMessage(): string {
    if (errorName) {
      return errorName;
    }

    switch (errorType) {
      case '300':
      case '301':
      case '302':
      case '303':
      case '304':
      case '305':
      case '307':
      case '308': {
        return defaultErrorMessages.redirect || '';
      }
      case '401': {
        return defaultErrorMessages.unauthorized;
      }
      case '403': {
        return defaultErrorMessages.forbidden;
      }
      case '404': {
        return defaultErrorMessages.pageNotFound;
      }
      case '408':
      case '504': {
        return defaultErrorMessages.timedOut || '';
      }
      case '500': {
        return defaultErrorMessages.internalServerError;
      }
      case '502': {
        return defaultErrorMessages.badGateway;
      }
      case '503': {
        return defaultErrorMessages.serviceUnavailable;
      }
      case 'generic':
      default: {
        return defaultErrorMessages.error;
      }
    }
  }

  function getPrimaryButton(): JSX.Element | undefined {
    if (!primaryButtonHandle || !primaryButtonLabel) {
      return undefined;
    }
    return (
      <Button styleType='high-visibility' onClick={primaryButtonHandle}>
        {primaryButtonLabel}
      </Button>
    );
  }

  function getSecondaryButton(): JSX.Element | undefined {
    if (!secondaryButtonHandle || !secondaryButtonLabel) {
      return undefined;
    }
    return (
      <Button styleType='default' onClick={secondaryButtonHandle}>
        {secondaryButtonLabel}
      </Button>
    );
  }

  function getActions(): JSX.Element | undefined {
    const primaryButton = getPrimaryButton();
    const secondaryButton = getSecondaryButton();

    if (!primaryButton && !secondaryButton) {
      return undefined;
    }

    return (
      <>
        {primaryButton}
        {secondaryButton}
      </>
    );
  }

  return (
    <NonIdealState
      svg={
        <React.Suspense fallback={<ProgressRadial />}>
          {getErrorIcon()}
        </React.Suspense>
      }
      heading={getHeadingMessage()}
      description={errorMessage}
      actions={getActions()}
      ref={forwardedRef}
      {...rest}
    />
  );
}) as PolymorphicForwardRefComponent<'div', ErrorPageProps>;

export default ErrorPage;
