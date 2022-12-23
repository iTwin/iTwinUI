/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Story, Meta } from '@storybook/react';
import React from 'react';
import {
  Anchor,
  Button,
  NonIdealState,
  NonIdealStateProps,
} from '@itwin/itwinui-react';
import {
  Svg401,
  Svg403,
  Svg404,
  Svg500,
  Svg502,
  Svg503,
  SvgError,
  SvgRedirect,
  SvgTimedOut,
} from '@itwin/itwinui-illustrations-react';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Core/NonIdealState',
  component: NonIdealState,
  argTypes: {
    id: { control: { disable: true } },
    svg: { control: { disable: true } },
    actions: { control: { disable: true } },
  },
} as Meta<NonIdealStateProps>;

export const Redirect: Story<NonIdealStateProps> = (props) => (
  <NonIdealState {...props} />
);
Redirect.args = {
  svg: <SvgRedirect />,
  heading: 'Redirect',
  description: (
    <>
      Requested page has been moved permanently.
      <br />
      Unable to fulfill request.
    </>
  ),
  actions: (
    <>
      <Button onClick={action('Retrying')} styleType={'high-visibility'}>
        Retry
      </Button>
      <Button onClick={action('Contacting')}>Contact us</Button>
    </>
  ),
};

export const Unauthorized: Story<NonIdealStateProps> = (props) => (
  <NonIdealState {...props} />
);
Unauthorized.args = {
  svg: <Svg401 />,
  heading: 'Unauthorized',
  description: (
    <>
      You do not have permission to access this server.
      <br />
      Unable to fulfill request.
    </>
  ),
  actions: (
    <>
      <Button onClick={action('Retrying')} styleType={'high-visibility'}>
        Retry
      </Button>
      <Button onClick={action('Contacting')}>Contact us</Button>
    </>
  ),
};

export const Forbidden: Story<NonIdealStateProps> = (props) => (
  <NonIdealState {...props} />
);
Forbidden.args = {
  svg: <Svg403 />,
  heading: 'Forbidden',
  description: (
    <>
      You do not have permission to access this server.
      <br />
      Unable to fulfill request.
    </>
  ),
  actions: (
    <>
      <Button onClick={action('Retrying')} styleType={'high-visibility'}>
        Retry
      </Button>
      <Button onClick={action('Contacting')}>Contact us</Button>
    </>
  ),
};

export const PageNotFound: Story<NonIdealStateProps> = (props) => (
  <NonIdealState {...props} />
);
PageNotFound.args = {
  svg: <Svg404 />,
  heading: 'Page not found',
  description: (
    <>
      We can not find the iModel that you are looking for or it does not exist.
      <br />
      Visit the iModel HUB or contact our support team.
    </>
  ),
  actions: (
    <>
      <Button onClick={action('Retrying')} styleType={'high-visibility'}>
        Retry
      </Button>
      <Button onClick={action('Contacting')}>Contact us</Button>
    </>
  ),
};

export const TimeOut: Story<NonIdealStateProps> = (props) => (
  <NonIdealState {...props} />
);
TimeOut.args = {
  svg: <SvgTimedOut />,
  heading: 'Timed out',
  description: (
    <>
      Your request timed out.
      <br />
      Please try again.
    </>
  ),
  actions: (
    <>
      <Button onClick={action('Retrying')} styleType={'high-visibility'}>
        Retry
      </Button>
      <Button onClick={action('Contacting')}>Contact us</Button>
    </>
  ),
};

export const InternalServerError: Story<NonIdealStateProps> = (props) => (
  <NonIdealState {...props} />
);
InternalServerError.args = {
  svg: <Svg500 />,
  heading: 'Internal server error',
  description:
    'Please retry again. If this continues to happen, please contact our support team or visit the iModel HUB.',
  actions: (
    <>
      <Button onClick={action('Retrying')} styleType={'high-visibility'}>
        Retry
      </Button>
      <Button onClick={action('Contacting')}>Contact us</Button>
    </>
  ),
};

export const BadGateway: Story<NonIdealStateProps> = (props) => (
  <NonIdealState {...props} />
);
BadGateway.args = {
  svg: <Svg502 />,
  heading: 'Bad gateway',
  description:
    'The server encountered a temporary error. Please try again in 30 seconds or visit iModel HUB.',
  actions: (
    <>
      <Button onClick={action('Retrying')} styleType={'high-visibility'}>
        Retry
      </Button>
      <Button onClick={action('Contacting')}>Contact us</Button>
    </>
  ),
};

export const ServiceUnavailable: Story<NonIdealStateProps> = (props) => (
  <NonIdealState {...props} />
);
ServiceUnavailable.args = {
  svg: <Svg503 />,
  heading: 'Service unavailable',
  description:
    'This service is being worked on. Please come back in a little bit or visit iModel HUB.',
  actions: (
    <>
      <Button onClick={action('Retrying')} styleType={'high-visibility'}>
        Retry
      </Button>
      <Button onClick={action('Contacting')}>Contact us</Button>
    </>
  ),
};

export const Generic: Story<NonIdealStateProps> = (props) => (
  <NonIdealState {...props} />
);
Generic.args = {
  svg: <SvgError />,
  heading: 'Error',
  description:
    "We can't find the iModel that you are looking for or it does not exist. Visit the iModel HUB or contact our support team.",
  actions: (
    <>
      <Button onClick={action('Retrying')} styleType={'high-visibility'}>
        Retry
      </Button>
      <Button onClick={action('Contacting')}>Contact us</Button>
    </>
  ),
};

export const CustomHtmlMessage: Story<NonIdealStateProps> = (props) => (
  <NonIdealState {...props} />
);
CustomHtmlMessage.args = {
  svg: <SvgError />,
  heading: 'Error',
  description: (
    <>
      A React component with an{' '}
      <Anchor href='https://www.bentley.com' target='_blank' rel='noreferrer'>
        anchor
      </Anchor>{' '}
      may be passed.
    </>
  ),
  actions: (
    <>
      <Button onClick={action('Retrying')} styleType={'high-visibility'}>
        Retry
      </Button>
      <Button onClick={action('Contacting')}>Contact us</Button>
    </>
  ),
};

export const WithoutMessageOrButtons: Story<NonIdealStateProps> = (props) => (
  <NonIdealState {...props} />
);
WithoutMessageOrButtons.args = {
  svg: <SvgError />,
};
