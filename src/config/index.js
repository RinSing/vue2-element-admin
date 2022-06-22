const cli = require("./cli.config");
const network = require("./net.config");
const setting = require("./setting.config");

module.exports = {
  ...cli,
  ...network,
  ...setting,
};
