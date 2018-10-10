const buildBackend = require('./buildBackend')
const packageApp = require('./packageApp')
const createChecksums = require('../createChecksums')
const createMetadata = require('./createMetadata')
const writeMetadata = require('./writeMetadata')


let electronTasks = [
  ['Build backend', buildBackend ]
  ,['Package app', 
  async ({ pkgJson }) => {
    let appPath = await packageApp(pkgJson)
    return {appPath}
  }]
  // TODO compress 
  // see https://github.com/facebook/create-react-app/issues/1908
  // TODO optimize module imports
  // TODO sign (ledger, trezor)
  ,['Generate app checksums', async ({ appPath }) => await createChecksums(appPath) ]
  ,['Generate metadata', createMetadata ]
  ,['Write metadata', writeMetadata ]
]

module.exports = electronTasks