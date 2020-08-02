module.exports = RED => {
  function GetData(config) {
    RED.nodes.createNode(this, config);
    const { client } = RED.nodes.getNode(config.amqp);
    const sensorIds = config.sensors.map(({ sensorId }) => sensorId);

    this.on('input', async (msg, send, done) => {
      const { id = config.thingId, sensors = sensorIds } = msg.payload;

      if (!id || sensors === []) {
        done(Error('missing argument: both ID and sensors must be provided'));
      }

      try {
        await client.connect();
        await client.getData(id, sensors);
        await client.close();
        done();
      } catch (err) {
        done(err);
      }
    });
  }

  RED.nodes.registerType('get-data', GetData);
};