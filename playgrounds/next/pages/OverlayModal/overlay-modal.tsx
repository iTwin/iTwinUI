import * as React from 'react';
import styles from './overlay-modal.module.scss';
import { ComboBox } from '@itwin/itwinui-react';

const comboBoxOptions = [
  { label: 'label1', value: 'value1' },
  { label: 'label2', value: 'value2' },
  { label: 'label3', value: 'value3' },
  { label: 'label4', value: 'value4' },
];

export const OverlayModal: React.FC<{ close: () => void }> = ({ close }) => {
  return (
    <div className={styles['overlay-modal']}>
      <div className={styles['content-box']}>
        <p>overlay content</p>
        <button onClick={() => close()}>close overlay</button>
        <ComboBox
          onChange={() => {}}
          options={comboBoxOptions}
          // status={'status'}
          value={'test'}
          inputProps={{
            placeholder: 'placeholder',
            disabled: false,
          }}
        />
      </div>
    </div>
  );
};
