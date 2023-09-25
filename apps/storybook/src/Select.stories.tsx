/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import React, { useCallback } from 'react';
import { MenuItem, Select, MiddleTextTruncation } from '@itwin/itwinui-react';
import { useState } from '@storybook/addons';
import SvgSmileyHappy from '@itwin/itwinui-icons-react/cjs/icons/SmileyHappy';
import SvgSmileyNeutral from '@itwin/itwinui-icons-react/cjs/icons/SmileyNeutral';
import SvgSmileySad from '@itwin/itwinui-icons-react/cjs/icons/SmileySad';

export default {
  title: 'Input/Select',
  component: Select,
  decorators: [
    (Story, context) =>
      context.story.includes('Truncate Middle Text') ? (
        <div style={{ minHeight: 365, width: 300 }}>
          <Story />
        </div>
      ) : (
        <div style={{ minHeight: 365 }}>
          <Story />
        </div>
      ),
  ],
};

export const Basic = () => {
  const options = [
    { value: 1, label: 'Item #1' },
    { value: 2, label: 'Item #2', disabled: true },
    { value: 3, label: 'Item #3' },
  ];
  const [value, setValue] = useState<number | undefined>(undefined);
  return (
    <Select<number>
      options={options}
      value={value}
      onChange={setValue}
      placeholder='Placeholder text'
    />
  );
};

export const WithIcons = () => {
  const options = [
    { value: 'happy', label: 'Happy', icon: <SvgSmileyHappy /> },
    { value: 'neutral', label: 'Neutral', icon: <SvgSmileyNeutral /> },
    { value: 'sad', label: 'Sad', icon: <SvgSmileySad /> },
  ];
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <Select<string>
      options={options}
      value={value}
      onChange={setValue}
      placeholder='How are you today?'
    />
  );
};

export const WithSelectedValue = () => {
  const options = [
    { value: 1, label: 'Item #1' },
    { value: 2, label: 'Item #2' },
    { value: 3, label: 'Item #3' },
  ];
  const [value, setValue] = useState<number>(2);
  return (
    <Select<number>
      options={options}
      value={value}
      onChange={setValue}
      placeholder='Placeholder text'
      popoverProps={{ visible: true }}
    />
  );
};

export const Disabled = () => {
  const options = [
    { value: 1, label: 'Item #1' },
    { value: 2, label: 'Item #2' },
    { value: 3, label: 'Item #3' },
  ];
  const [value, setValue] = useState<number | undefined>(undefined);
  return (
    <div style={{ minHeight: 350 }}>
      <Select<number>
        disabled
        options={options}
        value={value}
        onChange={setValue}
        placeholder='Placeholder text'
      />
    </div>
  );
};

export const DisabledWithSelectedValue = () => {
  const options = [
    { value: 1, label: 'Item #1' },
    { value: 2, label: 'Item #2' },
    { value: 3, label: 'Item #3' },
  ];
  const [value, setValue] = useState<number>(2);
  return (
    <div style={{ minHeight: 350 }}>
      <Select<number>
        options={options}
        value={value}
        onChange={setValue}
        placeholder='Placeholder text'
        disabled
      />
    </div>
  );
};

export const ManyItems = () => {
  const [value, setValue] = useState<number | undefined>(undefined);
  return (
    <Select<number>
      options={[...Array(20).fill(null)].map((_, index) => ({
        label: `Item #${index}`,
        value: index,
      }))}
      value={value}
      onChange={setValue}
      placeholder='Placeholder text'
    />
  );
};
export const Sublabels = () => {
  const options = [
    { value: 1, label: 'Item #1', sublabel: 'Sublabel #1' },
    { value: 2, label: 'Item #2', sublabel: 'Sublabel #2' },
    { value: 3, label: 'Item #3', sublabel: 'Sublabel #3' },
  ];
  const [value, setValue] = useState<number | undefined>(undefined);
  return (
    <Select<number>
      options={options}
      value={value}
      onChange={setValue}
      placeholder='Placeholder text'
      size='large'
    />
  );
};

export const Custom = () => {
  const options = [
    { value: 'yellow', label: 'Yellow' },
    { value: 'green', label: 'Green' },
    { value: 'red', label: 'Red' },
  ];
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    undefined,
  );
  return (
    <Select<string>
      options={options}
      value={selectedValue}
      onChange={setSelectedValue}
      placeholder='Placeholder text'
      itemRenderer={(option) => (
        <MenuItem style={{ color: option.value }}>{option.label}</MenuItem>
      )}
      selectedItemRenderer={(option) => (
        <span style={{ backgroundColor: option.value }}>{option.label}</span>
      )}
    />
  );
};

export const TruncateMiddleText = () => {
  const options = [
    {
      value:
        'MyFileWithAReallyLongNameThatWillBeTruncatedBecauseItIsReallyThatLongSoHardToBelieve_FinalVersion_V2.html',
      label:
        'MyFileWithAReallyLongNameThatWillBeTruncatedBecauseItIsReallyThatLongSoHardToBelieve_FinalVersion_V2.html',
    },
    { value: 'ShortNameFile.jpg', label: 'ShortNameFile.jpg' },
    { value: 'SomeOtherFile.dgn', label: 'SomeOtherFile.dgn' },
  ];
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    options[0].value,
  );

  const textRenderer = useCallback(
    (truncatedText: string, originalText: string) => (
      <span title={truncatedText !== originalText ? originalText : undefined}>
        {truncatedText}
      </span>
    ),
    [],
  );

  return (
    <Select<string>
      options={options}
      value={selectedValue}
      onChange={setSelectedValue}
      placeholder='Placeholder text'
      itemRenderer={(option) => (
        <MenuItem>
          <MiddleTextTruncation
            text={option.label}
            textRenderer={textRenderer}
          />
        </MenuItem>
      )}
      selectedItemRenderer={(option) => (
        <MiddleTextTruncation text={option.label} textRenderer={textRenderer} />
      )}
    />
  );
};

export const Multi = () => {
  const [value, setValue] = useState<number[]>([]);
  return (
    <div style={{ minHeight: 350 }}>
      <Select<number>
        options={[...Array(20).fill(null)].map((_, index) => ({
          label: `Item #${index}`,
          value: index,
        }))}
        value={value}
        onChange={(val, event) =>
          setValue((prev) =>
            event === 'removed'
              ? prev.filter((value) => val !== value)
              : [...prev, val],
          )
        }
        placeholder='Placeholder text'
        multiple
      />
    </div>
  );
};

export const MultiCustomRenderer = () => {
  const [value, setValue] = useState<number[]>([]);

  return (
    <div style={{ minHeight: 350 }}>
      <Select<number>
        options={[...Array(20).fill(null)].map((_, index) => ({
          label: `Item #${index}`,
          value: index,
        }))}
        value={value}
        onChange={(val, event) =>
          setValue((prev) =>
            event === 'removed'
              ? prev.filter((value) => val !== value)
              : [...(prev ?? []), val],
          )
        }
        placeholder='Placeholder text'
        multiple
        selectedItemRenderer={(options) => (
          <>{options.map((option) => option.label).join(', ')}</>
        )}
      />
    </div>
  );
};
