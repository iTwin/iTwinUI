/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { spawn } from 'node:child_process';

const argument = process.argv[2];
process.on('message', (message) => {
  console.error(message);
});

if (argument?.includes('filter')) {
  const subprocess = spawn(`turbo run test ${argument}`, {
    stdio: 'inherit',
    shell: true,
  });
  subprocess.on('uncaughtException', (error) => {
    subprocess.send({ error });
  });
} else if (argument) {
  const subprocess = spawn(
    `conc -g -n "CSS-workshop,Unit,A11y,React-workshop,e2e" -c "#8BCC2F,#D8598C,#539AD0,#D1B52A,white" "pnpm test:css --filter=${argument.toLowerCase()}" "pnpm test:unit ${argument}" "pnpm test:a11y --env componentName=${argument}" "pnpm test:react --spec="**/${argument}.*"" "pnpm run test:e2e -- ${argument}"`,
    {
      stdio: 'inherit',
      shell: true,
    },
  );
  subprocess.on('uncaughtException', (error) => {
    subprocess.send({ error });
  });
} else {
  const subprocess = spawn(`turbo run test`, {
    stdio: 'inherit',
    shell: true,
  });
  subprocess.on('uncaughtException', (error) => {
    subprocess.send({ error });
  });
}
