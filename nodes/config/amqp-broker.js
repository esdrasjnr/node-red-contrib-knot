const { Client } = require('@cesarbr/knot-cloud-sdk-js');

module.exports = RED => {
  function AmqpBroker(config) {
    RED.nodes.createNode(this, config);
    const { protocol, hostname, port, username, password, token } = config;
    this.broker = { protocol, hostname, port, username, password, token };
    this.client = new Client(this.broker);

    this.on('close', async done => {
      try {
        await this.client.close();
        done();
      } catch (err) {
        done(err);
      }
    });

    const startConnection = async () => {
      try {
        await this.client.connect();
      } catch (err) {
        this.error(err);
      }
    };

    startConnection();
  }

  RED.nodes.registerType('amqp-broker', AmqpBroker);

  RED.httpAdmin.get('/thingslist', RED.auth.needsPermission('thing.read'), async (req, res) => {
    try {
      const { config } = req.query;
      const client = new Client(config);
      await client.connect();
      const { devices } = await client.getDevices();
      await client.close();
      res.json(devices);
    } catch (err) {
      res.json([]);
    }
  });
};
