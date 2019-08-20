module.exports = {
  isLocalEnv: () => ['local'].indexOf(process.env.NODE_ENV) > -1
};