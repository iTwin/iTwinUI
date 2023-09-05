import { Button, Table, TableTypes } from '@itwin/itwinui-react';

const App = () => {
  const columns: TableTypes.Column<{
    header1: string;
    header2: string;
  }>[] = [
    {
      Header: 'Header 1',
      accessor: 'header1',
    },
    {
      Header: 'Header 2',
      accessor: 'header2',
    },
  ] as TableTypes.Column<{
    header1: string;
    header2: string;
  }>[];

  return (
    <>
      <Button>Hello world</Button>
    </>
  );
};

export default App;
