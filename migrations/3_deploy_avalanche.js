/* contracts */
const AnycallCollection = artifacts.require("AnycallCollection")
const FujiAnyCallContract = "0x461d52769884ca6235b685ef2040f47d30c94eb5"

/* binance smart chain testnet */
module.exports = async function(deployer) {
    await deployer.deploy(AnycallCollection, FujiAnyCallContract, 43113)
};
