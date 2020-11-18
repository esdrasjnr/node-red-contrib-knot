const fs = require('fs');
const ini = require('ini');
const shell = require('shelljs');

const KNOTCLOUD_PATH = '../.cache/knot-cloud';

const knotInit = () => {
  shell.rm('-rf', `${KNOTCLOUD_PATH}`);
  shell.exec(`knot-cloud init core ${KNOTCLOUD_PATH}`);
};

const configFiles = broker => {
  const rabbit = ini.parse(fs.readFileSync(`${KNOTCLOUD_PATH}/stack/env.d/rabbitmq.env`, 'utf-8'));
  rabbit.RABBITMQ_DEFAULT_USER = broker.username;
  rabbit.RABBITMQ_DEFAULT_PASS = broker.password;
  fs.writeFileSync(`${KNOTCLOUD_PATH}/stack/env.d/rabbitmq.env`, ini.stringify(rabbit));
};

const dockerRun = () => {
  const basePath = `${KNOTCLOUD_PATH}/stack`;
  const composeFiles = ['base.yml', 'dev.yml', 'traefik.yml'];
  const opts = composeFiles.map(file => `-c ${basePath}/${file}`).join(' ');
  shell.exec(`docker stack deploy ${opts} node-red-knotcloud`);
};

module.exports = (broker, apiGateway, storage) => {
  if (!shell.which('knot-cloud') || !shell.which('docker')) {
    throw Error('this script requires both knot-cloud and docker');
  }

  knotInit();
  configFiles(broker, apiGateway, storage);
  dockerRun();
};
