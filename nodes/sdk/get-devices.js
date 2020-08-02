module.exports = RED => {
  function GetDevices(config) {
    RED.nodes.createNode(this, config);
    const { client } = RED.nodes.getNode(config.amqp);

    this.on('input', async (msg, send, done) => {
      try {
        await client.connect();
        const { devices } = await client.getDevices();
        await client.close();
        msg.payload = devices;
        send(msg);
        done();
      } catch (err) {
        done(err);
      }
    });
  }

  RED.nodes.registerType('get-devices', GetDevices);
};
