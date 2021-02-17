// Copyright (c) Bentley Systems, Incorporated. All rights reserved.
import Svg401 from '@bentley/illustrations/illustrations/401.svg';
import Svg403 from '@bentley/illustrations/illustrations/403.svg';
import Svg404 from '@bentley/illustrations/illustrations/404.svg';
import Svg500 from '@bentley/illustrations/illustrations/500.svg';
import Svg502 from '@bentley/illustrations/illustrations/502.svg';
import Svg503 from '@bentley/illustrations/illustrations/503.svg';
import SvgError from '@bentley/illustrations/illustrations/error.svg';
import React from 'react';
import { Button } from '../Buttons/Button';
import { useTheme } from '../utils/hooks/useTheme';
import '@bentley/itwinui/css/non-ideal-state.css';

export type ErrorPageType =
  | '401'
  | '403'
  | '404'
  | '500'
  | '502'
  | '503'
  | 'generic';

export type ErrorTypeTranslations = {
  badGateway: string;
  error: string;
  forbidden: string;
  internalServerError: string;
  pageNotFound: string;
  serviceUnavailable: string;
  unauthorized: string;
};

export type ErrorPageProps = {
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

export const ErrorPage = ({
  errorType,
  errorName,
  errorMessage,
  primaryButtonHandle,
  primaryButtonLabel,
  secondaryButtonHandle,
  secondaryButtonLabel,
  translatedErrorMessages,
}: ErrorPageProps): JSX.Element => {
  useTheme();

  const defaultErrorMessages = {
    badGateway: 'Bad gateway',
    error: 'Error',
    forbidden: 'Forbidden',
    internalServerError: 'Internal server error',
    pageNotFound: 'Page not found',
    serviceUnavailable: 'Service unavailable',
    unauthorized: 'Unauthorized',
    ...translatedErrorMessages,
  } as ErrorTypeTranslations;

  function getErrorIcon(): JSX.Element {
    switch (errorType) {
      case '401': {
        return (
          <img
            src={Svg401}
            className='iui-non-ideal-state-icon'
            alt={getHeadingMessage()}
            data-testid='error-401'
          />
        );
      }
      case '403': {
        return (
          <img
            src={Svg403}
            className='iui-non-ideal-state-icon'
            alt={getHeadingMessage()}
            data-testid='error-403'
          />
        );
      }
      case '404': {
        return (
          <img
            src={Svg404}
            className='iui-non-ideal-state-icon'
            alt={getHeadingMessage()}
            data-testid='error-404'
          />
        );
      }
      case '500': {
        return (
          <img
            src={Svg500}
            className='iui-non-ideal-state-icon'
            alt={getHeadingMessage()}
            data-testid='error-500'
          />
        );
      }
      case '502': {
        return (
          <img
            src={Svg502}
            className='iui-non-ideal-state-icon'
            alt={getHeadingMessage()}
            data-testid='error-502'
          />
        );
      }
      case '503': {
        return (
          <img
            src={Svg503}
            className='iui-non-ideal-state-icon'
            alt={getHeadingMessage()}
            data-testid='error-503'
          />
        );
      }
      case 'generic':
      default: {
        return (
          <img
            src={SvgError}
            className='iui-non-ideal-state-icon'
            alt={getHeadingMessage()}
            data-testid='error-generic'
          />
        );
      }
    }
  }

  function getHeadingMessage(): string {
    if (errorName) {
      return errorName;
    }

    switch (errorType) {
      case '401': {
        return defaultErrorMessages.unauthorized;
      }
      case '403': {
        return defaultErrorMessages.forbidden;
      }
      case '404': {
        return defaultErrorMessages.pageNotFound;
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
      <div className='iui-non-ideal-state-actions'>
        {primaryButton}
        {secondaryButton}
      </div>
    );
  }

  return (
    <div className='iui-non-ideal-state'>
      {getErrorIcon()}
      <div className='iui-non-ideal-state-title'>{getHeadingMessage()}</div>
      {errorMessage && (
        <div className='iui-non-ideal-state-description'>{errorMessage}</div>
      )}
      {getActions()}
    </div>
  );
};

export default ErrorPage;
