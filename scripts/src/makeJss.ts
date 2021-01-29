import * as fs from 'fs'
import * as jss from 'jss-cli'
import { promisify } from 'util'

import * as symbols from 'log-symbols'
import { yellow, green, blue, red, timedLog } from './utils'

const readdir = promisify(fs.readdir)
const writeFile = promisify(fs.writeFile)

let inDir = process.argv[2]
let outDir = process.argv[3]
const subDir = ''

if (inDir.charAt(inDir.length - 1) === '/') {
  inDir = inDir.slice(0, inDir.length - 1)
}
if (outDir.charAt(outDir.length - 1) === '/') {
  outDir = outDir.slice(0, outDir.length - 1)
}

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir)
}

if (!fs.existsSync(outDir + '/' + subDir)) {
  fs.mkdirSync(outDir + '/' + subDir)
}

const generate = (above, dir) => {
  let thisPath = above + '/' + dir
  return new Promise(resolve => {
    readdir(thisPath)
      .then(async files => {
        let out: { name: string; content: any }[] = []

        for (const file of files) {
          let temp = fs.readFileSync(thisPath + file, 'utf8')
          out.push({
            name: file.split('.css')[0] + '.json',
            content: jss.cssToJss({ code: temp })['@global'],
          })
        }

        resolve(out)
      })
      .catch(error => console.log('ERROR:', error))
  })
}

const run = async () => {
  return new Promise(async resolve => {
    console.log(yellow('Locating CSS files\n'))

    let out = JSON.parse(JSON.stringify(await generate(inDir, '')))

    timedLog('', blue(symbols.info), 'Grabbed all CSS files')
    console.log()

    for (const file of out) {
      await writeFile(
        outDir + '/' + file.name,
        JSON.stringify(file.content, null, 2),
      )
        .then(result => {
          timedLog(
            '',
            green(symbols.success),
            green('Wrote ->'),
            blue(file.name),
          )
        })
        .catch(err => {
          if (err) {
            timedLog('', red(symbols.error), 'Error in writing .json file')
            throw new Error(err.message)
          }
        })
    }
    resolve()
  })
}

const main = async () => {
  await run()
  console.log()
}

main()
