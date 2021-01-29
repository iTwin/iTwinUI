export const red = text => `\x1b[31m${text}\x1b[0m`
export const green = text => `\x1b[32m${text}\x1b[0m`
export const yellow = text => `\x1b[33m${text}\x1b[0m`
export const blue = text => `\x1b[34m${text}\x1b[0m`
export const magenta = text => `\x1b[35m${text}\x1b[0m`
export const clearConsole = () => process.stdout.write('\x1Bc')

let TIMED_LOG_START = process.hrtime()
export const timedLog = (...note) => {
  var precision = 3
  var elapsed = process.hrtime(TIMED_LOG_START)[1] / 1000000
  console.log(note.join(' '), ' ', `[${elapsed.toFixed(precision)}ms]`)
  TIMED_LOG_START = process.hrtime()
}
