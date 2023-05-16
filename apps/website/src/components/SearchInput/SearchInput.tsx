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

export const SearchInput = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [responseAwaiting, setResponseAwaiting] = React.useState(false);

  const fetchAnswer = async () => {
    if (responseAwaiting) {
      return;
    }
    setResponseAwaiting(true);

    // Call localhost:8000/answer?query=searchQuery
    const response = await fetch(`http://localhost:8000/search?query=${searchQuery}`);
    const data = await response.json();
    console.log(data);

    // // Set answer to the response
    // setAnswer(data);

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
        <ModalContent>{/* ChatGPT's conversation messages*/}</ModalContent>
        <p>{answer}</p>
        <Input
          placeholder='Send a message...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <ModalButtonBar>
          <Button onClick={() => setIsModalOpen(false)}>Close</Button>
          {responseAwaiting ? (
            <ProgressRadial />
          ) : (
            <Button onClick={() => fetchAnswer()}>Send</Button>
          )}
        </ModalButtonBar>
      </Modal>
    </div>
  );
};
