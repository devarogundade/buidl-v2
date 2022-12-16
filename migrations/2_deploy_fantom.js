/* contracts */
const AnycallCollection = artifacts.require("AnycallCollection")
const AnycallReceiver = artifacts.require("AnycallReceiver")

const FantomAnyCallContract = "0xc629d02732EE932db1fa83E1fcF93aE34aBFc96B"

/* binance smart chain testnet */
module.exports = async function(deployer) {
    await deployer.deploy(AnycallCollection, FantomAnyCallContract, 4001)
    await deployer.deploy(AnycallReceiver, AnycallCollection.address)
};
