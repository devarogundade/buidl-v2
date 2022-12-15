const CrossArt = artifacts.require("CrossArt");

const Goerli = "0x965f84D915a9eFa2dD81b653e3AE736555d945f4"
const Bnb = "0xcBd52F7E99eeFd9cD281Ea84f3D903906BB677EC"
const Fantom = "0x461d52769884ca6235b685ef2040f47d30c94eb5"

contract("CrossArt", async accounts => {
    it("Bnb Test 1", async() => {
        const crossArt = await CrossArt.deployed()
        const trx1 = await crossArt.addChain(5, Goerli)
        const trx2 = await crossArt.addChain(97, Bnb)
        const trx3 = await crossArt.addChain(4002, Fantom)
    })
})
