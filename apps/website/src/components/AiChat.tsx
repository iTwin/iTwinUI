import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './AiChat.module.css';

const sampleAnswer = `
* To style an iTwinUI \`Alert\`, you can use the following:
* Appearance:
  * Warning: Used to inform the user of something that is not currently disruptive to their work, but may be soon or eventually.
  * Informational: Default style when there is no defined status for the alert. Inform users about events that they should be aware of, but that are not disruptive to their work.`.trim();

export default function AiChat() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1>AI chat</h1>
        <p>Ask me anything about iTwinUI</p>
        <p>AI results may not always be accurate. Please reconfirm whenever applicable</p>
      </div>

      <ReactMarkdown className={styles.chat}>{sampleAnswer}</ReactMarkdown>

      <form className={styles.form}>
        <input className={styles.input} placeholder='Send a message...' value='' />
        <button className={styles.send} type='submit'>
          Send
        </button>
      </form>
    </div>
  );
}
