import * as React from 'react';
import { Table, Tabs, ProgressRadial } from '@itwin/itwinui-react';
import type { Column } from '@itwin/itwinui-react/react-table';

const columns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Description', accessor: 'description' },
] as Column[];

const FirstTable = React.memo(() => {
  const data = React.useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        name: `Name ${i}`,
        description: `Description ${i}`,
      })),
    [],
  );
  return <Table columns={columns} data={data} emptyTableContent='No data' />;
});

const SecondTable = React.memo(() => {
  const data = React.useMemo(
    () =>
      Array.from({ length: 1000 }, (_, i) => ({
        name: `Second Name ${i}`,
        description: `Second Description ${i}`,
      })),
    [],
  );
  return <Table columns={columns} data={data} emptyTableContent='No data' />;
});

const tabs = [
  { value: 'tab1', label: 'Tab 1', Body: FirstTable },
  { value: 'tab2', label: 'Tab 2', Body: SecondTable },
];

export default function App() {
  const [active, setActive] = React.useState('tab1');
  const deferredActive = React.useDeferredValue(active);

  return (
    <>
      <Tabs.Wrapper type='borderless' onValueChange={setActive}>
        <Tabs.TabList>
          {tabs.map((tab) => (
            <Tabs.Tab value={tab.value} key={tab.value}>
              {tab.label}
            </Tabs.Tab>
          ))}
        </Tabs.TabList>

        {tabs.map((tab) => (
          <Tabs.Panel value={tab.value} key={tab.value}>
            {/* <React.Suspense> */}
            <DeferredComponent
              key={tab.value}
              show={deferredActive === tab.value}
              Component={tab.Body}
            />
            {/* </React.Suspense> */}
          </Tabs.Panel>
        ))}
      </Tabs.Wrapper>
    </>
  );
}

function DeferredComponent({
  show = false,
  Component,
}: {
  show: boolean;
  Component: React.FC;
}) {
  const showSpinner = usePerceptibleValue(!show);

  if (showSpinner) return <ProgressRadial />;
  if (show) return <Component />;
  return null;
}

const PERCEPTIBLE = {
  delay: 400,
  minimum: 200,
};

function usePerceptibleValue(value: boolean) {
  const [perceptibleValue, setPerceptibleValue] = React.useState(value);
  const nextThresholdRef = React.useRef(0);

  React.useEffect(() => {
    const remaining = Math.max(0, nextThresholdRef.current - Date.now());

    const timer = setTimeout(() => {
      nextThresholdRef.current = Date.now() + PERCEPTIBLE.minimum;
      setPerceptibleValue(value);
    }, PERCEPTIBLE.delay + remaining);

    return () => clearTimeout(timer);
  }, [value]);

  return perceptibleValue;
}
