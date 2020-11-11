module.exports = RED => {
  function Modbus(config) {
    RED.nodes.createNode(this, config);
    const { protocol, hostname, port } = config;
    this.modbus = { protocol, hostname, port };
  }

  RED.nodes.registerType('modbus', Modbus);
};
