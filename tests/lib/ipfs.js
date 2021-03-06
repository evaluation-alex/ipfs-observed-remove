// @flow

const DaemonFactory = require('ipfsd-ctl');

const daemonFactory = DaemonFactory.create({ type: 'go' });

const getIpfsNode = module.exports.getIpfsNode = async (bootstrap:Array<string> = []) => {
  const [daemon, ipfs] = await new Promise((resolve, reject) => {
    const options = {
      disposable: true,
      args: ['--enable-pubsub-experiment'],
      config: {
        Bootstrap: bootstrap,
        Discovery: {
          MDNS: {
            Interval: 1,
            Enabled: true,
          },
        },
      },
    };
    daemonFactory.spawn(options, (error, ipfsd) => {
      if (error) {
        reject(error);
      } else {
        resolve([ipfsd, ipfsd.api]);
      }
    });
  });
  ipfs.stopNode = async () => {
    await new Promise((resolve, reject) => {
      daemon.stop((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };
  return ipfs;
};

let nodes = [];

module.exports.getSwarm = async (count:number) => {
  if (nodes.length < count) {
    nodes = nodes.concat(await Promise.all(Array.from({ length: count - nodes.length }, getIpfsNode)));
  }
  if (count > 1) {
    let connectedNodes = 0;
    while (connectedNodes < count) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      connectedNodes = 0;
      await Promise.all(nodes.map(async (node) => { // eslint-disable-line no-loop-func
        const peers = await node.swarm.peers();
        await node.id();
        if (peers.length >= nodes.length - 1) {
          connectedNodes += 1;
        }
      }));
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  return nodes;
};

