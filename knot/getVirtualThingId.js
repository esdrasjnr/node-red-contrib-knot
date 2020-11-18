const shell = require('shelljs');

module.exports = containerId => {
  const { stdout: cred } = shell.exec(`docker exec ${containerId} cat /etc/knot/credentials.conf`);
  return cred.match(/[a-fA-F0-9]*\n/)[0].trim();
};
