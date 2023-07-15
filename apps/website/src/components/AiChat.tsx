/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './AiChat.module.css';
import { InputGroup, Radio } from '@itwin/itwinui-react';

type ResponseType = 'only_code' | 'only_text' | 'code_and_text';

export default function AiChat() {
  const [responseAwaiting, setResponseAwaiting] = React.useState(false);

  const [message, setMessage] = React.useState('');
  const [responseType, setResponseType] = React.useState<ResponseType>('code_and_text');

  const [answer, setAnswer] = React.useState('');

  const fetchAnswer = async () => {
    if (responseAwaiting) {
      return;
    }
    setResponseAwaiting(true);

    // Send a post request to /api/search with the body that contains the query and the response_type.
    // The response will be the answer to the query.
    const response = await fetch('/api/search.json', {
      method: 'POST',
      body: JSON.stringify({ query: message, response_type: responseType }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();
    setAnswer(responseJson['textCompletion']);

    setResponseAwaiting(false);
  };

  const onRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResponseType(e.target.value as ResponseType);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>AI chat</h1>
        <p>Ask me anything about iTwinUI</p>
        <p>AI results may not always be accurate. Please reconfirm whenever applicable</p>
      </div>

      <ReactMarkdown className={styles.chat}>{answer}</ReactMarkdown>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();

          fetchAnswer();
        }}
      >
        <InputGroup label='What type of answers should I return?' displayStyle='inline'>
          {[
            { value: 'code_and_text', label: 'Both Text and Code' },
            { value: 'only_text', label: 'Only Text' },
            { value: 'only_code', label: 'Only Code' },
          ].map(({ value, label }) => (
            <Radio
              name='choice'
              defaultChecked={value === 'code_and_text'}
              value={value}
              label={label}
              onChange={onRadioChange}
            />
          ))}
        </InputGroup>
        <div className={styles['input-div']}>
          <textarea
            className={styles.input}
            placeholder='Send a message...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className={styles.send} type='submit' disabled={responseAwaiting}>
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
