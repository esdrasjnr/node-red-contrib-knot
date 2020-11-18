module.exports = RED => {
  function Storage(config) {
    RED.nodes.createNode(this, config);
    const { protocol, hostname, port } = config;
    this.storage = { protocol, hostname, port };
  }

  RED.nodes.registerType('storage', Storage);
};
