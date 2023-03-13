import { useTheme as useV1Theme } from 'itwinui-v1';
import { Button, ThemeProvider, toaster } from '@itwin/itwinui-react';

const App = () => {
  useV1Theme('dark');

  return (
    <>
      <ThemeProvider>
        <Button
          onClick={() => toaster.informational('yo', { hasCloseButton: true })}
        >
          Toast me
        </Button>
      </ThemeProvider>
    </>
  );
};

export default App;
