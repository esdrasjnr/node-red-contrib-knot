const { Client } = require('@cesarbr/knot-cloud-sdk-js');
const setupVirtualThing = require('../../knot/virtualThingSetup');
const getVirtualThingId = require('../../knot/getVirtualThingId');
const closeVirtualThing = require('../../knot/closeVirtualThing');

module.exports = RED => {
  function VirtualThing(config) {
    RED.nodes.createNode(this, config);
    const { broker } = RED.nodes.getNode(config.amqp);
    const { modbus } = RED.nodes.getNode(config.modbus);
    const { slaveId, name, config: configList } = config;
    const thing = { slaveId, name, config: configList };
    const client = new Client(broker);

    const containerId = setupVirtualThing(broker, modbus, thing);
    thing.id = getVirtualThingId(containerId);

    this.on('close', async done => {
      try {
        closeVirtualThing(containerId);
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

    if (thing.id) {
      startListener();
    } else {
      this.error(Error('thing ID not provided: virtual-thing bad setup'));
    }
  }

  RED.nodes.registerType('virtual-thing', VirtualThing);
};
