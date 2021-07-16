/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button, toaster } from '../../src/core';
import { Toast, ToastProps } from '../../src/core/Toast/Toast';
import { CreeveyMeta } from 'creevey';

export default {
  subcomponents: { Toast },
  argTypes: {
    content: {
      description:
        'Content of the Toast message. Can be passed in as a string or a jsx element.',
      type: { required: true },
    },
    type: {
      control: {
        options: ['persisting', 'temporary'],
        type: 'select',
      },
      description:
        'Persisting or Temporary. Persisting Toasts will not be closed automatically, and will contain a close button. Temporary Toasts will automatically close after 7 seconds and will not contain a close button.',
    },
    duration: {
      description: 'Duration of the toast, in milliseconds.',
    },
    hasCloseButton: {
      description: 'Boolean indicating when the close button is visible.',
    },
    link: {
      description:
        'Object to display a link on the toast. Has two properties, one for the title of the link, and another for the onClick event.',
    },
    onRemove: {
      action: 'Toast removed!',
    },
  },
  args: {
    duration: 7000,
    type: 'temporary',
    hasCloseButton: true,
    link: {
      title: 'Link',
      onClick: () => {
        alert('Link was clicked!');
      },
    },
  },
  parameters: {
    controls: { expanded: true },
    creevey: {
      captureElement: null,
      tests: {
        async open() {
          const button = await this.browser.findElement({
            className: 'iui-button',
          });

          await button.click();
          const opened = await this.takeScreenshot();

          await (
            await this.browser.findElement({
              css: '.iui-button:last-child',
            })
          ).click();
          await this.expect({ opened }).to.matchImages();
        },
      },
    },
  },
  title: 'Core/Toasts',
} as Meta<ToastProps> & CreeveyMeta;

export const Positive: Story<ToastProps> = ({
  content,
  duration,
  hasCloseButton,
  link,
  type,
  onRemove,
}) => {
  const displayPositiveToast = () => {
    toaster.positive(content, {
      duration,
      hasCloseButton,
      link,
      type,
      onRemove,
    });
  };

  return (
    <>
      <Button styleType='high-visibility' onClick={displayPositiveToast}>
        Positive
      </Button>
      <Button
        style={{ display: 'block', marginTop: 16 }}
        onClick={() => toaster.closeAll()}
      >
        Close All
      </Button>
    </>
  );
};

Positive.args = {
  content: 'This is a positive toast message',
};

export const Negative: Story<ToastProps> = ({
  duration,
  hasCloseButton,
  content,
  type,
  link,
  onRemove,
}) => {
  const displayNegativeToast = () => {
    toaster.negative(content, {
      duration,
      hasCloseButton,
      link,
      type,
      onRemove,
    });
  };

  return (
    <>
      <Button styleType='high-visibility' onClick={displayNegativeToast}>
        Negative
      </Button>
      <Button
        style={{ display: 'block', marginTop: 16 }}
        onClick={() => toaster.closeAll()}
      >
        Close All
      </Button>
    </>
  );
};

Negative.args = {
  content: 'This is a negative toast message',
};

export const Informational: Story<ToastProps> = ({
  duration,
  hasCloseButton,
  content,
  type,
  link,
  onRemove,
}) => {
  const displayInformationalToast = () => {
    toaster.informational(content, {
      duration,
      hasCloseButton,
      link,
      type,
      onRemove,
    });
  };

  return (
    <>
      <Button styleType='high-visibility' onClick={displayInformationalToast}>
        Informational
      </Button>
      <Button
        style={{ display: 'block', marginTop: 16 }}
        onClick={() => toaster.closeAll()}
      >
        Close All
      </Button>
    </>
  );
};

Informational.args = {
  content: 'This is an informational toast message',
};

export const Warning: Story<ToastProps> = ({ content, ...options }) => {
  const displayWarningToast = () => {
    toaster.warning(content, { ...options });
  };

  return (
    <>
      <Button styleType='high-visibility' onClick={displayWarningToast}>
        Warning
      </Button>
      <Button
        style={{ display: 'block', marginTop: 16 }}
        onClick={() => toaster.closeAll()}
      >
        Close All
      </Button>
    </>
  );
};

Warning.args = {
  content: 'This is a warning toast message',
};
