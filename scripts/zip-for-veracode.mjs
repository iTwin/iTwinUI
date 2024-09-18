/**
 * This script is used to zip the files that are going to be uploaded to Veracode.
 * It should take command line arguments for the source directory and the output file,
 * in addition to any files or folders that should be excluded from the zip.
 * This should be written in esm format with modern JavaScript.
 */

import { createWriteStream } from 'fs';
import { resolve, relative } from 'path';
import { readdir, stat } from 'fs/promises';
import { argv } from 'process';
import { minimatch } from 'minimatch';
import archiver from 'archiver';

const [sourceDir, outputFile, ...excludedPaths] = argv.slice(2);

const displayUsage = () => {
  console.log(`
Usage: node zip-for-veracode.mjs <sourceDir> <outputFile> [excludedPaths...]

Arguments:
  <sourceDir>    The source directory containing files to be zipped.
  <outputFile>   The output zip file.
  [excludedPaths...]  Optional. Patterns of files or directories to exclude from the zip.

Options:
  --help         Show this help message and exit.
  `);
};

if (argv.includes('--help')) {
  displayUsage();
  process.exit(0);
}

if (!sourceDir || !outputFile) {
  console.error('Error: sourceDir and outputFile are required arguments.');
  displayUsage();
  process.exit(1);
}

const zipFiles = async (sourceDir, outputFile, userExcludedPaths) => {
  const output = createWriteStream(`${outputFile}.zip`);
  const archive = archiver('zip', {
    zlib: { level: 9 }, // Sets the compression level.
  });

  output.on('close', () => {
    console.log('Zip file created successfully');
  });

  output.on('error', (error) => {
    console.error('An error occurred with the output stream:', error);
    process.exit(1);
  });

  archive.on('error', (error) => {
    console.error('An error occurred while zipping the files:', error);
    process.exit(1);
  });

  archive.pipe(output);

  const defaultExcludedPaths = await getDefaultExcludedPaths();
  const excludedPaths = defaultExcludedPaths.concat(userExcludedPaths);

  const addFilesToArchive = async (dir) => {
    const files = await readdir(dir);

    for (const file of files) {
      const filePath = resolve(dir, file);
      const relativePath = relative(sourceDir, filePath);
      const isExcluded = excludedPaths.some((pattern) =>
        minimatch(relativePath, pattern),
      );

      if (!isExcluded) {
        try {
          const fileStat = await stat(filePath);
          if (fileStat.isDirectory()) {
            console.log(`Adding directory: ${relativePath}`);
            await addFilesToArchive(filePath);
          } else {
            console.log(`Adding file: ${relativePath}`);
            archive.file(filePath, { name: relativePath });
          }
        } catch (error) {
          console.warn(`Warning: Could not stat file ${relativePath}`);
          continue;
        }
      }
    }
  };

  await addFilesToArchive(sourceDir);
  await archive.finalize();
};

const getDefaultExcludedPaths = async () => {
  const defaultExcludedPaths = [
    '**/node_modules/**',
    '**/node_modules/.**',
    `**/${outputFile}.zip/**`,
  ];

  try {
    const gitignoreContent = await readFile(resolve('.gitignore'), 'utf8');
    const gitignorePatterns = gitignoreContent.split('\n').filter(Boolean);
    return defaultExcludedPaths.concat(gitignorePatterns);
  } catch (error) {
    console.warn('Warning: .gitignore file not found or could not be read.');
    return defaultExcludedPaths;
  }
};

zipFiles(sourceDir, outputFile, excludedPaths);
