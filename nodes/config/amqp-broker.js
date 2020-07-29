const { Client } = require('@cesarbr/knot-cloud-sdk-js');

module.exports = RED => {
  function AmqpBroker(config) {
    RED.nodes.createNode(this, config);
    const { protocol, hostname, port, username, password, token } = config;
    this.client = new Client({
      protocol,
      hostname,
      port,
      username,
      password,
      token,
    });
  }

  RED.nodes.registerType('amqp-broker', AmqpBroker);
};
