import { SvgMore } from '@itwin/itwinui-icons-react';
import {
  // Button,
  DropdownMenu,
  Flex,
  IconButton,
  MenuItem,
  ToggleSwitch,
  Text,
  Badge,
} from '@itwin/itwinui-react';
import React from 'react';

const App = () => {
  const onClick = (index: number, close: () => void) => () => {
    console.log(`Item #${index} clicked!`);
    close();
  };
  const dropdownMenuItems = (close: () => void) => [
    <MenuItem key={1} onClick={onClick(1, close)}>
      Item #1
    </MenuItem>,
    <MenuItem key={2} onClick={onClick(2, close)}>
      Item #2
    </MenuItem>,
    <MenuItem
      key={3}
      subMenuItems={[
        <MenuItem
          key={4}
          subMenuItems={[
            <MenuItem key={7} onClick={onClick(7, close)}>
              Item #7
            </MenuItem>,
            <MenuItem key={8} onClick={onClick(8, close)}>
              Item #8
            </MenuItem>,
          ]}
        >
          Item #4
        </MenuItem>,
        <MenuItem key={5} onClick={onClick(5, close)}>
          Item #5
        </MenuItem>,
        <MenuItem
          key={6}
          subMenuItems={Array.from({ length: 20 }, (_, i) => (
            <MenuItem key={i + 9} onClick={onClick(i + 9, close)}>
              Item #{i + 9}
            </MenuItem>
          ))}
        >
          Item #6
        </MenuItem>,
      ]}
    >
      Item #3
    </MenuItem>,
  ];

  const [quality, setQuality] = React.useState('1080p');
  const [speed, setSpeed] = React.useState(1);
  const [enabledAccessibilityOptions, setEnabledAccessibilityOptions] =
    React.useState(['Reduced transparency', 'High contrast']);

  const speedScrolledIntoView = React.useRef(false);

  // console.log('accessibility options: ', enabledAccessibilityOptions);

  const videoMenuItems = (close: () => void) => [
    <MenuItem
      key={1}
      subMenuItems={
        [
          'Auto',
          '240p',
          '360p',
          '480p',
          '720p',
          '1080p',
          // '1440p',
          // '2160p',
          // '4320p',
        ].map((q) => (
          <MenuItem
            key={q}
            onClick={() => setQuality(q)}
            isSelected={quality === q}
          >
            {q}
          </MenuItem>
        ))
        // [
        // <MenuItem key={4} onClick={onClick(4, close)}>
        //   Auto
        // </MenuItem>,
        // <MenuItem key={5} onClick={onClick(5, close)}>
        //   720p
        // </MenuItem>,
        // <MenuItem key={6} onClick={onClick(6, close)}>
        //   480p
        // </MenuItem>,
        // ]
      }
    >
      Quality
    </MenuItem>,
    <MenuItem
      key={2}
      ref={() => void (speedScrolledIntoView.current = false)}
      subMenuItems={Array.from({ length: 20 }, (_, i) => {
        const itemSpeed = i * 0.1 + 0.2;

        return (
          <MenuItem
            ref={(el) => {
              // If the item is selected, scroll it into view, but only in the beginning.
              if (speed === itemSpeed && !speedScrolledIntoView.current) {
                el?.scrollIntoView({
                  block: 'center',
                });
                speedScrolledIntoView.current = true;
              }
            }}
            key={i + 7}
            onClick={() => {
              setSpeed(itemSpeed);
            }}
            isSelected={speed === itemSpeed}
          >
            {itemSpeed.toFixed(2)}x
          </MenuItem>
        );
      })}
    >
      Speed
    </MenuItem>,
    <MenuItem key={3}>
      <Flex>
        <Text>Loop</Text>
        <Flex.Spacer />
        <ToggleSwitch />
        {/* <ToggleSwitch label='Loop' labelPosition='left' /> */}
      </Flex>
    </MenuItem>,
    <MenuItem
      key={4}
      subMenuItems={[
        'Increased subtitle font size',
        'Reduced transparency',
        'Invert colors',
        'High contrast',
      ].map((item) => (
        <MenuItem
          key={item}
          role='menuitemcheckbox'
          onClick={() => {
            // setEnabledAccessibilityOptions((prev) => {
            //   if (prev.includes(item)) {
            //     return prev.filter((i) => i !== item);
            //   }
            //   return [...prev, item];
            // });
            setEnabledAccessibilityOptions((prev) => {
              if (!prev.includes(item)) {
                return [...prev, item];
              }
              return prev.filter((i) => i !== item);
            });
          }}
        >
          <Flex>
            <Text>{item}</Text>
            <Flex.Spacer />
            <ToggleSwitch
              // label={item}
              checked={enabledAccessibilityOptions.includes(item)}
              onChange={(e) => {
                setEnabledAccessibilityOptions((prev) => {
                  if (e.target.checked) {
                    return [...prev, item];
                  }
                  return prev.filter((i) => i !== item);
                });
              }}
            />
          </Flex>
        </MenuItem>
      ))}
    >
      <Flex>
        <Text>Accessibility</Text>
        <Flex.Spacer />
        <Badge>{`${enabledAccessibilityOptions.length}`}</Badge>
      </Flex>
    </MenuItem>,
  ];

  return (
    <>
      <DropdownMenu menuItems={dropdownMenuItems} layered>
        <IconButton>
          <SvgMore />
        </IconButton>
      </DropdownMenu>
      <DropdownMenu menuItems={videoMenuItems} layered>
        <IconButton>
          <SvgMore />
        </IconButton>
      </DropdownMenu>
    </>
  );
};

export default App;
