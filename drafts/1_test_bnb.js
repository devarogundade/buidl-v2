const CrossArt = artifacts.require("CrossArt");

const Avalanche = "0xF2668DA01e33F00CC18B0e9C154E6774Eac87fa9"
    // const Goerli = "0x965f84D915a9eFa2dD81b653e3AE736555d945f4"
    // const Bnb = "0xcBd52F7E99eeFd9cD281Ea84f3D903906BB677EC"

contract("CrossArt", async accounts => {
    it("Bnb Test 1", async() => {
        const crossArt = await CrossArt.deployed()
            // const trx3 = await crossArt.addChain(43113, Avalanche)
            // const trx1 = await crossArt.addChain(5, Goerli)
            // const trx2 = await crossArt.addChain(97, Bnb)
    })
})
