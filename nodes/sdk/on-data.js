module.exports = RED => {
  function OnData(config) {
    RED.nodes.createNode(this, config);
    const { client } = RED.nodes.getNode(config.amqp);
    const { event, thingId, once } = config;

    const eventName = event === 'data' ? event : `device.${thingId}.${event}`;
    const onMessage = payload => {
      this.send({ payload });
    };

    const startListener = async () => {
      try {
        if (once) {
          await client.once(eventName, onMessage);
        } else {
          await client.on(eventName, onMessage);
        }
      } catch (err) {
        this.error(err);
      }
    };

    startListener();
  }

  RED.nodes.registerType('on-data', OnData);
};
