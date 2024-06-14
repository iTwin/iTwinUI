/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { useRef } from 'react';
import { Button, useToaster, ProgressRadial } from '@itwin/itwinui-react';

export default {
  title: 'Toasts',
};

export const Positive = () => {
  const toaster = useToaster();

  const displayPositiveToast = () => {
    toaster.setSettings({
      placement: 'top',
      order: 'descending',
    });
    toaster.positive('This is a positive toast message', {
      duration: 7000,
      hasCloseButton: true,
      link: {
        title: 'Link',
        onClick: () => {
          alert('Link was clicked!');
        },
      },
      type: 'temporary',
      onRemove: () => {
        console.log('Toast removed!');
      },
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

export const Negative = () => {
  const toaster = useToaster();

  const displayNegativeToast = () => {
    toaster.setSettings({
      placement: 'top',
      order: 'descending',
    });
    toaster.negative('This is a negative toast message', {
      duration: 7000,
      hasCloseButton: true,
      link: {
        title: 'Link',
        onClick: () => {
          alert('Link was clicked!');
        },
      },
      type: 'temporary',
      onRemove: () => {
        console.log('Toast removed!');
      },
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

export const Informational = () => {
  const toaster = useToaster();

  const displayInformationalToast = () => {
    toaster.setSettings({
      placement: 'top',
      order: 'descending',
    });
    toaster.informational('This is an informational toast message', {
      duration: 7000,
      hasCloseButton: true,
      link: {
        title: 'Link',
        onClick: () => {
          alert('Link was clicked!');
        },
      },
      type: 'temporary',
      onRemove: () => {
        console.log('Toast removed!');
      },
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

export const Warning = () => {
  const toaster = useToaster();

  const displayWarningToast = () => {
    toaster.setSettings({
      placement: 'top',
      order: 'descending',
    });
    toaster.warning('This is a warning toast message', {
      duration: 7000,
      hasCloseButton: true,
      link: {
        title: 'Link',
        onClick: () => {
          alert('Link was clicked!');
        },
      },
      type: 'temporary',
      onRemove: () => {
        console.log('Toast removed!');
      },
    });
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

export const PositionChanged = () => {
  const toaster = useToaster();

  const displayPositionChangedToast = () => {
    toaster.setSettings({
      placement: 'bottom-end',
    });
    toaster.informational('This is a toast message', {
      duration: 7000,
      hasCloseButton: true,
      link: {
        title: 'Link',
        onClick: () => {
          alert('Link was clicked!');
        },
      },
      type: 'temporary',
      onRemove: () => {
        console.log('Toast removed!');
      },
    });
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

export const AnchorToButton = () => {
  const toaster = useToaster();

  const buttonRef = useRef(null);
  const displayPositiveToast = () => {
    toaster.setSettings({
      placement: 'top',
      order: 'descending',
    });
    toaster.positive('This is a positive toast message', {
      duration: 7000,
      hasCloseButton: true,
      link: {
        title: 'Link',
        onClick: () => {
          alert('Link was clicked!');
        },
      },
      type: 'temporary',
      onRemove: () => {
        console.log('Toast removed!');
      },
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

export const CloseIndividual = () => {
  const toaster = useToaster();

  const displayProcessToast = () => {
    toaster.setSettings({
      placement: 'top',
      order: 'descending',
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
        duration: 7000,
        hasCloseButton: true,
        link: {
          title: 'Link',
          onClick: () => {
            alert('Link was clicked!');
          },
        },
        type: 'persisting',
        onRemove: () => {
          console.log('Toast removed!');
        },
      },
    );

    setTimeout(() => {
      close();
      toaster.positive('Process completed', {
        duration: 7000,
        hasCloseButton: true,
        link: {
          title: 'Link',
          onClick: () => {
            alert('Link was clicked!');
          },
        },
        type: 'persisting',
        onRemove: () => {
          console.log('Toast removed!');
        },
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
