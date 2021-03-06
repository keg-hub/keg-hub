const { Logger } = require('@keg-hub/cli-utils')
const { get, wordCaps, isObj } = require('@keg-hub/jsutils')
const { getHubRepos } = require('../utils/repos/getHubRepos')
const { runYarnScript, runYarnScriptPipe } = require('../utils/repos/runYarnScript')

/**
 * Allowed yarn commands that can run for every repo
 * All other commands must be defined in the scripts object of the package.json
 */
const allowedNotDefined = [
  'install',
  'add',
  'remove'
]

/**
 * Logs an error message when a script fails
 * @param {Object} resp - Response from the yarn cmd
 * @param {string} resp.data - stdOut from yarn cmd
 * @param {string} resp.error - stdErr from yarn cmd
 * @param {number} resp.exitCode - exit code of the yarn cmd
 * @param {string} script - Name of script that failed
 *
 * @returns {void}
 */
const logScriptError = (resp, script) => {
  const jestTestSplit = 'Summary of all failing tests'

  Logger.colors.brightRed(`  - Script failed!`)

  script !== 'test'
    ? Logger.error(`\n${resp.error}`)
    : Logger.error(`\n${jestTestSplit}\n${resp.error.split(jestTestSplit).pop()}`)

  Logger.empty()
}

/**
 * Runs the passed in script from the package.json of the passed in repos
 * <br/>If the script does not exist, it skips it
 * @function
 * @param {Array} repos - All repos that the script should run on
 * @param {string} script - Name of the script to run
 * @param {string} script - Name of the script to run
 *
 * @returns {*} - Response from the runYarnScript method
 */
const runScript = async (repo, package, args={}) => {
  const { location, script='', pipe=true } = args

  const firstWord = script.split(' ')[0]
  const isAllowed = allowedNotDefined.includes(firstWord)

  if(!location || (!isAllowed && (!script || !get(package, `scripts.${script}`))))
    return false

  const repoName = wordCaps(repo)
  const title = [
    Logger.colors.brightWhite(`\n${repoName} -`),
    Logger.colors.brightCyan(`yarn ${script}`),
  ].join(' ')

  Logger.log(title)

  const resp = pipe
    ? await runYarnScriptPipe(location, script, { title })
    : await runYarnScript(location, script)
  
  ;isObj(resp) && (() => {
    resp.exitCode === 0
      ? Logger.log(Logger.colors.brightGreen(`  - Script ran successfully!`))
      : logScriptError(resp, script)
  })()

  return resp
}

/**
 * Runs the passed in script for all found repos asynchronously
 * @function
 * @param {Array} repos - All repos that the script should run on
 * @param {string} script - Name of the script to run
 * @param {boolean} pipe - Should the output be piped to the main process
 *
 * @returns {Array<*>} - Responses from the runYarnScript method
 */
const runAsync = (repos, script, pipe) => {
  const promises = Object.values(repos)
    .map(({ repo, package, location }) => {    
      return runScript(
        repo,
        package,
        { location, script, pipe }
      )
    })

  return Promise.all(promises)
}

/**
 * Runs the passed in script for all found repos synchronously
 * @function
 * @param {Array} repos - All repos that the script should run on
 * @param {string} script - Name of the script to run
 * @param {boolean} pipe - Should the output be piped to the main process
 *
 * @returns {Array<*>} - Responses from the runYarnScript method
 */
const runSync = async (repos, script, pipe, responses=[]) => {
  await Object.values(repos)
    .reduce(async (scriptResp, { repo, package, location }) => {
      await scriptResp
      scriptResp && responses.push(scriptResp)

      const resp = await runScript(
        repo,
        package,
        { location, script, pipe }
      )

      return resp
    }, Promise.resolve(false))

  return responses

}

/**
 * Run package.json scripts in keg-hub repos
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} args.params - Pre-Parsed options array as an object
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const runRepos = async args => {
  const { params } = args
  const { script, pipe, sync } = params
  const repos = await getHubRepos(params)

  ;sync
    ? await runSync(repos, script, pipe)
    : await runAsync(repos, script, pipe)

  Logger.empty()

  return true
}

module.exports = {
  run: {
    name: 'run',
    alias: [ 'rn' ],
    description: 'Run package.json scripts for Keg Hub repos',
    action: runRepos,
    example: 'keg hub run <options>',
    options: {
      script: {
        description: 'Name of the script in package.json to run',
        example: 'keg hub run --script',
        require: true,
      },
      context: {
        type: 'array',
        default: ['all'],
        alias: [ 'ctx', 'filter', 'ftr', 'scope', 'scp' ],
        description: 'Filter which repo(s) to run the script on!',
        example: 'keg hub run --context cli',
      },
      pipe: {
        alias: [ 'pip' ],
        description: 'When not set, all output of a script is logged to the terminal',
        example: 'keg hub run --no-pipe',
        default: true
      },
      sync: {
        alias: [ 'sy' ],
        description: 'Run all commands synchronously',
        example: 'keg hub run --sync false',
        default: true
      }
    }
  }
}
