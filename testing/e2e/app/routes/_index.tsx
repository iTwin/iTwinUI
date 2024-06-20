import { Text, meta } from '@itwin/itwinui-react';

export default function Index() {
  return (
    <>
      <Text as='h1' variant='headline'>
        Hello world
      </Text>
      <Text data-testid='version'>{meta.version}</Text>
      <Text data-testid='module'>{meta.module}</Text>
    </>
  );
}
