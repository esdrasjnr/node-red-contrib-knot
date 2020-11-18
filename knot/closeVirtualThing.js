const shell = require('shelljs');

module.exports = containerId => {
  shell.exec(`docker rm -f ${containerId}`);
};
