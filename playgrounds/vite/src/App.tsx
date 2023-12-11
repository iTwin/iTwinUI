import { Button, Flex, Tabs } from '@itwin/itwinui-react';
import React from 'react';

const App = () => {
  const [active, setActive] = React.useState('Item 5');

  const [shouldShowAll, setShouldShowAll] = React.useState(true);
  const [orientation, setOrientation] = React.useState<
    'horizontal' | 'vertical'
  >('vertical');

  const [key, setKey] = React.useState(0);

  const tabData = [
    { name: 'Item 1', content: 'Tab Content One', disabled: false },
    { name: 'Item 2', content: 'Tab Content Two', disabled: false },
    { name: 'Item 3', content: 'Tab Content Three', disabled: false },
    { name: 'Item 4', content: 'Tab Content Four', disabled: false },
    { name: 'Item 5', content: 'Tab Content Five', disabled: false },
    { name: 'Item 6', content: 'Tab Content Six', disabled: true },
    // {
    //   name: 'Very long item number thirteen',
    //   content: 'Tab Content Thirteen',
    //   disabled: false,
    // },
    ...(shouldShowAll
      ? [
          { name: 'Item 7', content: 'Tab Content Seven', disabled: false },
          { name: 'Item 8', content: 'Tab Content Eight', disabled: false },
          { name: 'Item 9', content: 'Tab Content Nine', disabled: true },
          { name: 'Item 10', content: 'Tab Content Ten', disabled: false },
          { name: 'Item 11', content: 'Tab Content Eleven', disabled: false },
          { name: 'Item 12', content: 'Tab Content Twelve', disabled: false },
          { name: 'Item 13', content: 'Tab Content Thirteen', disabled: false },
          { name: 'Item 14', content: 'Tab Content Fourteen', disabled: false },
          { name: 'Item 15', content: 'Tab Content Fifteen', disabled: false },
          { name: 'Item 16', content: 'Tab Content Sixteen', disabled: false },
          {
            name: 'Item 17',
            content: 'Tab Content Seventeen',
            disabled: false,
          },
          { name: 'Item 18', content: 'Tab Content Eighteen', disabled: false },
        ]
      : []),
  ];

  return (
    <Flex flexDirection='column' gap='m' alignItems='stretch'>
      <Flex>
        <Button
          onClick={() => {
            setOrientation((o) =>
              o === 'horizontal' ? 'vertical' : 'horizontal',
            );
          }}
        >
          Toggle orientation
        </Button>
        <Button
          onClick={() => {
            setShouldShowAll((s) => !s);
          }}
        >
          Toggle show all
        </Button>
        <Button
          onClick={() => {
            setKey((old) => old + 1);
          }}
        >
          Increase key
        </Button>
      </Flex>
      <div
        style={{
          height: '50vh',
          maxHeight: 400,
          minHeight: 100,
          border: '1px solid lightpink',
          padding: 8,
        }}
      >
        <Tabs.Wrapper
          key={key}
          // orientation='vertical'
          value={active}
          onValueChange={setActive}
          // type='pill'
          orientation={orientation}
        >
          <Tabs.TabList>
            {tabData?.map((item) => {
              return (
                <Tabs.Tab
                  key={item.name}
                  value={item.name}
                  disabled={item.disabled}
                  label={item.name}
                />
              );
            })}
          </Tabs.TabList>

          {/* <Tabs.Actions>
            <Button key={'button'}>Button</Button>
          </Tabs.Actions> */}

          {tabData.map((item) => (
            <Tabs.Panel key={item.name} value={item.name}>
              {item.content}
            </Tabs.Panel>
          ))}
        </Tabs.Wrapper>
      </div>
    </Flex>
  );

  // -----------------------------

  // return (
  //   <>
  //     <ul
  //       style={{
  //         height: '50vh',
  //         overflow: 'auto',
  //       }}
  //     >
  //       {Array.from(Array(1000).keys()).map((i) => (
  //         <li key={i}>
  //           <Item index={i} />
  //         </li>
  //       ))}
  //     </ul>
  //   </>
  // );
};

// const Item = ({ index }: { index: number }) => {
//   return <Button>Button {`#${index}`}</Button>;
// };

export default App;
