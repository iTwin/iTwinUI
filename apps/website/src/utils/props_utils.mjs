/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import fs from 'fs';
import path from 'path';
import { parse as docgenTsParse } from 'react-docgen-typescript';
import {
  parse as docgenParse,
  handlers as docgenHandlers,
  resolver as docgenResolver,
  importers as docgenImporters,
} from 'react-docgen';
import snarkdown from 'snarkdown';

const defaultHandlers = Object.values(docgenHandlers).map((handler) => handler);
const defaultResolver = docgenResolver.findAllExportedComponentDefinitions;
const defaultImporter = docgenImporters.makeFsImporter();

/**
 * Returns the values to display in a props table using the types file.
 * @param {string} componentPath
 * @returns {Array<{ name: string, description: string, type: string, defaultValue: string }>}
 */
export const getPropsTableValuesFromTypesFile = (componentPath) => {
  const componentName = path.parse(componentPath).name.split('.')[0]; // Spliting on `.` since some files are .d.ts files
  const src = fs.readFileSync(componentPath, 'utf8');

  const docgenResults = componentPath.endsWith('.tsx')
    ? docgenParse(src, defaultResolver, defaultHandlers, {
        importer: defaultImporter,
      })
    : docgenTsParse(componentPath);

  const componentDoc = [...docgenResults].find((docs) => docs['displayName'] === componentName);
  if (!componentDoc) {
    return [];
  }

  const propTableValues = Object.entries(componentDoc.props).map(([key, value]) => {
    const name = value.name || key;
    const description = snarkdown(value.description.split('@example')[0] ?? value.description);
    const type = value.type?.name || value.flowType.raw;
    const defaultValue = value.defaultValue?.value ?? value.defaultValue ?? '';

    return { name, description, type, defaultValue };
  });

  return propTableValues;
};
