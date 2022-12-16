/* contracts */
const AnycallCollection = artifacts.require("AnycallCollection")
const AnycallReceiver = artifacts.require("AnycallReceiver")

const GoerliAnyCallContract = "0x3D4e1981f822e87A1A4C05F2e4b3bcAdE5406AE3"

/* binance smart chain testnet */
module.exports = async function(deployer) {
    // await deployer.deploy(AnycallCollection, GoerliAnyCallContract, 5)
    // await deployer.deploy(AnycallReceiver, AnycallCollection.address)
};
