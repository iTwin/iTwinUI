/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Anchor, Button, NonIdealState } from '@itwin/itwinui-react';
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

export default {
  title: 'NonIdealState',
};

export const Redirect = () => (
  <NonIdealState
    svg={<SvgRedirect />}
    heading='Redirect'
    description={
      <>
        Requested page has been moved permanently.
        <br />
        Unable to fulfill request.
      </>
    }
    actions={
      <>
        <Button
          onClick={() => console.log('Retrying')}
          styleType={'high-visibility'}
        >
          Retry
        </Button>
        <Button onClick={() => console.log('Contacting')}>Contact us</Button>
      </>
    }
  />
);
export const Unauthorized = () => (
  <NonIdealState
    svg={<Svg401 />}
    heading='Unauthorized'
    description={
      <>
        You do not have permission to access this server.
        <br />
        Unable to fulfill request.
      </>
    }
    actions={
      <>
        <Button
          onClick={() => console.log('Retrying')}
          styleType={'high-visibility'}
        >
          Retry
        </Button>
        <Button onClick={() => console.log('Contacting')}>Contact us</Button>
      </>
    }
  />
);

export const Forbidden = () => (
  <NonIdealState
    svg={<Svg403 />}
    heading='Forbidden'
    description={
      <>
        You do not have permission to access this server.
        <br />
        Unable to fulfill request.
      </>
    }
    actions={
      <>
        <Button
          onClick={() => console.log('Retrying')}
          styleType={'high-visibility'}
        >
          Retry
        </Button>
        <Button onClick={() => console.log('Contacting')}>Contact us</Button>
      </>
    }
  />
);

export const PageNotFound = () => (
  <NonIdealState
    svg={<Svg404 />}
    heading='Page not found'
    description={
      <>
        We can not find the iModel that you are looking for or it does not
        exist.
        <br />
        Visit the iModel HUB or contact our support team.
      </>
    }
    actions={
      <>
        <Button
          onClick={() => console.log('Retrying')}
          styleType={'high-visibility'}
        >
          Retry
        </Button>
        <Button onClick={() => console.log('Contacting')}>Contact us</Button>
      </>
    }
  />
);

export const TimeOut = () => (
  <NonIdealState
    svg={<SvgTimedOut />}
    heading='Timed out'
    description={
      <>
        Your request timed out.
        <br />
        Please try again.
      </>
    }
    actions={
      <>
        <Button
          onClick={() => console.log('Retrying')}
          styleType={'high-visibility'}
        >
          Retry
        </Button>
        <Button onClick={() => console.log('Contacting')}>Contact us</Button>
      </>
    }
  />
);

export const InternalServerError = () => (
  <NonIdealState
    svg={<Svg500 />}
    heading='Internal server error'
    description='Please retry again. If this continues to happen, please contact our support team or visit the iModel HUB.'
    actions={
      <>
        <Button
          onClick={() => console.log('Retrying')}
          styleType={'high-visibility'}
        >
          Retry
        </Button>
        <Button onClick={() => console.log('Contacting')}>Contact us</Button>
      </>
    }
  />
);

export const BadGateway = () => (
  <NonIdealState
    svg={<Svg502 />}
    heading='Bad gateway'
    description='The server encountered a temporary error. Please try again in 30 seconds or visit iModel HUB.'
    actions={
      <>
        <Button
          onClick={() => console.log('Retrying')}
          styleType={'high-visibility'}
        >
          Retry
        </Button>
        <Button onClick={() => console.log('Contacting')}>Contact us</Button>
      </>
    }
  />
);

export const ServiceUnavailable = () => (
  <NonIdealState
    svg={<Svg503 />}
    heading='Service unavailable'
    description='This service is being worked on. Please come back in a little bit or visit iModel HUB.'
    actions={
      <>
        <Button
          onClick={() => console.log('Retrying')}
          styleType={'high-visibility'}
        >
          Retry
        </Button>
        <Button onClick={() => console.log('Contacting')}>Contact us</Button>
      </>
    }
  />
);

export const Generic = () => (
  <NonIdealState
    svg={<SvgError />}
    heading='Error'
    description="We can't find the iModel that you are looking for or it does not exist. Visit the iModel HUB or contact our support team."
    actions={
      <>
        <Button
          onClick={() => console.log('Retrying')}
          styleType={'high-visibility'}
        >
          Retry
        </Button>
        <Button onClick={() => console.log('Contacting')}>Contact us</Button>
      </>
    }
  />
);

export const CustomHtmlMessage = () => (
  <NonIdealState
    svg={<SvgError />}
    heading='Error'
    description={
      <>
        A React component with an{' '}
        <Anchor href='https://www.bentley.com' target='_blank' rel='noreferrer'>
          anchor
        </Anchor>{' '}
        may be passed.
      </>
    }
    actions={
      <>
        <Button
          onClick={() => console.log('Retrying')}
          styleType={'high-visibility'}
        >
          Retry
        </Button>
        <Button onClick={() => console.log('Contacting')}>Contact us</Button>
      </>
    }
  />
);

export const WithoutMessageOrButtons = () => (
  <NonIdealState svg={<SvgError />} />
);
