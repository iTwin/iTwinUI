const { promisify } = require('util')
const exec = promisify(require('child_process').exec)
const compare = require('compare-versions')

const package = require('../package')
const localVersion = package.version

const compareVersions = serverVersion =>
  console.log(compare(localVersion, serverVersion))

module.exports = {
  compareVersions,
  localVersion: () => console.log(localVersion),
}
