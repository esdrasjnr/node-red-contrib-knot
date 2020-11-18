module.exports = RED => {
  function UpdateConfig(config) {
    RED.nodes.createNode(this, config);
    const { client } = RED.nodes.getNode(config.amqp);

    this.on('input', async (msg, send, done) => {
      const { id = config.thingId, config: configList = config.config } = msg.payload;

      if (!id) {
        done(Error('missing argument: ID must be provided'));
      }

      try {
        await client.updateConfig(id, configList);
        msg.payload = { id, config: configList };
        done(msg);
      } catch (err) {
        done(err);
      }
    });
  }

  RED.nodes.registerType('update-config', UpdateConfig);
};
