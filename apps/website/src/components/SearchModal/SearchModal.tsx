import {
  Button,
  Input,
  Modal,
  ModalButtonBar,
  ModalContent,
  ProgressRadial,
} from '@itwin/itwinui-react';
import { useStore } from '@nanostores/react';
import React from 'react';

import ReactMarkdown from 'react-markdown';
import { isSearchOpen } from '~/stores/header.store.js';

import './SearchModal.scss';

export const SearchModal = () => {
  const sampleAnswer = `
* To style an iTwinUI \`Alert\`, you can use the following:
  * Appearance:
    * Warning: Used to inform the user of something that is not currently disruptive to their work, but may be soon or eventually.
    * Informational: Default style when there is no defined status for the alert. Inform users about events that they should be aware of, but that are not disruptive to their work.`;

  const $isSearchOpen = useStore(isSearchOpen);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [answer, setAnswer] = React.useState(sampleAnswer);
  const [responseAwaiting, setResponseAwaiting] = React.useState(false);

  const fetchAnswer = async () => {
    if (responseAwaiting) {
      return;
    }
    setResponseAwaiting(true);

    // Simulate network response
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setAnswer(sampleAnswer);
    setResponseAwaiting(false);
  };

  return (
    <Modal
      className='search-modal'
      isOpen={$isSearchOpen}
      title={'AI Powered Search'}
      onClose={() => isSearchOpen.set(false)}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          isSearchOpen.set(false);
        }
      }}
      isDismissible={false}
    >
      <ModalContent className='content'>
        <div style={{ flex: '1', overflowY: 'scroll' }}>
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
        <form
          onSubmit={(e) => {
            fetchAnswer();

            e.preventDefault();
            return false;
          }}
        >
          <Input
            placeholder='Send a message...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </ModalContent>
      <ModalButtonBar className='bottom-bar'>
        <Button onClick={() => isSearchOpen.set(false)}>Close</Button>
        {responseAwaiting ? (
          <ProgressRadial indeterminate={true} />
        ) : (
          <Button onClick={fetchAnswer}>Send</Button>
        )}
      </ModalButtonBar>
    </Modal>
  );
};
