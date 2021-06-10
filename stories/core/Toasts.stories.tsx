/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button, toaster } from '../../src/core';
import { ToastProps } from '../../src/core/Toast/Toast';
import { CreeveyMeta } from 'creevey';

export default {
  argTypes: {
    content: {
      control: {
        type: 'text',
      },
      defaultValue: 'This is a toast message',
      description:
        'Content of the Toast message. Can be passed in as a string or a jsx element.',
      type: { name: 'string', required: true },
    },
    type: {
      control: {
        options: ['persisting', 'temporary'],
        type: 'select',
      },
      defaultValue: 'temporary',
      description:
        'Persisting or Temporary. Persisting Toasts will not be closed automatically, and will contain a close button. Temporary Toasts will automatically close after 7 seconds and will not contain a close button.',
      table: {
        defaultValue: { summary: 'temporary' },
      },
      type: { name: 'select', required: false },
    },
    duration: {
      control: {
        type: 'number',
      },
      defaultValue: 7000,
      description: 'Duration of the toast, in milliseconds.',
      table: {
        defaultValue: { summary: 7000 },
      },
      type: { name: 'number', required: false },
    },
    hasCloseButton: {
      control: {
        type: 'boolean',
      },
      defaultValue: true,
      description: 'Boolean indicating when the close button is visible.',
      table: {
        defaultValue: { summary: true },
      },
      type: { name: 'boolean', required: false },
    },
    link: {
      control: {
        type: 'object',
      },
      defaultValue: {
        title: 'Link',
        onClick: () => {
          alert('Link was clicked!');
        },
      },
      description:
        'Object to display a link on the toast. Has two properties, one for the title of the link, and another for the onClick event.',
    },
    onRemove: {
      action: 'Toast removed!',
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

Positive.argTypes = {
  content: {
    defaultValue: 'This is a positive toast message',
  },
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

Negative.argTypes = {
  content: {
    defaultValue: 'This is a negative toast message',
  },
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

Informational.argTypes = {
  content: {
    defaultValue: 'This is an informational toast message',
  },
};
