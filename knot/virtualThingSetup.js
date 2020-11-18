const fs = require('fs');
const ini = require('ini');
const shell = require('shelljs');

const VIRTUALTHING_REPO =
  '--branch esdras-dockerfile https://github.com/esdrasjnr/knot-virtualthing.git';
const VIRTUALTHING_PATH = '../.cache/virtual-thing';

const gitClone = () => {
  shell.rm('-rf', `${VIRTUALTHING_PATH}`);
  shell.exec(`git clone ${VIRTUALTHING_REPO} ${VIRTUALTHING_PATH}`);
};

const createConfigFiles = (broker, modbus, thing) => {
  const { protocol, hostname, port, username, password, token } = broker;
  const url = `${protocol}://${username}:${password}@${hostname}:${port}`;
  const cloud = { UserToken: token, Url: url };
  const modbusUrl = `${modbus.protocol}://${modbus.hostname}:${modbus.port}`;
  const { slaveId, name, config } = thing;
  const knotThing = { Name: name, ModbusSlaveId: slaveId, ModbusURL: modbusUrl };
  const dataItems = Object.fromEntries(
    config.map(({ sensorId, schema, event: e, modbus: mb }, idx) => {
      const dataItem = {
        SchemaSensorId: sensorId,
        SchemaSensorName: schema.name,
        SchemaTypeId: schema.typeId,
        SchemaUnit: schema.unit,
        SchemaValueType: schema.valueType,
        ModbusRegisterAddress: mb.registerAddress,
        ModbusBitOffset: mb.bitOffset,
      };
      if (e.change) dataItem.ConfigChange = 1;
      if (e.timeSec) dataItem.ConfigTimeSec = e.timeSec;
      if (e.lowerThreshold) dataItem.ConfigLowerThreshold = e.lowerThreshold;
      if (e.upperThreshold) dataItem.ConfigUpperThreshold = e.upperThreshold;
      return [`DataItem_${idx}`, dataItem];
    })
  );

  fs.writeFileSync(
    `${VIRTUALTHING_PATH}/confs/cloud.conf`,
    ini.stringify({ Cloud: cloud }, { whitespace: true })
  );
  fs.writeFileSync(
    `${VIRTUALTHING_PATH}/confs/device.conf`,
    ini.stringify({ KNoTThing: knotThing, ...dataItems }, { whitespace: true })
  );
};

const dockerRun = () => {
  shell.exec(`docker build ${VIRTUALTHING_PATH} -t node-red-virtualthing`);
  const { stdout: id } = shell.exec('docker run --network=host -d -it node-red-virtualthing');
  return id.trim();
};

module.exports = (broker, modbus, thing) => {
  if (!shell.which('git') || !shell.which('docker')) {
    throw Error('this script requires both git and docker');
  }

  gitClone();
  createConfigFiles(broker, modbus, thing);
  return dockerRun();
};
