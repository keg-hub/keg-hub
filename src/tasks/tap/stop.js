const { get } = require('jsutils')
const { getTapPath } = require('KegUtils/globalConfig/getTapPath')
const { spawnCmd } = require('KegProc')
const { runInternalTask } = require('KegUtils/task/runInternalTask')
const { DOCKER } = require('KegConst/docker')
/**
 * Starts a docker container for a tap
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 * @param {Object} args.params - Formatted object of the passed in options 
 *
 * @returns {void}
 */
const stopContainer = async ({ globalConfig, params }) => {
  const { tap, env, docker, mounts } = params

  const location = getTapPath(globalConfig, tap)
  console.log(`---------- TODO: stop tap container ----------`)
  // TODO: Update to kill core docker container
  // await spawnCmd(dockerCmd, location)
}

/**
 * Start a docker-sync or docker container for a tap
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Initial command being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {Object} globalConfig - Global config object for the keg-cli
 *
 * @returns {void}
 */
const stopTap = async (args) => {

  // Check if we are running the container with just docker
  return get(args, 'params.service') === 'container'
    ? stopContainer(args)
    : runInternalTask('tasks.docker.tasks.sync.tasks.stop', {
        ...args,
        command: 'docker',
        params: { ...args.params, context: 'tap' },
      })

}


module.exports = {
  stop: {
    name: 'stop',
    alias: [ 'kill', 'stp', 'halt' ],
    action: stopTap,
    description: `Stops tap docker containers`,
    example: 'keg tap stop <options>',
    options: {
      tap: { 
        description: 'Name of the tap to run. Must be a tap linked in the global config',
        required: true,
      },
      service: {
        allowed: [ 'sync', 'container' ],
        description: 'What docker service to build the tap with. Must be on of ( sync || container )',
        example: 'keg tap stop --service container',
        default: 'sync'
      },
    }
  }
}