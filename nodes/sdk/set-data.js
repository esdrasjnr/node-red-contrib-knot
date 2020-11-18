module.exports = RED => {
  function SetData(config) {
    RED.nodes.createNode(this, config);
    const { client } = RED.nodes.getNode(config.amqp);

    this.on('input', async (msg, send, done) => {
      const { id = config.thingId, data = config.data } = msg.payload;

      if (!id || data === []) {
        done(Error('missing argument: both ID and data must be provided'));
      }

      try {
        await client.setData(id, data);
        msg.payload = { id, data };
        send(msg);
        done();
      } catch (err) {
        done(err);
      }
    });
  }

  RED.nodes.registerType('set-data', SetData);
};
