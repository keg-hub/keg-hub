
module.exports = {
  ...require('./getGitKey'),
  ...require('./getGitUrl'),
  ...require('./getGit'),
  ...require('./gitKeyExists')
}