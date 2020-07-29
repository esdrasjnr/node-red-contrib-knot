module.exports = RED => {
  function Unregister(config) {
    RED.nodes.createNode(this, config);
    const { client } = RED.nodes.getNode(config.amqp);

    this.on('input', async (msg, send, done) => {
      const { id = config.thingId } = msg.payload;

      if (!id) {
        done(Error('missing argument: ID must be provided'));
      }

      try {
        await client.connect();
        await client.unregister(id);
        await client.close();
        done();
      } catch (err) {
        done(err);
      }
    });
  }

  RED.nodes.registerType('unregister', Unregister);
};
