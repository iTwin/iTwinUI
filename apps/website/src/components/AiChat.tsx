/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './AiChat.module.css';
import { InputGroup, Radio } from '@itwin/itwinui-react';
import { SvgHelpCircularHollow } from '@itwin/itwinui-icons-react';

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
        <InputGroup
          // label={<a href='#'>What type of answers should I return?</a>}
          className={styles['radio-input-group']}
          label={
            <div className={styles['radio-input-group-label']}>
              <p>What type of answers should I return?</p>
              {/* Question mark that upon hovered shows more information */}
              <div className={styles['question-mark-div']}>
                <SvgHelpCircularHollow className={styles['question-mark-svg']} />
                <div className={styles['question-mark-content']}>
                  <p>Try modifying this if you feel the results are not satisfactory.</p>
                  <br />
                  <ul>
                    <li>
                      <b>Both Text and Code</b> - Both text and code answers will be returned.
                    </li>
                    <li>
                      <b>Mainly Text</b> - Better text answers will be returned. May produce
                      incorrect code.
                    </li>
                    <li>
                      <b>Mainly Code</b> - Better code answers will be returned. May produce
                      incorrect text explanations.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          }
          // label={'What type of answers should I return?'}
          displayStyle='inline'
        >
          {[
            { value: 'code_and_text', label: 'Both Text and Code' },
            { value: 'only_text', label: 'Mainly Text' },
            { value: 'only_code', label: 'Mainly Code' },
          ].map(({ value, label }) => (
            <Radio
              key={value}
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
