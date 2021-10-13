/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Button, toaster, ProgressRadial } from '../../src/core';
import { Toast, ToastProps } from '../../src/core/Toast/Toast';
import { CreeveyMeta } from 'creevey';
import { ToasterSettings } from '../../src/core/Toast/Toaster';

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
    placement: {
      control: {
        options: [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
        ],
        type: 'select',
      },
      defaultValue: 'top',
      description:
        'Changes placement of toasts. *-start indicated left side of viewport. *-end - right side of viewport.',
    },
    order: {
      control: {
        options: ['descending', 'ascending'],
        type: 'select',
      },
      description: `Order of toasts. Descending places toasts from newest to oldest (new toasts appear on the top of the list). Ascending - from oldest to newest (new toasts appear on the bottom of the list). When placement is set and order not specified, toasts are ordered by placement. Top placement sets order 'descending', bottom placement sets order 'ascending'.`,
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
} as Meta<ToastProps & ToasterSettings> & CreeveyMeta;

export const Positive: Story<ToastProps & ToasterSettings> = ({
  content,
  duration,
  hasCloseButton,
  link,
  type,
  onRemove,
  placement,
  order,
}) => {
  const displayPositiveToast = () => {
    toaster.setSettings({
      placement: placement ?? 'top',
      order: order ?? 'descending',
    });
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

export const Negative: Story<ToastProps & ToasterSettings> = ({
  duration,
  hasCloseButton,
  content,
  type,
  link,
  onRemove,
  placement,
  order,
}) => {
  const displayNegativeToast = () => {
    toaster.setSettings({
      placement: placement ?? 'top',
      order: order ?? 'descending',
    });
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

export const Informational: Story<ToastProps & ToasterSettings> = ({
  duration,
  hasCloseButton,
  content,
  type,
  link,
  onRemove,
  placement,
  order,
}) => {
  const displayInformationalToast = () => {
    toaster.setSettings({
      placement: placement ?? 'top',
      order: order ?? 'descending',
    });
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

export const Warning: Story<ToastProps & ToasterSettings> = ({
  content,
  placement,
  order,
  ...options
}) => {
  const displayWarningToast = () => {
    toaster.setSettings({
      placement: placement ?? 'top',
      order: order ?? 'descending',
    });
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

export const PositionChanged: Story<ToastProps & ToasterSettings> = ({
  content,
  placement,
  order,
  ...options
}) => {
  const displayPositionChangedToast = () => {
    toaster.setSettings({
      placement: placement ?? 'bottom-end',
      order: order,
    });
    toaster.informational(content, { ...options });
  };

  return (
    <>
      <Button styleType='high-visibility' onClick={displayPositionChangedToast}>
        Toast
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

PositionChanged.args = {
  content: 'This is a toast message',
  placement: 'bottom-end',
};

export const AnchorToButton: Story<ToastProps & ToasterSettings> = ({
  content,
  duration,
  hasCloseButton,
  link,
  type,
  onRemove,
  placement,
  order,
}) => {
  const buttonRef = React.useRef(null);
  const displayPositiveToast = () => {
    toaster.setSettings({
      placement: placement ?? 'top',
      order: order ?? 'descending',
    });
    toaster.positive(content, {
      duration,
      hasCloseButton,
      link,
      type,
      onRemove,
      animateOutTo: buttonRef.current,
    });
  };

  return (
    <>
      <Button
        ref={buttonRef}
        styleType='high-visibility'
        onClick={displayPositiveToast}
      >
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

AnchorToButton.args = {
  content: 'This is a positive toast message',
};

export const CloseIndividual: Story<ToastProps & ToasterSettings> = ({
  duration,
  hasCloseButton,
  link,
  type,
  onRemove,
  placement,
  order,
}) => {
  const displayProcessToast = () => {
    toaster.setSettings({
      placement: placement ?? 'top',
      order: order ?? 'descending',
    });
    const { close } = toaster.informational(
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
        }}
      >
        <ProgressRadial
          size={'small'}
          indeterminate
          style={{ marginRight: '8px' }}
        />
        Your process is running...
      </div>,
      {
        duration,
        hasCloseButton,
        link,
        type,
        onRemove,
      },
    );

    setTimeout(() => {
      close();
      toaster.positive('Process completed', {
        duration,
        hasCloseButton,
        link,
        type: 'temporary',
        onRemove,
      });
    }, 3000);
  };

  return (
    <>
      <Button styleType='high-visibility' onClick={displayProcessToast}>
        Start process
      </Button>
    </>
  );
};

CloseIndividual.args = {
  type: 'persisting',
};
