// import { Table } from '@itwin/itwinui-react';
// import { Column } from '@itwin/itwinui-react/react-table';
// import * as React from 'react';

// const App = () => {
//   const [disabled, setDisabled] = React.useState(false);

//   React.useEffect(() => {
//     setDisabled(true);
//   }, []);

//   const columns: Column[] = React.useMemo(
//     () => [
//       {
//         id: 'name',
//         Header: 'Name',
//         accessor: 'name',
//       },
//       {
//         id: 'description',
//         Header: 'Description',
//         accessor: 'description',
//       },
//     ],
//     [],
//   );

//   const data = React.useMemo(
//     () =>
//       Array(5)
//         .fill(null)
//         .map((_, index) => {
//           return {
//             name: `Name${index}`,
//             description: `Description${index}`,
//           };
//         }),
//     [],
//   );

//   return (
//     <>
//       <Table
//         data={data}
//         columns={columns}
//         emptyTableContent='No data.'
//         isSelectable
//         isRowDisabled={(row) => {
//           console.log('disabled from App.tsx', disabled);
//           return disabled;
//         }}
//       />
//     </>
//   );
// };

// export default App;

import { ComboBox, Flex, Select } from '@itwin/itwinui-react';

const options = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
];

export default function App() {
  return (
    <Flex flexDirection='row' style={{ border: 'red solid 1px' }}>
      <ComboBox
        options={options}
        defaultValue={1}
        inputProps={{ size: 'small' }}
      />
      <Select options={options} placeholder='Select something' size='small' />
    </Flex>
  );
}
