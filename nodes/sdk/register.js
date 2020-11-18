module.exports = RED => {
  function Register(config) {
    RED.nodes.createNode(this, config);
    const { client } = RED.nodes.getNode(config.amqp);

    this.on('input', async (msg, send, done) => {
      const { id = config.thingId, name = config.name } = msg.payload;

      if (!id || !name) {
        done(Error('missing argument: both ID and name must be provided'));
      }

      try {
        await client.register(id, name);
        msg.payload = { id, name };
        done(msg);
      } catch (err) {
        done(err);
      }
    });
  }

  RED.nodes.registerType('register', Register);
};
