/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Alert } from '@itwin/itwinui-react';
import { SvgPlaceholder, SvgSmileyHappy } from '@itwin/itwinui-icons-react';

export default {
  title: 'Alert',
};

export const Informational = () => {
  return (
    <Alert.Wrapper type='informational'>
      <Alert.Icon />
      <Alert.Message>
        This is an informational message.
        <Alert.Action onClick={() => console.log('Clicked more info!')}>
          More Info.
        </Alert.Action>
      </Alert.Message>
      <Alert.CloseButton onClick={() => console.log('Close!')} />
    </Alert.Wrapper>
  );
};

export const Positive = () => {
  return (
    <Alert.Wrapper type='positive'>
      <Alert.Icon />
      <Alert.Message>
        This is a positive message.
        <Alert.Action onClick={() => console.log('Clicked more info!')}>
          More Info.
        </Alert.Action>
      </Alert.Message>
      <Alert.CloseButton onClick={() => console.log('Close!')} />
    </Alert.Wrapper>
  );
};

export const Warning = () => {
  return (
    <Alert.Wrapper type='warning'>
      <Alert.Icon />
      <Alert.Message>
        This is a warning message.
        <Alert.Action onClick={() => console.log('Clicked more info!')}>
          More Info.
        </Alert.Action>
      </Alert.Message>
      <Alert.CloseButton onClick={() => console.log('Close!')} />
    </Alert.Wrapper>
  );
};

export const Negative = () => {
  return (
    <Alert.Wrapper type='negative'>
      <Alert.Icon />
      <Alert.Message>
        This is a negative message.
        <Alert.Action onClick={() => console.log('Clicked more info!')}>
          More Info.
        </Alert.Action>
      </Alert.Message>
      <Alert.CloseButton onClick={() => console.log('Close!')} />
    </Alert.Wrapper>
  );
};

export const Sticky = () => {
  return (
    <div
      style={{
        height: '150px',
        overflow: 'overlay',
        textAlign: 'justify',
        border: 'solid 0.5px',
      }}
    >
      <Alert.Wrapper type='informational' isSticky={true}>
        <Alert.Icon />
        <Alert.Message>
          This is sticky!
          <Alert.Action onClick={() => console.log('Clicked more info!')}>
            More Info.
          </Alert.Action>
        </Alert.Message>
        <Alert.CloseButton onClick={() => console.log('Close!')} />
      </Alert.Wrapper>
      <p style={{ margin: 0, padding: '8px' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
        in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
        qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
  );
};

export const Empty = () => {
  return (
    <Alert.Wrapper type='informational'>
      <Alert.Icon />
      <Alert.Message>This is an empty info message.</Alert.Message>
    </Alert.Wrapper>
  );
};

export const CustomIcon = () => {
  return (
    <Alert.Wrapper type='informational'>
      <Alert.Icon>
        <SvgSmileyHappy />
      </Alert.Icon>
      <Alert.Message>This is an info message with a custom icon.</Alert.Message>
      <Alert.CloseButton onClick={() => console.log('Close!')}>
        <SvgPlaceholder />
      </Alert.CloseButton>
    </Alert.Wrapper>
  );
};
