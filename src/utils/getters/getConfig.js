const rootDir = require('app-root-path')

const appConf = require('tap-resolver/src/resolvers/getAppConfig')(rootDir.path, false, false)
const getConfig = () => appConf
const getRootDir = () => rootDir


module.exports = {
  getConfig,
  getRootDir,
}