module.exports = RED => {
  function ApiGateway(config) {
    RED.nodes.createNode(this, config);
    const { protocol, hostname, port } = config;
    this.apiGateway = { protocol, hostname, port };
  }

  RED.nodes.registerType('api-gateway', ApiGateway);
};
