/* contracts */
const AnycallCollection = artifacts.require("AnycallCollection")
const AnycallReceiver = artifacts.require("AnycallReceiver")

const BnbAnyCallContract = "0xcBd52F7E99eeFd9cD281Ea84f3D903906BB677EC"

/* binance smart chain testnet */
module.exports = async function(deployer) {
    // await deployer.deploy(AnycallCollection, BnbAnyCallContract, 97)
    // await deployer.deploy(AnycallReceiver, AnycallCollection.address)
};
