/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const minify = require('html-minifier').minify;
const fs = require('fs');
const { yellow, green, red } = require('./utils');

const inDir = process.argv[2];
const outDir = process.argv[3];

/** 'side-navigation.html' -> 'Side Navigation' */
const getComponentNameFromFile = (fileName) => {
  const fileNameWithoutType = fileName.split('.')[0];
  return fileNameWithoutType
    .split('-')
    .map((token) => `${token[0].toUpperCase()}${token.substring(1)}`)
    .join(' ');
};

/** meta tags generated for each file */
const metaContent = (fileName) => `
  <meta name="description" content="An open-source design system that helps us build a unified web experience.">
  <meta property="og:site_name" content="iTwinUI">
  <meta property="og:title" content="${getComponentNameFromFile(fileName)}">
  <meta property="og:description" content="An open-source design system that helps us build a unified web experience.">
  <meta property="og:image" content="https://itwin.github.io/iTwinUI/backstop/assets/logo.png">
  <meta property="og:image:alt" content="iTwinUI logo">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <meta property="og:url" content="https://itwin.github.io/iTwinUI/backstop/minified/${fileName}">
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml" />
  <link rel="alternate icon" href="../assets/favicon.ico" sizes="any" />
  <link rel="apple-touch-icon" href="../assets/pwa-icon.png" />
  <link rel="manifest" href="../assets/itwinui.webmanifest">
  <meta name="color-scheme" content="dark light">
  <meta name="theme-color" content="#F8F9FB">
  <meta name="theme-color" content="#4F5D65" media="(prefers-color-scheme: dark)">
`;

const run = async () => {
  const files = await fs.promises.readdir(inDir, { withFileTypes: true });
  for (const file of files) {
    // read file
    const inPath = `${inDir}/${file.name}`;
    let htmlContent = fs.readFileSync(inPath, { encoding: 'utf8' });

    // add meta tags
    htmlContent = htmlContent.replace(
      '</title>',
      `</title>${metaContent(file.name)}`
    );

    // run minifier
    htmlContent = minify(htmlContent, {
      removeComments: true,
      collapseWhitespace: true,
      collapseInlineTagWhitespace: true,
    });

    // write output
    const outPath = `${outDir}/${file.name}`;
    fs.writeFileSync(outPath, htmlContent);
  }
  console.log(green(`Finished generating minified HTML.`));
};

const main = async () => {
  console.log(yellow('Generating minified HTML'));
  try {
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }
    await run();
  } catch (error) {
    console.log(red(`Error minifying HTML: ${error}`));
    process.exit(1);
  }
};

main();
