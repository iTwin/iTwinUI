import {
  Button,
  ComboBox,
  Flex,
  LabeledInput,
  SearchBox,
  Select,
  Text,
} from '@itwin/itwinui-react';
import React from 'react';

const App = () => {
  return (
    <Flex flexDirection='column' gap='l' alignItems='stretch'>
      <Section title='iui-input-flex-container'>
        <SectionText>
          End IconButton gets no special styling. It gets the regular IconButton
          padding.
        </SectionText>

        <SectionSubtitle>SearchBox</SectionSubtitle>
        <SearchBox>
          <SearchBox.CollapsedState />
          <SearchBox.ExpandedState>
            <SearchBox.Icon />
            <SearchBox.Input />
            <SearchBox.CollapseButton />
          </SearchBox.ExpandedState>
        </SearchBox>

        <SearchBox size='small'>
          <SearchBox.CollapsedState />
          <SearchBox.ExpandedState>
            <SearchBox.Icon />
            <SearchBox.Input />
            <SearchBox.CollapseButton />
          </SearchBox.ExpandedState>
        </SearchBox>

        <SearchBox size='large'>
          <SearchBox.CollapsedState />
          <SearchBox.ExpandedState>
            <SearchBox.Icon />
            <SearchBox.Input />
            <SearchBox.CollapseButton />
          </SearchBox.ExpandedState>
        </SearchBox>
      </Section>

      <Section title='iui-input-with-icon'>
        <SectionText>
          iui-end-icon gets a right margin of 16px regardless of the size of the
          component.
        </SectionText>

        <SectionSubtitle>Select</SectionSubtitle>
        <Select<number>
          options={[
            { value: 1, label: 'Option 1' },
            { value: 2, label: 'Option 2' },
            { value: 3, label: 'Option 3' },
          ]}
        />
        <Select<number>
          options={[
            { value: 1, label: 'Option 1' },
            { value: 2, label: 'Option 2' },
            { value: 3, label: 'Option 3' },
          ]}
          size='small'
        />
        <Select<number>
          options={[
            { value: 1, label: 'Option 1' },
            { value: 2, label: 'Option 2' },
            { value: 3, label: 'Option 3' },
          ]}
          size='large'
        />

        <SectionSubtitle>ComboBox</SectionSubtitle>
        <ComboBox
          options={[
            { label: 'Item 1', value: 1 },
            { label: 'Item 2', value: 2 },
            { label: 'Item 3', value: 3 },
          ]}
          onChange={() => {}}
        />

        <SectionSubtitle>LabeledInput</SectionSubtitle>
        <LabeledInput label='Label' status='positive' />
        <LabeledInput label='Label' status='positive' size='small' />
        <LabeledInput label='Label' status='positive' size='large' />
      </Section>

      <Section title='Random/Edge cases'>
        {/* End icon has a 9px padding (.75rem) */}
        <SearchBox>
          <SearchBox.CollapsedState />
          <SearchBox.ExpandedState>
            <SearchBox.Icon />
            {/* <span>something</span> */}
            <SearchBox.Icon />
            <SearchBox.Icon />
            <SearchBox.Icon />
            <SearchBox.Input />
            <SearchBox.CollapseButton />
            <SearchBox.CollapseButton />
          </SearchBox.ExpandedState>
        </SearchBox>
        <SearchBox>
          <SearchBox.CollapsedState />
          <SearchBox.ExpandedState>
            <SearchBox.Icon />
            <SearchBox.Input />
            <SearchBox.CollapseButton />
          </SearchBox.ExpandedState>
        </SearchBox>
        <SearchBox size='small'>
          <SearchBox.CollapsedState />
          <SearchBox.ExpandedState>
            <SearchBox.Icon />
            <SearchBox.Icon />
            <SearchBox.Icon />
            <SearchBox.Icon />
            <SearchBox.Input />
            <SearchBox.CollapseButton />
            <SearchBox.CollapseButton />
          </SearchBox.ExpandedState>
        </SearchBox>
        <SearchBox size='large'>
          <SearchBox.CollapsedState />
          <SearchBox.ExpandedState>
            <SearchBox.Icon />
            <SearchBox.Icon />
            <SearchBox.Icon />
            <SearchBox.Icon />
            <SearchBox.Input />
            <SearchBox.CollapseButton />
            <SearchBox.CollapseButton />
          </SearchBox.ExpandedState>
        </SearchBox>

        <LabeledInput label='Label' status='positive' />
        <LabeledInput label='Label' status='positive' size='small' />
      </Section>
    </Flex>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Flex as='section' flexDirection='column' alignItems='stretch'>
    <Text as='h1' variant='title'>
      {title}
    </Text>
    {children}
  </Flex>
);

const SectionSubtitle = ({ children }: { children: React.ReactNode }) => (
  <Text as='h2' variant='subheading'>
    {children}
  </Text>
);

const SectionText = ({ children }: { children: React.ReactNode }) => (
  <Text as='p' variant='body'>
    {children}
  </Text>
);

export default App;
