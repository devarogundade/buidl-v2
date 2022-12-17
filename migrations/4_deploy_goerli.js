/* contracts */
const AnycallCollection = artifacts.require("AnycallCollection")
const AnycallReceiver = artifacts.require("AnycallReceiver")

const GoerliAnyCallContract = "0x965f84D915a9eFa2dD81b653e3AE736555d945f4"

/* binance smart chain testnet */
module.exports = async function(deployer) {
    // await deployer.deploy(AnycallCollection, GoerliAnyCallContract, 5)
    // await deployer.deploy(AnycallReceiver, AnycallCollection.address)
};
