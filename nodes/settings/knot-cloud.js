const KNoTCloudSetup = require('../../knot/KNoTCloudSetup');

module.exports = RED => {
  function KnotCloud(config) {
    RED.nodes.createNode(this, config);
    const { broker } = RED.nodes.getNode(config.amqp);
    const { apiGateway } = RED.nodes.getNode(config.api);
    const { storage } = RED.nodes.getNode(config.storage);

    KNoTCloudSetup(broker, apiGateway, storage);
  }

  RED.nodes.registerType('knot-cloud', KnotCloud);
};
