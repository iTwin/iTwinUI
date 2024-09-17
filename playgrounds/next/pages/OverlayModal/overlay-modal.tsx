import * as React from 'react';
import './overlay-modal.scss';
import { ComboBox } from '@itwin/itwinui-react';

const comboBoxOptions = [
  { label: 'label1', value: 'value1' },
  { label: 'label2', value: 'value2' },
  { label: 'label3', value: 'value3' },
  { label: 'label4', value: 'value4' },
];

export const OverlayModal: React.FC<{ close: () => void }> = ({ close }) => {
  return (
    <div className={'overlay-modal'}>
      <div className={'content-box'}>
        <p>overlay content</p>
        <button onClick={() => close()}>close overlay</button>
        <ComboBox
          onChange={() => {}}
          options={comboBoxOptions}
          status={'status'}
          value={'test'}
          inputProps={{
            placeholder: 'placeholder',
            disabled: false,
          }}
          dropdownMenuProps={{
            // should work with versions until v6
            boundry: 'window',
            // should work after v6
            // https://github.com/atomiks/tippyjs/blob/master/MIGRATION_GUIDE.md#if-you-were-using-boundary
            popperOptions: {
              modifiers: [
                {
                  name: 'preventOverflow',
                  options: {
                    // equivalent to boundary: 'window' in v1, usually NOT necessary in v2
                    rootBoundary: 'document',
                  },
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};
