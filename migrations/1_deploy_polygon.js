/* contracts */
const CrossArt = artifacts.require("CrossArt")

const Goerli = "0x965f84D915a9eFa2dD81b653e3AE736555d945f4"
const Bnb = "0xcBd52F7E99eeFd9cD281Ea84f3D903906BB677EC"
const Fantom = "0xfCea2c562844A7D385a7CB7d5a79cfEE0B673D99"
const Avalanche = "0x461d52769884ca6235b685ef2040f47d30c94eb5"

/* binance smart chain testnet */
module.exports = async function(deployer) {
    // await deployer.deploy(CrossArt, Bnb)
    await deployer.deploy(CrossArt, Fantom)
};
