import * as React from 'react';
import styles from './right-panel.module.scss';
import { OverlayModal } from '../OverlayModal/overlay-modal';

export const RightPanel = () => {
  const [showOverlay, setShowOverlay] = React.useState(false);

  return (
    <div className={styles['right-panel']}>
      <p>some content</p>
      <button onClick={() => setShowOverlay(true)}>show overlay</button>
      <div style={{ justifySelf: 'flex-end' }}>
        <div>
          {showOverlay && <OverlayModal close={() => setShowOverlay(false)} />}
        </div>
      </div>
    </div>
  );
};
