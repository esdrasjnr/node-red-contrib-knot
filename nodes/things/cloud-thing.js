module.exports = RED => {
  function CloudThing(config) {
    RED.nodes.createNode(this, config);
    const { client } = RED.nodes.getNode(config.amqp);
    const { thingId, name, config: configList } = config;
    const thing = { thingId, name, config: configList };

    this.on('close', async done => {
      try {
        await client.unregister(thingId);
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
        await client.publishData(thingId, data);
        done();
      } catch (err) {
        done(err);
      }
    });

    const startListener = async () => {
      try {
        await client.connect();
        await client.register(thingId, name);
        await client.updateConfig(thingId, configList);

        await client.on(`device.${thingId}.data.update`, ({ data }) => {
          this.send([{ payload: { thing, data } }, null]);
        });

        await client.on(`device.${thingId}.data.request`, ({ sensorIds }) => {
          this.send([null, { payload: { thing, sensorIds } }]);
        });
      } catch (err) {
        this.error(err);
      }
    };

    startListener();
  }

  RED.nodes.registerType('cloud-thing', CloudThing);
};
