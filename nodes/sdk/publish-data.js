module.exports = RED => {
  function PublishData(config) {
    RED.nodes.createNode(this, config);
    const { client } = RED.nodes.getNode(config.amqp);

    this.on('input', async (msg, send, done) => {
      const { id = config.thingId, data = config.data } = msg.payload;

      if (!id || data === []) {
        done(Error('missing argument: both ID and data must be provided'));
      }

      try {
        await client.connect();
        await client.publishData(id, data);
        await client.close();
        done();
      } catch (err) {
        done(err);
      }
    });
  }

  RED.nodes.registerType('publish-data', PublishData);
};
