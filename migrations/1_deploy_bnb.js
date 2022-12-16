/* contracts */
const AnycallCollection = artifacts.require("AnycallCollection")
const AnycallReceiver = artifacts.require("AnycallReceiver")

const BnbAnyCallContract = "0xD2b88BA56891d43fB7c108F23FE6f92FEbD32045"

/* binance smart chain testnet */
module.exports = async function(deployer) {
    // await deployer.deploy(AnycallCollection, BnbAnyCallContract, 97)
    // await deployer.deploy(AnycallReceiver, AnycallCollection.address)
};
