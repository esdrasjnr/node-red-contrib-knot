const { Client } = require('@cesarbr/knot-cloud-sdk-js');

module.exports = RED => {
  function Thing(config) {
    RED.nodes.createNode(this, config);
    const { broker } = RED.nodes.getNode(config.amqp);
    const { metadata: thing } = config;
    const client = new Client(broker);

    this.on('close', async done => {
      try {
        await client.close();
        done();
      } catch (err) {
        done(err);
      }
    });

    this.on('input', async (msg, send, done) => {
      const { data } = msg.payload;

      if (!data) {
        done(Error('missing argument: the data array must be provided'));
      }

      try {
        await client.setData(thing.id, data);
        done();
      } catch (err) {
        done(err);
      }
    });

    const startListener = async () => {
      try {
        await client.connect();
        await client.on('data', async ({ data }) => {
          this.send({ payload: { thing, data } });
        });
      } catch (err) {
        this.error(err);
      }
    };

    startListener();
  }

  RED.nodes.registerType('thing', Thing);
};
