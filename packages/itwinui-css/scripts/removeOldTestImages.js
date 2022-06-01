/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const fs = require('fs');
const { green } = require('./utils');

const REFERENCE_FOLDER_PATH = './backstop/results/bitmaps_reference';

// Global `report` function is called in config.js
let results = {};
global.report = (res) => {
  results = res;
};
require('../backstop/results/html_report/config');

const newImages = results.tests.map((test) => test.pair.test.substr(32));
const referenceImages = fs.readdirSync(REFERENCE_FOLDER_PATH);

let count = 0;
referenceImages.forEach((fileName) => {
  if (!newImages.includes(fileName)) {
    console.log('Removing: ', fileName);
    fs.unlinkSync(`${REFERENCE_FOLDER_PATH}/${fileName}`);
    count++;
  }
});

console.log(green(`Deleted ${count} unnecessary test images.`));
