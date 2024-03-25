/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { spawn } from 'node:child_process';

try {
  const argument = process.argv[2];
  const prefixes = '"CSS-workshop,Unit,A11y,React-workshop,e2e"';
  const colors = '#8BCC2F,#D8598C,#539AD0,#D1B52A,white';

  if (argument?.includes('filter')) {
    spawn(`turbo run test ${argument}`, {
      stdio: 'inherit',
      shell: true,
    });
  } else if (argument) {
    spawn(
      `conc -g -n ${prefixes} -c ${colors} "pnpm --filter=css-workshop run test --filter=${argument.toLowerCase()}" "pnpm --filter=@itwin/itwinui-react run test:unit ${argument}" "pnpm --filter "./testing/a11y" run test  --env componentName=${argument}" "pnpm --filter=react-workshop run test --spec="**/${argument}.*"" "cd testing/e2e && pnpm playwright test -- ${argument} && cd ../.."`,
      {
        stdio: 'inherit',
        shell: true,
      },
    );
  } else {
    spawn(`turbo run test`, {
      stdio: 'inherit',
      shell: true,
    });
  }
} catch (error) {
  console.log(error);
}
