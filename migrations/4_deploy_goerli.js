/* contracts */
const CrossArt = artifacts.require("CrossArt")
const GoerliAnyCallContract = "0x965f84D915a9eFa2dD81b653e3AE736555d945f4"

/* binance smart chain testnet */
module.exports = async function(deployer) {
    await deployer.deploy(CrossArt, GoerliAnyCallContract, 5)
};
