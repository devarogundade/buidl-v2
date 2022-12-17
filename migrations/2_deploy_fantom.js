/* contracts */
const AnycallCollection = artifacts.require("AnycallCollection")
const AnycallReceiver = artifacts.require("AnycallReceiver")

const FantomAnyCallContract = "0xfCea2c562844A7D385a7CB7d5a79cfEE0B673D99"

/* binance smart chain testnet */
module.exports = async function(deployer) {
    // await deployer.deploy(AnycallCollection, FantomAnyCallContract, 4002)
    // await deployer.deploy(AnycallReceiver, AnycallCollection.address)
};
