/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { spawnSync } from 'node:child_process';

const argument = process.argv[2];

if (argument?.includes('filter')) {
  startProcess(`turbo run test ${argument}`);
} else if (argument) {
  startProcess(
    `conc -g -n "CSS-workshop,Unit,A11y,React-workshop,e2e" -c "#8BCC2F,#D8598C,#539AD0,#D1B52A,white" "pnpm test:css --filter=${argument.toLowerCase()}" "pnpm test:unit ${argument}" "pnpm test:a11y --env componentName=${argument}" "pnpm test:react --spec="**/${argument}.*"" "pnpm run test:e2e -- ${argument}"`,
  );
} else {
  startProcess(`turbo run test`);
}

function startProcess(command) {
  const subprocess = spawnSync(command, {
    stdio: 'inherit',
    shell: true,
  });
  if (subprocess.status !== 0) {
    process.exit(1);
  }
}
