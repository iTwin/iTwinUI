import { Button, ComboBox, Flex } from '@itwin/itwinui-react';
import { useSearchParams } from '@remix-run/react';
import * as React from 'react';

export default function ComboBoxTest() {
  const config = getConfigFromSearchParams();

  if (config.exampleType === 'overflow') {
    return <Overflow />;
  }
  return <Default config={config} />;
}

const Default = ({
  config,
}: {
  config: ReturnType<typeof getConfigFromSearchParams>;
}) => {
  const {
    initialValue,
    multiple,
    options,
    showChangeValueButton,
    virtualization,
    clearFilterOnOptionToggle,
    controlled,
  } = config;
  const [value, setValue] = React.useState(initialValue);

  return (
    <div data-testid='container'>
      {showChangeValueButton && (
        <Button
          data-testid='change-value-to-first-option-button'
          onClick={() => setValue(multiple ? [0] : 0)}
        >
          Change value to just the first option
        </Button>
      )}

      <ComboBox
        options={options as any[]}
        id='test-component'
        value={value as any}
        onChange={controlled ? (setValue as any) : undefined}
        multiple={multiple}
        enableVirtualization={virtualization}
        clearFilterOnOptionToggle={clearFilterOnOptionToggle as any}
      />
    </div>
  );
};

const Overflow = () => {
  const data = new Array(15).fill(0).map((_, i) => ({
    label: `option ${i}`,
    value: i,
  }));
  const widths = new Array(10).fill(0).map((_, i) => 790 + i * 3);

  const [
    selectTagContainersDomChangeCount,
    setSelectTagContainersDomChangeCount,
  ] = React.useState(0);

  React.useEffect(() => {
    const observer = new MutationObserver(() =>
      setSelectTagContainersDomChangeCount((count) => count + 1),
    );

    const selectTagContainers = document.querySelectorAll(
      "[role='combobox'] + div:first-of-type",
    );
    selectTagContainers.forEach((container) => {
      observer.observe(container, {
        attributes: false,
        childList: true,
        subtree: false,
      });
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Flex flexDirection='column' alignItems='flex-start'>
      <p data-testid='select-tag-containers-dom-change-count'>
        Select tag containers DOM changes: {selectTagContainersDomChangeCount}
      </p>
      {widths.slice(0, 10).map((width) => (
        <ComboBox
          key={width}
          style={{ width: `${width}px`, maxWidth: '80vw' }}
          multiple={true}
          options={data}
          value={data.map((x) => x.value)}
        />
      ))}
    </Flex>
  );
};

// ----------------------------------------------------------------------------

function getConfigFromSearchParams() {
  const [searchParams] = useSearchParams();

  const exampleType = searchParams.get('exampleType') as
    | 'default'
    | 'overflow'
    | undefined;
  const virtualization = searchParams.get('virtualization') === 'true';
  const multiple = searchParams.get('multiple') === 'true';
  const clearFilterOnOptionToggle =
    searchParams.get('clearFilterOnOptionToggle') != null
      ? searchParams.get('clearFilterOnOptionToggle') === 'true'
      : undefined;
  const showChangeValueButton =
    searchParams.get('showChangeValueButton') === 'true';

  const options = [
    { label: 'Item 0', value: 0 },
    { label: 'Item 1', value: 1, subLabel: 'sub label' },
    { label: 'Item 2', value: 2 },
    { label: 'Item 3', value: 3 },
    { label: 'Item 4', value: 4 },
    { label: 'Item 10', value: 10 },
    { label: 'Item 11', value: 11 },
  ];

  const initialValueSearchParam = searchParams.get('initialValue') as
    | ('all' & string & {})
    | null;
  const initialValue =
    initialValueSearchParam != null
      ? initialValueSearchParam === 'all'
        ? options.map((option) => option.value)
        : (JSON.parse(initialValueSearchParam) as number | number[])
      : undefined;

  const controlled = searchParams.get('controlled') === 'true';

  return {
    exampleType,
    virtualization,
    multiple,
    showChangeValueButton,
    options,
    initialValue,
    clearFilterOnOptionToggle,
    controlled,
  };
}
