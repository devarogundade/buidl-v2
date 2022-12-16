const AnycallCollection = artifacts.require("AnycallCollection");

const Bnb = "0xF1Fe3DF6b41b3BaAD9879be66f0afE1616DacCc5"
    // const Goerli = "0x965f84D915a9eFa2dD81b653e3AE736555d945f4"
    // const Fantom = "0x461d52769884ca6235b685ef2040f47d30c94eb5"

contract("AnycallCollection", async accounts => {
    it("Avalanche Test 3", async() => {
        const crossArt = await AnycallCollection.deployed()
        const trx2 = await crossArt.addChain(97, Bnb)
            // const trx1 = await crossArt.addChain(5, Goerli)
            // const trx3 = await crossArt.addChain(4002, Fantom)
    })
})
