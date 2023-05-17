import {
  Button,
  Input,
  Modal,
  ModalButtonBar,
  ModalContent,
  ProgressLinear,
  ProgressRadial,
} from '@itwin/itwinui-react';
import { action } from 'nanostores';
import React from 'react';

import ReactMarkdown from 'react-markdown';

export const SearchInput = () => {
  const sampleAnswer = `
* To style an iTwinUI alert, you can use the following:
  * Appearance:
    * Warning: Used to inform the user of something that is not currently disruptive to their work, but may be soon or eventually.
    * Informational: Default style when there is no defined status for the alert. Inform users about events that they should be aware of, but that are not disruptive to their work.`;

  const [isModalOpen, setIsModalOpen] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [answer, setAnswer] = React.useState(sampleAnswer);
  const [responseAwaiting, setResponseAwaiting] = React.useState(false);

  const fetchAnswer = async () => {
    if (responseAwaiting) {
      return;
    }
    setResponseAwaiting(true);

    try {
      const response = await fetch(`http://localhost:8000/search?query=${searchQuery}`);
      const data = await response.json();
      console.log(data);

      setAnswer(data);
    } catch (e) {
      console.error('ERROR', e);
    }

    setResponseAwaiting(false);
  };

  return (
    <div>
      <Input
        placeholder='Search'
        onClick={() => setIsModalOpen(true)}
        onChange={(e) => console.log(e.target.value)}
      />
      <Modal
        style={{ width: '50vw', height: '80vh', display: 'flex', flexDirection: 'column' }}
        isOpen={isModalOpen}
        title={'AI Powered Search'}
        onClose={() => setIsModalOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setIsModalOpen(false);
          }
        }}
        isDismissible={false}
      >
        {/* TODO: Confirm if need to wrap this div in <ModalContent> */}
        <div style={{ flex: '1', overflowY: 'scroll' }}>
          <ReactMarkdown className='prose lg:prose-xl'>{answer}</ReactMarkdown>
        </div>
        <Input
          placeholder='Send a message...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ModalButtonBar>
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          {responseAwaiting ? (
            <ProgressRadial indeterminate={true} />
          ) : (
            <Button onClick={() => fetchAnswer()}>Send</Button>
          )}
        </ModalButtonBar>
      </Modal>
    </div>
  );
};
