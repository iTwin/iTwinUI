/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import fs from 'node:fs/promises';
import path from 'node:path';

import { parse as docgenTsParse } from 'react-docgen-typescript';
import {
  parse as docgenParse,
  handlers as docgenHandlers,
  resolver as docgenResolver,
  importers as docgenImporters,
} from 'react-docgen';

import { globby } from 'globby';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DOCS_FOLDER = path.resolve(
  `${__dirname}/../../../apps/website/src/pages/docs`,
);

const getLines = (text) => {
  return text.split(/\r?\n/);
};

/**
 * Read the file at the given path
 * @param {string} path
 * @returns {Promise<string | null>} The file content or null if error reading file
 */
const readFile = async (path) => {
  try {
    const data = await fs.readFile(path, { encoding: 'utf8' });
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

/**
 * Returns the value of the `field` in the frontmatter
 * @param {Array<string>} lines
 * @param {string} field
 * @returns {string | null} The value of the field or null if not found
 */
const getFieldFromFrontmatter = (lines, field) => {
  let i;

  for (i = 1; i < lines.length; i++) {
    const line = lines[i].trim();

    // Reached end of frontmatter
    if (line === '---') {
      break;
    }

    const parts = line.split(':').map((p) => p.trim());

    // Error in frontmatter format
    if (parts.length !== 2) {
      continue;
    }

    if (parts[0] === field) {
      return parts[1];
    }
  }

  return null;
};

/**
 * Returns an array of lines after formatting the fileContent
 * @param {string} fileContent
 * @returns {Promise<Array<string>>}
 */
const getFormattedFileLines = async (fileContent) => {
  /**
   * Replace the <PropsTable /> tag with the real props table value
   * @param {Array<string>} lines
   * @returns {Promise<Array<string>>}
   */
  const replacePropsTableWithRealProps = async (lines) => {
    const readProps = async (propsPath) => {
      const defaultHandlers = Object.values(docgenHandlers).map(
        (handler) => handler,
      );
      const defaultResolver =
        docgenResolver.findAllExportedComponentDefinitions;
      const defaultImporter = docgenImporters.makeFsImporter();

      const relativePath = propsPath.replace(
        '@itwin/itwinui-react',
        '../../../packages/itwinui-react', // relative from root of `website` workspace
      );

      const componentPath = path.join(__dirname, relativePath);
      const componentName = path.parse(componentPath).name.split('.')[0]; // Spliting on `.` since some files are .d.ts files
      const src = await fs.readFile(componentPath, 'utf8');

      const docgenResults = componentPath.endsWith('.tsx')
        ? docgenParse(src, defaultResolver, defaultHandlers, {
            importer: defaultImporter,
          })
        : docgenTsParse(componentPath);

      const componentDoc = [...docgenResults].find(
        (docs) => docs['displayName'] === componentName,
      );
      return componentDoc;
    };

    const replaceProps = async (lines) => {
      const newLines = [];

      for (const line of lines) {
        const lineTrim = line.trim();
        if (lineTrim.startsWith('<PropsTable') && lineTrim.endsWith('/>')) {
          // Capture the path
          const propsPathKeyMatches = lineTrim.match(
            /<PropsTable +path={frontmatter\.(.+)} +\/>/,
          );
          // If exactly 1 match is found (=== 2 because the first match is the whole string)
          if (propsPathKeyMatches && propsPathKeyMatches.length === 2) {
            const propsPathKey = propsPathKeyMatches[1];
            const propsPathValue = getFieldFromFrontmatter(
              lines,
              propsPathKey,
            ).slice(1, -1); // Slice to remove the leading and trailing single quotes
            const props = (await readProps(propsPathValue)).props;
            newLines.push(JSON.stringify(props));
          } else {
            newLines.push(line);
          }
        } else {
          newLines.push(line);
        }
      }

      return newLines;
    };

    const newLines = await replaceProps(lines);
    return newLines;
  };

  /**
   * Replace the <p>{frontmatter.description}</p> tag with the real description
   * @param {Array<string>} lines
   * @returns {Array<string>}
   */
  const replaceDescriptionTagWithRealDescription = (lines) => {
    const description = getFieldFromFrontmatter(lines, 'description');

    return lines.map((line) => {
      if (line.trim() === '<p>{frontmatter.description}</p>') {
        return description;
      }
      return line;
    });
  };

  let lines = getLines(fileContent);

  lines = await replacePropsTableWithRealProps(lines);
  lines = replaceDescriptionTagWithRealDescription(lines);

  // console.log(lines.length, lines);
  return lines;
};

const removeUnnecessaryCode = async (lines) => {
  const removeFrontmatter = (lines) => {
    let i;

    // Assume i=0 always contains "---"
    for (i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        break;
      }
    }

    return lines.slice(i + 1);
  };

  const removeImports = (lines) => {
    return lines.filter((line) => !line.trim().startsWith('import'));
  };

  const removeAllLiveExamples = (lines) => {
    const newLines = [];
    let isInLiveExample = false;

    for (const line of lines) {
      const lineTrim = line.trim();
      if (lineTrim.startsWith('<LiveExample')) {
        isInLiveExample = true;
      }

      if (!isInLiveExample) {
        newLines.push(line);
      }

      if (lineTrim.startsWith('</LiveExample>')) {
        isInLiveExample = false;
      }
    }

    return newLines;
  };

  lines = removeFrontmatter(lines);
  lines = removeImports(lines);
  lines = removeAllLiveExamples(lines);

  return lines;
};

/**
 * Get the index objects for the given lines
 *
 * Sample input:
 * ```jsx
 * lines = [
 *  'Alert is an element',
 *  '## Appearance',
 *  'Alert should be concise',
 *  '### Informational',
 *  'Default style',
 *  '## Placement',
 *  'Either inline or sticky',
 * ]
 * title = 'Alert'
 * ```
 *
 * Sample output:
 * ```jsx
 * [
 *  {
 *    "header": 'Alert',
 *    "upper-header": [],
 *    "content": 'Alert is an element',
 *  },
 *  {
 *    "header": 'Appearance',
 *    "upper-header": ['Alert'],
 *    "content": 'Alert should be concise',
 *  },
 *  {
 *    "header": 'Informational',
 *    "upper-header": ['Alert', 'Appearance'],
 *    "content": 'Default style',
 *  },
 *  {
 *    "header": 'Placement',
 *    "upper-header": ['Alert'],
 *    "content": 'Either inline or sticky',
 *  },
 * ]
 * ```
 *
 * @param {Array<string>} lines
 * @param {string} title
 * @returns
 */
const getIndexObjects = (lines, title) => {
  const indexObjects = [];

  let currentHeading = [title];
  let buffer = [];

  for (const line of lines) {
    if (line.trim().startsWith('#')) {
      // E.g. line = "## Appearance"

      // E.g header = "Appearance"
      const header = line.trim().replace(/#+ */g, '');
      // E.g. headerHashes = "##"
      const headerHashes = line.trim().match(/#+/g)[0];

      indexObjects.push({
        header: currentHeading.slice(-1)[0],
        'upper-header': currentHeading.slice(0, -1),
        content: buffer.join('\n').trim(),
      });

      // If same level or down one or more levels, pop stale headings
      while (headerHashes.length <= currentHeading.length) {
        currentHeading.pop();
      }

      currentHeading.push(header);
      buffer = [];
    } else {
      buffer.push(line);
    }
  }

  // Flush the buffer
  indexObjects.push({
    header: currentHeading.slice(-1)[0],
    'upper-header': currentHeading.slice(0, -1),
    content: buffer.join('\n').trim(),
  });

  return indexObjects;
};

/**
 * Get the index objects for the given file path
 * @param {string} filePath
 * @returns
 */
const getIndexObjectsForFile = async (filePath) => {
  const fileContent = await readFile(filePath);

  let lines = await getFormattedFileLines(fileContent);
  const title = getFieldFromFrontmatter(lines, 'title');

  lines = await removeUnnecessaryCode(lines);
  const indexObjects = getIndexObjects(lines, title);

  return indexObjects;
};

const getDocsFiles = async () => {
  // Since globby only works with posix paths with only forward slashes
  const docsFolderPosix = path.posix.join(DOCS_FOLDER).replace(/\\/g, '/');
  const globPattern = `${docsFolderPosix}/**/*.mdx`;
  const files = await globby(globPattern);

  return files;
};

const main = async () => {
  const docFilePaths = await getDocsFiles();

  const indexObjects = [];

  for (const docFilePath of docFilePaths) {
    const indexObjectsForFile = await getIndexObjectsForFile(docFilePath);
    indexObjects.push(...indexObjectsForFile);
    console.log(`Processed ${path.basename(docFilePath)}`);
  }

  // Write indexObjects to a json file called "docs_chunks.json"
  await fs.writeFile(
    path.join(__dirname, 'docs_chunks.json'),
    JSON.stringify(indexObjects, null, 2),
  );
};

main();
